import { randomUUID } from 'crypto';

export class TicketService {
  
  // --- 1. Emissão de Ticket (Cancela de Entrada) ---
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

  // --- 2. Validação (Cancela de Saída) ---
  async validarSaida(ticketId: string) {
    // Simulação: Se for 'ticket-vencido', finge que entrou 2h atrás
    const dataSimulada = ticketId === 'ticket-vencido' 
      ? new Date(Date.now() - 1000 * 60 * 120) // 120 min atrás
      : new Date(); // Agora

    const ticketEncontrado = {
      id: ticketId,
      placa: 'SIMULACAO',
      dataEntrada: dataSimulada,
      pagamento: null
    };

    const agora = new Date();
    const diferencaMs = agora.getTime() - ticketEncontrado.dataEntrada.getTime();
    const minutosPermanencia = diferencaMs / (1000 * 60);

    // Regra: 15 Minutos de Cortesia [cite: 18]
    if (minutosPermanencia <= 15) {
        return {
            liberado: true,
            mensagem: `Saída Liberada. Tempo: ${Math.floor(minutosPermanencia)} min (Cortesia).`
        };
    }

    // Se passou de 15 min, exige pagamento
    if (ticketEncontrado.pagamento === null) {
        return {
            liberado: false,
            mensagem: `Saída Bloqueada. Tempo: ${Math.floor(minutosPermanencia)} min. Pagamento necessário.`
        };
    }

    return { liberado: true, mensagem: "Saída Liberada. Volte sempre!" };
  }

  // --- 3. Cálculo de Valor (Caixa de Pagamento - Consulta) ---
  async calcularValor(ticketId: string) {
    // SIMULAÇÃO DE DADOS PARA TESTE
    // Cenário 1: "ticket-vencido" -> Simula entrada há 2h e 10min (130 min)
    // Cenário 2: Qualquer outro ID -> Simula entrada "agora" (0 min)
    const dataSimulada = ticketId === 'ticket-vencido' 
      ? new Date(Date.now() - (1000 * 60 * 130)) 
      : new Date(); 

    const ticketEncontrado = {
      id: ticketId,
      placa: 'SIMULACAO',
      dataEntrada: dataSimulada,
      pagamento: null 
    };

    // Cálculos de tempo
    const agora = new Date();
    const diferencaMs = agora.getTime() - ticketEncontrado.dataEntrada.getTime();
    
    // Converte para minutos totais
    const minutosTotais = Math.floor(diferencaMs / (1000 * 60));
    
    // Converte para horas (Arredondando para cima para cobrar fração como hora cheia)
    // Ex: 61 minutos vira 2 horas
    const horasTotais = Math.ceil(minutosTotais / 60); 

    let valor = 0;

    // --- REGRAS DE NEGÓCIO [cite: 16-20] ---

    // Regra 1: Cortesia (Até 15 min)
    if (minutosTotais <= 15) {
      valor = 0.00;
    } 
    // Regra 2: Até 1 hora (Valor Fixo R$ 5,00)
    else if (minutosTotais <= 60) {
      valor = 5.00;
    } 
    // Regra 3: Acima de 1 hora (R$ 5,00 + R$ 4,50 por hora extra)
    else {
      // Valor da primeira hora fixa
      valor = 5.00;
      
      // Calcula quantas horas extras existem (Total - a primeira)
      const horasExtras = horasTotais - 1;
      
      // Soma o valor das horas extras
      valor += (horasExtras * 4.50);
    }

    return {
      ticketId: ticketId,
      tempoPermanenciaMinutos: minutosTotais,
      tempoFormatado: `${Math.floor(minutosTotais / 60)}h ${minutosTotais % 60}m`,
      valorAPagar: valor
    };
  }

  // --- 4. Confirmação de Pagamento (Caixa - Efetivação) ---
  async realizarPagamento(ticketId: string) {
    // 1. Primeiro, calculamos quanto deve ser pago (Reutilizando a regra acima)
    const infoCalculo = await this.calcularValor(ticketId);

    // 2. Criamos o objeto de pagamento (Simulação)
    const pagamentoConfirmado = {
        id: randomUUID(), // Gera ID do pagamento
        ticketId: ticketId,
        valorPago: infoCalculo.valorAPagar,
        dataPagamento: new Date(),
    };

    /* AQUI ENTRARIA O BANCO DE DADOS (REPOSITORY):
       await repository.pagamento.create({ data: pagamentoConfirmado });
       await repository.ticket.update({ where: { id: ticketId }, data: { dataSaida: new Date() } });
    */

    console.log(`Pagamento registrado: R$ ${pagamentoConfirmado.valorPago} para o ticket ${ticketId}`);

    return {
        sucesso: true,
        mensagem: "Pagamento confirmado. Ticket liberado para saída.",
        comprovante: pagamentoConfirmado
    };
  }
}

export const ticketService = new TicketService();