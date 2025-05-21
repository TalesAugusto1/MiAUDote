import { OngUser } from '@prisma/client';

export interface IRedirecionamentoWhats {
  redirecionar(ong: OngUser): void;
} 