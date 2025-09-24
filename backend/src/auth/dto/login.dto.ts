import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ type: String, description: '이메일 형식', required: true, example: 'alice@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, description: '비밀번호', required: true, example: 'abc123' })
    @IsString()
    password: string;
}
