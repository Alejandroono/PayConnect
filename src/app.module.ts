import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PuntoredModule } from './puntored/puntored.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
       useFactory: () => ({
      uri: process.env.MONGO_URI,
    }),
}),
    HttpModule,
    PuntoredModule,
    TransactionModule,
  ],
})
export class AppModule {}
