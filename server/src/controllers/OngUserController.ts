/**
 * @swagger
 * tags:
 *   name: OngUser
 *   description: Gerenciamento de ONGs
 */
import { Request, Response } from 'express';
import { OngUserService } from '../services/OngUserService';

export class OngUserController {
  constructor(private ongUserService: OngUserService) {}

  /**
   * @swagger
   * /ongs:
   *   post:
   *     summary: Cria uma nova ONG
   *     tags: [OngUser]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: integer
   *               cnpj:
   *                 type: string
   *               endereco:
   *                 type: string
   *               whatsapp:
   *                 type: string
   *     responses:
   *       201:
   *         description: ONG criada com sucesso
   */
  async create(req: Request, res: Response) {
    const ong = await this.ongUserService.createOngUser(req.body);
    return res.status(201).json(ong);
  }

  /**
   * @swagger
   * /ongs/{id}:
   *   get:
   *     summary: Busca uma ONG por ID
   *     tags: [OngUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da ONG
   *     responses:
   *       200:
   *         description: Dados da ONG
   */
  async getById(req: Request, res: Response) {
    const ong = await this.ongUserService.getOngUserById(Number(req.params.id));
    return res.json(ong);
  }

  /**
   * @swagger
   * /ongs:
   *   get:
   *     summary: Busca uma ONG pelo userId
   *     tags: [OngUser]
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Dados da ONG
   */
  async getByUserId(req: Request, res: Response) {
    const ong = await this.ongUserService.getOngUserByUserId(Number(req.query.userId));
    return res.json(ong);
  }

  /**
   * @swagger
   * /ongs/{id}:
   *   put:
   *     summary: Atualiza uma ONG
   *     tags: [OngUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da ONG
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               cnpj:
   *                 type: string
   *               endereco:
   *                 type: string
   *               whatsapp:
   *                 type: string
   *     responses:
   *       200:
   *         description: ONG atualizada
   */
  async update(req: Request, res: Response) {
    const ong = await this.ongUserService.updateOngUser(Number(req.params.id), req.body);
    return res.json(ong);
  }

  /**
   * @swagger
   * /ongs/{id}:
   *   delete:
   *     summary: Remove uma ONG
   *     tags: [OngUser]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da ONG
   *     responses:
   *       204:
   *         description: ONG removida com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.ongUserService.deleteOngUser(Number(req.params.id));
    return res.status(204).send();
  }
} 