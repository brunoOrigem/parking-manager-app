import { NextResponse } from 'next/server';
// Agora o '@' funciona perfeitamente graças ao tsconfig!
import { ticketService } from '@/services/ticket.service';

// --- Controller (MVC) ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { placa } = body;

    // Validação
    if (!placa || typeof placa !== 'string') {
      return NextResponse.json(
        { error: 'A placa é obrigatória.' },
        { status: 400 }
      );
    }

    // Chama o Service
    const ticket = await ticketService.emitirTicket(placa);

    // Retorna 201 Created
    return NextResponse.json(ticket, { status: 201 });

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar ticket.' },
      { status: 500 }
    );
  }
}