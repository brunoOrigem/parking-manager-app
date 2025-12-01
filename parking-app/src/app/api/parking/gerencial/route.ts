import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

export async function GET(request: Request) {
  try {
    //pega os parametros da url
    const { searchParams } = new URL(request.url);
    
    const mes = searchParams.get('mes'); // string ou null
    const dia = searchParams.get('dia'); // string ou null

    // coverte p numero se necessario
    const filtroMes = mes ? parseInt(mes) : undefined;
    const filtroDia = dia ? parseInt(dia) : undefined;

    //chama o servico p buscar no banco
    const relatorio = await ticketService.obterRelatorio(filtroMes, filtroDia);
    
    return NextResponse.json(relatorio);

  } catch (error) {
    return NextResponse.json(
        { error: 'Erro ao gerar relatório.' }, 
        { status: 500 }
    );
  }
}