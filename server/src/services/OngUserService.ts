import { IOngUserRepository } from '../interfaces/IOngUserRepository';

export class OngUserService {
  constructor(private ongUserRepository: IOngUserRepository) {}

  async createOngUser(data: any) {
    return this.ongUserRepository.create(data);
  }

  async getOngUserById(id: number) {
    return this.ongUserRepository.findById(id);
  }

  async getOngUserByUserId(userId: number) {
    return this.ongUserRepository.findByUserId(userId);
  }

  async updateOngUser(id: number, data: any) {
    return this.ongUserRepository.update(id, data);
  }

  async deleteOngUser(id: number) {
    return this.ongUserRepository.delete(id);
  }
} 