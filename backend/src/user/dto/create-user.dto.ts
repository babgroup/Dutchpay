import { IsEmail, IsInt, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsInt()
  studentNumber: number;

  @IsString()
  @MinLength(8)
  password: string;
}
