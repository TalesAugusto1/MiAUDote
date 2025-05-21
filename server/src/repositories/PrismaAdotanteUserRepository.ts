import { AdotanteUser, PrismaClient } from '@prisma/client';
import { IAdotanteUserRepository } from '../interfaces/IAdotanteUserRepository';

export class PrismaAdotanteUserRepository implements IAdotanteUserRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<AdotanteUser, 'id'>): Promise<AdotanteUser> {
    return this.prisma.adotanteUser.create({ data });
  }

  async findById(id: number): Promise<AdotanteUser | null> {
    return this.prisma.adotanteUser.findUnique({ where: { id } });
  }

  async findByUserId(userId: number): Promise<AdotanteUser | null> {
    return this.prisma.adotanteUser.findUnique({ where: { userId } });
  }

  async update(id: number, data: Partial<AdotanteUser>): Promise<AdotanteUser> {
    return this.prisma.adotanteUser.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adotanteUser.delete({ where: { id } });
  }
} 