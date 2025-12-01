'use client';

import { useState } from 'react';
import Link from 'next/link';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ocorreu um erro inesperado.';
}

export default function SaidaPage() {
  const [ticketIdSaida, setTicketIdSaida] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSaida() {
    try {
      if (!ticketIdSaida.trim()) throw new Error('Digite o ID ou a Placa.');
      setLoading(true);
      setResultado('Validando...');
      const res = await fetch('/api/parking/ticket/saida', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdSaida }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const icone = data.liberado ? '🟢' : '🔴';
      setResultado(`${icone} Saída (${data.placa}): ${data.mensagem}`);
    } catch (err: unknown) {
      setResultado(`❌ Erro: ${getErrorMessage(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-rose-500/50 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span className="text-2xl">🚧</span> Saída de Veículos
          </h1>
          <Link
            href="/"
            className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800/80"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <section className="flex-1">
        <div className="max-w-xl mx-auto px-4 py-10 space-y-8">
          <div className="rounded-2xl border border-rose-400/40 bg-slate-900/90 p-6 shadow-lg shadow-rose-500/30">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Validar Saída</h2>

            <label className="block text-xs font-medium uppercase tracking-wide text-slate-300/80 mb-2">
              ID do Ticket ou Placa
            </label>
            <input
              type="text"
              placeholder="Cole o ID ou digite a placa"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400"
              value={ticketIdSaida}
              onChange={(e) => setTicketIdSaida(e.target.value)}
            />

            <button
              onClick={handleSaida}
              disabled={loading}
              className="btn mt-4 w-full rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-70 shadow-md shadow-rose-500/40"
            >
              {loading ? 'Validando...' : 'Validar Saída'}
            </button>
          </div>

          {resultado && (
            <div className="rounded-2xl border border-slate-700 bg-slate-950/90 p-4 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Resposta do Sistema
                </span>
                <button
                  onClick={() => setResultado(null)}
                  className="text-[11px] text-slate-400 hover:text-slate-100"
                >
                  Limpar
                </button>
              </div>
              <div className="rounded-xl bg-slate-900 px-3 py-2 font-mono text-sm text-emerald-300 whitespace-pre-line">
                {resultado}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}