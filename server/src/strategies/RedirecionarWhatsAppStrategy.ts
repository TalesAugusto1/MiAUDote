import { OngUser } from '@prisma/client';
import { IRedirecionamentoWhats } from './IRedirecionamentoWhats';

export class RedirecionarWhatsAppStrategy implements IRedirecionamentoWhats {
  redirecionar(ong: OngUser): void {
    // Lógica para redirecionar para o WhatsApp da ONG
    console.log(`Redirecionando para o WhatsApp: ${ong.whatsapp}`);
  }
} 