import { Request, Response } from 'express';
import { AdotanteUserService } from '../services/AdotanteUserService';

export class AdotanteUserController {
  constructor(private adotanteUserService: AdotanteUserService) {}

  async create(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.createAdotanteUser(req.body);
    return res.status(201).json(adotante);
  }

  async getById(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.getAdotanteUserById(Number(req.params.id));
    return res.json(adotante);
  }

  async getByUserId(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.getAdotanteUserByUserId(Number(req.query.userId));
    return res.json(adotante);
  }

  async update(req: Request, res: Response) {
    const adotante = await this.adotanteUserService.updateAdotanteUser(Number(req.params.id), req.body);
    return res.json(adotante);
  }

  async delete(req: Request, res: Response) {
    await this.adotanteUserService.deleteAdotanteUser(Number(req.params.id));
    return res.status(204).send();
  }
} 