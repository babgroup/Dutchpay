import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserBankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBankAccounts, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 50 })
  bankName: string;

  @Column({ type: 'varchar', length: 100 })
  accountNumber: string;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;
}
