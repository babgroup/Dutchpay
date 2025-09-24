import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: '유저 회원가입 성공',
    schema: {
      example: {
        message: '유저 회원가입 성공',
        data: {
          id: 4,
          email: 'aswq@example.com',
          name: 'aswq',
          studentNumber: 2225446,
          totalDiscount: 0,
        },
      },
    },
  })
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.signUpUser(createUserDto);
    return { message: '유저 회원가입 성공', date: result }
  }

}
