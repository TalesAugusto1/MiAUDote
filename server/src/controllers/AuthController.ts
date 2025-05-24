/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */
import { Request, Response } from 'express';
import { z } from 'zod';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { AuthService } from '../services/AuthService';

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  profilePicture: z.string().optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os e-mails não coincidem",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         profilePicture:
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

  constructor() {
    const userRepository = new PrismaUserRepository();
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
   *               - name
   *               - email
   *               - confirmEmail
   *               - password
   *               - confirmPassword
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               confirmEmail:
   *                 type: string
   *               password:
   *                 type: string
   *               confirmPassword:
   *                 type: string
   *               profilePicture:
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
        name: data.name,
        email: data.email,
        password: data.password,
        profilePicture: data.profilePicture,
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
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
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
      const result = await this.authService.login(credentials);
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
  async verifyToken(req: Request, res: Response) {
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
  }
} 