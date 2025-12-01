'use client';

import { useState } from 'react';
import Link from 'next/link';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ocorreu um erro inesperado.';
}

export default function EntradaPage() {
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEntrada() {
    try {
      if (!placa.trim()) throw new Error('Por favor, digite a placa do veículo.');
      setLoading(true);
      setResultado('Processando...');
      const res = await fetch('/api/parking/ticket/entrada', {
        method: 'POST',
        body: JSON.stringify({ placa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(`🎟️ Ticket Gerado:\nID: ${data.id}\nPlaca: ${data.placa}`);
    } catch (err: unknown) {
      setResultado(`❌ Erro: ${getErrorMessage(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-sky-900/50 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span className="text-2xl">🚗</span> Entrada de Veículos
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
          <div className="rounded-2xl border border-emerald-400/40 bg-slate-900/90 p-6 shadow-lg shadow-emerald-500/30">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Emitir Ticket</h2>

            <label className="block text-xs font-medium uppercase tracking-wide text-slate-300/80 mb-2">
              Placa do Veículo
            </label>
            <input
              type="text"
              placeholder="EX: ABC-1234"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm uppercase text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />

            <button
              onClick={handleEntrada}
              disabled={loading}
              className="btn mt-4 w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 shadow-md shadow-emerald-500/40"
            >
              {loading ? 'Emitindo ticket...' : 'Emitir Ticket'}
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