import { Injectable } from '@nestjs/common';
import { FoodResult } from './entities/food-result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { FoodJoinUser } from './entities/food-join-user.entity';
import { FoodFareRoom } from './entities/food-fare-room.entity';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(FoodResult) 
    private readonly foodResultRepo: Repository<FoodResult>,
  
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    
    @InjectRepository(FoodJoinUser)
    private readonly foodJoinUserRepo: Repository<FoodJoinUser>,

    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
  ) {}

  async createFoodFareRoom(dto: FoodFareRoomDto) {
    const foodFareRoom = this.foodFareRoomRepo.create({
      restaurant: { id: dto.restaurantId },
      creatorUser: { id: dto.userId },
      deadline: new Date(dto.deadline),
      minMember: dto.minMember,
    });

    const savedRoom = await this.foodFareRoomRepo.save(foodFareRoom);

    const foodResult = this.foodResultRepo.create({
      foodFareRoom: savedRoom,
      progress: 0,
      description: '없음'
    })

    await this.foodResultRepo.save(foodResult);

    const foodJoinUser = this.foodJoinUserRepo.create({
        user: { id: dto.userId },
        deliveryConfirmation: 0,
        foodFareRoom: foodFareRoom,
        foodOrders: [],
    })

    await this.foodJoinUserRepo.save(foodJoinUser);

    return savedRoom;
  }
}
