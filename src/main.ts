import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 유효성 검사 활성화
  app.useGlobalPipes(new ValidationPipe());

  // ConfigService를 통해 환경 변수 설정
  const configService = app.get(ConfigService);

  // 환경 변수로 포트 번호 설정, 기본값 5001
  const port = configService.get<number>('PORT') || 5001;

  // 서버 시작
  await app.listen(port);
}
bootstrap();
