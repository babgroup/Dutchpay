import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FoodFareRoom } from './food-fare-room.entity';

@Entity()
export class FoodResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.foodResults, {
    onDelete: 'CASCADE',
  })
  foodFareRoom: FoodFareRoom;

  @Column({ default: 0 })
  progress: number;

  @Column()
  description: string;
}
