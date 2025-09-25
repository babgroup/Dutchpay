import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodFareRoom } from '../entities/food-fare-room.entity';
import { FoodResult } from '../entities/food-result.entity';
import { Repository } from 'typeorm';
import { FoodRoomLeaderResponseType } from './Type/food-room-leader-response.type';


@Injectable()
export class LeaderService {
  constructor(
    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,

    @InjectRepository(FoodResult)
    private readonly foodResultRepo: Repository<FoodResult>,
  ) {}

  async getLeaderFoodFareRoom(id: string, userId: number): Promise<FoodRoomLeaderResponseType> {
    const leaderFoodFareRoom = await this.foodFareRoomRepo.findOne({
      where: { id: +id },
      relations: ['creatorUser','restaurant', 'foodJoinUsers', 'foodJoinUsers.user', 'foodJoinUsers.foodOrders', 'foodJoinUsers.foodOrders.foodItem'],
    });

    if (!leaderFoodFareRoom) {
      throw new NotFoundException('FoodFareRoom not found');
    }

    if (leaderFoodFareRoom.creatorUser.id !== userId) {
      throw new ForbiddenException('본인이 생성한 방만 조회할 수 있습니다.');
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

  async patch1Progress(id: string, userId: number): Promise<void> {
    const roomProgress = await this.foodResultRepo.findOne({
      where: {foodFareRoom: {id: +id}},
      relations: ['foodFareRoom', 'foodFareRoom.creatorUser'],
    })

    if(!roomProgress) {
      throw new NotFoundException(`foodResult에 ${id}번 방이 존재하지 않음`)
    }

    if (roomProgress.foodFareRoom.creatorUser.id !== userId) {
      throw new ForbiddenException('본인이 생성한 방만 상태를 변경할 수 있습니다.');
    }

    roomProgress.progress = 1;

    await this.foodResultRepo.save(roomProgress)
  }

  async patch2Progress(id: string, userId: number): Promise<void> {
    const roomProgress = await this.foodResultRepo.findOne({
      where: {foodFareRoom: {id: +id}},
      relations: ['foodFareRoom', 'foodFareRoom.creatorUser'],
    })

    if(!roomProgress) {
      throw new NotFoundException(`foodResult에 ${id}번 방이 존재하지 않음`)
    }

    if (roomProgress.foodFareRoom.creatorUser.id !== userId) {
      throw new ForbiddenException('본인이 생성한 방만 상태를 변경할 수 있습니다.');
    }

    roomProgress.progress = 2;

    await this.foodResultRepo.save(roomProgress)
  }

  async patch3Progress(id: string, userId: number): Promise<void> {
    const roomProgress = await this.foodResultRepo.findOne({
      where: {foodFareRoom: {id: +id}},
      relations: ['foodFareRoom', 'foodFareRoom.creatorUser'],
    })

    if(!roomProgress) {
      throw new NotFoundException(`foodResult에 ${id}번 방이 존재하지 않음`)
    }

    if (roomProgress.foodFareRoom.creatorUser.id !== userId) {
      throw new ForbiddenException('본인이 생성한 방만 상태를 변경할 수 있습니다.');
    }

    roomProgress.progress = 3;

    await this.foodResultRepo.save(roomProgress)
  }
}
