import { NextResponse } from 'next/server';
//teste para verificar o app
export async function GET() {
  return NextResponse.json({ mensagem: 'API FUNCIONANDO!' });
}