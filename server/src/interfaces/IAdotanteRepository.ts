import { PrismaClient } from '@prisma/client';

type Adotante = PrismaClient['adotante']['payload']['default'];

export interface IAdotanteRepository {
  create(data: Omit<Adotante, 'id'>): Promise<Adotante>;
  findById(id: number): Promise<Adotante | null>;
  findByCpf(cpf: string): Promise<Adotante | null>;
  update(id: number, data: Partial<Adotante>): Promise<Adotante>;
  delete(id: number): Promise<void>;
} 