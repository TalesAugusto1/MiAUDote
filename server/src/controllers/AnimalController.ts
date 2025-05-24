/**
 * @swagger
 * tags:
 *   name: Animal
 *   description: Gerenciamento de animais
 */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { AnimalService } from '../services/AnimalService';

console.log('Inicializando PrismaClient para Animal...');
const prisma = new PrismaClient();
console.log('PrismaClient inicializado com sucesso para Animal');

export class AnimalController {
  constructor(private animalService: AnimalService) {}

  /**
   * @swagger
   * /animal:
   *   get:
   *     summary: Lista todos os animais
   *     tags: [Animal]
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
  async findAll(req: Request, res: Response) {
    try {
      const animais = await this.animalService.findAll();
      return res.json(animais);
    } catch (error) {
      console.error('Erro ao listar animais:', error);
      return res.status(500).json({ 
        error: 'Erro ao listar animais',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /animal/{id}:
   *   get:
   *     summary: Busca um animal por ID
   *     tags: [Animal]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do animal
   *     responses:
   *       200:
   *         description: Dados do animal
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('Tentando buscar animal com ID:', id);
      const animal = await prisma.animal.findUnique({
        where: { id: Number(id) }
      });
      
      if (!animal) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }
      
      console.log('Animal encontrado:', animal);
      return res.json(animal);
    } catch (error) {
      console.error('Erro detalhado ao buscar animal:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao buscar animal',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /animal/test:
   *   post:
   *     summary: Cria um animal de teste
   *     tags: [Animal]
   *     responses:
   *       200:
   *         description: Animal criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Animal'
   */
  async createTest(req: Request, res: Response) {
    try {
      console.log('Tentando criar animal de teste...');
      const animal = await prisma.animal.create({
        data: {
          nome: 'Animal Teste',
          tipo: 'Cachorro',
          sexo: 'Macho',
          idade: 2,
          porte: 'Médio',
          raca: 'Vira-lata',
          idOng: 1
        }
      });
      console.log('Animal criado com sucesso:', animal);
      return res.json(animal);
    } catch (error) {
      console.error('Erro detalhado ao criar animal de teste:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      return res.status(500).json({ 
        error: 'Erro ao criar animal de teste',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * @swagger
   * /animal:
   *   post:
   *     summary: Cria um novo animal
   *     tags: [Animal]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - tipo
   *               - sexo
   *               - idade
   *               - porte
   *               - raca
   *               - idOng
   *             properties:
   *               nome:
   *                 type: string
   *               tipo:
   *                 type: string
   *               sexo:
   *                 type: string
   *               idade:
   *                 type: integer
   *               porte:
   *                 type: string
   *               raca:
   *                 type: string
   *               idOng:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Animal criado com sucesso
   */
  async create(req: Request, res: Response) {
    try {
      const { nome, tipo, sexo, idade, porte, raca, idOng } = req.body;

      if (!nome || !tipo || !sexo || !idade || !porte || !raca || !idOng) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const animal = await this.animalService.createAnimal({
        nome,
        tipo,
        sexo,
        idade: Number(idade),
        porte,
        raca,
        idOng: Number(idOng)
      });

      return res.status(201).json(animal);
    } catch (error) {
      console.error('Erro ao criar animal:', error);
      return res.status(500).json({ 
        error: 'Erro ao criar animal',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 