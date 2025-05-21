import { Animal } from '@prisma/client';

export interface IAnimalRepository {
  create(data: Omit<Animal, 'id'>): Promise<Animal>;
  findById(id: number): Promise<Animal | null>;
  findByOngId(ongId: number): Promise<Animal[]>;
  update(id: number, data: Partial<Animal>): Promise<Animal>;
  delete(id: number): Promise<void>;
} 