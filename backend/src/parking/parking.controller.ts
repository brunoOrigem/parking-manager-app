import { Controller, Post, Body } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { EmitirTicketDto } from './dto/emitir-ticket.dto';

@Controller('parking')
export class ParkingController {
  // Injeção de Dependência
  constructor(private readonly parkingService: ParkingService) {}

  @Post('ticket/entrada')
  emitirTicket(@Body() emitirTicketDto: EmitirTicketDto) {
    //recebe o dto com a placa e realiza a logica 
    return this.parkingService.emitirTicket(emitirTicketDto.placa);
  }
}