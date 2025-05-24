import { PrismaClient } from '@prisma/client';

type Animal = PrismaClient['animal']['payload']['default'];

export interface IAnimalRepository {
  create(data: Partial<Animal>): Promise<Animal>;
  findById(id: number): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
  findByOng(ongId: number): Promise<Animal[]>;
  update(id: number, data: Partial<Animal>): Promise<Animal>;
  delete(id: number): Promise<void>;
} 