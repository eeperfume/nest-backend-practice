import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schemas/user.schema';

// ===========================
// Controller: HTTP 요청을 처리하는 역할
// ===========================
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // 생성자에서 의존성 주입 (NestJS가 자동으로 인스턴스를 생성하고 주입)

  // 사용자 생성 (POST /users)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // 모든 사용자 조회 (GET /users)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // 사용자 조회 (GET /users/:id)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  // 사용자 업데이트 (PUT /users/:id)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  // 사용자 삭제 (DELETE /users/:id)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
