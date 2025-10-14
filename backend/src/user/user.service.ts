import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getMyInfo(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['userBankAccounts'],
    });

    if (!user) {
      throw new NotFoundException(`해당 유저(id=${userId})가 존재하지 않습니다.`);
    }

    return {
      id: user.id,
      name: user.name,
      studentNumber: user.studentNumber,
      email: user.email,
      bankAccounts: (user.userBankAccounts ?? []).map((account) => ({
        bankName: account.bankName,
        accountNumber: account.accountNumber,
        isPrimary: account.isPrimary,
      })),
    };
  }
}
