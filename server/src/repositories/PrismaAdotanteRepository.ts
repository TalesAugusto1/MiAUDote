import { PrismaClient } from '@prisma/client';
import { IAdotanteRepository } from '../interfaces/IAdotanteRepository';

type Adotante = PrismaClient['adotante']['payload']['default'];

export class PrismaAdotanteRepository implements IAdotanteRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Adotante, 'id'>): Promise<Adotante> {
    return this.prisma.adotante.create({ data });
  }

  async findById(id: number): Promise<Adotante | null> {
    return this.prisma.adotante.findUnique({ where: { id } });
  }

  async findByCpf(cpf: string): Promise<Adotante | null> {
    return this.prisma.adotante.findFirst({ where: { cpf } });
  }

  async update(id: number, data: Partial<Adotante>): Promise<Adotante> {
    return this.prisma.adotante.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adotante.delete({ where: { id } });
  }
} 