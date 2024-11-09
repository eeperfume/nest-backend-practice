import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, UpdateUserDto } from './dto'; // index.ts 파일은 폴더의 대표 파일로 인식되기 때문에, import할 때 경로에서 index.ts를 생략할 수 있어서 편리함.
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

// ===========================
// Service: 비즈니스 로직을 처리하고 데이터를 다루는 역할
// ===========================
@Injectable()
export class UsersService {
  // @InjectModel() 데코레이터를 사용하여 User 모델을 주입
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  // private users = [
  //   { id: 1, name: 'Ahn', age: 31, email: 'Ahn@example.com' },
  //   { id: 2, name: 'Lee', age: 31, email: 'Lee@example.com' },
  // ];

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const newUsers = {
    //   id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
    //   ...createUserDto,
    // };
    // const newUsers = {
    //   id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
    //   name: createUserDto.name,
    //   age: createUserDto.age,
    //   email: createUserDto.email,
    // };
    // this.users.push(newUsers);
    // return newUsers;
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
    const pepper = this.configService.get<string>('PEPPER'); // 환경 변수에서 pepper 조회
    const saltedPassword = createUserDto.password + pepper; // pepper 추가
    const hashedPassword = await bcrypt.hash(saltedPassword, 10); // 패스워드 해싱

    // 입력받은 createUserDto 데이터에 해시된 패스워드 적용
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    // return this.users;
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    // return this.users.find((user) => user.id === id);
    const user = await this.userModel.findById(new Types.ObjectId(id)).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   return null;
    // }
    // const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    // /**
    //  * 전개 연산자
    //  *   - 두 객체의 속성명이 서로 다른 경우
    //  *     - 병합됨
    //  *   - 동일한 속성명이 있을 경우
    //  *     - 뒤의 객체(obj2)가 앞의 객체(obj1)의 속성값을 덮어씀
    //  */
    // this.users[userIndex] = updatedUser;
    // return updatedUser;
    const updatedUser = await this.userModel
      .findByIdAndUpdate(new Types.ObjectId(id), updateUserDto, {
        new: true, // 새로운 값으로 업데이트된 문서 반환
      })
      .exec();
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   return null; // 사용자가 없으면 null 반환
    //   // return; // 사용자가 없으면 undefined 반환
    // }
    // const deletedUser = this.users.splice(userIndex, 1); // splice() 메서드는 배열에서 요소를 삭제하는 동시에 삭제된 요소를 반환
    // console.log(deletedUser); // [{ id: 1, name: 'Ahn' }]
    // console.log(deletedUser[0]); // { id: 1, name: 'Ahn' }
    // console.log(this.users); // [{ id: 2, name: 'Lee' }]
    // return deletedUser[0]; // 삭제된 사용자
    const deletedUser = await this.userModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
    return deletedUser;
  }
}
