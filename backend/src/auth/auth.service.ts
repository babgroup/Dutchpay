import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private sha256Hex(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async userAuth(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: { id: true, email: true, studentNumber: true, password: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      userStuNum: user.studentNumber,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d',
    });

    const refreshTokenHash = await bcrypt.hash(this.sha256Hex(refreshToken), 10);
    await this.userRepo.update(user.id, { refreshTokenHash: refreshTokenHash });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, { secret: this.config.get<string>('JWT_REFRESH_SECRET')});
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        studentNumber: true,
        refreshTokenHash: true,
      },
    });
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Session not found');
    }

    const isRefreshMatch = await bcrypt.compare(this.sha256Hex(refreshToken), user.refreshTokenHash);
    if (!isRefreshMatch) throw new UnauthorizedException('Refresh token mismatch');
    const newPayload = { sub: user.id, email: payload.email, userStuNum: payload.userStuNum };

    const newAccessToken = this.jwtService.sign(newPayload);
    const newRefreshToken = this.jwtService.sign(newPayload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d',
    });

    const refreshTokenHash = await bcrypt.hash(this.sha256Hex(newRefreshToken), 10);
    await this.userRepo.update(user.id, { refreshTokenHash: refreshTokenHash });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
