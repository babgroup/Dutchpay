import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodJoinUser } from '../entities/food-join-user.entity';
import { Repository } from 'typeorm';
import { FoodRoomMemberResponseType } from './Type/food-room-member-response.type';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(FoodJoinUser)
    private readonly foodJoinUserRepo: Repository<FoodJoinUser>,
  ) {}

  async getMemberMenu(roomId: number, userId: number): Promise<FoodRoomMemberResponseType> {
        const foodRoomMember = await this.foodJoinUserRepo.findOne({
            where: {
                foodFareRoom: { id: roomId },
                user: { id: userId }
            },
            relations: ['user', 'foodFareRoom', 'foodFareRoom.creatorUser', 'foodFareRoom.restaurant', 'foodFareRoom.foodJoinUsers', 'foodOrders', 'foodOrders.foodItem']
        })
        
        if (!foodRoomMember) {
          throw new NotFoundException(`Member not found for userId=${userId}, roomId=${roomId}`);
        }

        if(foodRoomMember.foodFareRoom.creatorUser.id !== userId) {
          throw new ForbiddenException('본인이 참여한 방만 조회할 수 있습니다.')
        }

        return {
              foodJoinUserId: foodRoomMember.user.id,
              restaurantName: foodRoomMember.foodFareRoom.restaurant.restaurantName,
              deadline: foodRoomMember.foodFareRoom.deadline.toString(),
              deliveryFee: foodRoomMember.foodFareRoom.restaurant.deliveryFee,
              memberCount: foodRoomMember.foodFareRoom.foodJoinUsers.length,
              myOrderItems: foodRoomMember.foodOrders.map((order) => ({
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

        foodJoinUser.deliveryConfirmation = 1;

        await this.foodJoinUserRepo.save(foodJoinUser)
    }
}
