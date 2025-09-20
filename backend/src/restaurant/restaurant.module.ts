import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { FoodFareRoom } from './entities/food-fare-room.entity';
import { FoodResult } from './entities/food-result.entity';
import { FoodJoinUser } from './entities/food-join-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, FoodFareRoom, FoodResult, FoodJoinUser,])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
