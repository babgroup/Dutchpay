import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async signUpUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create({
      email: createUserDto.email,
      name: createUserDto.name,
      studentNumber: createUserDto.studentNumber,
      password: createUserDto.password,
      totalDiscount:0,
    })
    const savedUser = await this.userRepo.save(user)
    return savedUser;
  }
}
