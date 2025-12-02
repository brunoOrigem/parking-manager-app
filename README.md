# CodePark - Sistema de Estacionamento

🅿️ Sistema de Estacionamento

Trabalho Final da disciplina de Programação de Software Aplicado (2025/2).

📋 Visão Geral

Este projeto é um sistema de informação Full Stack para o controle de um estacionamento comercial baseado em cancelas. O sistema gerencia o ciclo de vida completo da estadia de um veículo, desde a emissão do ticket na entrada até a validação na saída, passando pelo cálculo e pagamento no caixa.

O sistema foi desenvolvido sob uma arquitetura Web (Cliente-Servidor), respeitando rigorosamente a separação de responsabilidades em camadas e utilizando padrões de projeto orientados a objetos.
🚀 Funcionalidades Principais
🚗 Entrada: Emissão de tickets com ID único (UUID) e registro de data/hora.
💸 Caixa: Consulta de valores com regras de negócio (cortesia de 15min, valor fixo de 1h, horas extras) e efetivação do pagamento.
🚧 Saída: Validação automática na cancela (libera se pago ou cortesia, bloqueia se pendente).
📊 Gerencial: Relatório de faturamento total e volume de tickets pagos.

🛠️ Tecnologias Utilizadas
O projeto utiliza uma stack moderna e unificada em TypeScript:
Linguagem: TypeScript (Node.js v20)
Framework Fullstack: Next.js 14+ (App Router)
Frontend: React Server Components & Client Components + Tailwind CSS
Backend: API Routes (Serverless Functions)
Banco de Dados: SQLite (Relacional, via arquivo local dev.db)
ORM: Prisma (Object-Relational Mapping)
Ferramentas: Jest, ESLint, Postman.

🏗️ Arquitetura e Padrões de Projeto
O sistema adota uma Arquitetura Multicamada para garantir desacoplamento e manutenibilidade.
1. Camada de Apresentação (Frontend & Controller)
Padrão MVC (Model-View-Controller):
View (Frontend): Implementada em React (src/app/page.tsx). Responsável pela interface gráfica.
Controller (API): Implementado nas rotas do Next.js (src/app/api/.../route.ts). Responsável por receber requisições HTTP, validar dados e chamar o serviço.

2. Camada de Domínio (Domain Model)
Padrão Domain Model:
Localização: src/services/ticket.service.ts
Responsabilidade: Contém a "inteligência" do sistema (regras de negócio, cálculos de tarifas, validações).

3. Camada de Persistência (Repository)
Padrão Repository:
Localização: src/repositories/ticket.repository.ts
Responsabilidade: Abstrair o acesso aos dados. Utiliza o Prisma Client para comunicar com o SQLite.

🗄️ Modelo de Dados
A persistência é realizada num banco de dados relacional SQLite.

⚡ Como Executar o Projeto
Siga os passos abaixo para rodar o sistema na sua máquina local:
1. Instalar Dependências
npm install

2. Criar o Banco de Dados
npx prisma migrate dev --name init

3. Popular com Dados de Teste (Seed)
Este comando insere dados iniciais (tickets antigos, carros estacionados há horas) para facilitar os testes.
npx prisma db seed

4. Iniciar o Servidor
npm run dev

5. Acessar
Abra o seu navegador em:
http://localhost:3000

📡 Documentação da API (Endpoints)
POST
/api/parking/ticket/entrada
Emite novo ticket
{ "placa": "ABC-1234" }

POST
/api/parking/pagamento/consulta
Consulta valor a pagar
{ "ticketId": "UUID..." }

POST
/api/parking/pagamento/confirmar
Realiza pagamento
{ "ticketId": "UUID..." }

POST
/api/parking/ticket/saida
Valida saída na cancela
{ "ticketId": "UUID..." }

GET
/api/parking/gerencial
Relatório financeiro
N/A


📝 Autores
Desenvolvido por Bruno Origem, Davi iasculski e Otávio Quadros

#Imagem do diagrama de classes do Sistema
<img width="1843" height="838" alt="image" src="https://github.com/user-attachments/assets/20446b86-9217-4b04-a05e-fee8d414d7d6" />
