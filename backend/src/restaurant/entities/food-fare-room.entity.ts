import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { FoodResult } from './food-result.entity';
import { Restaurant } from './restaurant.entity';
import { FoodJoinUser } from './food-join-user.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Unique(['creatorUser', 'restaurant', 'deadline'])
export class FoodFareRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.foodFareRooms, { onDelete: 'CASCADE' })
  creatorUser: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodFareRooms, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'datetime' })
  deadline: Date;

  @Column({ default: 1 })
  minMember: number;

  @OneToMany(() => FoodResult, (foodResult) => foodResult.foodFareRoom)
  foodResults: FoodResult[];

  @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.foodFareRoom)
  foodJoinUsers: FoodJoinUser[];
}
