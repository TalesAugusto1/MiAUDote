import { OngUser, PrismaClient } from '@prisma/client';
import { IOngUserRepository } from '../interfaces/IOngUserRepository';

export class PrismaOngUserRepository implements IOngUserRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<OngUser, 'id'>): Promise<OngUser> {
    return this.prisma.ongUser.create({ data });
  }

  async findById(id: number): Promise<OngUser | null> {
    return this.prisma.ongUser.findUnique({ where: { id } });
  }

  async findByUserId(userId: number): Promise<OngUser | null> {
    return this.prisma.ongUser.findUnique({ where: { userId } });
  }

  async update(id: number, data: Partial<OngUser>): Promise<OngUser> {
    return this.prisma.ongUser.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.ongUser.delete({ where: { id } });
  }
} 