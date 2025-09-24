import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { FoodItem } from './food-item.entity';
import { FoodFareRoom } from './food-fare-room.entity';

@Entity()
@Unique(['restaurantName', 'phoneNumber'])
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  businessHours: string;

  @Column({ type: 'int', default: 0 })
  deliveryFee: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.restaurant)
  foodItems: FoodItem[];

  @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.restaurant)
  foodFareRooms: FoodFareRoom[];
}
