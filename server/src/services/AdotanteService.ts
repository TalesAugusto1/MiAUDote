import { Prisma } from '@prisma/client';
import { Adotante, IAdotanteRepository } from '../interfaces/IAdotanteRepository';

export class AdotanteService {
  constructor(private adotanteRepository: IAdotanteRepository) {}

  async createAdotante(data: Prisma.AdotanteCreateInput): Promise<Adotante> {
    return this.adotanteRepository.create(data);
  }

  async getAdotanteById(id: number): Promise<Adotante | null> {
    return this.adotanteRepository.findById(id);
  }

  async updateAdotante(id: number, data: Prisma.AdotanteUpdateInput): Promise<Adotante> {
    return this.adotanteRepository.update(id, data);
  }

  async deleteAdotante(id: number): Promise<void> {
    await this.adotanteRepository.delete(id);
  }

  async getAllAdotantes(): Promise<Adotante[]> {
    return this.adotanteRepository.findAll();
  }

  async findAll() {
    return this.adotanteRepository.findAll();
  }
} 