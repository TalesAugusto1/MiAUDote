import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class TestController {
  /**
   * @swagger
   * /test/users:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Test]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  /**
   * @swagger
   * /test/animals:
   *   get:
   *     summary: Lista todos os animais
   *     tags: [Test]
   *     responses:
   *       200:
   *         description: Lista de animais
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Animal'
   */
  async listAnimals(req: Request, res: Response) {
    try {
      const animals = await prisma.animal.findMany();
      return res.json(animals);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar animais' });
    }
  }

  /**
   * @swagger
   * /test/adocoes:
   *   get:
   *     summary: Lista todas as adoções
   *     tags: [Test]
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
  async listAdocoes(req: Request, res: Response) {
    try {
      const adocoes = await prisma.adocao.findMany();
      return res.json(adocoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar adoções' });
    }
  }

  /**
   * @swagger
   * /test/formularios:
   *   get:
   *     summary: Lista todos os formulários
   *     tags: [Test]
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
  async listFormularios(req: Request, res: Response) {
    try {
      const formularios = await prisma.formulario.findMany();
      return res.json(formularios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar formulários' });
    }
  }

  /**
   * @swagger
   * /test/insert:
   *   post:
   *     summary: Insere dados de teste em todas as tabelas
   *     tags: [Test]
   *     responses:
   *       200:
   *         description: Dados inseridos com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async insertTestData(req: Request, res: Response) {
    try {
      // Criar usuário de teste
      const user = await prisma.user.create({
        data: {
          name: 'Usuário Teste',
          email: 'teste@teste.com',
          password: '123456',
          role: 'ADOTANTE'
        }
      });

      // Criar ONG de teste
      const ong = await prisma.user.create({
        data: {
          name: 'ONG Teste',
          email: 'ong@teste.com',
          password: '123456',
          role: 'ONG'
        }
      });

      // Criar animal de teste
      const animal = await prisma.animal.create({
        data: {
          name: 'Animal Teste',
          species: 'Cachorro',
          breed: 'Vira-lata',
          age: 2,
          description: 'Animal de teste',
          ongId: ong.id
        }
      });

      // Criar adoção de teste
      const adocao = await prisma.adocao.create({
        data: {
          animalId: animal.id,
          adotanteId: user.id,
          ongId: ong.id,
          status: 'PENDENTE'
        }
      });

      // Criar formulário de teste
      const formulario = await prisma.formulario.create({
        data: {
          animalId: animal.id,
          adotanteId: user.id,
          ongId: ong.id,
          status: 'PENDENTE'
        }
      });

      return res.json({ 
        message: 'Dados de teste inseridos com sucesso',
        data: { user, ong, animal, adocao, formulario }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao inserir dados de teste' });
    }
  }
} 