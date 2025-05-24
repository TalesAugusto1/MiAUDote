import { PrismaClient } from '@prisma/client';
import { IAnimalRepository } from '../interfaces/IAnimalRepository';

type Animal = PrismaClient['animal']['payload']['default'];

export class AnimalService {
  constructor(private animalRepository: IAnimalRepository) {}

  async createAnimal(data: Omit<Animal, 'id'>): Promise<Animal> {
    return this.animalRepository.create(data);
  }

  async getAnimalById(id: number): Promise<Animal | null> {
    return this.animalRepository.findById(id);
  }

  async getAllAnimais() {
    return this.animalRepository.findAll();
  }

  async getAnimaisByOngId(ongId: number) {
    return this.animalRepository.findByOng(ongId);
  }

  async updateAnimal(id: number, data: Partial<Animal>): Promise<Animal> {
    return this.animalRepository.update(id, data);
  }

  async deleteAnimal(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
} 