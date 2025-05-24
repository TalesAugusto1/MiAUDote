import { PrismaClient } from '@prisma/client';
import { IAnimalRepository } from '../interfaces/IAnimalRepository';

type Animal = PrismaClient['animal']['payload']['default'];

export class PrismaAnimalRepository implements IAnimalRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Animal, 'id'>): Promise<Animal> {
    return this.prisma.animal.create({ data });
  }

  async findById(id: number): Promise<Animal | null> {
    return this.prisma.animal.findUnique({ where: { id } });
  }

  async findByOng(ongId: number): Promise<Animal[]> {
    return this.prisma.animal.findMany({ where: { idOng: ongId } });
  }

  async update(id: number, data: Partial<Animal>): Promise<Animal> {
    return this.prisma.animal.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.animal.delete({ where: { id } });
  }

  async findAll(): Promise<Animal[]> {
    return this.prisma.animal.findMany();
  }
} 