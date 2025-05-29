/**
 * @swagger
 * tags:
 *   name: Ong
 *   description: Gerenciamento de ONGs
 */
import { Request, Response } from 'express';
import { OngService } from '../services/OngService';

export class OngController {
  constructor(private ongService: OngService) {}

  /**
   * @swagger
   * /ong:
   *   get:
   *     summary: Lista todas as ONGs
   *     tags: [Ong]
   *     responses:
   *       200:
   *         description: Lista de ONGs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Ong'
   */
  async findAll(req: Request, res: Response) {
    try {
      const ongs = await this.ongService.findAll();
      return res.json(ongs);
    } catch (error) {
      console.error('Erro ao listar ONGs:', error);
      return res.status(500).json({ 
        error: 'Erro ao listar ONGs',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /ong/{id}:
   *   get:
   *     summary: Busca uma ONG pelo ID
   *     tags: [Ong]
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
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ong'
   *       404:
   *         description: ONG não encontrada
   */
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ong = await this.ongService.getOngById(id);
      
      if (!ong) {
        return res.status(404).json({ error: 'ONG não encontrada' });
      }

      return res.json(ong);
    } catch (error) {
      console.error('Erro ao buscar ONG:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar ONG',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /ong/{id}:
   *   delete:
   *     summary: Remove uma ONG
   *     tags: [Ong]
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
    try {
      await this.ongService.deleteOng(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar ONG:', error);
      return res.status(500).json({ 
        error: 'Erro ao deletar ONG',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 