import { Controller, Post, Body, HttpCode, Get, UseGuards, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인', description: 'db에 있는 이메일과 비밀번호인지 체크후 jwt토큰 발급. 토큰 복사 후 사용.' })
  @ApiOkResponse({
    description: '로그인 성공',
    content: {
      'application/json': {
        example: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjcwMDAwMDAsImV4cCI6MTcyNzAwMDkwMH0.XxYyZz-EXAMPLE_SIGNATURE',
          tokenType: 'Bearer',
          expiresIn: '15m',
        },
      },
    },
  })
  
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response ) {
    const user = await this.authService.userAuth(loginDto);

    const { accessToken, refreshToken, tokenType, expiresIn } = await this.authService.login(user);

    res.setHeader('refresh-token', refreshToken);

    return { accessToken, tokenType, expiresIn };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'jwt토큰 적용 체크', description: '우측 상단의 Authorize에 jwt토큰 넣은 후 실행' })
  @ApiOkResponse({
    description: '성공 시 사용자 정보',
    content: {
      'application/json': {
        example: {
          id: 1,
          email: 'alice@example.com',
          userStuNum: 20231234,
        },
      },
    },
  })
  getMe(@Req() req) {
    return req.user;
  }

  @Post('refresh')                         
  @HttpCode(200)                        
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response, ) {
    const refreshToken = req.header('refresh-token'); 
    
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');

    const { accessToken, refreshToken: rotated } = await this.authService.refresh(refreshToken); 

    res.setHeader('refresh-token', rotated);        
    return { accessToken };                         
  }
}