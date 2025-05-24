import { PrismaClient } from '@prisma/client';

type Ong = PrismaClient['ong']['payload']['default'];

export interface IOngRepository {
  create(data: Omit<Ong, 'id'>): Promise<Ong>;
  findById(id: number): Promise<Ong | null>;
  findByEmail(email: string): Promise<Ong | null>;
  update(id: number, data: Partial<Ong>): Promise<Ong>;
  delete(id: number): Promise<void>;
} 