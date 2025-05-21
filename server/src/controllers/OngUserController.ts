import { Request, Response } from 'express';
import { OngUserService } from '../services/OngUserService';

export class OngUserController {
  constructor(private ongUserService: OngUserService) {}

  async create(req: Request, res: Response) {
    const ong = await this.ongUserService.createOngUser(req.body);
    return res.status(201).json(ong);
  }

  async getById(req: Request, res: Response) {
    const ong = await this.ongUserService.getOngUserById(Number(req.params.id));
    return res.json(ong);
  }

  async getByUserId(req: Request, res: Response) {
    const ong = await this.ongUserService.getOngUserByUserId(Number(req.query.userId));
    return res.json(ong);
  }

  async update(req: Request, res: Response) {
    const ong = await this.ongUserService.updateOngUser(Number(req.params.id), req.body);
    return res.json(ong);
  }

  async delete(req: Request, res: Response) {
    await this.ongUserService.deleteOngUser(Number(req.params.id));
    return res.status(204).send();
  }
} 