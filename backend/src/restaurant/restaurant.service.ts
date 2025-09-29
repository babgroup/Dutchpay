import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
import { CreateFoodOrderDto } from './dto/create-food-order.dto';
import { FoodOrder } from './entities/food-order.entity';
import { FoodItem } from './entities/food-item.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(FoodFareRoom) private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
    @InjectRepository(FoodResult) private readonly foodResultRepo: Repository<FoodResult>,
    @InjectRepository(FoodJoinUser) private readonly foodJoinUserRepo: Repository<FoodJoinUser>,
    @InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(FoodOrder) private readonly foodOrderRepo: Repository<FoodOrder>,
    @InjectRepository(FoodItem) private readonly foodItemRepo: Repository<FoodItem>,
  ) {}

  async createFoodFareRoom(dto: FoodFareRoomDto, userId: number): Promise<FoodFareRoom> {
    try {
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
        foodOrders: [],
      });
      await this.foodJoinUserRepo.save(foodJoinUser);

      return savedRoom;
    } catch (e: any) {
      if (e?.errno === 1062) {
        throw new ConflictException('이미 동일한 조건의 방이 존재합니다.');
      }
      throw e;
    }
  }

  async createFoodOrder(roomId: number, dto: CreateFoodOrderDto, userId: number) {
    const room = await this.foodFareRoomRepo.findOne({
      where: { id: roomId },
      relations: ['restaurant'],
    });
    if (!room) throw new NotFoundException('방을 찾을 수 없습니다.');

    const result = await this.foodResultRepo.findOne({
      where: { foodFareRoom: { id: room.id }, progress: 0 },
    });
    if (!result) throw new ForbiddenException('이미 진행이 종료된 방입니다.');
    if (room.deadline <= new Date()) {
      throw new ForbiddenException('마감 시간이 지나 주문할 수 없습니다.');
    }

    const join = await this.foodJoinUserRepo.findOne({
      where: { foodFareRoom: { id: room.id }, user: { id: userId } },
      relations: ['foodFareRoom', 'user'],
    });
    if (!join) throw new ForbiddenException('해당 방에 참여하지 않았습니다.');

    const foodItem = await this.foodItemRepo.findOne({
      where: { id: dto.foodItemId },
      relations: ['restaurant'],
    });
    if (!foodItem) throw new NotFoundException('메뉴(FoodItem)를 찾을 수 없습니다.');
    if (foodItem.restaurant.id !== room.restaurant.id) {
      throw new ForbiddenException('방의 레스토랑과 다른 메뉴는 주문할 수 없습니다.');
    }

    const existing = await this.foodOrderRepo.findOne({
        where: { foodJoinUser: { id: join.id }, foodItem: { id: foodItem.id } },
    });

    if (existing) {
        await this.foodOrderRepo.update(
            { id: existing.id },
            { quantity: dto.quantity },
        );
    } else {
        const created = this.foodOrderRepo.create({
            foodJoinUser: { id: join.id },
            foodItem: { id: foodItem.id },
            quantity: dto.quantity,
        });
        await this.foodOrderRepo.save(created);
    }

    const myOrders = await this.foodOrderRepo.find({
      where: { foodJoinUser: { id: join.id } },
      relations: ['foodItem'],
    });

    const items = myOrders.map(order => ({
        foodOrderId: order.id,
        foodItemId: order.foodItem.id,
        itemName: order.foodItem.itemName,
        unitPrice: order.foodItem.price,
        quantity: order.quantity,
        subtotal: order.foodItem.price * order.quantity,
    }));

    const myTotal = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      message: '주문이 저장되었습니다.',
      data: {
        foodJoinUserId: join.id,
        myOrderItems: items,
        myTotal,
      },
    };
  }

  async getCurrentRooms(): Promise<CurrentFoodRoomsResponseType[]> {
    const results = await this.foodResultRepo.find({
      where: { progress: 0 },
      relations: ['foodFareRoom', 'foodFareRoom.restaurant', 'foodFareRoom.foodJoinUsers'],
    });

    return results.map(foodResult  => {
      const room = foodResult.foodFareRoom;
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
    const restaurantList = await this.restaurantRepo.find();

    return restaurantList.map(restaurant => ({
      id: restaurant.id,
      restaurantName: restaurant.restaurantName,
      deliveryFee: restaurant.deliveryFee,
      imageUrl: restaurant.imageUrl,
      businessHours: restaurant.businessHours,
    }));
  }

  async getUserInRoom(roomId: number): Promise<UserResponseType[]> {
    const joins  = await this.foodJoinUserRepo.find({
      where: { foodFareRoom: { id: roomId } },
      relations: ['user', 'foodFareRoom', 'foodFareRoom.creatorUser'],
    });

    return joins .map(join  => ({
      user_id: join .user.id,
      name: join .user.name,
      student_number: join .user.studentNumber,
      is_creator: join .user.id === join .foodFareRoom.creatorUser.id,
    }));
  }

  async getProgress(roomId: number, userId: number) {
    const isMember = await this.foodJoinUserRepo.exist({
      where: { foodFareRoom: { id: roomId }, user: { id: userId } },
    });

    if (!isMember) throw new ForbiddenException('해당 방에 참여하지 않았습니다.');

    const currentProgress = await this.foodResultRepo.findOne({
      where: { foodFareRoom: { id: roomId } },
      select: { id: true, progress: true,  }
    })
    if (!currentProgress) throw new NotFoundException('progress가 존재하지 않습니다.')
    
    return currentProgress.progress
  }

  async deleteFoodOrder(roomId: number, orderId: number, userId: number) {
    const room = await this.foodFareRoomRepo.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('방을 찾을 수 없습니다.');

    const result = await this.foodResultRepo.findOne({
      where: { foodFareRoom: { id: room.id }, progress: 0 },
    });
    if (!result) throw new ForbiddenException('이미 진행이 종료된 방입니다.');
    if (room.deadline <= new Date()) {
      throw new ForbiddenException('마감 시간이 지나 주문할 수 없습니다.');
    }

    const join = await this.foodJoinUserRepo.findOne({
      where: { foodFareRoom: { id: room.id }, user: { id: userId } },
      relations: ['foodFareRoom', 'user'],
    });
    if (!join) throw new ForbiddenException('해당 방에 참여하지 않았습니다.');

    const foodOrder = await this.foodOrderRepo.delete({
      id: orderId,
      foodJoinUser: { id: join.id }
    });
    if (!foodOrder.affected) throw new NotFoundException('삭제할 foodOrder가 없습니다')

    return foodOrder
  }
}
