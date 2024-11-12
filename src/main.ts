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

  // CORS 활성화
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드의 도메인
    credentials: true,
    /**
     * credentials
     *   - CORS 요청에서 쿠키, 인증 헤더, TLS 클라이언트 인증서 등의 자격 증명을 포함할지 여부를 설정하는 옵션
     *   - credentials: true로 설정하면, 브라우저가 CORS 요청 시 쿠키나 인증 헤더를 포함하게 됨.
     *   - JWT 토큰이 쿠키에 저장되어 있는 경우 credentials: true가 설정되어 있어야 브라우저가 이 쿠키를 요청에 포함시킬 수 있음.
     *   - 쿠키 기반 인증을 사용하는 경우: 서버와 클라이언트 간의 세션을 유지하기 위해 쿠키를 사용하는 경우, credentials: true 설정이 필요함.
     *
     *   주의 사항
     *     - credentials: true를 사용할 때는 origin을 '*'로 설정할 수 없음.
     *     - 반드시 특정 도메인만 허용해야 함.
     */
  });

  // 환경 변수로 포트 번호 설정, 기본값 5001
  const port = configService.get<number>('PORT') || 5001;

  // 서버 시작
  await app.listen(port);
}
bootstrap();
