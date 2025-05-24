import { Prisma } from '@prisma/client';
import { IOngRepository, Ong } from '../interfaces/IOngRepository';

export class OngService {
  constructor(private ongRepository: IOngRepository) {}

  async createOng(data: Prisma.OngCreateInput): Promise<Ong> {
    return this.ongRepository.create(data);
  }

  async getOngById(id: number): Promise<Ong | null> {
    return this.ongRepository.findById(id);
  }

  async getOngByEmail(email: string): Promise<Ong | null> {
    return this.ongRepository.findByEmail(email);
  }

  async updateOng(id: number, data: Prisma.OngUpdateInput): Promise<Ong> {
    return this.ongRepository.update(id, data);
  }

  async deleteOng(id: number): Promise<void> {
    await this.ongRepository.delete(id);
  }

  async getAllOngs(): Promise<Ong[]> {
    return this.ongRepository.findAll();
  }

  async findAll() {
    return this.ongRepository.findAll();
  }
} 