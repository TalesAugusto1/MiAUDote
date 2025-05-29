import { Prisma, PrismaClient } from '@prisma/client';
import { IOngRepository, Ong } from '../interfaces/IOngRepository';

export class PrismaOngRepository implements IOngRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    return this.prisma.ong.create({
      data,
      include: {
        user: true
      }
    });
  }

  async findById(id: number): Promise<Ong | null> {
    return this.prisma.ong.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
  }

  async findByEmail(email: string): Promise<Ong | null> {
    return this.prisma.ong.findFirst({
      where: {
        user: {
          email
        }
      },
      include: {
        user: true
      }
    });
  }

  async update(id: number, data: Prisma.OngUpdateInput): Promise<Ong> {
    return this.prisma.ong.update({
      where: { id },
      data,
      include: {
        user: true
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.ong.delete({ where: { id } });
  }

  async findAll(): Promise<Ong[]> {
    return this.prisma.ong.findMany({
      include: {
        user: true
      }
    });
  }
} 