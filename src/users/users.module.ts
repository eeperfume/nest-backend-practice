import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

// ===========================
// Module: 관련된 기능들을 그룹화한 단위
// ===========================
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]), // 스키마 연결
  ], // 다른 모듈이 필요하면 여기서 import
  providers: [UsersService], // 비즈니스 로직을 처리하는 Service 등록
  controllers: [UsersController], // 클라이언트 요청을 처리하는 Controller 등록
  exports: [UsersService], // 다른 모듈에서 사용할 수 있도록 export
})
export class UsersModule {}

/**
 * 1. forFeature() 메서드
 *   - Mongoose 모듈에 특정 스키마를 등록할 때 사용
 *   - 배열 형태로 하나 이상의 스키마 정의 객체를 전달할 수 있음.
 *
 * 2. 배열 내 객체 구조
 *   - { name, schema }는 기본 속성
 *   - name
 *     - Mongoose 모델의 이름
 *     - 일반적으로 해당 모델의 이름을 문자열로 지정함.
 *   - schema
 *     - Mongoose 스키마 객체
 *     - 해당 모델의 데이터 구조를 정의함.
 *
 * 3. 추가 속성
 *   - collection
 *     - 데이터를 저장할 컬렉션의 이름을 명시적으로 지정함.
 *     - 컬렉션 이름을 자동으로 생성하지 않고, 특정한 이름을 사용해야 할 때 유용
 *     - 예를 들어, 기존의 데이터베이스에서 이미 정해진 컬렉션 이름이 있는 경우라든지, 이름 충돌을 피해야 할 때 사용할 수 있음.
 *   - discriminators
 *     - 상속과 비슷한 개념
 *   - connectionName
 *     - 다중 데이터베이스 연결을 사용할 때 특정 스키마를 어느 데이터베이스 연결에 속하게 할지를 지정하는 속성
 */

/** discriminators 예제 */
// const VehicleSchema = new mongoose.Schema({ name: String }, { discriminatorKey: 'kind' });

// // 하위 스키마 정의
// const CarSchema = new mongoose.Schema({ wheels: Number });
// const BikeSchema = new mongoose.Schema({ helmet: Boolean });

// MongooseModule.forFeature([
//   {
//     name: 'Vehicle',
//     schema: VehicleSchema,
//     discriminators: [
//       { name: 'Car', schema: CarSchema },
//       { name: 'Bike', schema: BikeSchema }
//     ]
//   }
// ]);

/** connectionName 예제 */
// MongooseModule.forFeature(
//   [{ name: 'User', schema: UserSchema }],
//   'customConnectionName',
// );
// app.modules.ts에서 아래와 같이 특정 데이터베이스의 이름을 지정할 수 있음.
// MongooseModule.forRoot(process.env.DATABASE_URL, {connectionName: 'customConnectionName'})
