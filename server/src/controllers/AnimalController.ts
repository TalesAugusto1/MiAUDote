import { Request, Response } from 'express';
import { AnimalService } from '../services/AnimalService';

export class AnimalController {
  constructor(private animalService: AnimalService) {}

  async create(req: Request, res: Response) {
    const animal = await this.animalService.createAnimal(req.body);
    return res.status(201).json(animal);
  }

  async getById(req: Request, res: Response) {
    const animal = await this.animalService.getAnimalById(Number(req.params.id));
    return res.json(animal);
  }

  async getByOngId(req: Request, res: Response) {
    const animals = await this.animalService.getAnimalsByOngId(Number(req.query.ongId));
    return res.json(animals);
  }

  async update(req: Request, res: Response) {
    const animal = await this.animalService.updateAnimal(Number(req.params.id), req.body);
    return res.json(animal);
  }

  async delete(req: Request, res: Response) {
    await this.animalService.deleteAnimal(Number(req.params.id));
    return res.status(204).send();
  }
} 