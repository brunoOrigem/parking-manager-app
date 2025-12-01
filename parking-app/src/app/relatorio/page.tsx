'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RelatorioPage() {
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarRelatorio() {
    try {
      const res = await fetch('/api/parking/gerencial');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDados(data);
    } catch (err: any) {
      setErro(err.message);
    }
  }

  // Carrega ao abrir a página
  useEffect(() => {
    carregarRelatorio();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans p-6 items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="text-purple-400 hover:underline text-sm">← Voltar ao Menu</Link>
        
        <div className="bg-slate-900/80 border border-purple-800/50 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-purple-100">Relatório</h1>
          </div>

          {erro && <p className="text-red-400">Erro: {erro}</p>}

          {dados ? (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-700 text-center">
                <p className="text-slate-400 text-sm uppercase">Faturamento Total</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">R$ {dados.totalRecebido.toFixed(2)}</p>
              </div>
              
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-700 text-center">
                <p className="text-slate-400 text-sm uppercase">Tickets Pagos</p>
                <p className="text-3xl font-bold text-purple-400 mt-1">{dados.quantidadeTickets}</p>
              </div>

              <div>
                <p className="text-slate-400 text-xs uppercase mb-2">Últimas Placas Pagas</p>
                <div className="flex flex-wrap gap-2">
                  {dados.ultimasPlacas.map((p: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs font-mono border border-slate-700">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <button onClick={carregarRelatorio} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all mt-4">
                Atualizar Dados
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-center animate-pulse">Carregando dados...</p>
          )}
        </div>
      </div>
    </main>
  );
}