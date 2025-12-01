import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 A iniciar o seed do banco de dados...')

  // Limpa o banco para começar do zero
  await prisma.pagamento.deleteMany()
  await prisma.ticket.deleteMany()

  // --- CENÁRIO 1: Histórico (Já pagou e saiu) ---
  // Placa: ANT-1234 (Padrão Antigo - Válido)
  await prisma.ticket.create({
    data: {
        placa: 'ANT1234', // Ou ANT-1234 se a regex aceitar hífen opcional
        dataEntrada: new Date(Date.now() - 1000 * 60 * 60 * 24), // Ontem
        dataSaida: new Date(),
        pago: true,
        valorPago: 35.00,
        pagamento: {
            create: { valorPago: 35.00, dataPagamento: new Date() }
        }
    }
  })

  // --- CENÁRIO 2: O "Milionário" (Entrou há 2 dias) ---
  // Placa: RIC0A99 (Padrão Mercosul - Válido)
  const doisDiasAtras = new Date()
  doisDiasAtras.setDate(doisDiasAtras.getDate() - 2)
  
  await prisma.ticket.create({
    data: {
        placa: 'RIC0A99', 
        dataEntrada: doisDiasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 3: O "Trabalhador" (Entrou há 8 horas) ---
  // Placa: TRA8B00 (Padrão Mercosul - Válido)
  const oitoHorasAtras = new Date()
  oitoHorasAtras.setHours(oitoHorasAtras.getHours() - 8)

  await prisma.ticket.create({
    data: {
        placa: 'TRA8B00',
        dataEntrada: oitoHorasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 4: O "Almoço" (Entrou há 2 horas) ---
  // Placa: FOM3C23 (Padrão Mercosul - Válido)
  const duasHorasAtras = new Date()
  duasHorasAtras.setHours(duasHorasAtras.getHours() - 2)

  await prisma.ticket.create({
    data: {
        placa: 'FOM3C23',
        dataEntrada: duasHorasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 5: A "Cortesia" (Entrou há 10 minutos) ---
  // Placa: RAP1D10 (Padrão Mercosul - Válido)
  const dezMinutosAtras = new Date()
  dezMinutosAtras.setMinutes(dezMinutosAtras.getMinutes() - 10)

  await prisma.ticket.create({
    data: {
        placa: 'RAP1D10',
        dataEntrada: dezMinutosAtras,
        pago: false
    }
  })

  console.log('🏁 Seed finalizado! Novos carros com placas válidas inseridos.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })