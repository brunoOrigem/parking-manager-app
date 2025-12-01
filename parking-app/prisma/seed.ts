import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 A iniciar o seed do banco de dados...')

  // Limpa o banco para começar do zero
  await prisma.pagamento.deleteMany()
  await prisma.ticket.deleteMany()

  // ENÁRIO 1: ja pagou e ja saiu
  // Placa: ANT-1234 C
  await prisma.ticket.create({
    data: {
        placa: 'ANT1234', 
        dataEntrada: new Date(Date.now() - 1000 * 60 * 60 * 24), //placa que saiu ontem
        dataSaida: new Date(),
        pago: true,
        valorPago: 35.00,
        pagamento: {
            create: { valorPago: 35.00, dataPagamento: new Date() }
        }
    }
  })

  //CENÁRIO 2: entrou a 2 dias e nao saiu
  //placa JBG8765
  const doisDiasAtras = new Date()
  doisDiasAtras.setDate(doisDiasAtras.getDate() - 2)
  
  await prisma.ticket.create({
    data: {
        placa: 'JBG8765', 
        dataEntrada: doisDiasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 3: Entrou ha 8 horas e nao saiu ainda) 
  // placa: TRA8B00 
  const oitoHorasAtras = new Date()
  oitoHorasAtras.setHours(oitoHorasAtras.getHours() - 8)

  await prisma.ticket.create({
    data: {
        placa: 'TRA8B00',
        dataEntrada: oitoHorasAtras,
        pago: false
    }
  })

  // --- CENÁRIO 4: entrou a 2 horas e nao saiu
  // Placa: JJJ1111
  const duasHorasAtras = new Date()
  duasHorasAtras.setHours(duasHorasAtras.getHours() - 2)

  await prisma.ticket.create({
    data: {
        placa: 'JJJ1111',
        dataEntrada: duasHorasAtras,
        pago: false
    }
  })


  //CENARIO5: entrou a exatamente 1 hora atras
  //placa DEF2222
  const umaHoraAtras = new Date()
  umaHoraAtras.setHours(umaHoraAtras.getHours() - 1)

  await prisma.ticket.create({
    data: {
        placa: 'DEF2222',
        dataEntrada: umaHoraAtras,
        pago: false
    }
  })

  //CENARIO 6 entrou a 30 min atras
  //placa JAB1512
   const trintaMin = new Date()
  trintaMin.setMinutes(trintaMin.getMinutes() - 30) 

  await prisma.ticket.create({
    data: {
      placa: 'JAB1512',
      dataEntrada: trintaMin,
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