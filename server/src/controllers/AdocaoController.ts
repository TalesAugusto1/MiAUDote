/**
 * @swagger
 * tags:
 *   name: Adocao
 *   description: Gerenciamento de adoções
 */

import { Request, Response } from 'express';
import { AdocaoService } from '../services/AdocaoService';

export class AdocaoController {
  constructor(private adocaoService: AdocaoService) {}

  /**
   * @swagger
   * /adocoes:
   *   post:
   *     summary: Cria uma nova adoção
   *     tags: [Adocao]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               animalId:
   *                 type: integer
   *               adotanteId:
   *                 type: integer
   *               ongId:
   *                 type: integer
   *               status:
   *                 type: string
   *     responses:
   *       201:
   *         description: Adoção criada com sucesso
   */
  async create(req: Request, res: Response) {
    const adocao = await this.adocaoService.createAdocao(req.body);
    return res.status(201).json(adocao);
  }

  /**
   * @swagger
   * /adocoes/{id}:
   *   get:
   *     summary: Busca uma adoção por ID
   *     tags: [Adocao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da adoção
   *     responses:
   *       200:
   *         description: Dados da adoção
   */
  async getById(req: Request, res: Response) {
    const adocao = await this.adocaoService.getAdocaoById(Number(req.params.id));
    return res.json(adocao);
  }

  /**
   * @swagger
   * /adocoes:
   *   get:
   *     summary: Lista adoções por adotanteId, ongId ou animalId
   *     tags: [Adocao]
   *     parameters:
   *       - in: query
   *         name: adotanteId
   *         schema:
   *           type: integer
   *         required: false
   *         description: ID do adotante
   *       - in: query
   *         name: ongId
   *         schema:
   *           type: integer
   *         required: false
   *         description: ID da ONG
   *       - in: query
   *         name: animalId
   *         schema:
   *           type: integer
   *         required: false
   *         description: ID do animal
   *     responses:
   *       200:
   *         description: Lista de adoções
   */
  async getByAdotanteId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByAdotanteId(Number(req.query.adotanteId));
    return res.json(adocoes);
  }

  async getByOngId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByOngId(Number(req.query.ongId));
    return res.json(adocoes);
  }

  async getByAnimalId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByAnimalId(Number(req.query.animalId));
    return res.json(adocoes);
  }

  /**
   * @swagger
   * /adocoes/{id}:
   *   put:
   *     summary: Atualiza uma adoção
   *     tags: [Adocao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da adoção
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *     responses:
   *       200:
   *         description: Adoção atualizada
   */
  async update(req: Request, res: Response) {
    const adocao = await this.adocaoService.updateAdocao(Number(req.params.id), req.body);
    return res.json(adocao);
  }

  /**
   * @swagger
   * /adocoes/{id}:
   *   delete:
   *     summary: Remove uma adoção
   *     tags: [Adocao]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da adoção
   *     responses:
   *       204:
   *         description: Adoção removida com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.adocaoService.deleteAdocao(Number(req.params.id));
    return res.status(204).send();
  }
} 