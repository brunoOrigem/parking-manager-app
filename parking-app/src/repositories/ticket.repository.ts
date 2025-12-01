import { prisma } from '@/lib/prisma';

export class TicketRepository {
  
  // Salva um novo ticket
  async create(placa: string) {
    return await prisma.ticket.create({
      data: {
        placa: placa.toUpperCase(),
        dataEntrada: new Date()
      }
    });
  }

  // Busca por ID
  async findById(id: string) {
    return await prisma.ticket.findUnique({
      where: { id: id },
      include: { pagamento: true }
    });
  }

  // Busca por Placa (Apenas carros que ainda não saíram)
  async findByPlacaOpen(placa: string) {
    return await prisma.ticket.findFirst({
      where: { 
        placa: placa.toUpperCase(),
        dataSaida: null 
      },
      include: { pagamento: true }
    });
  }

  // Salva o pagamento e atualiza o ticket
  async registrarPagamento(ticketId: string, valor: number) {
    return await prisma.$transaction(async (tx) => {
      const novoPagamento = await tx.pagamento.create({
        data: {
          ticketId: ticketId,
          valorPago: valor,
          dataPagamento: new Date()
        }
      });

      await tx.ticket.update({
        where: { id: ticketId },
        data: { 
          pago: true, 
          valorPago: valor 
        }
      });

      return novoPagamento;
    });
  }

  // Finaliza (Registra saída)
  // CORREÇÃO: Agora aceita o parametro 'isCortesia' para marcar como pago R$ 0,00
  async registrarSaida(id: string, isCortesia: boolean = false) {
    return await prisma.ticket.update({
      where: { id: id },
      data: { 
        dataSaida: new Date(),
        // Se for cortesia, marca como pago e valor 0 para aparecer no relatório
        ...(isCortesia && { pago: true, valorPago: 0.0 })
      }
    });
  }

  // --- NECESSÁRIO PARA O RELATÓRIO ---
  async findAllPagos() {
    return await prisma.ticket.findMany({
      where: { pago: true },
      include: { pagamento: true }
    });
  }
}

export const ticketRepository = new TicketRepository();