import { AdotanteUser } from '@prisma/client';

export interface IAdotanteUserRepository {
  create(data: Omit<AdotanteUser, 'id'>): Promise<AdotanteUser>;
  findById(id: number): Promise<AdotanteUser | null>;
  findByUserId(userId: number): Promise<AdotanteUser | null>;
  update(id: number, data: Partial<AdotanteUser>): Promise<AdotanteUser>;
  delete(id: number): Promise<void>;
} 