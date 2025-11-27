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

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao calcular' }, { status: 500 });
  }
}