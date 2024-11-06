import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

// ===========================
// Controller: HTTP 요청을 처리하는 역할
// ===========================
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // 생성자에서 의존성 주입 (NestJS가 자동으로 인스턴스를 생성하고 주입)

  // '/users/:id' 경로로 들어오면 실행
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
