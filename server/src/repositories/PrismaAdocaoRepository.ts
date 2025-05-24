import { Prisma, PrismaClient } from '@prisma/client';
import { IAdocaoRepository } from '../interfaces/IAdocaoRepository';

type Adocao = Prisma.AdocaoGetPayload<{}>;

export class PrismaAdocaoRepository implements IAdocaoRepository {
  constructor(private prisma: PrismaClient) {}

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
    return this.prisma.adocao.findMany({
      where: {
        animal: {
          idOng: ongId
        }
      }
    });
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

  async findAll() {
    return this.prisma.adocao.findMany();
  }
} 