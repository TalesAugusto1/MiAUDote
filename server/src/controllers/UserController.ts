/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gerenciamento de usuários
 */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

console.log('Inicializando PrismaClient...');
const prisma = new PrismaClient();
console.log('PrismaClient inicializado com sucesso');

export class UserController {
  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [User]
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
  async findAll(req: Request, res: Response) {
    try {
      console.log('Tentando buscar usuários...');
      const users = await prisma.user.findMany();
      console.log('Usuários encontrados:', users);
      return res.json(users);
    } catch (error) {
      console.error('Erro detalhado ao listar usuários:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao listar usuários',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user/test:
   *   post:
   *     summary: Cria um usuário de teste
   *     tags: [User]
   *     responses:
   *       200:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async createTest(req: Request, res: Response) {
    try {
      console.log('Tentando criar usuário de teste...');
      const user = await prisma.user.create({
        data: {
          name: 'Usuário Teste',
          email: 'teste@teste.com',
          password: '123456'
        }
      });
      console.log('Usuário criado com sucesso:', user);
      return res.json(user);
    } catch (error) {
      console.error('Erro detalhado ao criar usuário de teste:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao criar usuário de teste',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}
