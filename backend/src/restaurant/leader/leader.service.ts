import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodFareRoom } from '../entities/food-fare-room.entity';
import { Repository } from 'typeorm';
import { FoodRoomLeaderResponseType } from './Type/food-room-leader-response.type';

@Injectable()
export class LeaderService {
  constructor(
    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
  ) {}

  async getLeaderFoodFareRoom(id: string): Promise<FoodRoomLeaderResponseType> {
    const leaderFoodFareRoom = await this.foodFareRoomRepo.findOne({
      where: { id: +id },
      relations: ['restaurant', 'foodJoinUsers', 'foodJoinUsers.user', 'foodJoinUsers.foodOrders', 'foodJoinUsers.foodOrders.foodItem'],
    });
    if (!leaderFoodFareRoom) {
      throw new NotFoundException('FoodFareRoom not found');
    }
    return {
      restaurantName: leaderFoodFareRoom.restaurant.restaurantName,
      minUser: leaderFoodFareRoom.minMember,
      deadline: leaderFoodFareRoom.deadline.toISOString(),
      deliveryFee: leaderFoodFareRoom.restaurant.deliveryFee,
      user: leaderFoodFareRoom.foodJoinUsers.map((join) => ({
        userId: join.user.studentNumber,
        userName: join.user.name,
        foodOrder: join.foodOrders.map((order) => ({
          itemName: order.foodItem.itemName,
          quantity: order.quantity,
          price: order.foodItem.price,
        })),
      })),
    };
  }
}
