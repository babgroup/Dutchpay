import { FoodFareRoom } from "src/restaurant/entities/food-fare-room.entity";
import { FoodJoinUser } from "src/restaurant/entities/food-join-user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    studentNumber: number;

    @Column({ default: 0 })
    totalDiscount: number;

    @CreateDateColumn()
    createDate: Date;

    @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.creatorUser)
    foodFareRooms: FoodFareRoom[];

    @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.user)
    foodJoinUsers: FoodJoinUser[];
}
