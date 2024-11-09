import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  // 로그인 (POST /auth/login)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
  }
}
