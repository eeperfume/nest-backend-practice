import { IsNotEmpty, IsOptional } from 'class-validator';

export class BaseUserDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  age?: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

/**
 * select-user.dto.ts와 delete-user.dto.ts가 없는 이유
 *
 * select-user.dto.ts
 *   - 조회는 보통 id로 이루어지며, @Param() 데코레이터로 id를 직접 받아옴.
 *   - 따라서, 일반적으로 DTO가 필요하지 않을 수 있음.
 *
 * delete-user.dto.ts
 *   - 삭제는 주로 id로 처리되며, @Param() 데코레이터로 id를 받아 처리함.
 *   - 이 경우에도 DTO 없이 간단히 구현할 수 있음.
 *
 * 결론
 *   - 조회나 삭제 같은 간단한 작업에는 DTO가 반드시 필요하지 않을 수 있음.
 *   - 하지만, 복잡한 필터링, 조건부 검색, 추가적인 데이터가 필요한 경우에는 DTO를 사용하여
 *     select-user.dto.ts나 delete-user.dto.ts를 정의할 수 있음.
 */

/**
 * NestJS에서 DTO(Data Transfer Object)에서 유효성 검사를 수행하는 방법
 *
 * 1. class-validator 설치
 *   - npm install class-validator
 *
 * 2. class-transformer 설치
 *   - npm install class-transformer
 *   - 데이터를 클래스 형태로 변환해 주는 역할
 *   - NestJS에서는 이 라이브러리 없이 유효성 검사를 사용할 수 없으므로 함께 설치해야 함.
 */
