import { OngUser } from '@prisma/client';

export interface IOngUserRepository {
  create(data: Omit<OngUser, 'id'>): Promise<OngUser>;
  findById(id: number): Promise<OngUser | null>;
  findByUserId(userId: number): Promise<OngUser | null>;
  update(id: number, data: Partial<OngUser>): Promise<OngUser>;
  delete(id: number): Promise<void>;
} 