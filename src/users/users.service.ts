import { Injectable } from '@nestjs/common';

// ===========================
// Service: 비즈니스 로직을 처리하고 데이터를 다루는 역할
// ===========================
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Ahn' },
    { id: 2, name: 'Lee' },
  ];

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  findAll() {
    return '모든 사용자를 조회합니다.';
  }
}
