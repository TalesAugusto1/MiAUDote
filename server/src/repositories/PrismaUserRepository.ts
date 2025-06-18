import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: { nome: string; email: string; senha: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOngByUserId(userId: number): Promise<any | null> {
    return this.prisma.ong.findUnique({ 
      where: { id: userId },
      include: {
        user: true,
        animais: true
      }
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    // Primeiro, vamos encontrar o usuário para verificar se é adotante ou ONG
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        adotante: true,
        ong: true
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Se for adotante, deleta os formulários e adoções primeiro
    if (user.adotante) {
      await this.prisma.formulario.deleteMany({
        where: { idAdotante: user.adotante.id }
      });

      await this.prisma.adocao.deleteMany({
        where: { idAdotante: user.adotante.id }
      });

      // Deleta o adotante
      await this.prisma.adotante.delete({
        where: { id: user.adotante.id }
      });
    }

    // Se for ONG, deleta os animais e suas adoções
    if (user.ong) {
      const animais = await this.prisma.animal.findMany({
        where: { idOng: user.ong.id }
      });

      for (const animal of animais) {
        await this.prisma.adocao.deleteMany({
          where: { idAnimal: animal.id }
        });
      }

      await this.prisma.animal.deleteMany({
        where: { idOng: user.ong.id }
      });

      // Deleta a ONG
      await this.prisma.ong.delete({
        where: { id: user.ong.id }
      });
    }

    // Por fim, deleta o usuário
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createAdotante(data: { id: number; cpf: string }): Promise<any> {
    return this.prisma.adotante.create({
      data: {
        id: data.id,
        cpf: data.cpf
      }
    });
  }

  async createOng(data: { 
    id: number;
    cnpj: string; 
    endereco: string; 
    telefone?: string;
  }): Promise<any> {
    try {
      console.log('Dados recebidos para criar ONG:', data);
      const ong = await this.prisma.ong.create({
        data: {
          id: data.id,
          cnpj: data.cnpj,
          endereco: data.endereco,
          telefone: data.telefone
        }
      });
      console.log('ONG criada com sucesso:', ong);
      return ong;
    } catch (error) {
      console.error('Erro ao criar ONG:', error);
      throw error;
    }
  }
}
