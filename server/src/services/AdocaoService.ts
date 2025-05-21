import { IAdocaoRepository } from '../interfaces/IAdocaoRepository';

export class AdocaoService {
  constructor(private adocaoRepository: IAdocaoRepository) {}

  async createAdocao(data: any) {
    return this.adocaoRepository.create(data);
  }

  async getAdocaoById(id: number) {
    return this.adocaoRepository.findById(id);
  }

  async getAdocoesByAdotanteId(adotanteId: number) {
    return this.adocaoRepository.findByAdotanteId(adotanteId);
  }

  async getAdocoesByOngId(ongId: number) {
    return this.adocaoRepository.findByOngId(ongId);
  }

  async getAdocoesByAnimalId(animalId: number) {
    return this.adocaoRepository.findByAnimalId(animalId);
  }

  async updateAdocao(id: number, data: any) {
    return this.adocaoRepository.update(id, data);
  }

  async deleteAdocao(id: number) {
    return this.adocaoRepository.delete(id);
  }
} 