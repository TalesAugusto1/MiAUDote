import { Prisma } from '@prisma/client';
import { IFormularioRepository } from '../interfaces/IFormularioRepository';

type Formulario = Prisma.FormularioGetPayload<{}>;

export class FormularioService {
  constructor(private formularioRepository: IFormularioRepository) {}

  async createFormulario(data: Omit<Formulario, 'id'>): Promise<Formulario> {
    return this.formularioRepository.create(data);
  }

  async getFormularioById(id: number): Promise<Formulario | null> {
    return this.formularioRepository.findById(id);
  }

  async getFormulariosByAdotante(idAdotante: number): Promise<Formulario[]> {
    return this.formularioRepository.findByAdotante(idAdotante);
  }

  async updateFormulario(id: number, data: Partial<Formulario>): Promise<Formulario> {
    return this.formularioRepository.update(id, data);
  }

  async deleteFormulario(id: number): Promise<void> {
    await this.formularioRepository.delete(id);
  }

  async findAll() {
    return this.formularioRepository.findAll();
  }
} 