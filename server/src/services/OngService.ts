import { PrismaClient } from '@prisma/client';
import { IOngRepository } from '../interfaces/IOngRepository';

type Ong = PrismaClient['ong']['payload']['default'];

export class OngService {
  constructor(private ongRepository: IOngRepository) {}

  async createOng(data: Omit<Ong, 'id'>): Promise<Ong> {
    return this.ongRepository.create(data);
  }

  async getOngById(id: number): Promise<Ong | null> {
    return this.ongRepository.findById(id);
  }

  async getOngByEmail(email: string): Promise<Ong | null> {
    return this.ongRepository.findByEmail(email);
  }

  async updateOng(id: number, data: Partial<Ong>): Promise<Ong> {
    return this.ongRepository.update(id, data);
  }

  async deleteOng(id: number): Promise<void> {
    await this.ongRepository.delete(id);
  }
} 