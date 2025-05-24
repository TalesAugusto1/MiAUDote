import { Prisma } from '@prisma/client';

type Formulario = Prisma.FormularioGetPayload<{}>;

export interface IFormularioRepository {
  create(data: Omit<Formulario, 'id'>): Promise<Formulario>;
  findById(id: number): Promise<Formulario | null>;
  findByAdotante(idAdotante: number): Promise<Formulario[]>;
  update(id: number, data: Partial<Formulario>): Promise<Formulario>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Formulario[]>;
} 