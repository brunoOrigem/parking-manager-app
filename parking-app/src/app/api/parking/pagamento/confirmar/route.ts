import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';


//caixa - pagamento da placa
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId } = body;

    // validação
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID é obrigatório para realizar o pagamento.' },
        { status: 400 }
      );
    }

    // chama o service pra fazer o pagamento
    const resultado = await ticketService.realizarPagamento(ticketId);

    // retorna 200 c o comprovante de pagamento
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento.' },
      { status: 500 }
    );
  }
}