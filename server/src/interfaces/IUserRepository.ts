import { Prisma } from '@prisma/client';

type User = Prisma.UserGetPayload<{}>;

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
  findAll(): Promise<User[]>;
  createAdotante(data: { id: number; cpf: string }): Promise<any>;
  createOng(data: {
    id: number;
    cnpj: string;
    endereco: string;
    telefone?: string;
  }): Promise<any>;
}
