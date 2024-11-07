import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 중요! main.ts에서 유효성 검사 활성화
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
