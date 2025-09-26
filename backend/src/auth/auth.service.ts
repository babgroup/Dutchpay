import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  
  async userAuth(dto: LoginDto) {
  const user = await this.userRepo
    .createQueryBuilder('u')
    .addSelect('u.password')
    .where('u.email = :email', { email: dto.email })
    .getOne();

  if (!user) throw new UnauthorizedException('Invalid credentials');

  const cmp = await bcrypt.compare(dto.password, user.password);

  if (!cmp) throw new UnauthorizedException('Invalid credentials');
  return user;
}

  
  async login(user: User){
    const payload = { 
      sub: user.id, 
      email: user.email, 
      userStuNum: user.studentNumber 
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d',
    });

    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(user.id, { refreshTokenHash: hash });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m',
    };
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.refreshTokenHash')
      .where('u.id = :id', { id: payload.sub })
      .getOne();

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Session not found');
    }

    const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!ok) {
      throw new UnauthorizedException('Refresh token mismatch');
    }

    const base = { sub: user.id, email: payload.email, userStuNum: payload.userStuNum };

    const newAccess = this.jwtService.sign(base);
    const newRefresh = this.jwtService.sign(base, {
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d',
    });

    const newHash = await bcrypt.hash(newRefresh, 10);
    await this.userRepo.update(user.id, { refreshTokenHash: newHash });

    return { accessToken: newAccess, refreshToken: newRefresh };
  }
}