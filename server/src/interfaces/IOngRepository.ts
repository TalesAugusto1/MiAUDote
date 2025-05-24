import { Prisma } from '@prisma/client';

export type Ong = Prisma.OngGetPayload<{
  include: {
    user: true;
  };
}>;

export interface IOngRepository {
  findAll(): Promise<Ong[]>;
  findById(id: number): Promise<Ong | null>;
  findByEmail(email: string): Promise<Ong | null>;
  create(data: Prisma.OngCreateInput): Promise<Ong>;
  update(id: number, data: Prisma.OngUpdateInput): Promise<Ong>;
  delete(id: number): Promise<void>;
} 