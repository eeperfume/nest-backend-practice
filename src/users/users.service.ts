import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, UpdateUserDto } from './dto'; // index.ts 파일은 폴더의 대표 파일로 인식되기 때문에, import할 때 경로에서 index.ts를 생략할 수 있어서 편리함.

// ===========================
// Service: 비즈니스 로직을 처리하고 데이터를 다루는 역할
// ===========================
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Ahn', age: 31, email: 'Ahn@example.com' },
    { id: 2, name: 'Lee', age: 31, email: 'Lee@example.com' },
  ];

  create(createUserDto: CreateUserDto) {
    const newUsers = {
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
      ...createUserDto,
    };
    // const newUsers = {
    //   id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
    //   name: createUserDto.name,
    //   age: createUserDto.age,
    //   email: createUserDto.email,
    // };
    /**
     * 전개 연산자 (Spread Operator)와 속성 지정 방식의 장단점
     *
     * 1. 전개 연산자 (Spread Operator)
     *   - 장점
     *     - 코드가 간결하고 읽기 쉬움.
     *     - CreateUserDto에 새로운 속성이 추가될 때마다 코드를 수정할 필요가 없어 유지 보수가 용이함.
     *   - 단점
     *     - CreateUserDto에 의존하게 되어 의도치 않게 다른 속성이 포함될 수 있음. (하지만 DTO를 엄격히 관리하면 큰 문제는 아님.)
     *
     * 2. 속성 지정 방식
     *   - 장점
     *     - 각 속성을 명시적으로 지정하여 코드에서 사용되는 속성이 명확히 보임.
     *     - 객체의 구조를 보다 명확하게 정의할 수 있음.
     *   - 단점
     *     - CreateUserDto에 속성이 추가되거나 변경될 때마다 이 부분을 수정해야 함.
     *
     * 결론
     *   - 전개 연산자를 사용하는 것이 일반적으로 더 효율적이고 확장성이 뛰어난 방식임.
     */
    this.users.push(newUsers);
    return newUsers;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('test');
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    /**
     * 전개 연산자
     *   - 두 객체의 속성명이 서로 다른 경우
     *     - 병합됨
     *   - 동일한 속성명이 있을 경우
     *     - 뒤의 객체(obj2)가 앞의 객체(obj1)의 속성값을 덮어씀
     */
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null; // 사용자가 없으면 null 반환
      // return; // 사용자가 없으면 undefined 반환
    }
    const deletedUser = this.users.splice(userIndex, 1); // splice() 메서드는 배열에서 요소를 삭제하는 동시에 삭제된 요소를 반환
    console.log(deletedUser); // [{ id: 1, name: 'Ahn' }]
    console.log(deletedUser[0]); // { id: 1, name: 'Ahn' }
    console.log(this.users); // [{ id: 2, name: 'Lee' }]
    return deletedUser[0]; // 삭제된 사용자
  }
}
