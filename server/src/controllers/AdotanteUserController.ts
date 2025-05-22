/**
 * @swagger
 * tags:
 *   name: AdotanteUser
 *   description: Gerenciamento de adotantes
 */
import { Request, Response } from 'express';
import { AdotanteUserService } from '../services/AdotanteUserService';

export class AdotanteUserController {
  constructor(private adotanteUserService: AdotanteUserService) {}

  /**
   * @swagger
   * /adotantes:
   *   post:
   *     summary: Cria um novo adotante
   *     tags: [AdotanteUser]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: integer
   *               cpf:
   *                 type: string
   *               formRespondido:
   *                 type: boolean
   *     responses:
   *       201:
   *         description: Adotante criado com sucesso
   */
  async create(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.createAdotanteUser(req.body);
    return res.status(201).json(adotante);
  }

  /**
   * @swagger
   * /adotantes/{id}:
   *   get:
   *     summary: Busca um adotante por ID
   *     tags: [AdotanteUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do adotante
   *     responses:
   *       200:
   *         description: Dados do adotante
   */
  async getById(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.getAdotanteUserById(Number(req.params.id));
    return res.json(adotante);
  }

  /**
   * @swagger
   * /adotantes:
   *   get:
   *     summary: Busca um adotante pelo userId
   *     tags: [AdotanteUser]
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Dados do adotante
   */
  async getByUserId(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.getAdotanteUserByUserId(Number(req.query.userId));
    return res.json(adotante);
  }

  /**
   * @swagger
   * /adotantes/{id}:
   *   put:
   *     summary: Atualiza um adotante
   *     tags: [AdotanteUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do adotante
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               cpf:
   *                 type: string
   *               formRespondido:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Adotante atualizado
   */
  async update(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.updateAdotanteUser(Number(req.params.id), req.body);
    return res.json(adotante);
  }

  /**
   * @swagger
   * /adotantes/{id}:
   *   delete:
   *     summary: Remove um adotante
   *     tags: [AdotanteUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do adotante
   *     responses:
   *       204:
   *         description: Adotante removido com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.adotanteUserService.deleteAdotanteUser(Number(req.params.id));
    return res.status(204).send();
  }
} 