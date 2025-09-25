import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { FoodFareRoom } from './entities/food-fare-room.entity';
import { FoodResult } from './entities/food-result.entity';
import { FoodJoinUser } from './entities/food-join-user.entity';
import { LeaderController } from './leader/leader.controller';
import { LeaderService } from './leader/leader.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { FoodOrder } from './entities/food-order.entity';
import { FoodItem } from './entities/food-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, FoodFareRoom, FoodResult, FoodJoinUser, FoodOrder, FoodItem])],
  controllers: [RestaurantController, LeaderController, MemberController],
  providers: [RestaurantService, LeaderService, MemberService],
})
export class RestaurantModule {}
