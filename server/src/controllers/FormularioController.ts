/**
 * @swagger
 * tags:
 *   name: Formulario
 *   description: Gerenciamento de formulários
 */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { FormularioService } from '../services/FormularioService';

const prisma = new PrismaClient();

export class FormularioController {
  constructor(private formularioService: FormularioService) {}

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
      const formularios = await this.formularioService.findAll();
      return res.json(formularios);
    } catch (error) {
      console.error('Erro ao listar formulários:', error);
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

  /**
   * @swagger
   * /formulario:
   *   post:
   *     summary: Cria um novo formulário
   *     tags: [Formulario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Formulario'
   *     responses:
   *       201:
   *         description: Formulário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Formulario'
   */
  async create(req: Request, res: Response) {
    try {
      const { idAdotante, nomeAdotante, ongResponsavel, respostas } = req.body;

      if (!idAdotante || !nomeAdotante || !ongResponsavel) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const formulario = await prisma.formulario.create({
        data: {
          idAdotante: Number(idAdotante),
          nomeAdotante,
          ongResponsavel,
          dataEnvio: new Date(),
          ...(respostas && { respostas })
        }
      });

      return res.status(201).json(formulario);
    } catch (error) {
      console.error('Erro ao criar formulário:', error);
      return res.status(500).json({ 
        error: 'Erro ao criar formulário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /formulario/adotante/{idAdotante}:
   *   get:
   *     summary: Busca formulários por ID do adotante
   *     tags: [Formulario]
   *     parameters:
   *       - in: path
   *         name: idAdotante
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do adotante
   *     responses:
   *       200:
   *         description: Lista de formulários do adotante
   */
  async findByAdotante(req: Request, res: Response) {
    try {
      const { idAdotante } = req.params;
      const formularios = await this.formularioService.getFormulariosByAdotante(Number(idAdotante));
      return res.json(formularios);
    } catch (error) {
      console.error('Erro ao buscar formulários por adotante:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar formulários por adotante',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 