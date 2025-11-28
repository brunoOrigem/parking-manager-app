import { randomUUID } from 'crypto';

// Interface para tipar nosso objeto (Domain Model)
interface Ticket {
  id: string;
  placa: string;
  dataEntrada: Date;
  dataSaida: Date | null;
  pagamento: any | null;
}

export class TicketService {
  //Alterar aqui brunooo , aqui eu fiz esse teste so pra ele deixar o 
  // as plcas que eu criei... para fazer uns testes
  private tickets: Ticket[] = [];

  // Emtiindo o ticket
  async emitirTicket(placa: string) {
    //validacaço para criação de placas no padrao
    const regexPlaca = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i;
    
    if (!regexPlaca.test(placa)) {
      throw new Error("Placa inválida! Use o formato AAA-0000 ou Mercosul.");
    }

    //verificação de placas, para verificar se ha alguma igual dentro do estacionmento
    //caso tenha, nao deixa cadastrar.
    const jaExiste = this.tickets.find(t => t.placa.toUpperCase() === placa.toUpperCase() && t.dataSaida === null);
    if (jaExiste) {
        throw new Error("Veículo já está no estacionamento!");
    }

    const novoTicket: Ticket = {
      id: randomUUID(),
      placa: placa.toUpperCase(),
      dataEntrada: new Date(), // entrou agora
      dataSaida: null,
      pagamento: null,
    };

    // salvando o ticket gerado
    this.tickets.push(novoTicket);
    return novoTicket;
  }

  // metodo p auxiliar a busca... para n ser apenas pelo ticket
  // e tambem pela placa, um jeito mais facil
  private buscarTicket(termo: string): Ticket {
    // tentando encontrar id ou placa
    const ticket = this.tickets.find(t => 
        t.id === termo || 
        t.placa === termo.toUpperCase()
    );

    // caso digitarmos ticket-vencido, ele gera um ticket vencido para 
    //fazermos a validação em casos de pagamento ou saida bloqueada
    if (!ticket && termo === 'ticket-vencido') {
        return {
            id: 'ticket-vencido',
            placa: 'TESTE-CARO',
            dataEntrada: new Date(Date.now() - (1000 * 60 * 130)), // 2h 10m atras
            dataSaida: null,
            pagamento: null
        };
    }

    if (!ticket) {
        throw new Error("Ticket não encontrado.");
    }

    return ticket;
  }

  // --- 2. Validação (Saída) ---
  async validarSaida(termoBusca: string) {
    const ticket = this.buscarTicket(termoBusca);

    const agora = new Date();
    const diferencaMs = agora.getTime() - ticket.dataEntrada.getTime();
    const minutosPermanencia = diferencaMs / (1000 * 60);

    // regra dos 15 min de cortesia...
    if (minutosPermanencia <= 15) {
        // caso for cortesia, finaliza o ticket ali msm na hora
        ticket.dataSaida = new Date(); 
        return {
            liberado: true,
            mensagem: `Saída Liberada. Tempo: ${Math.floor(minutosPermanencia)} min (Cortesia).`,
            placa: ticket.placa
        };
    }

    // caso passou os 15 min, exige o pagamento do ticket
    if (ticket.pagamento === null) {
        return {
            liberado: false,
            mensagem: `Saída Bloqueada. Tempo: ${Math.floor(minutosPermanencia)} min. Pagamento necessário.`,
            placa: ticket.placa
        };
    }

    // caso está pago, libera a saida
    ticket.dataSaida = new Date();
    return { liberado: true, mensagem: "Saída Liberada. Volte sempre!", placa: ticket.placa };
  }

  // calculo do valor a se pagar no estacionamento 
  async calcularValor(termoBusca: string) {
    const ticket = this.buscarTicket(termoBusca);

    //caso o ticket ta pago, ele avisa...
    if (ticket.pagamento) {
        throw new Error("Este ticket já foi pago!");
    }

    const agora = new Date();
    const diferencaMs = agora.getTime() - ticket.dataEntrada.getTime();
    const minutosTotais = Math.floor(diferencaMs / (1000 * 60));
    const horasTotais = Math.ceil(minutosTotais / 60); 

    let valor = 0;

    // regras de negocio
    //para como realizar o calculo... bem legivel
    if (minutosTotais <= 15) {
      valor = 0.00;
    } else if (minutosTotais <= 60) {
      valor = 5.00;
    } else {
      valor = 5.00 + ((horasTotais - 1) * 4.50);
    }

    return {
      ticketId: ticket.id,
      placa: ticket.placa, //exibir a placa na tela.
      tempoPermanenciaMinutos: minutosTotais,
      tempoFormatado: `${Math.floor(minutosTotais / 60)}h ${minutosTotais % 60}m`,
      valorAPagar: valor
    };
  }

  // pagamento.
  async realizarPagamento(termoBusca: string) {
    const ticket = this.buscarTicket(termoBusca);
    const infoCalculo = await this.calcularValor(termoBusca);

    const pagamentoConfirmado = {
        id: randomUUID(),
        ticketId: ticket.id,
        valorPago: infoCalculo.valorAPagar,
        dataPagamento: new Date(),
    };

    // salvando o pagamento do objeto ticket na memoria
    ticket.pagamento = pagamentoConfirmado;

    return {
        sucesso: true,
        mensagem: "Pagamento confirmado. Ticket liberado para saída.",
        comprovante: pagamentoConfirmado
    };
  }
}

export const ticketService = new TicketService();