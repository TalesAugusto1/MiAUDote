/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { AuthService } from '../services/AuthService';

const registerSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  senha: z.string().min(6),
  confirmSenha: z.string().min(6),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os e-mails não coincidem",
  path: ["confirmEmail"],
}).refine((data) => data.senha === data.confirmSenha, {
  message: "As senhas não coincidem",
  path: ["confirmSenha"],
});

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */

export class AuthController {
  private authService: AuthService;
  private prisma: PrismaClient;

  constructor() {
    const prisma = new PrismaClient();
    const userRepository = new PrismaUserRepository(prisma);
    this.authService = new AuthService(userRepository);
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - confirmEmail
   *               - senha
   *               - confirmSenha
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               confirmEmail:
   *                 type: string
   *               senha:
   *                 type: string
   *               confirmSenha:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       400:
   *         description: Dados inválidos
   */
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await this.authService.register({
        name: data.nome,
        email: data.email,
        password: data.senha,
      });
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Autentica um usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - senha
   *             properties:
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       401:
   *         description: Credenciais inválidas
   */
  async login(req: Request, res: Response) {
    try {
      const credentials = loginSchema.parse(req.body);
      const result = await this.authService.login(credentials.email, credentials.senha);
      return res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(401).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /auth/verify:
   *   post:
   *     summary: Verifica o token de autenticação
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token válido
   */
  /* async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }
      const user = await this.authService.verifyToken(token);
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } */
} 