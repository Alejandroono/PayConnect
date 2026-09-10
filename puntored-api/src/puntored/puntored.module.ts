import { Module } from '@nestjs/common';
import { PuntoredService } from './puntored.service';
import { PuntoredController } from './puntored.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PuntoredService],
  controllers: [PuntoredController],
  exports: [PuntoredService],
})
export class PuntoredModule {}
