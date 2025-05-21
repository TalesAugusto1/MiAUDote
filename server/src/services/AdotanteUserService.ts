import { IAdotanteUserRepository } from '../interfaces/IAdotanteUserRepository';

export class AdotanteUserService {
  constructor(private adotanteUserRepository: IAdotanteUserRepository) {}

  async createAdotanteUser(data: any) {
    return this.adotanteUserRepository.create(data);
  }

  async getAdotanteUserById(id: number) {
    return this.adotanteUserRepository.findById(id);
  }

  async getAdotanteUserByUserId(userId: number) {
    return this.adotanteUserRepository.findByUserId(userId);
  }

  async updateAdotanteUser(id: number, data: any) {
    return this.adotanteUserRepository.update(id, data);
  }

  async deleteAdotanteUser(id: number) {
    return this.adotanteUserRepository.delete(id);
  }
} 