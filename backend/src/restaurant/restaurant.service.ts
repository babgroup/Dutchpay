import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodFareRoom } from './entities/food-fare-room.entity';
import { FoodResult } from './entities/food-result.entity';
import { FoodJoinUser } from './entities/food-join-user.entity';
import { Restaurant } from './entities/restaurant.entity';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { CurrentFoodRoomsResponseType } from './Type/current-food-rooms-response.type';
import { ListResponseType } from './Type/list-response.type';
import { UserResponseType } from './Type/user-list-response.type';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(FoodFareRoom) private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
    @InjectRepository(FoodResult) private readonly foodResultRepo: Repository<FoodResult>,
    @InjectRepository(FoodJoinUser) private readonly foodJoinUserRepo: Repository<FoodJoinUser>,
    @InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async createFoodFareRoom(dto: FoodFareRoomDto, userId: number): Promise<FoodFareRoom> {
    const room = this.foodFareRoomRepo.create({
      restaurant: { id: dto.restaurantId },
      creatorUser: { id: userId },
      deadline: new Date(dto.deadline),
      minMember: dto.minMember,
    });
    const savedRoom = await this.foodFareRoomRepo.save(room);

    const foodResult = this.foodResultRepo.create({
      foodFareRoom: savedRoom,
      progress: 0,
      description: '없음',
    });
    await this.foodResultRepo.save(foodResult);

    const foodJoinUser = this.foodJoinUserRepo.create({
      user: { id: userId },
      foodFareRoom: savedRoom,
      deliveryConfirmation: 0,
      foodOrders: [],
    });
    await this.foodJoinUserRepo.save(foodJoinUser);

    return savedRoom;
  }

  async getCurrentRooms(): Promise<CurrentFoodRoomsResponseType[]> {
    const rows = await this.foodResultRepo.find({
      where: { progress: 0 },
      relations: ['foodFareRoom', 'foodFareRoom.restaurant', 'foodFareRoom.foodJoinUsers'],
    });

    return rows.map(r => {
      const room = r.foodFareRoom;
      return {
        id: room.id,
        restaurantName: room.restaurant.restaurantName,
        deliveryFee: room.restaurant.deliveryFee,
        minUser: room.minMember,
        currentUsers: room.foodJoinUsers.length,
        deadline: room.deadline.toISOString(),
        imageUrl: room.restaurant.imageUrl,
      };
    });
  }

  async getRestaurantList(): Promise<ListResponseType[]> {
    const list = await this.restaurantRepo.find();

    return list.map(r => ({
      id: r.id,
      restaurantName: r.restaurantName,
      deliveryFee: r.deliveryFee,
      imageUrl: r.imageUrl,
      businessHours: r.businessHours,
    }));
  }

  async getUserInRoom(id: string): Promise<UserResponseType[]> {
    const rows = await this.foodJoinUserRepo.find({
      where: { foodFareRoom: { id: +id } },
      relations: ['user', 'foodFareRoom', 'foodFareRoom.creatorUser'],
    });

    return rows.map(j => ({
      user_id: j.user.studentNumber,
      name: j.user.name,
      student_number: j.user.studentNumber,
      is_creator: j.user.id === j.foodFareRoom.creatorUser.id,
    }));
  }
}
