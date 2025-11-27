import { randomUUID } from 'crypto';

export class TicketService {
  
  // ... (Mantenha o método emitirTicket igualzinho estava) ...
  async emitirTicket(placa: string) {
    const novoTicket = {
      id: randomUUID(),
      placa: placa,
      dataEntrada: new Date(),
      dataSaida: null,
      pagamento: null,
    };
    return novoTicket;
  }

  // --- NOVO MÉTODO ---
  /**
   * Caso de Uso: Validação de Ticket na Saída [cite: 12]
   */
  async validarSaida(ticketId: string) {
    // 1. Busca o ticket no banco (SIMULAÇÃO)
    // Se o ID for "ticket-vencido", simulamos que entrou 2 horas atrás.
    // Caso contrário, simulamos que entrou agora.
    const dataSimulada = ticketId === 'ticket-vencido' 
      ? new Date(Date.now() - 1000 * 60 * 120) // 2 horas atrás
      : new Date(); // Agora

    const ticketEncontrado = {
      id: ticketId,
      placa: 'SIMULACAO',
      dataEntrada: dataSimulada,
      pagamento: null // Ainda não pago
    };

    // 2. Calcula o tempo de permanência (em milissegundos)
    const agora = new Date();
    const diferencaMs = agora.getTime() - ticketEncontrado.dataEntrada.getTime();
    const minutosPermanencia = diferencaMs / (1000 * 60);

    // 3. Regra de Negócio: 15 Minutos de Cortesia 
    if (minutosPermanencia <= 15) {
        return {
            liberado: true,
            mensagem: `Saída Liberada. Tempo: ${Math.floor(minutosPermanencia)} min (Cortesia).`
        };
    }

    // 4. Se passou de 15 min, verifica pagamento
    if (ticketEncontrado.pagamento === null) {
        return {
            liberado: false,
            mensagem: `Saída Bloqueada. Tempo: ${Math.floor(minutosPermanencia)} min. Pagamento necessário.`
        };
    }

    return { liberado: true, mensagem: "Saída Liberada. Volte sempre!" };
  }
}

export const ticketService = new TicketService();