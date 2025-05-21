import { IAnimalRepository } from '../interfaces/IAnimalRepository';

export class AnimalService {
  constructor(private animalRepository: IAnimalRepository) {}

  async createAnimal(data: any) {
    return this.animalRepository.create(data);
  }

  async getAnimalById(id: number) {
    return this.animalRepository.findById(id);
  }

  async getAnimalsByOngId(ongId: number) {
    return this.animalRepository.findByOngId(ongId);
  }

  async updateAnimal(id: number, data: any) {
    return this.animalRepository.update(id, data);
  }

  async deleteAnimal(id: number) {
    return this.animalRepository.delete(id);
  }
} 