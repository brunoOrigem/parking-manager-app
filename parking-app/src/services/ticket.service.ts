import { ticketRepository } from '@/repositories/ticket.repository';

export class TicketService {
  
  //EMISSAO TICKET CARRO NOVO
  async emitirTicket(placa: string) {
    const regexPlaca = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i;
    if (!regexPlaca.test(placa)) throw new Error("Placa inválida!");

    const jaExiste = await ticketRepository.findByPlacaOpen(placa);
    if (jaExiste) throw new Error("Veículo já está no estacionamento!");

    const novoTicket = await ticketRepository.create(placa);
    return novoTicket;
  }

  // buscar o tikcer
  private async buscarTicket(termo: string) {
    let ticket = null;
    
    // id ou placa podem ser os parametros
    if (termo.length > 20) {
       ticket = await ticketRepository.findById(termo);
    } else {
       ticket = await ticketRepository.findByPlacaOpen(termo);
    }

    if (!ticket) throw new Error("Ticket não encontrado.");
    
    return ticket;
  }

  //VALIDAR SAIDA
  async validarSaida(termoBusca: string) {
    const ticket = await this.buscarTicket(termoBusca);

    if (ticket.dataSaida !== null) {
        return { liberado: false, mensagem: "Ticket já finalizado.", placa: ticket.placa };
    }

    const agora = new Date();
    const diferencaMs = agora.getTime() - new Date(ticket.dataEntrada).getTime();
    const minutosPermanencia = diferencaMs / (1000 * 60);

    // regra dos 15 min de cortesia
    if (minutosPermanencia <= 15) {
        await ticketRepository.registrarSaida(ticket.id, true);
        return {
            liberado: true,
            mensagem: `Saída Liberada. Tempo: ${Math.floor(minutosPermanencia)} min (Cortesia).`,
            placa: ticket.placa
        };
    }

    // verifica pagamento
    if (!ticket.pago && !ticket.pagamento) {
        return {
            liberado: false,
            mensagem: `Saída Bloqueada. Tempo: ${Math.floor(minutosPermanencia)} min. Pagamento necessário.`,
            placa: ticket.placa
        };
    }

    await ticketRepository.registrarSaida(ticket.id);
    return { liberado: true, mensagem: "Saída Liberada. Volte sempre!", placa: ticket.placa };
  }

  // CALUCLO VALOR PAGAMENTO
  async calcularValor(termoBusca: string) {
    const ticket = await this.buscarTicket(termoBusca);

    if (ticket.pago || ticket.pagamento) {
        throw new Error("Ticket já pago!");
    }

    const agora = new Date();
    const diferencaMs = agora.getTime() - new Date(ticket.dataEntrada).getTime();
    const minutosTotais = Math.floor(diferencaMs / (1000 * 60));
    const horasTotais = Math.ceil(minutosTotais / 60); 

    let valor = 0;
    if (minutosTotais <= 15) valor = 0.00;
    else if (minutosTotais <= 60) valor = 5.00;
    else valor = 5.00 + ((horasTotais - 1) * 4.50);

    return {
      ticketId: ticket.id,
      placa: ticket.placa,
      tempoPermanenciaMinutos: minutosTotais,
      tempoFormatado: `${Math.floor(minutosTotais / 60)}h ${minutosTotais % 60}m`,
      valorAPagar: valor
    };
  }

  //PAGAMENTO
  async realizarPagamento(termoBusca: string) {
    const ticket = await this.buscarTicket(termoBusca);
    
    //calcula o valor do estacionemtno
    const infoCalculo = await this.calcularValor(termoBusca);

    // salva o valor no banco
    const pagamento = await ticketRepository.registrarPagamento(ticket.id, infoCalculo.valorAPagar);

    return {
        sucesso: true,
        mensagem: "Pagamento confirmado.",
        comprovante: pagamento
    };
  }

  // RELATORIO
  async obterRelatorio(filtroMes?: number, filtroDia?: number) {
    const ticketsPagos = await ticketRepository.findAllPagos();

    let filtrados = ticketsPagos;
    if (filtroMes) {
        filtrados = filtrados.filter(t => {
            const dataRef = t.pagamento?.dataPagamento || t.dataSaida || t.dataEntrada;
            return new Date(dataRef).getMonth() === (filtroMes - 1);
        });
    }
    
    if (filtroDia) {
        filtrados = filtrados.filter(t => {
            const dataRef = t.pagamento?.dataPagamento || t.dataSaida || t.dataEntrada;
            return new Date(dataRef).getDate() === filtroDia;
        });
    }

    const valorTotal = filtrados.reduce((total, t) => total + (t.valorPago || 0), 0);

    return {
      filtroAplicado: { mes: filtroMes || 'Todos', dia: filtroDia || 'Todos' },
      totalRecebido: valorTotal,
      quantidadeTickets: filtrados.length,
      ultimasPlacas: filtrados.slice(-5).map(t => t.placa)
    };
  }
}

export const ticketService = new TicketService();