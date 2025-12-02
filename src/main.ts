import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',              // permite acceso desde Flutter Web
    credentials: false,
  });

  await app.listen(3000);
}
bootstrap();
