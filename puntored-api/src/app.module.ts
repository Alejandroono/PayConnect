import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PuntoredModule } from './puntored/puntored.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        connectionFactory: (connection) => {
          return connection;
        },
      }),
    }),
    HttpModule,
    PuntoredModule,
    TransactionModule,
    AuthModule
  ],
})
export class AppModule {}
