import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: String, description: '이메일 형식', required: true, example: 'aswq@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: '이름', required: true, example: 'aswq' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: '숫자 형식', required: true, example: '2225446' })
  @IsInt()
  studentNumber: number;

  @ApiProperty({ type: String, description: '비밀번호 최소 8자', required: true, example: 'alice@example.com' })
  @IsString()
  @MinLength(8)
  password: string;
}
