import { FoodFareRoom } from "src/restaurant/entities/food-fare-room.entity";
import { FoodJoinUser } from "src/restaurant/entities/food-join-user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column({ type: 'int', unsigned: true })
    studentNumber: number;

    @Column({ select: false })
    password: string;

    @Column({ default: 0 })
    totalDiscount: number;

    @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.creatorUser)
    foodFareRooms: FoodFareRoom[];

    @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.user)
    foodJoinUsers: FoodJoinUser[];
}
