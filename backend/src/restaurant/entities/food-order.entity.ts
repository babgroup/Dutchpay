import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodItem } from './food-item.entity';
import { FoodJoinUser } from './food-join-user.entity';
@Entity()
export class FoodOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.foodOrders, {
    onDelete: 'CASCADE',
  })
  foodItem: FoodItem;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => FoodJoinUser, (foodJoin) => foodJoin.foodOrders, {
    onDelete: 'CASCADE',
  })
  foodJoinUser: FoodJoinUser;
}
