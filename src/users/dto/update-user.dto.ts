import { IsNotEmpty } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

// ===========================
// TypeScript는 상속받은 클래스에서 속성 타입을 변경할 수 없고, 필수 속성을 옵셔널로 바꾸는 것은 타입 불일치를 초래하기 때문에 오류가 발생한다.
// ===========================
// export class UpdateUserDto extends BaseUserDto {
//   name?: string;
//   age?: number;
//   email?: string;
// }

// ===========================
// PartialType (모든 속성을 옵셔널로 만든다.)
// ===========================
// export class UpdateUserDto extends PartialType(BaseUserDto) {
//   /**
//    * UpdateUserDto {
//    *  name?: string;
//    *  age?: number;
//    *  email?: string;
//    * }
//    */
// }

// ===========================
// PickType (특정 속성만 선택하여 가져온다.)
// ===========================
// export class UpdateUserDto extends PickType(BaseUserDto, ['name', 'age']) {
//   /**
//    * UpdateUserDto {
//    *  name: string;
//    *  age: number;
//    * }
//    */
// }

// ===========================
// OmitType (특정 속성을 제외하고 나머지 속성만 가져온다.)
// ===========================
// export class UpdateUserDto extends OmitType(BaseUserDto, ['name', 'age']) {
//   /**
//    * UpdateUserDto {
//    *  email: string;
//    * }
//    */
// }

// ===========================
// 사용자 정보를 수정할 때, name 속성은 필수로 입력받고, 나머지 속성인 age와 email은 선택적으로 입력받는다면...
// ===========================
export class UpdateUserDto extends PartialType(
  PickType(BaseUserDto, ['age', 'email']),
) {
  /**
   * UpdateUserDto {
   *  age?: number;
   *  email?: string;
   * }
   */
  @IsNotEmpty()
  name: string;
  /**
   * UpdateUserDto는 age와 email을 선택적으로 입력받고, name은 필수로 입력받습니다.
   *
   * name은 필수 값으로 지정되어야 하므로, @IsNotEmpty() 데코레이터를 사용하여 유효성 검사를 추가합니다.
   *
   * PartialType과 PickType을 사용하여, age와 email 속성은 선택적으로 받을 수 있게 설정했습니다.
   * 그러나, name 속성은 반드시 입력받아야 하므로 @IsNotEmpty() 데코레이터를 통해 강제로 유효성 검사를 추가하였습니다.
   *
   * 이로 인해 name이 누락되면 유효성 검사에서 실패하고, 요청이 처리되지 않습니다.
   *
   * 사실 PartialType을 사용한 UpdateUserDto에서는 name 속성이 이미 필수로 정의되어 있으므로 @IsNotEmpty()가 필요하지 않지만,
   * PartialType으로 변환된 클래스에서는 유효성 검사 규칙이 상속되지 않거나 명시적으로 재정의되지 않는 경우가 발생할 수 있습니다.
   */
}
