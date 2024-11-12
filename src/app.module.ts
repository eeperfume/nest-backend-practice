import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 이 옵션을 설정하면 애플리케이션 전체에서 ConfigService를 사용할 수 있음.
    }), // 환경 변수 로드
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forRootAsync({
      /**
       * imports
       *   - 다른 모듈을 현재 모듈에 주입한다.
       *   - 여기서는 ConfigModule을 MongooseModule에 주입한다.
       *   - 즉, ConfigService를 useFactory에서 사용할 수 있도록 ConfigModule을 먼저 가져옴.
       */
      imports: [ConfigModule],
      /**
       * useFactory
       *   - 팩토리 함수를 제공함.
       */
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      /**
       * inject
       *   - 팩토리 함수에서 필요한 의존성을 주입하기 위해 사용함.
       *   - inject 속성을 사용해 팩토리 함수에 전달할 의존성을 명시적으로 지정할 수 있음.
       *   - useFactory 함수가 실행될 때 ConfigService를 주입하도록 NestJS에 알려줌.
       *   - ConfigService는 DATABASE_URL 같은 환경 변수에 접근하는 역할을 하기 위해 주입함.
       */
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ], // AppModule이 ConfigModule, MongooseModule, UsersModule을 가져와서 사용하도록 설정
  controllers: [],
  providers: [],
  // 기능별 모듈 파일(기능.module.ts)에서 controllers, providers 속성에 Service, Controller 등록했기 때문에 app.module.ts 파일에서는 별도의 설정을 하지 않음.
})
export class AppModule {}

/**
 * 1. forRoot()
 *   - 정적 설정으로, process.env를 직접 사용하며, 설정 값이 수정되면 서버 재시작이 필요함.
 *
 * 2. forRootAsync({})
 *   - 동적 설정으로, ConfigService 등을 통해 설정 값을 동적으로 가져올 수 있음.
 *
 *   - # 한 번 로드 후 값 유지
 *     forRootAsync의 useFactory 함수는 애플리케이션이 시작될 때만 실행되고, 그 이후에는 같은 값을 계속 사용함.
 *
 *   - # 캐시처럼 동작
 *     이 방식으로 설정된 값은 서버가 재시작되기 전까지는 변경되지 않는 고정된 값처럼 동작함.
 *
 *   - 하지만 동적 로드 방식을 구현하면 실시간으로 설정 값을 불러올 수 있도록 설정할 수가 있음.
 *
 *     1. 주기적인 재로드
 *     setInterval(async () => {
 *       configService.get<string>('DATABASE_URL');
 *     }, 60000);
 *
 *     문제점
 *       - 모든 연결이 닫히기 때문에, 현재 진행 중인 쿼리나 트랜잭션이 실패할 수 있음.
 *       - 클라이언트 요청 처리 중 연결이 끊어지면 서비스 중단이 발생할 수 있음.
 *
 *     2. 핫 리로딩 (Hot Reloading)
 *     NestJS의 기본 기능이 아니기 때문에, 별도로 구현해야 하거나 Webpack Hot Module Replacement 같은 도구를 이용해야 함.
 *
 * 결론
 *   - forRootAsync()는 서버 재시작 없이도 설정 변경을 반영할 수 있는 여지를 제공하지만,
 *     forRoot()는 환경 변수 설정 값 변경 시 무조건 서버 재시작이 필요함.
 */
