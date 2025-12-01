import { NextResponse } from 'next/server';
import { ticketService } from '@/services/ticket.service';

export async function GET(request: Request) {
  try {
    // Pega os parâmetros da URL (ex: .../gerencial?mes=11&dia=25)
    const { searchParams } = new URL(request.url);
    
    const mes = searchParams.get('mes'); // string ou null
    const dia = searchParams.get('dia'); // string ou null

    // Converte para número se existir (para filtrar)
    const filtroMes = mes ? parseInt(mes) : undefined;
    const filtroDia = dia ? parseInt(dia) : undefined;

    // Chama o serviço que busca no banco
    const relatorio = await ticketService.obterRelatorio(filtroMes, filtroDia);
    
    return NextResponse.json(relatorio);

  } catch (error) {
    return NextResponse.json(
        { error: 'Erro ao gerar relatório.' }, 
        { status: 500 }
    );
  }
}