import { Formulario } from '@prisma/client';

export interface IFormularioRepository {
  create(data: Omit<Formulario, 'id'>): Promise<Formulario>;
  findById(id: number): Promise<Formulario | null>;
  findByAdotanteUserId(adotanteUserId: number): Promise<Formulario | null>;
  update(id: number, data: Partial<Formulario>): Promise<Formulario>;
  delete(id: number): Promise<void>;
} 