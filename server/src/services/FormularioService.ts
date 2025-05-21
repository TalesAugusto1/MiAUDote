import { IFormularioRepository } from '../interfaces/IFormularioRepository';

export class FormularioService {
  constructor(private formularioRepository: IFormularioRepository) {}

  async createFormulario(data: any) {
    return this.formularioRepository.create(data);
  }

  async getFormularioById(id: number) {
    return this.formularioRepository.findById(id);
  }

  async getFormularioByAdotanteUserId(adotanteUserId: number) {
    return this.formularioRepository.findByAdotanteUserId(adotanteUserId);
  }

  async updateFormulario(id: number, data: any) {
    return this.formularioRepository.update(id, data);
  }

  async deleteFormulario(id: number) {
    return this.formularioRepository.delete(id);
  }
} 