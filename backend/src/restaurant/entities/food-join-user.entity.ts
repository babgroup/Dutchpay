import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { FoodOrder } from './food-order.entity';
import { FoodFareRoom } from './food-fare-room.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Unique(['user', 'foodFareRoom'])
export class FoodJoinUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.foodJoinUsers, { onDelete: 'CASCADE' })
  user: User;

  @Column({ default: '0' })
  deliveryConfirmation: string;

  @ManyToOne(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.foodJoinUsers, {
    onDelete: 'CASCADE',
  })
  foodFareRoom: FoodFareRoom;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.foodJoinUser)
  foodOrders: FoodOrder[];
}
