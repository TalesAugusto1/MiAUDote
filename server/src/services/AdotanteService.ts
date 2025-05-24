import { PrismaClient } from '@prisma/client';
import { IAdotanteRepository } from '../interfaces/IAdotanteRepository';

type Adotante = PrismaClient['adotante']['payload']['default'];

export class AdotanteService {
  constructor(private adotanteRepository: IAdotanteRepository) {}

  async createAdotante(data: Omit<Adotante, 'id'>): Promise<Adotante> {
    return this.adotanteRepository.create(data);
  }

  async getAdotanteById(id: number): Promise<Adotante | null> {
    return this.adotanteRepository.findById(id);
  }

  async getAdotanteByCpf(cpf: string): Promise<Adotante | null> {
    return this.adotanteRepository.findByCpf(cpf);
  }

  async updateAdotante(id: number, data: Partial<Adotante>): Promise<Adotante> {
    return this.adotanteRepository.update(id, data);
  }

  async deleteAdotante(id: number): Promise<void> {
    await this.adotanteRepository.delete(id);
  }
} 