'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* HEADER CENTRALIZADO */}
      <header className="border-b border-sky-900/40 bg-gradient-to-r from-sky-900/90 via-slate-900/90 to-sky-950/90 backdrop-blur-md shadow-lg shadow-sky-900/40">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-3xl shadow-lg shadow-sky-500/60">
              🅿️
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 tracking-tight">
            Sistema de Estacionamento
          </h1>
          <p className="text-sm md:text-base text-slate-200/90 max-w-2xl mx-auto">
            Trabalho Final · Programação de Software Aplicado
          </p>
          <p className="text-xs md:text-sm text-slate-300/80">
            Escolha abaixo qual área deseja acessar para operar o estacionamento.
          </p>
        </div>
      </header>

      {/* CARDS DE NAVEGAÇÃO */}
      <section className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ENTRADA */}
            <Link
              href="/entrada"
              className="group relative flex flex-col items-center justify-center rounded-2xl bg-slate-900/90 border border-sky-700/40 py-10 px-6 text-center shadow-xl shadow-sky-900/40 hover:border-sky-400 hover:bg-slate-900/95 transition-colors cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/15 text-3xl text-sky-300 mb-4">
                🚗
              </span>
              <h2 className="relative text-lg font-semibold text-slate-50 tracking-wide mb-2">
                Entrada
              </h2>
              <p className="relative text-xs md:text-sm text-slate-300/90 max-w-xs">
                Emitir novo ticket de estacionamento no momento em que o veículo entra.
              </p>
            </Link>

            {/* CAIXA */}
            <Link
              href="/caixa"
              className="group relative flex flex-col items-center justify-center rounded-2xl bg-slate-900/90 border border-amber-500/40 py-10 px-6 text-center shadow-xl shadow-amber-900/40 hover:border-amber-300 hover:bg-slate-900/95 transition-colors cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/15 text-3xl text-amber-200 mb-4">
                💸
              </span>
              <h2 className="relative text-lg font-semibold text-slate-50 tracking-wide mb-2">
                Caixa
              </h2>
              <p className="relative text-xs md:text-sm text-slate-300/90 max-w-xs">
                Consultar tempo, calcular valor a pagar e registrar o pagamento do ticket.
              </p>
            </Link>

            {/* SAÍDA */}
            <Link
              href="/saida"
              className="group relative flex flex-col items-center justify-center rounded-2xl bg-slate-900/90 border border-rose-500/40 py-10 px-6 text-center shadow-xl shadow-rose-900/40 hover:border-rose-300 hover:bg-slate-900/95 transition-colors cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400/14 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-400/15 text-3xl text-rose-200 mb-4">
                🚧
              </span>
              <h2 className="relative text-lg font-semibold text-slate-50 tracking-wide mb-2">
                Saída
              </h2>
              <p className="relative text-xs md:text-sm text-slate-300/90 max-w-xs">
                Validar o ticket na cancela de saída e liberar a passagem do veículo.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}