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
      const users = await this.userService.findAll();
      return res.json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ 
        error: 'Erro ao listar usuários',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user/email/{email}:
   *   get:
   *     summary: Busca um usuário pelo email com dados da ONG se existir
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: email
   *         schema:
   *           type: string
   *         required: true
   *         description: Email do usuário
   *     responses:
   *       200:
   *         description: Dados do usuário com ONG se existir
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 ong:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     cnpj:
   *                       type: string
   *                     endereco:
   *                       type: string
   *                     telefone:
   *                       type: string
   *       404:
   *         description: Usuário não encontrado
   */
  async findByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      console.log('Buscando usuário por email:', email);
      
      const userWithDetails = await this.userService.getUserByEmailWithDetails(email);
      
      if (!userWithDetails) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(userWithDetails);
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar usuário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   */
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
      }

      const user = await this.userService.createUser({ nome, email, senha });
      return res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ 
        error: 'Erro ao criar usuário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user/adotante:
   *   post:
   *     summary: Cria um novo usuário e um adotante
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *               - cpf
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               cpf:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário e adotante criados com sucesso
   */
  async createWithAdotante(req: Request, res: Response) {
    try {
      console.log('Body recebido:', req.body);
      console.log('Headers recebidos:', req.headers);
      
      const { nome, email, senha, cpf } = req.body;

      console.log('Dados extraídos:', { nome, email, senha, cpf });

      if (!nome || !email || !senha || !cpf) {
        console.log('Campos faltando:', {
          nome: !nome,
          email: !email,
          senha: !senha,
          cpf: !cpf
        });
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const result = await this.userService.createUserWithAdotante({
        nome,
        email,
        senha,
        cpf
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro ao criar usuário e adotante:', error);
      
      if (error instanceof Error && error.message.includes('Unique constraint failed on the constraint: `User_email_key`')) {
        return res.status(400).json({ 
          error: 'Email já cadastrado',
          details: 'Este email já está sendo usado por outro usuário'
        });
      }

      return res.status(500).json({ 
        error: 'Erro ao criar usuário e adotante',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user/ong:
   *   post:
   *     summary: Cria um novo usuário e uma ONG
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *               - cnpj
   *               - endereco
   *               - telefone
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               cnpj:
   *                 type: string
   *               endereco:
   *                 type: string
   *               telefone:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário e ONG criados com sucesso
   */
  async createWithOng(req: Request, res: Response) {
    try {
      console.log('Body recebido:', req.body);
      const { nome, email, senha, cnpj, endereco, telefone } = req.body;

      if (!nome || !email || !senha || !cnpj || !endereco || !telefone) {
        console.log('Campos faltando:', {
          nome: !nome,
          email: !email,
          senha: !senha,
          cnpj: !cnpj,
          endereco: !endereco,
          telefone: !telefone
        });
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const result = await this.userService.createUserWithOng({
        nome,
        email,
        senha,
        cnpj,
        endereco,
        telefone
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro ao criar usuário e ONG:', error);
      
      if (error instanceof Error && error.message.includes('Email já cadastrado')) {
        return res.status(409).json({ 
          error: 'Email já cadastrado',
          details: 'Este email já está sendo usado por outro usuário'
        });
      }

      return res.status(500).json({ 
        error: 'Erro ao criar usuário e ONG',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Busca um usuário pelo ID
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
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   */
  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar usuário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}
