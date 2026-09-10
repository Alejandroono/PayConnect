import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('ALLOWED_ORIGIN');

  app.enableCors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  await app.listen(3000);
}
bootstrap();
