'use client'; 

import { useState } from 'react';

export default function Home() {
  const [placa, setPlaca] = useState('');
  const [ticketIdCaixa, setTicketIdCaixa] = useState('');
  const [ticketIdSaida, setTicketIdSaida] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  // entrada
  async function handleEntrada() {
    try {
      // validaçao no front p nn chamar a api desnecessariamente
      if (!placa.trim()) throw new Error("Por favor, digite a placa do veículo.");

      setResultado('Processando...');
      const res = await fetch('/api/parking/ticket/entrada', {
        method: 'POST',
        body: JSON.stringify({ placa: placa }), 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(`🎟️ Ticket Gerado: \nID: ${data.id}\nPlaca: ${data.placa}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // consultar o preço do estacionamento
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
      setResultado(`💰 Consulta (${data.placa}):\nTempo: ${data.tempoFormatado}\nValor: R$ ${data.valorAPagar}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // Pagar o estacionamento
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

      setResultado(`✅ Pagamento:\n${data.mensagem}\nComprovante: ${valorFormatado}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // Validar a saida
  async function handleSaida() {
    try {
      if (!ticketIdSaida.trim()) throw new Error("Digite o ID ou a Placa.");

      setResultado('Validando...');
      const res = await fetch('/api/parking/ticket/saida', {
        method: 'POST',
        body: JSON.stringify({ ticketId: ticketIdSaida }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      const icone = data.liberado ? '🟢' : '🔴';
      setResultado(`${icone} Saída (${data.placa}): ${data.mensagem}`);
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  // relatorio gerencial (novo botaozao roxo)
  // aqui a gente bate no endpoint novo pra ver quanto ganhou de dinheiro
  async function handleRelatorio() {
    try {
      setResultado('Gerando relatório...');
      // nao to passando data pra pegar o geralzao que ta no banco
      const res = await fetch('/api/parking/gerencial');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setResultado(
        `📊 RELATÓRIO GERAL:\n` +
        `-------------------\n` +
        `💰 Faturamento Total: R$ ${data.totalRecebido.toFixed(2)}\n` +
        `🎫 Tickets Pagos: ${data.quantidadeTickets}\n` +
        `🚗 Últimas Placas: ${data.ultimasPlacas.join(', ') || 'Nenhuma'}`
      );
    } catch (err: any) {
      setResultado(`❌ Erro: ${err.message}`);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-800">
        🅿️ Sistema de Estacionamento
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* ENTRADA */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🚗 Entrada</h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">Placa do Veículo</label>
            <input
              type="text"
              placeholder="Ex: ABC-1234"
              className="w-full p-2 border rounded uppercase" // uppercase ajuda visualmente
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <button onClick={handleEntrada} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold transition-colors">
              Emitir Ticket
            </button>
          </div>
        </section>

        {/* CAIXA */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">💸 Caixa</h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">ID do Ticket ou Placa</label>
            <input
              type="text"
              placeholder="Cole o ID ou digite a Placa"
              className="w-full p-2 border rounded"
              value={ticketIdCaixa}
              onChange={(e) => setTicketIdCaixa(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleConsulta} className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 font-bold transition-colors">
                Consultar
              </button>
              <button onClick={handlePagamento} className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition-colors">
                Pagar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded border">
              💡 <strong>Dica:</strong> Use <code>ticket-vencido</code> para teste de R$ 14,00.
            </p>
          </div>
        </section>

        {/* SAÍDA */}
        <section className="bg-white p-6 rounded shadow-md border-t-4 border-red-500">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🚧 Saída</h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium">ID do Ticket ou Placa</label>
            <input
              type="text"
              placeholder="Cole o ID ou digite a Placa"
              className="w-full p-2 border rounded"
              value={ticketIdSaida}
              onChange={(e) => setTicketIdSaida(e.target.value)}
            />
            <button onClick={handleSaida} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 font-bold transition-colors">
              Validar Saída
            </button>
          </div>
        </section>
      </div>

      {/* --- BOTAO DE RELATORIO (NOVO) --- */}
      <div className="max-w-6xl mx-auto mt-8 text-center">
        <button
          onClick={handleRelatorio}
          className="bg-purple-600 text-white px-8 py-3 rounded shadow-lg hover:bg-purple-700 font-bold flex items-center gap-2 mx-auto transition-transform hover:scale-105"
        >
          📊 Gerar Relatório Gerencial
        </button>
      </div>

      {resultado && (
        <div className="mt-8 max-w-2xl mx-auto bg-gray-800 text-green-400 p-6 rounded shadow-lg font-mono whitespace-pre-line border border-gray-600">
          <div className="flex justify-between items-start">
            <strong>RESPOSTA DO SISTEMA:</strong>
            <button onClick={() => setResultado(null)} className="text-xs text-gray-400 hover:text-white">[Limpar]</button>
          </div>
          <hr className="border-gray-600 my-2"/>
          {resultado}
        </div>
      )}
    </main>
  );
}