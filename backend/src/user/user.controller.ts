import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.signUpUser(createUserDto);
    return { message: '유저 회원가입 성공', date: result }
  }

}
