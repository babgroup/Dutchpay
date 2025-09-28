import { Controller, Post, Body, HttpCode, Get, UseGuards, Req, Res, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인', description: '이메일/비밀번호 확인 후 JWT 발급' })
  @ApiOkResponse({
    description: '로그인 성공',
    content: {
      'application/json': {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
    headers: {
      'refresh-token': {
        description: '리프레시 토큰',
        schema: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.userAuth(loginDto);
    const { accessToken, refreshToken } = await this.authService.login(user);

    res.setHeader('refresh-token', refreshToken);

    return { accessToken };
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: '액세스 토큰 재발급',
    description: '요청 헤더의 refresh-token을 검증하여 새로운 accessToken을 발급합니다.',
  })
  @ApiHeader({
    name: 'refresh-token',
    description: '로그인/이전 재발급 응답 헤더에서 받은 Refresh JWT',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY...'
  })
  @ApiOkResponse({
    description: '재발급 성공',
    content: {
      'application/json': {
        example: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY...'
        },
      },
    },
    headers: {
      'refresh-token': {
        description: '회전(rotated)된 리프레시 토큰(회전 정책 사용 시).',
        schema: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY...'
        },
      },
    },
  })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const headerRefreshToken = req.header('refresh-token');
    if (!headerRefreshToken) throw new BadRequestException('refresh-token header required');

    const { accessToken, refreshToken } = await this.authService.refresh(headerRefreshToken);

    res.setHeader('refresh-token', refreshToken);
    return { accessToken };
  }
}
