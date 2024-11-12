import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // 사용자 정보 검증
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      console.log('User not found');
      return null;
    }

    const pepper = this.configService.get<string>('PEPPER');
    const pepperedPassword = password + pepper;

    // Mongoose 문서 객체를 일반 객체로 변환
    const userObj = user.toObject();

    const isPasswordValid = await bcrypt.compare(
      pepperedPassword,
      userObj.password,
    );

    if (isPasswordValid) {
      // 성공 시, 비밀번호를 제외한 사용자 정보 반환
      const { password, ...result } = user.toObject();
      return result;
    }

    console.log('Invalid password');
    return null;
  }

  // JWT 토큰 생성
  async generateJwtToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
