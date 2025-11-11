import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto'; //gera um novo codigo de tucket

@Injectable()
export class ParkingService {
  async emitirTicket(placa: string) {
    // 1. Cria os dados do ticket
    const novoTicket = {
      id: randomUUID(), // Gera um código único para o ticket [cite: 9]
      placa: placa,
      dataEntrada: new Date(), //define a hora de entrada, 
      dataSaida: null,
      pagamento: null,
    };

    // retorna o ticket simulado
    console.log('Ticket simulado gerado:', novoTicket);
    return novoTicket;
  }
}