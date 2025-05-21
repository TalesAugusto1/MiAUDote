import { Request, Response } from 'express';
import { AdocaoService } from '../services/AdocaoService';

export class AdocaoController {
  constructor(private adocaoService: AdocaoService) {}

  async create(req: Request, res: Response) {
    const adocao = await this.adocaoService.createAdocao(req.body);
    return res.status(201).json(adocao);
  }

  async getById(req: Request, res: Response) {
    const adocao = await this.adocaoService.getAdocaoById(Number(req.params.id));
    return res.json(adocao);
  }

  async getByAdotanteId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByAdotanteId(Number(req.query.adotanteId));
    return res.json(adocoes);
  }

  async getByOngId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByOngId(Number(req.query.ongId));
    return res.json(adocoes);
  }

  async getByAnimalId(req: Request, res: Response) {
    const adocoes = await this.adocaoService.getAdocoesByAnimalId(Number(req.query.animalId));
    return res.json(adocoes);
  }

  async update(req: Request, res: Response) {
    const adocao = await this.adocaoService.updateAdocao(Number(req.params.id), req.body);
    return res.json(adocao);
  }

  async delete(req: Request, res: Response) {
    await this.adocaoService.deleteAdocao(Number(req.params.id));
    return res.status(204).send();
  }
} 