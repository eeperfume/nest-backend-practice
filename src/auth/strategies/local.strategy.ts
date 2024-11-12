import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super(); // username, password
    /**
     * super():
     *   PassportStrategy의 생성자를 실행
     *   super()를 호출할 때 아무 인수도 전달하지 않으면 기본적으로 username과 password를 받는 local 전략으로 설정됨.
     *   예를 들어, JwtStrategy와 같이 다른 설정이 필요한 경우, super에 옵션 객체를 전달하여 이를 설정할 수 있음.
     */
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(); // 인증 실패 시 예외 처리
    }
    return user;
  }
}
