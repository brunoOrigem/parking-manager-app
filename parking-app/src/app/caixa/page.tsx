'use client';

import { useState } from 'react';
import Link from 'next/link';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ocorreu um erro inesperado.';
}

export default function CaixaPage() {
  const [ticketIdCaixa, setTicketIdCaixa] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState<'consulta' | 'pagamento' | null>(null);

  //consulta o status da placa no estacionamento
  async function handleConsulta() {
    try {
      if (!ticketIdCaixa.trim()) throw new Error("Digite o ID ou a Placa.");
      
      setResultado('Consultando...');
      const res = await fetch('/api/parking/pagamento/consulta', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdCaixa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setResultado(`💰 Consulta (${data.placa}):\nID: ${data.ticketId}\nTempo: ${data.tempoFormatado}\nValor: R$ ${data.valorAPagar}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  async function handlePagamento() {
    try {
      if (!ticketIdCaixa.trim()) throw new Error("Digite o ID ou a Placa.");

      setResultado('Pagando...');
      const res = await fetch('/api/parking/pagamento/confirmar', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdCaixa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // formatando o valor pra ficar bonitinho no alerta
      const valorFormatado = data.comprovante?.valorPago 
        ? `R$ ${data.comprovante.valorPago.toFixed(2)}` 
        : 'R$ 0.00';
      const ticketIdComprovante = data.comprovante?.ticketId || 'N/A';

      setResultado(`✅ Pagamento efetuado:\n${data.mensagem}\nComprovante: ${valorFormatado}\nTicket ID: ${ticketIdComprovante}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-amber-500/50 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span className="text-2xl">💸</span> Caixa de Pagamento
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
          <div className="rounded-2xl border border-amber-400/40 bg-slate-900/90 p-6 shadow-lg shadow-amber-500/30">
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Consulta e Pagamento</h2>

            <label className="block text-xs font-medium uppercase tracking-wide text-slate-300/80 mb-2">
              ID do Ticket ou Placa
            </label>
            <input
              type="text"
              placeholder="Cole o ID do ticket ou digite a placa"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              value={ticketIdCaixa}
              onChange={(e) => setTicketIdCaixa(e.target.value)}
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleConsulta}
                disabled={loading === 'consulta'}
                className="btn flex-1 rounded-lg bg-amber-400 px-3 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70 shadow-md shadow-amber-400/40"
              >
                {loading === 'consulta' ? 'Consultando...' : 'Consultar'}
              </button>
              <button
                onClick={handlePagamento}
                disabled={loading === 'pagamento'}
                className="btn flex-1 rounded-lg bg-sky-500 px-3 py-2.5 text-sm font-semibold text-slate-50 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 shadow-md shadow-sky-500/40"
              >
                {loading === 'pagamento' ? 'Processando...' : 'Pagar'}
              </button>
            </div>
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