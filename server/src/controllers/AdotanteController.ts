/**
 * @swagger
 * tags:
 *   name: Adotante
 *   description: Gerenciamento de adotantes
 */
import { Request, Response } from 'express';
import { AdotanteService } from '../services/AdotanteService';

export class AdotanteController {
  constructor(private adotanteService: AdotanteService) {}

  /**
   * @swagger
   * /adotante:
   *   get:
   *     summary: Lista todos os adotantes
   *     tags: [Adotante]
   *     responses:
   *       200:
   *         description: Lista de adotantes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Adotante'
   */
  async findAll(req: Request, res: Response) {
    try {
      const adotantes = await this.adotanteService.findAll();
      return res.json(adotantes);
    } catch (error) {
      console.error('Erro ao listar adotantes:', error);
      return res.status(500).json({ 
        error: 'Erro ao listar adotantes',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /adotante/{id}:
   *   get:
   *     summary: Busca um adotante pelo ID
   *     tags: [Adotante]
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
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Adotante'
   *       404:
   *         description: Adotante não encontrado
   */
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const adotante = await this.adotanteService.getAdotanteById(id);
      
      if (!adotante) {
        return res.status(404).json({ error: 'Adotante não encontrado' });
      }

      return res.json(adotante);
    } catch (error) {
      console.error('Erro ao buscar adotante:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar adotante',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /adotante/{id}:
   *   delete:
   *     summary: Remove um adotante
   *     tags: [Adotante]
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
    try {
      await this.adotanteService.deleteAdotante(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar adotante:', error);
      return res.status(500).json({ 
        error: 'Erro ao deletar adotante',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 