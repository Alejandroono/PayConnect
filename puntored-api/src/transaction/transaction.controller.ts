import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PuntoredService } from '../puntored/puntored.service';
import { Transaction } from './transaction.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly puntoredService: PuntoredService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  async buy(@Body() body: any, @Req() req: any): Promise<any> {
    const result = await this.puntoredService.buy(
      body.cellPhone,
      body.value,
      body.supplierId,
    );

    const transaction = await this.transactionService.create({
      userId: req.user.userId,
      cellPhone: result.cellPhone,
      value: result.value,
      supplierId: result.supplierId,
      status: result.status,
      transactionId: result.transactionId,
      supplierName: result.supplierName,
    });

    return {
      message: 'Compra realizada exitosamente',
      savedTransaction: transaction,
      puntoredResponse: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTransactions(@Req() req: any): Promise<Transaction[]> {
    return this.transactionService.findByUser(req.user.userId);
  }
}
