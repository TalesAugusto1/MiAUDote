import { Prisma } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

type User = Prisma.UserGetPayload<{}>;

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Aqui pode fazer validações, hash de senha, etc.
    return this.userRepository.create(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUserWithAdotante(data: {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    dataNascimento: Date;
  }): Promise<{ user: User; adotante: any }> {
    const { nome, email, senha, cpf, dataNascimento } = data;
    const user = await this.userRepository.create({ nome, email, senha });
    const adotante = await this.userRepository.createAdotante({
      id: user.id,
      cpf,
      dataNascimento
    });
    return { user, adotante };
  }

  async createUserWithOng(data: {
    nome: string;
    email: string;
    senha: string;
    cnpj: string;
    endereco: string;
  }): Promise<{ user: User; ong: any }> {
    const { nome, email, senha, cnpj, endereco } = data;
    const user = await this.userRepository.create({ nome, email, senha });
    const ong = await this.userRepository.createOng({
      id: user.id,
      cnpj,
      endereco
    });
    return { user, ong };
  }
}
