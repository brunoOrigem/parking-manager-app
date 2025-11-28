import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

// CONTROLLER MVC
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { placa } = body;

    // validação da placa, caso nenhuma placa seja mencionada
    if (!placa || typeof placa !== 'string') {
      return NextResponse.json(
        { error: 'A placa é obrigatória.' },
        { status: 400 }
      );
    }

    // chama o service pra emitir o ticket
    const ticket = await ticketService.emitirTicket(placa);

    //204 created -- placa cadastrada no estacionamento
    return NextResponse.json(ticket, { status: 201 });

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar ticket.' },
      { status: 500 }
    );
  }
}