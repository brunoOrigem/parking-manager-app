'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RelatorioPage() {
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroDia, setFiltroDia] = useState('');

  async function carregarRelatorio() {
    try {
      let url = '/api/parking/gerencial';
      
      const params = new URLSearchParams();
      if (filtroMes) params.append('mes', filtroMes);
      if (filtroDia) params.append('dia', filtroDia);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Erro desconhecido.' }));
        throw new Error(errorData.error || `Erro ${res.status}`);
      }

      const data = await res.json();
      setDados(data);
      setErro(null);
    } catch (err: any) {
      setErro(err.message);
      setDados(null);
    }
  }

  useEffect(() => {
    carregarRelatorio();
  }, []);

  return (
    // TEMA CLARO (Branco/Cinza) como no seu print
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans p-6 items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        
        <Link href="/" className="text-purple-600 hover:underline text-sm flex items-center gap-2 font-medium">
          <span>←</span> Voltar ao Menu
        </Link>
        
        <div className="bg-white border border-gray-200 p-8 rounded shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">Relatório Gerencial</h1>
          </div>

          {/* --- ÁREA DE FILTROS (Tema Claro) --- */}
          <div className="flex gap-4 mb-6 p-4 bg-gray-100 rounded border border-gray-300">
            <div className="flex-1">
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Mês (1-12)</label>
              <input 
                type="number" 
                min="1" max="12"
                placeholder="Todos"
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:border-purple-500 outline-none transition-all"
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Dia (1-31)</label>
              <input 
                type="number" 
                min="1" max="31"
                placeholder="Todos"
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:border-purple-500 outline-none transition-all"
                value={filtroDia}
                onChange={(e) => setFiltroDia(e.target.value)}
              />
            </div>
            <div className="flex items-end">
                <button 
                    onClick={carregarRelatorio}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-bold h-[42px] transition-colors"
                >
                    Filtrar
                </button>
            </div>
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded text-sm mb-4">
              {erro}
            </div>
          )}

          {dados ? (
            <div className="space-y-0 divide-y divide-gray-200 border border-gray-200 rounded">
              
              {/* Faturamento */}
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 font-medium uppercase text-sm">Faturamento Total</span>
                <span className="text-2xl font-bold text-green-600">R$ {dados.totalRecebido.toFixed(2)}</span>
              </div>
              
              {/* Quantidade */}
              <div className="p-4 bg-white flex justify-between items-center">
                <span className="text-gray-600 font-medium uppercase text-sm">Tickets Pagos</span>
                <span className="text-2xl font-bold text-gray-800">{dados.quantidadeTickets}</span>
              </div>

              {/* Lista */}
              <div className="p-4 bg-gray-50">
                <p className="text-gray-500 text-xs uppercase mb-2">Últimas Placas Pagas</p>
                <div className="flex flex-wrap gap-2">
                  {dados.ultimasPlacas && dados.ultimasPlacas.length > 0 ? (
                    dados.ultimasPlacas.map((p: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-700">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">Nenhuma placa encontrada.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Carregando...</div>
          )}
          
          <div className="mt-4 text-right">
             <button onClick={carregarRelatorio} className="text-sm text-purple-600 hover:underline">
                Atualizar Dados
             </button>
          </div>

        </div>
      </div>
    </main>
  );
}