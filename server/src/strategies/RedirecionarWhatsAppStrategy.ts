// Estratégia de redirecionamento para WhatsApp
// Temporariamente desativada - não será utilizada no momento

// import { Ong } from '@prisma/client';
// import { IRedirecionamentoWhats } from './IRedirecionamentoWhats';

// export class RedirecionarWhatsAppStrategy implements IRedirecionamentoWhats {
//   redirecionar(ong: Ong): void {
//     // Implementação da estratégia de redirecionamento para WhatsApp
//     const mensagem = `Olá! Gostaria de saber mais sobre os animais disponíveis para adoção na ONG ${ong.user.nome}.`;
//     const numeroWhatsApp = '5511999999999'; // Número de exemplo
//     const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
//     window.open(url, '_blank');
//   }
// } 