import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

// Endpoint para validar saída [cite: 12]
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

    // Chama o serviço
    const resultado = await ticketService.validarSaida(ticketId);

    // Se liberado = false, retornamos 402 (Payment Required) ou 200 com status bloqueado
    // Vamos retornar 200 mas com o status no JSON para a cancela ler
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao validar saída.' },
      { status: 500 }
    );
  }
}