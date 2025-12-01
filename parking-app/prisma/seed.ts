import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 A iniciar o seed do banco de dados...')

  // Limpa o banco para começar do zero
  await prisma.pagamento.deleteMany()
  await prisma.ticket.deleteMany()

  // Datas auxiliares
  const agora = new Date()
  
  const ontem = new Date(agora)
  ontem.setDate(ontem.getDate() - 1) // Data de Ontem

  const doisDiasAtras = new Date(agora)
  doisDiasAtras.setDate(doisDiasAtras.getDate() - 2)

  // --- CENÁRIO 1: pagou ontem - historico
  await prisma.ticket.create({
    data: {
        placa: 'ANT1234',
        dataEntrada: ontem,
        dataSaida: ontem,
        pago: true,
        valorPago: 35.00,
        pagamento: {
            create: { 
                valorPago: 35.00, 
                dataPagamento: ontem 
            }
        }
    }
  })

  // --- CENÁRIO 1.5: pagou hoje - historico
  await prisma.ticket.create({
    data: {
        placa: 'H0J3123',
        dataEntrada: new Date(Date.now() - 1000 * 60 * 60), // Entrou 1 hora
        dataSaida: new Date(),
        pago: true,
        valorPago: 5.00,
        pagamento: {
            create: { 
                valorPago: 5.00, 
                dataPagamento: new Date() 
            }
        }
    }
  })

  // --- CENÁRIO 2: entrou a 2 dias e nao pagou
  await prisma.ticket.create({
    data: {
        placa: 'JBG8765', 
        dataEntrada: doisDiasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 3: entrou a 8 horas
  const oitoHorasAtras = new Date(agora)
  oitoHorasAtras.setHours(oitoHorasAtras.getHours() - 8)

  await prisma.ticket.create({
    data: {
        placa: 'TRA8B00',
        dataEntrada: oitoHorasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 4: entrou a 2 horas
  const duasHorasAtras = new Date(agora)
  duasHorasAtras.setHours(duasHorasAtras.getHours() - 2)

  await prisma.ticket.create({
    data: {
        placa: 'AAA8888',
        dataEntrada: duasHorasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 5: EXATAMENTE 1 HORA ATRÁS ---
  const umaHoraAtras = new Date(agora)
  umaHoraAtras.setHours(umaHoraAtras.getHours() - 1)

  await prisma.ticket.create({
    data: {
        placa: 'RAP1D10',
        dataEntrada: umaHoraAtras,
        pago: false
    }
  })

  // --- CENÁRIO 6: EXATAMENTE 30 MINUTOS ATRÁS ---
  const trintaMin = new Date(agora)
  trintaMin.setMinutes(trintaMin.getMinutes() - 30)

  await prisma.ticket.create({
    data: {
      placa: 'JAB1512',
      dataEntrada: trintaMin,
      pago: false
    }
  })

  console.log('🏁 Seed finalizado! Dados corrigidos para teste de datas.')
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