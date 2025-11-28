'use client'; // Indica que esta é uma View interativa (Client-Side)

import { useState } from 'react';

export default function Home() {
  // --- ESTADOS (O que a tela precisa lembrar) ---
  const [placa, setPlaca] = useState('');
  const [ticketIdCaixa, setTicketIdCaixa] = useState('');
  const [ticketIdSaida, setTicketIdSaida] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  // --- CONTROLLERS DE TELA (Funções que chamam nossa API) ---

  // 1. Simular Entrada
  async function handleEntrada() {
    try {
      setResultado('Processando...');
      const res = await fetch('/api/parking/ticket/entrada', {
        method: 'POST',
        body: JSON.stringify({ placa: placa || 'ABC-1234' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(`🎟️ Ticket Gerado: \nID: ${data.id}\nPlaca: ${data.placa}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // 2. Consultar Preço (Caixa)
  async function handleConsulta() {
    try {
      setResultado('Consultando...');
      const res = await fetch('/api/parking/pagamento/consulta', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdCaixa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(`💰 Consulta:\nTempo: ${data.tempoFormatado}\nValor: R$ ${data.valorAPagar}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // 3. Pagar (Caixa)
  async function handlePagamento() {
    try {
      setResultado('Pagando...');
      const res = await fetch('/api/parking/pagamento/confirmar', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdCaixa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(`✅ Pagamento:\n${data.mensagem}\nComprovante: R$ ${data.comprovante?.valorPago}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // 4. Validar Saída
  async function handleSaida() {
    try {
      setResultado('Validando...');
      const res = await fetch('/api/parking/ticket/saida', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdSaida }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      // Exibe se liberou ou bloqueou
      const icone = data.liberado ? '🟢' : '🔴';
      setResultado(`${icone} Saída: ${data.mensagem}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // --- VIEW (O HTML que aparece na tela) ---
  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-800">
        🅿️ Sistema de Estacionamento
      </h1>

      {/* Grid com as 3 Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* COLUNA 1: CANCELA DE ENTRADA */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🚗 Entrada
          </h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">Placa do Veículo</label>
            <input
              type="text"
              placeholder="Ex: AAA-0000"
              className="w-full p-2 border rounded"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <button
              onClick={handleEntrada}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold transition-colors"
            >
              Emitir Ticket
            </button>
          </div>
        </section>

        {/* COLUNA 2: CAIXA / PAGAMENTO */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            💸 Caixa
          </h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">ID do Ticket</label>
            <input
              type="text"
              placeholder="Cole o ID aqui"
              className="w-full p-2 border rounded"
              value={ticketIdCaixa}
              onChange={(e) => setTicketIdCaixa(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleConsulta}
                className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 font-bold transition-colors"
              >
                Consultar
              </button>
              <button
                onClick={handlePagamento}
                className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition-colors"
              >
                Pagar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded border">
              💡 <strong>Dica de Teste:</strong><br/>
              Use o ID: <code>ticket-vencido</code> para simular valor alto.
            </p>
          </div>
        </section>

        {/* COLUNA 3: CANCELA DE SAÍDA */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-red-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🚧 Saída
          </h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">ID do Ticket</label>
            <input
              type="text"
              placeholder="Cole o ID aqui"
              className="w-full p-2 border rounded"
              value={ticketIdSaida}
              onChange={(e) => setTicketIdSaida(e.target.value)}
            />
            <button
              onClick={handleSaida}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 font-bold transition-colors"
            >
              Validar Saída
            </button>
          </div>
        </section>
      </div>

      {/* ÁREA DE RESULTADOS (O "Console" da tela) */}
      {resultado && (
        <div className="mt-8 max-w-2xl mx-auto bg-gray-800 text-green-400 p-6 rounded shadow-lg font-mono whitespace-pre-line border border-gray-600">
          <div className="flex justify-between items-start">
            <strong>RESPOSTA DO SISTEMA:</strong>
            <button 
              onClick={() => setResultado(null)}
              className="text-xs text-gray-400 hover:text-white"
            >
              [Limpar]
            </button>
          </div>
          <hr className="border-gray-600 my-2"/>
          {resultado}
        </div>
      )}
    </main>
  );
}