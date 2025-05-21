import { Adocao } from '@prisma/client';

export interface IAdocaoRepository {
  create(data: Omit<Adocao, 'id'>): Promise<Adocao>;
  findById(id: number): Promise<Adocao | null>;
  findByAdotanteId(adotanteId: number): Promise<Adocao[]>;
  findByOngId(ongId: number): Promise<Adocao[]>;
  findByAnimalId(animalId: number): Promise<Adocao[]>;
  update(id: number, data: Partial<Adocao>): Promise<Adocao>;
  delete(id: number): Promise<void>;
} 