import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { FoodOrder } from './food-order.entity';

@Entity()
@Unique(['restaurant', 'itemName'])
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodItems, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column()
  itemName: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.foodItem)
  foodOrders: FoodOrder[];
}
