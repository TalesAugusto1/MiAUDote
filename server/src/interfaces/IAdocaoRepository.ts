import { Prisma } from '@prisma/client';

type Adocao = Prisma.AdocaoGetPayload<{}>;

export interface IAdocaoRepository {
  create(data: Omit<Adocao, 'id'>): Promise<Adocao>;
  findById(id: number): Promise<Adocao | null>;
  findByAdotante(adotanteId: number): Promise<Adocao[]>;
  findByOng(ongId: number): Promise<Adocao[]>;
  findByAnimal(animalId: number): Promise<Adocao[]>;
  update(id: number, data: Partial<Adocao>): Promise<Adocao>;
  delete(id: number): Promise<void>;
  findAll(): Promise<any[]>;
} 