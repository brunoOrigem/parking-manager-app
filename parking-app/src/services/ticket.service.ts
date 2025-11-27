import { randomUUID } from 'crypto';

// --- Domain Model ---
// Esta classe encapsula as regras de negócio do Ticket
export class TicketService {
  
  /**
   * Caso de Uso: Emissão de Ticket de Entrada
   * @param placa A placa do veículo
   */
  async emitirTicket(placa: string) {
    // 1. Cria a entidade Ticket (Simulação)
    const novoTicket = {
      id: randomUUID(), // gera um id unico de cada um
      placa: placa,
      dataEntrada: new Date(), 
      dataSaida: null,
      pagamento: null,
    };

    console.log('Simulando salvamento no banco:', novoTicket);
    // ---------------------------------------------------------

    return novoTicket;
  }
}

// Exportamos uma instância única (Singleton) para ser usada na API
export const ticketService = new TicketService();