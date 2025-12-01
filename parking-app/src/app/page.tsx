'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050511] text-slate-300 font-sans">
      
      {/* HEADER */}
      <div className="py-12 text-center space-y-4">
        <div className="flex justify-center mb-4">
          <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded font-bold">P</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Sistema de Estacionamento
        </h1>
        <p className="text-sm text-slate-400">
          Trabalho Final · Programação de Software Aplicado
        </p>
        <p className="text-sm text-slate-400">
          Escolha abaixo qual área deseja acessar para operar o estacionamento.
        </p>
      </div>

      {/* LISTA DE OPÇÕES */}
      <div className="w-full max-w-4xl mx-auto flex flex-col">
        
        {/* OPÇÃO 1: ENTRADA */}
        <div className="border-t border-indigo-900/50 py-12 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors">
          <span className="text-3xl">🚗</span>
          <Link href="/entrada" className="text-3xl font-bold text-indigo-500 hover:text-indigo-400 underline decoration-2 underline-offset-8 transition-all">
            Entrada
          </Link>
          <p className="text-indigo-200/60 max-w-md">
            Emitir novo ticket de estacionamento no momento em que o veículo entra.
          </p>
        </div>

        {/* OPÇÃO 2: CAIXA */}
        <div className="border-t border-indigo-900/50 py-12 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors">
          <span className="text-3xl">💸</span>
          <Link href="/caixa" className="text-3xl font-bold text-indigo-500 hover:text-indigo-400 underline decoration-2 underline-offset-8 transition-all">
            Caixa
          </Link>
          <p className="text-indigo-200/60 max-w-md">
            Consultar tempo, calcular valor a pagar e registrar o pagamento do ticket.
          </p>
        </div>

        {/* OPÇÃO 3: SAÍDA */}
        <div className="border-t border-indigo-900/50 py-12 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors">
          <span className="text-3xl">🚧</span>
          <Link href="/saida" className="text-3xl font-bold text-indigo-500 hover:text-indigo-400 underline decoration-2 underline-offset-8 transition-all">
            Saída
          </Link>
          <p className="text-indigo-200/60 max-w-md">
            Validar o ticket na cancela de saída e liberar a passagem do veículo.
          </p>
        </div>

        {/* OPÇÃO 4: RELATÓRIO (NOVO) */}
        <div className="border-t border-indigo-900/50 border-b py-12 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors">
          <span className="text-3xl">📊</span>
          <Link href="/relatorio" className="text-3xl font-bold text-indigo-500 hover:text-indigo-400 underline decoration-2 underline-offset-8 transition-all">
            Relatório Gerencial
          </Link>
          <p className="text-indigo-200/60 max-w-md">
            Visualizar faturamento total, quantidade de tickets e histórico recente.
          </p>
        </div>

      </div>
      
      <footer className="py-8 text-center text-slate-600 text-xs">
        Sistema de Estacionamento v1.0
      </footer>
    </main>
  );
}