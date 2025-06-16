import { Prisma, PrismaClient } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

type User = Prisma.UserGetPayload<{}>;
type UserBasicInfo = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  adotante?: { id: number };
  ong?: { id: number };
};

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
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
