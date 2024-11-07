import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 1. @Schema() 데코레이터로 MongoDB 스키마를 정의
@Schema({ versionKey: false }) // versionKey 옵션을 false로 설정하여 __v 제거
export class User extends Document {
  // 2. @Prop() 데코레이터로 각 속성 정의
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

// 3. 스키마 생성
export const UserSchema = SchemaFactory.createForClass(User);

/**
 * @Prop() 데코레이터에서 사용할 수 있는 주요 속성 정리
 *
 * 1. required
 *   - 필수 입력값 여부
 *   - 기본값: false
 *
 * 2. default
 *   - 해당 필드의 기본값 설정
 *
 * 3. unique
 *   - 필드 값이 고유해야 함을 지정
 *   - 이 옵션으로 인덱스를 생성하여 데이터베이스에서 값의 중복을 방지함.
 *
 * 4. index
 *   - 필드에 인덱스를 추가하여 쿼리 성능을 향상시킬 수 있음.
 *   - @Prop({ index: true })로 설정하면 인덱스를 추가함.
 *
 * 5. enum
 *   - 예시: @Prop({ enum: ['admin, 'user', 'guest'] })
 *   - 필드 값으로 허용할 수 있는 특정 값의 집합을 설정
 *
 * 6. min, max
 *   - 숫자 필드에 대해 최소값(min)과 최대값(max)을 지정
 *   - 예시: @Prop({ min: 18, max: 100 })
 *
 * 7. type
 *   - 예시
 *     @Prop({ type: [String] })
 *     tags: string[]
 *   - 필드의 데이터 타입을 명시적으로 지정
 *   - 주로 배열의 타입을 정의할 때 사용
 *
 * 8. ref
 *   - 예시
 *     @Prop({ ref: 'User' })
 *     createdBy: string; // 다른 'User' 문서를 참조
 *   - 다른 Mongoose 모델을 참조하는 필드
 *   - 주로 관계형 데이터를 정의할 때 사용
 *
 * 9. validate
 *   - 사용자 정의 유효성 검사를 정의함.
 *   - 예시
 *     @Prop({
 *       validate: {
 *         validator: (value) => value.length > 3,
 *         message: '사용자 이름은 3자 이상이어야 합니다.',
 *       },
 *     })
 *     username: string;
 *
 * 10. set, get
 *   - 예시
 *     @Prop({
 *       set: (val: string) => val.toUpperCase(),
 *       get: (val: string) => val.toLowerCase(),
 *     })
 *     name: string;
 *   - 필드 값이 설정될 때와 가져올 때 변환할 함수
 *   -  예를 들어, 암호화된 값이나 형식을 변환하는 데 유용함.
 */
