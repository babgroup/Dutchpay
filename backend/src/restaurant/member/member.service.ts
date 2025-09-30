import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodJoinUser } from '../entities/food-join-user.entity';
import { Repository } from 'typeorm';
import { FoodRoomMemberResponseType } from './Type/food-room-member-response.type';
import { FoodFareRoom } from '../entities/food-fare-room.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(FoodJoinUser)
    private readonly foodJoinUserRepo: Repository<FoodJoinUser>,
    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
  ) {}

  async joinFoodRoom(roomId: number, userId: number): Promise<FoodJoinUser> {
    const room = await this.foodFareRoomRepo.findOne({
      where: { id: roomId },
    });

    if (!room) throw new NotFoundException(`roomId=${roomId} 방이 존재하지 않습니다.`);

    const existing = await this.foodJoinUserRepo.findOne({
      where: { foodFareRoom: { id: roomId }, user: { id: userId } },
    });

    if (existing) {
      throw new ConflictException('이미 해당 방에 참여했습니다.');
    }

    const savedJoinUser = this.foodJoinUserRepo.create({
      user: { id: userId },
      foodFareRoom: { id: roomId },
    });
    return await this.foodJoinUserRepo.save(savedJoinUser);
  }

  async getMemberMenu(roomId: number, userId: number): Promise<FoodRoomMemberResponseType> {
    const foodRoomMember = await this.foodJoinUserRepo.findOne({
        where: {
            foodFareRoom: { id: roomId },
            user: { id: userId }
        },
        relations: ['user', 'foodFareRoom', 'foodFareRoom.creatorUser', 'foodFareRoom.restaurant', 'foodFareRoom.foodJoinUsers', 'foodOrders', 'foodOrders.foodItem']
    })
    
    if (!foodRoomMember) {
      throw new NotFoundException(`해당 방에 참여한 기록이 없습니다. userId=${userId}, roomId=${roomId}`);
    }

    return {
          foodJoinUserId: foodRoomMember.user.id,
          restaurantName: foodRoomMember.foodFareRoom.restaurant.restaurantName,
          deadline: foodRoomMember.foodFareRoom.deadline.toString(),
          deliveryFee: foodRoomMember.foodFareRoom.restaurant.deliveryFee,
          memberCount: foodRoomMember.foodFareRoom.foodJoinUsers.length,
          myOrderItems: foodRoomMember.foodOrders.map((order) => ({
            orderId: order.id,
            itemName: order.foodItem.itemName,
            quantity: order.quantity,
            price: order.foodItem.price
          }))
    }
    }

    async patch2Delivery(id: string, userId: number): Promise<void> {
      const foodJoinUser = await this.foodJoinUserRepo.findOne({
          where: {id: +id},
          relations: ['foodFareRoom.creatorUser'],
      })

      if(!foodJoinUser) {
          throw new NotFoundException(`foodJoinUser에 ${id}번 방이 존재하지 않음`)
      }

      if(foodJoinUser.foodFareRoom.creatorUser.id !== userId) {
        throw new ForbiddenException('본인이 참여한 방만 상태를 변경할 수 있습니다.')
      }

      foodJoinUser.deliveryConfirmation = '1';

      await this.foodJoinUserRepo.save(foodJoinUser)
    }
}
