import { Prisma, PrismaClient } from '@prisma/client';
import { Adotante, IAdotanteRepository } from '../interfaces/IAdotanteRepository';

export class PrismaAdotanteRepository implements IAdotanteRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.AdotanteCreateInput): Promise<Adotante> {
    return this.prisma.adotante.create({
      data: {
        cpf: data.cpf,
        user: data.user
      },
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

  async findByUserId(userId: number): Promise<Adotante | null> {
    return this.prisma.adotante.findUnique({
      where: { id: userId },
      include: {
        user: true,
        adocoes: true,
        formularios: true
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