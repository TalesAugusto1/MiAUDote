/**
 * @swagger
 * tags:
 *   name: Formulario
 *   description: Gerenciamento de formulários de adoção
 */
import { Request, Response } from 'express';
import { FormularioService } from '../services/FormularioService';

export class FormularioController {
  constructor(private formularioService: FormularioService) {}

  /**
   * @swagger
   * /formularios:
   *   post:
   *     summary: Cria um novo formulário
   *     tags: [Formulario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               adotanteUserId:
   *                 type: integer
   *               mediaSalarial:
   *                 type: string
   *               temQuintal:
   *                 type: boolean
   *               possuiOutrosAnimais:
   *                 type: boolean
   *               animais:
   *                 type: string
   *               imovel:
   *                 type: string
   *     responses:
   *       201:
   *         description: Formulário criado com sucesso
   */
  async create(req: Request, res: Response) {
    const formulario = await this.formularioService.createFormulario(req.body);
    return res.status(201).json(formulario);
  }

  /**
   * @swagger
   * /formularios/{id}:
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
  async getById(req: Request, res: Response) {
    const formulario = await this.formularioService.getFormularioById(Number(req.params.id));
    return res.json(formulario);
  }

  /**
   * @swagger
   * /formularios:
   *   get:
   *     summary: Busca um formulário pelo adotanteUserId
   *     tags: [Formulario]
   *     parameters:
   *       - in: query
   *         name: adotanteUserId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do adotanteUser
   *     responses:
   *       200:
   *         description: Dados do formulário
   */
  async getByAdotanteUserId(req: Request, res: Response) {
    const formulario = await this.formularioService.getFormularioByAdotanteUserId(Number(req.query.adotanteUserId));
    return res.json(formulario);
  }

  /**
   * @swagger
   * /formularios/{id}:
   *   put:
   *     summary: Atualiza um formulário
   *     tags: [Formulario]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do formulário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               mediaSalarial:
   *                 type: string
   *               temQuintal:
   *                 type: boolean
   *               possuiOutrosAnimais:
   *                 type: boolean
   *               animais:
   *                 type: string
   *               imovel:
   *                 type: string
   *     responses:
   *       200:
   *         description: Formulário atualizado
   */
  async update(req: Request, res: Response) {
    const formulario = await this.formularioService.updateFormulario(Number(req.params.id), req.body);
    return res.json(formulario);
  }

  /**
   * @swagger
   * /formularios/{id}:
   *   delete:
   *     summary: Remove um formulário
   *     tags: [Formulario]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do formulário
   *     responses:
   *       204:
   *         description: Formulário removido com sucesso
   */
  async delete(req: Request, res: Response) {
    await this.formularioService.deleteFormulario(Number(req.params.id));
    return res.status(204).send();
  }
} 