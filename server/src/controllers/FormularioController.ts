import { Request, Response } from 'express';
import { FormularioService } from '../services/FormularioService';

export class FormularioController {
  constructor(private formularioService: FormularioService) {}

  async create(req: Request, res: Response) {
    const formulario = await this.formularioService.createFormulario(req.body);
    return res.status(201).json(formulario);
  }

  async getById(req: Request, res: Response) {
    const formulario = await this.formularioService.getFormularioById(Number(req.params.id));
    return res.json(formulario);
  }

  async getByAdotanteUserId(req: Request, res: Response) {
    const formulario = await this.formularioService.getFormularioByAdotanteUserId(Number(req.query.adotanteUserId));
    return res.json(formulario);
  }

  async update(req: Request, res: Response) {
    const formulario = await this.formularioService.updateFormulario(Number(req.params.id), req.body);
    return res.json(formulario);
  }

  async delete(req: Request, res: Response) {
    await this.formularioService.deleteFormulario(Number(req.params.id));
    return res.status(204).send();
  }
} 