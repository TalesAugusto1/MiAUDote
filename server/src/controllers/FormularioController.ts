/**
 * @swagger
 * tags:
 *   name: Formulario
 *   description: Gerenciamento de formulários
 */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

console.log('Inicializando PrismaClient para Formulario...');
const prisma = new PrismaClient();
console.log('PrismaClient inicializado com sucesso para Formulario');

export class FormularioController {
  /**
   * @swagger
   * /formulario:
   *   get:
   *     summary: Lista todos os formulários
   *     tags: [Formulario]
   *     responses:
   *       200:
   *         description: Lista de formulários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Formulario'
   */
  async findAll(req: Request, res: Response) {
    try {
      console.log('Tentando buscar formulários...');
      const formularios = await prisma.formulario.findMany();
      console.log('Formulários encontrados:', formularios);
      return res.json(formularios);
    } catch (error) {
      console.error('Erro detalhado ao listar formulários:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao listar formulários',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /formulario/{id}:
   *   get:
   *     summary: Busca um formulário por ID
   *     tags: [Formulario]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do formulário
   *     responses:
   *       200:
   *         description: Dados do formulário
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('Tentando buscar formulário com ID:', id);
      const formulario = await prisma.formulario.findUnique({
        where: { id: Number(id) }
      });
      
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário não encontrado' });
      }
      
      console.log('Formulário encontrado:', formulario);
      return res.json(formulario);
    } catch (error) {
      console.error('Erro detalhado ao buscar formulário:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao buscar formulário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /formulario/test:
   *   post:
   *     summary: Cria um formulário de teste
   *     tags: [Formulario]
   *     responses:
   *       200:
   *         description: Formulário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Formulario'
   */
  async createTest(req: Request, res: Response) {
    try {
      console.log('Tentando criar formulário de teste...');
      const formulario = await prisma.formulario.create({
        data: {
          idAdotante: 1,
          nomeAdotante: 'Usuário Teste',
          ongResponsavel: 'ONG Teste'
        }
      });
      console.log('Formulário criado com sucesso:', formulario);
      return res.json(formulario);
    } catch (error) {
      console.error('Erro detalhado ao criar formulário de teste:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao criar formulário de teste',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 