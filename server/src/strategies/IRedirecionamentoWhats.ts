import { Ong } from '@prisma/client';

export interface IRedirecionamentoWhats {
  redirecionar(ong: Ong): void;
} 