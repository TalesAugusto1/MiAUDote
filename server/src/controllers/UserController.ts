/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gerenciamento de usuários
 */
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               type:
   *                 type: string
   *               profilePicture:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   */
  async create(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    return res.status(201).json(user);
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Busca um usuário por ID
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Dados do usuário
   */
  async getById(req: Request, res: Response) {
    const user = await this.userService.getUserById(Number(req.params.id));
    return res.json(user);
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Busca um usuário pelo email
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: email
   *         schema:
   *           type: string
   *         required: true
   *         description: Email do usuário
   *     responses:
   *       200:
   *         description: Dados do usuário
   */
  async getByEmail(req: Request, res: Response) {
    const user = await this.userService.getUserByEmail(req.query.email as string);
    return res.json(user);
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza um usuário
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               type:
   *                 type: string
   *               profilePicture:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado
   */
  async update(req: Request, res: Response) {
    const user = await this.userService.updateUser(Number(req.params.id), req.body);
    return res.json(user);
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Remove um usuário
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       204:
   *         description: Usuário removido com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.userService.deleteUser(Number(req.params.id));
    return res.status(204).send();
  }
} 