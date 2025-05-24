import { PrismaClient } from '@prisma/client';
import { IAdocaoRepository } from '../interfaces/IAdocaoRepository';

type Adocao = PrismaClient['adocao']['payload']['default'];

export class AdocaoService {
  constructor(private adocaoRepository: IAdocaoRepository) {}

  async createAdocao(data: Omit<Adocao, 'id'>): Promise<Adocao> {
    return this.adocaoRepository.create(data);
  }

  async getAdocaoById(id: number): Promise<Adocao | null> {
    return this.adocaoRepository.findById(id);
  }

  async getAdocoesByAdotante(adotanteId: number): Promise<Adocao[]> {
    return this.adocaoRepository.findByAdotante(adotanteId);
  }

  async getAdocoesByOngId(ongId: number): Promise<Adocao[]> {
    return this.adocaoRepository.findByOng(ongId);
  }

  async getAdocoesByAnimalId(animalId: number): Promise<Adocao[]> {
    return this.adocaoRepository.findByAnimal(animalId);
  }

  async updateAdocao(id: number, data: Partial<Adocao>): Promise<Adocao> {
    return this.adocaoRepository.update(id, data);
  }

  async deleteAdocao(id: number): Promise<void> {
    await this.adocaoRepository.delete(id);
  }
} 