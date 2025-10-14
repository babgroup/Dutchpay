import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입 (기본계좌 1개 포함 등록)' })
  @ApiCreatedResponse({
    description: '유저 회원가입 성공',
    schema: {
      example: {
        message: '유저 회원가입 성공',
        data: {
          id: 4,
          email: 'aswq@example.com',
          name: 'aswq',
          studentNumber: '2225446',
          totalDiscount: 0,
          bankAccount: {
            bankName: 'Kookmin Bank',
            accountNumber: '123-4567-8901',
            isPrimary: true,
          },
        },
      },
    },
  })
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.signUpUser(createUserDto);
    return { message: '유저 회원가입 성공', date: result }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  @ApiOperation({ summary: '내 정보 조회', description: 'JWT 토큰의 본인 정보(이름/학번/이메일/계좌)를 반환합니다.' })
  @ApiOkResponse({
    description: '내 정보 조회 성공',
    schema: {
      example: {
        message: '내 정보 조회 성공',
        data: {
          id: 1,
          name: 'Alice',
          studentNumber: '2023123',
          email: 'alice@example.com',
          bankAccounts: [
            { bankName: 'Kookmin Bank', accountNumber: '123-4567-8901', isPrimary: true },
          ],
        },
      },
    },
  })
  async getMe(@Req() req: Request) {
    const result = await this.userService.getMyInfo(req.user.id);
    return { message: '내 정보 조회 성공', data: result };
  }
}
