/**
 * @swagger
 * tags:
 *   name: Adocao
 *   description: Gerenciamento de adoções
 */

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

console.log('Inicializando PrismaClient para Adocao...');
const prisma = new PrismaClient();
console.log('PrismaClient inicializado com sucesso para Adocao');

export class AdocaoController {
  /**
   * @swagger
   * /adocao:
   *   get:
   *     summary: Lista todas as adoções
   *     tags: [Adocao]
   *     responses:
   *       200:
   *         description: Lista de adoções
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Adocao'
   */
  async findAll(req: Request, res: Response) {
    try {
      console.log('Tentando buscar adoções...');
      const adocoes = await prisma.adocao.findMany();
      console.log('Adoções encontradas:', adocoes);
      return res.json(adocoes);
    } catch (error) {
      console.error('Erro detalhado ao listar adoções:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao listar adoções',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /adocao/{id}:
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
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('Tentando buscar adoção com ID:', id);
      const adocao = await prisma.adocao.findUnique({
        where: { id: Number(id) }
      });
      
      if (!adocao) {
        return res.status(404).json({ error: 'Adoção não encontrada' });
      }
      
      console.log('Adoção encontrada:', adocao);
      return res.json(adocao);
    } catch (error) {
      console.error('Erro detalhado ao buscar adoção:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao buscar adoção',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /adocao/test:
   *   post:
   *     summary: Cria uma adoção de teste
   *     tags: [Adocao]
   *     responses:
   *       200:
   *         description: Adoção criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Adocao'
   */
  async createTest(req: Request, res: Response) {
    try {
      console.log('Tentando criar adoção de teste...');
      const adocao = await prisma.adocao.create({
        data: {
          animalId: 1,
          adotanteId: 1,
          ongId: 1,
          status: 'pendente'
        }
      });
      console.log('Adoção criada com sucesso:', adocao);
      return res.json(adocao);
    } catch (error) {
      console.error('Erro detalhado ao criar adoção de teste:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao criar adoção de teste',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 