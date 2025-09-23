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

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m',
    };

  }

}