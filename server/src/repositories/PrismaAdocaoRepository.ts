import { Adocao, PrismaClient } from '@prisma/client';
import { IAdocaoRepository } from '../interfaces/IAdocaoRepository';

export class PrismaAdocaoRepository implements IAdocaoRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Adocao, 'id'>): Promise<Adocao> {
    return this.prisma.adocao.create({ data });
  }

  async findById(id: number): Promise<Adocao | null> {
    return this.prisma.adocao.findUnique({ where: { id } });
  }

  async findByAdotanteId(adotanteId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { adotanteId } });
  }

  async findByOngId(ongId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { ongId } });
  }

  async findByAnimalId(animalId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { animalId } });
  }

  async update(id: number, data: Partial<Adocao>): Promise<Adocao> {
    return this.prisma.adocao.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adocao.delete({ where: { id } });
  }
} 