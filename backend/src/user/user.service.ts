import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  
  async signUpUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      email: createUserDto.email,
      name: createUserDto.name,
      studentNumber: createUserDto.studentNumber,
      password: hashedPassword,
      totalDiscount:0,
    })
    const savedUser = await this.userRepo.save(user)
    return savedUser;
  }
}
