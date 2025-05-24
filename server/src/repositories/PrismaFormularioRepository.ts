import { PrismaClient } from '@prisma/client';
import { IFormularioRepository } from '../interfaces/IFormularioRepository';

type Formulario = PrismaClient['formulario']['payload']['default'];

export class PrismaFormularioRepository implements IFormularioRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Formulario, 'id'>): Promise<Formulario> {
    return this.prisma.formulario.create({ data });
  }

  async findById(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.findUnique({ where: { id } });
  }

  async findByAdotante(idAdotante: number): Promise<Formulario[]> {
    return this.prisma.formulario.findMany({ where: { idAdotante } });
  }

  async findByAnimal(animalId: number): Promise<Formulario[]> {
    return this.prisma.formulario.findMany({ where: { animalId } });
  }

  async update(id: number, data: Partial<Formulario>): Promise<Formulario> {
    return this.prisma.formulario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.formulario.delete({ where: { id } });
  }
} 