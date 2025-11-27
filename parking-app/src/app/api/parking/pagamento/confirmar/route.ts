import { NextResponse } from 'next/server';
// O '@' deve funcionar já que consertamos o tsconfig.
// Se der erro, use: ../../../../../../services/ticket.service
import { ticketService } from '@/services/ticket.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId } = body;

    // Validação
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID é obrigatório para realizar o pagamento.' },
        { status: 400 }
      );
    }

    // Chama o Service para efetivar o pagamento
    const resultado = await ticketService.realizarPagamento(ticketId);

    // Retorna 200 OK com o comprovante
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento.' },
      { status: 500 }
    );
  }
}