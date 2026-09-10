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
  async buy(@Body() body: { cellPhone: string; value: number; supplierId: string }) {
    if (!body.cellPhone || !body.value || !body.supplierId) {
      throw new BadRequestException('Faltan parámetros obligatorios');
    }
    return this.puntoredService.buy(body.cellPhone, body.value, body.supplierId);
  }
}
