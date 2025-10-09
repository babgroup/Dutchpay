import { FoodFareRoom } from "src/restaurant/entities/food-fare-room.entity";
import { FoodJoinUser } from "src/restaurant/entities/food-join-user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserBankAccount } from "./userBankAccount.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ type: 'varchar', length: 7, unique: true })
    studentNumber: string;

    @Column({ select: false })
    password: string;

    @Column({ default: 0 })
    totalDiscount: number;

    @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.creatorUser)
    foodFareRooms: FoodFareRoom[];

    @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.user)
    foodJoinUsers: FoodJoinUser[];

    @OneToMany(() => UserBankAccount, (bankAccount) => bankAccount.user)
    userBankAccounts: UserBankAccount[];

    @Column({ select: false, nullable: true })
    refreshTokenHash?: string;
}
