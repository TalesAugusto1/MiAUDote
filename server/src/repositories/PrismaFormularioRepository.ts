import { Prisma, PrismaClient } from '@prisma/client';
import { IFormularioRepository } from '../interfaces/IFormularioRepository';

type Formulario = Prisma.FormularioGetPayload<{}>;

export class PrismaFormularioRepository implements IFormularioRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Omit<Formulario, 'id'>): Promise<Formulario> {
    return this.prisma.formulario.create({ data });
  }

  async findById(id: number): Promise<Formulario | null> {
    return this.prisma.formulario.findUnique({ where: { id } });
  }

  async findByAdotante(idAdotante: number): Promise<Formulario[]> {
    return this.prisma.formulario.findMany({ where: { idAdotante } });
  }

  async update(id: number, data: Partial<Formulario>): Promise<Formulario> {
    return this.prisma.formulario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.formulario.delete({ where: { id } });
  }

  async findAll(): Promise<Formulario[]> {
    return this.prisma.formulario.findMany();
  }
} 