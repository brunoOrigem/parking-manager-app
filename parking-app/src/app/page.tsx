'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="text-3xl md:text-[2.4rem] font-semibold text-[#15407b] tracking-tight">
          Estacionamento CodePark
        </h1>

        <p className="mt-3 text-sm md:text-base text-[#555]">
          Seja Bem-Vindo!
        </p>

        <p className="mt-4 text-base md:text-lg text-[#555]">
          Escolha abaixo qual área deseja acessar para operar o estacionamento:
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-center gap-8 flex-wrap md:flex-nowrap">
          <Link href="/entrada">
            <div className="w-[230px] h-[230px] md:w-[260px] md:h-[240px] bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-150 hover:-translate-y-1">
              <div className="mb-4 text-[3.2rem] text-[#0060df]">
                🚗
              </div>
              <span className="text-sm md:text-base font-semibold tracking-wide text-[#0050b3] uppercase">
                Entrada
              </span>
            </div>
          </Link>

          <Link href="/caixa">
            <div className="w-[230px] h-[230px] md:w-[260px] md:h-[240px] bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-150 hover:-translate-y-1">
              <div className="mb-4 text-[3.2rem] text-[#0060df]">
                💸
              </div>
              <span className="text-sm md:text-base font-semibold tracking-wide text-[#0050b3] uppercase">
                Caixa
              </span>
            </div>
          </Link>

          <Link href="/saida">
            <div className="w-[230px] h-[230px] md:w-[260px] md:h-[240px] bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-150 hover:-translate-y-1">
              <div className="mb-4 text-[3.2rem] text-[#0060df]">
                🚧
              </div>
              <span className="text-sm md:text-base font-semibold tracking-wide text-[#0050b3] uppercase">
                Saída
              </span>
            </div>
          </Link>

          <Link href="/relatorio">
            <div className="w-[230px] h-[230px] md:w-[260px] md:h-[240px] bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-150 hover:-translate-y-1">
              <div className="mb-4 text-[3.2rem] text-[#0060df]">
                📊
              </div>
              <span className="text-sm md:text-base font-semibold tracking-wide text-[#0050b3] uppercase">
                Relatório
              </span>
            </div>
          </Link>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-xs">
        Sistema CodePark
      </footer>
    </main>
  );
}