import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// ===========================
// Module: 관련된 기능들을 그룹화한 단위
// ===========================
@Module({
  imports: [], // 다른 모듈이 필요하면 여기서 import
  providers: [UsersService], // 비즈니스 로직을 처리하는 Service 등록
  controllers: [UsersController], // 클라이언트 요청을 처리하는 Controller 등록
  exports: [], // 다른 모듈에서 사용할 수 있도록 export
})
export class UsersModule {}
