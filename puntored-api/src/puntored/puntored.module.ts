import { Module } from '@nestjs/common';
import { PuntoredService } from './puntored.service';
import { PuntoredController } from './puntored.controller';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [HttpModule, TransactionModule],
  providers: [PuntoredService],
  controllers: [PuntoredController]
})
export class PuntoredModule {}
