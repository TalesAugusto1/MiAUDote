import { Prisma } from '@prisma/client';

type Animal = Prisma.AnimalGetPayload<{}>;

export interface IAnimalRepository {
  create(data: Omit<Animal, 'id'>): Promise<Animal>;
  findById(id: number): Promise<Animal | null>;
  findAll(): Promise<any[]>;
  findByOng(ongId: number): Promise<Animal[]>;
  update(id: number, data: Partial<Animal>): Promise<Animal>;
  delete(id: number): Promise<void>;
} 