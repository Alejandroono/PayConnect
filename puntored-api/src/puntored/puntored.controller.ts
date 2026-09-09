import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { PuntoredService } from './puntored.service';

@Controller('puntored')
export class PuntoredController {
  constructor(private readonly puntoredService: PuntoredService) {}

  @Get('suppliers')
  async getSuppliers() {
    return this.puntoredService.getSuppliers();
  }

  @Post('buy')
  async buy(@Body() body: { userId: string; cellPhone: string; value: number; supplierId: string }) {
    if (!/^[3]\d{9}$/.test(body.cellPhone)) {
      throw new BadRequestException('Número inválido: debe iniciar en 3 y tener 10 dígitos');
    }
    if (body.value < 1000 || body.value > 100000) {
      throw new BadRequestException('Valor fuera de rango (1000 - 100000)');
    }

    return this.puntoredService.buy(body.userId, body.cellPhone, body.value, body.supplierId);
  }
}
