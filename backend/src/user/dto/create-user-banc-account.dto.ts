// dto/create-user-bank-account.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserBankAccountDto {
  @ApiProperty({ example: 'Kookmin Bank', description: '은행명' })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({ example: '123-4567-8901', description: '계좌번호' })
  @IsString()
  @Length(5, 100)
  accountNumber: string;
}
