import { PrismaClient } from '@prisma/client';
import { IOngRepository } from '../interfaces/IOngRepository';

type Ong = PrismaClient['ong']['payload']['default'];

export class PrismaOngRepository implements IOngRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Ong, 'id'>): Promise<Ong> {
    return this.prisma.ong.create({ data });
  }

  async findById(id: number): Promise<Ong | null> {
    return this.prisma.ong.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Ong | null> {
    return this.prisma.ong.findFirst({ where: { email } });
  }

  async update(id: number, data: Partial<Ong>): Promise<Ong> {
    return this.prisma.ong.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.ong.delete({ where: { id } });
  }
} 