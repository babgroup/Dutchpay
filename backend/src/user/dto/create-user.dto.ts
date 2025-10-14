import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Matches, MinLength, ValidateNested } from "class-validator";
import { CreateUserBankAccountDto } from "./create-user-banc-account.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({ type: String, description: '이메일 형식', required: true, example: 'aswq@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: '이름', required: true, example: 'aswq' })
  @IsNotEmpty({ message: '이름은 비어 있을 수 없습니다.' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: '학번 7글자 숫자 형식', required: true, example: '2225446' })
  @IsString()
  @Matches(/^\d{7}$/)
  studentNumber: string;

  @ApiProperty({ type: String, description: '비밀번호 최소 8자', required: true, example: 'alice@example.com' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    type: CreateUserBankAccountDto,
    description: '사용자 계좌정보 (기본계좌 true 자동 설정)',
    example: { bankName: 'Kookmin Bank', accountNumber: '123-4567-8901' },
  })
  @ValidateNested()
  @Type(() => CreateUserBankAccountDto)
  bankAccount: CreateUserBankAccountDto;
}
