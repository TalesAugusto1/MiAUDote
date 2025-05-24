import { Prisma } from '@prisma/client';

export type Adotante = Prisma.AdotanteGetPayload<{
  include: {
    user: true;
  };
}>;

export interface IAdotanteRepository {
  findAll(): Promise<Adotante[]>;
  findById(id: number): Promise<Adotante | null>;
  create(data: Prisma.AdotanteCreateInput): Promise<Adotante>;
  update(id: number, data: Prisma.AdotanteUpdateInput): Promise<Adotante>;
  delete(id: number): Promise<void>;
} 