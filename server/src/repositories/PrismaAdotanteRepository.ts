import { Prisma, PrismaClient } from '@prisma/client';
import { Adotante, IAdotanteRepository } from '../interfaces/IAdotanteRepository';

export class PrismaAdotanteRepository implements IAdotanteRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.AdotanteCreateInput): Promise<Adotante> {
    return this.prisma.adotante.create({
      data,
      include: {
        user: true
      }
    });
  }

  async findById(id: number): Promise<Adotante | null> {
    return this.prisma.adotante.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
  }

  async update(id: number, data: Prisma.AdotanteUpdateInput): Promise<Adotante> {
    return this.prisma.adotante.update({
      where: { id },
      data,
      include: {
        user: true
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adotante.delete({ where: { id } });
  }

  async findAll(): Promise<Adotante[]> {
    return this.prisma.adotante.findMany({
      include: {
        user: true
      }
    });
  }
} 