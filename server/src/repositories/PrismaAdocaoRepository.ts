import { PrismaClient } from '@prisma/client';
import { IAdocaoRepository } from '../interfaces/IAdocaoRepository';

type Adocao = PrismaClient['adocao']['payload']['default'];

export class PrismaAdocaoRepository implements IAdocaoRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Adocao, 'id'>): Promise<Adocao> {
    return this.prisma.adocao.create({ data });
  }

  async findById(id: number): Promise<Adocao | null> {
    return this.prisma.adocao.findUnique({ where: { id } });
  }

  async findByAdotante(adotanteId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { idAdotante: adotanteId } });
  }

  async findByOng(ongId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { idOng: ongId } });
  }

  async findByAnimal(animalId: number): Promise<Adocao[]> {
    return this.prisma.adocao.findMany({ where: { idAnimal: animalId } });
  }

  async update(id: number, data: Partial<Adocao>): Promise<Adocao> {
    return this.prisma.adocao.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adocao.delete({ where: { id } });
  }
} 