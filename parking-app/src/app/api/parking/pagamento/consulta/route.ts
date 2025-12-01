import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId } = body;

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID obrigatório' }, { status: 400 });
    }

    const calculo = await ticketService.calcularValor(ticketId);

    return NextResponse.json(calculo, { status: 200 });

  } catch (error: any) {
    // CORREÇÃO: Retorna a mensagem específica do erro (ex: "Ticket não encontrado")
    // em vez de uma mensagem genérica.
    return NextResponse.json(
        { error: error.message || 'ERRO: ticket nao encontrado.' }, 
        { status: 500 }
    );
  }
}