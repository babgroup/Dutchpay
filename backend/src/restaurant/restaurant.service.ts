import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    const created = this.foodOrderRepo.create({
      foodJoinUser: { id: join.id },
      foodItem: { id: foodItem.id },
      quantity: dto.quantity,
    });
    await this.foodOrderRepo.save(created);

    const myOrders = await this.foodOrderRepo.find({
      where: { foodJoinUser: { id: join.id } },
      relations: ['foodItem'],
      order: { id: 'ASC' },
    });

    const items = myOrders.map(o => ({
      orderItemId: o.id,
      foodItemId: o.foodItem.id,
      itemName: o.foodItem.itemName,
      unitPrice: o.foodItem.price,
      quantity: o.quantity,
      subtotal: o.foodItem.price * o.quantity,
    }));
    const myTotal = items.reduce((s, it) => s + it.subtotal, 0);

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
