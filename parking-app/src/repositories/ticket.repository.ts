import { prisma } from '@/lib/prisma';

export class TicketRepository {
  
  // salva um novo ticket
  async create(placa: string) {
    return await prisma.ticket.create({
      data: {
        placa: placa.toUpperCase(),
        dataEntrada: new Date()
      }
    });
  }

  // busca o tikcet pelo id
  async findById(id: string) {
    return await prisma.ticket.findUnique({
      where: { id: id },
      include: { pagamento: true }
    });
  }

  // busca o ticket pela placa
  async findByPlacaOpen(placa: string) {
    return await prisma.ticket.findFirst({
      where: { 
        placa: placa.toUpperCase(),
        dataSaida: null 
      },
      include: { pagamento: true }
    });
  }

  // salva o pagamento e atualiza o ticket
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

  // registrando a saida
  async registrarSaida(id: string, isCortesia: boolean = false) {
    return await prisma.ticket.update({
      where: { id: id },
      data: { 
        dataSaida: new Date(),
        // caso seja cortesia, marca como pago e add valor 0 no relatorio
        ...(isCortesia && { pago: true, valorPago: 0.0 })
      }
    });
  }

  // Encontrar tickets pagos
  async findAllPagos() {
    return await prisma.ticket.findMany({
      where: { pago: true },
      include: { pagamento: true }
    });
  }
}

export const ticketRepository = new TicketRepository();