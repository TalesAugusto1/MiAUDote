import { PrismaClient } from '@prisma/client';

type Formulario = PrismaClient['formulario']['payload']['default'];

export interface IFormularioRepository {
  create(data: Omit<Formulario, 'id'>): Promise<Formulario>;
  findById(id: number): Promise<Formulario | null>;
  findByAdotante(idAdotante: number): Promise<Formulario[]>;
  findByAnimal(animalId: number): Promise<Formulario[]>;
  update(id: number, data: Partial<Formulario>): Promise<Formulario>;
  delete(id: number): Promise<void>;
} 