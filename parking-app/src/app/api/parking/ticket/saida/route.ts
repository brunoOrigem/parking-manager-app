import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

//endpoit validador da saida
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId } = body;

    if (!ticketId) {
      return NextResponse.json(
        { error: 'O Código do Ticket (ticketId) é obrigatório.' },
        { status: 400 }
      );
    }

    //chama o service de validar saida
    const resultado = await ticketService.validarSaida(ticketId);

    //se liberado, retora o erro, exigindo o pagamento
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao validar saída.' },
      { status: 500 }
    );
  }
}