/**
 * @swagger
 * tags:
 *   name: Animal
 *   description: Gerenciamento de animais
 */
import { Request, Response } from 'express';
import { AnimalService } from '../services/AnimalService';

export class AnimalController {
  constructor(private animalService: AnimalService) {}

  /**
   * @swagger
   * /animais:
   *   post:
   *     summary: Cria um novo animal
   *     tags: [Animal]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               ongId:
   *                 type: integer
   *               name:
   *                 type: string
   *               tipo:
   *                 type: string
   *               raca:
   *                 type: string
   *               sexo:
   *                 type: string
   *               porte:
   *                 type: string
   *               idade:
   *                 type: integer
   *               descricao:
   *                 type: string
   *               images:
   *                 type: string
   *     responses:
   *       201:
   *         description: Animal criado com sucesso
   */
  async create(req: Request, res: Response) {
    const animal = await this.animalService.createAnimal(req.body);
    return res.status(201).json(animal);
  }

  /**
   * @swagger
   * /animais/{id}:
   *   get:
   *     summary: Busca um animal por ID
   *     tags: [Animal]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do animal
   *     responses:
   *       200:
   *         description: Dados do animal
   */
  async getById(req: Request, res: Response) {
    const animal = await this.animalService.getAnimalById(Number(req.params.id));
    return res.json(animal);
  }

  /**
   * @swagger
   * /animais:
   *   get:
   *     summary: Lista animais por ongId
   *     tags: [Animal]
   *     parameters:
   *       - in: query
   *         name: ongId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da ONG
   *     responses:
   *       200:
   *         description: Lista de animais
   */
  async getByOngId(req: Request, res: Response) {
    const animals = await this.animalService.getAnimalsByOngId(Number(req.query.ongId));
    return res.json(animals);
  }

  /**
   * @swagger
   * /animais/{id}:
   *   put:
   *     summary: Atualiza um animal
   *     tags: [Animal]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do animal
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               tipo:
   *                 type: string
   *               raca:
   *                 type: string
   *               sexo:
   *                 type: string
   *               porte:
   *                 type: string
   *               idade:
   *                 type: integer
   *               descricao:
   *                 type: string
   *               images:
   *                 type: string
   *     responses:
   *       200:
   *         description: Animal atualizado
   */
  async update(req: Request, res: Response) {
    const animal = await this.animalService.updateAnimal(Number(req.params.id), req.body);
    return res.json(animal);
  }

  /**
   * @swagger
   * /animais/{id}:
   *   delete:
   *     summary: Remove um animal
   *     tags: [Animal]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do animal
   *     responses:
   *       204:
   *         description: Animal removido com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.animalService.deleteAnimal(Number(req.params.id));
    return res.status(204).send();
  }
} 