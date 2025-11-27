import { NextResponse } from 'next/server';

// Atenção: O nome da função DEVE ser 'GET' (tudo maiúsculo)
export async function GET() {
  return NextResponse.json({ mensagem: 'API FUNCIONANDO!' });
}