import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserBankAccount } from './entities/userBankAccount.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  
  async signUpUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const result = await this.userRepo.manager.transaction(async (manager) => {
      const user = manager.create(User, {
        email: createUserDto.email,
        name: createUserDto.name,
        studentNumber: createUserDto.studentNumber,
        password: hashedPassword,
        totalDiscount: 0,
      });
      const savedUser = await manager.save(user);

      const bankRepo = manager.getRepository(UserBankAccount);
      const bank = bankRepo.create({
        user: savedUser,
        bankName: createUserDto.bankAccount.bankName,
        accountNumber: createUserDto.bankAccount.accountNumber,
      });
      const savedBank = await bankRepo.save(bank);

      return {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        studentNumber: savedUser.studentNumber,
        totalDiscount: savedUser.totalDiscount,
        bankAccount: {
          bankName: savedBank.bankName,
          accountNumber: savedBank.accountNumber,
          isPrimary: savedBank.isPrimary,
        },
      };
    });

    return result;
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
