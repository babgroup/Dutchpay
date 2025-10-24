import { Controller, Post, Body, Get, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateFoodOrderDto } from './dto/create-food-order.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'dutchPay 방 생성', description: 'foodFareRoom을 생성한다. jwt토큰을 이용해 creatorUser에 자신의 Id를 넣는다.' })
  @ApiCreatedResponse({
    description: '생성된 방 정보',
    content: {
      'application/json': {
        example: {
          id: 5,
          creatorUser: { id: 1 },
          restaurant: { id: 1 },
          deadline: '2026-09-20T20:00:00.000Z',
          minMember: 4,
        },
      },
    },
  })
  @Post('food-fare-room')
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto, @Req() req: Request) {
    return await this.restaurantService.createFoodFareRoom(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '주문할 메뉴선택' })
  @ApiParam({ name: 'roomId', type: String, description: '참여할 방 번호', example: 1, })
  @ApiCreatedResponse({
    description: '주문이 저장됨',
    content: {
      'application/json': {
        example: {
          message: '주문이 저장되었습니다.',
          data: {
            foodJoinUserId: 6,
            myOrderItems: [
              {
                orderItemId: 5,
                foodItemId: 1,
                itemName: 'Pepperoni Pizza',
                unitPrice: 12000,
                quantity: 1,
                subtotal: 12000,
              },
              {
                orderItemId: 6,
                foodItemId: 1,
                itemName: 'Pepperoni Pizza',
                unitPrice: 12000,
                quantity: 1,
                subtotal: 12000,
              },
            ],
            myTotal: 24000,
          },
        },
      },
    },
  })
  @Post('food-order/:roomId')
  async createFoodOrder(@Param('roomId') roomId: string, @Body() dto: CreateFoodOrderDto, @Req() req: Request) {
    return await this.restaurantService.createFoodOrder(+roomId, dto, req.user.id)
  }

  @ApiOperation({ summary: '현재 생성되어 있는 방 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
    description: '현재 진행중(progress=0)인 방 리스트',
    content: {
      'application/json': {
        example: {
          message: '현재 생성된 방 전체',
          data: [
            {
              id: 2,
              restaurantName: '',
              deliveryFee: 3000,
              minUser: 2,
              currentUsers: 2,
              deadline: '2025-07-08T18:00:00.000Z',
              imageUrl: null,
            },
            {
              id: 3,
              restaurantName: '',
              deliveryFee: 2000,
              minUser: 4,
              currentUsers: 1,
              deadline: '2024-09-20T20:00:00.000Z',
              imageUrl: null,
            },
          ],
        },
      },
    },
  })
  @Get('current-rooms')
  async getCurrentRooms() {
    const result = await this.restaurantService.getCurrentRooms();
    return { message: '현재 생성된 방 전체', data: result };
  }

  @ApiOperation({ summary: '식당 전체 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
    description: '레스토랑 전체 리스트',
    content: {
      'application/json': {
        example: {
          message: '레스토랑 목록 전체',
          data: [
            { id: 1, restaurantName: 'Campus Pizza', deliveryFee: 2000, imageUrl: null, businessHours: '09:00-21:00' },
            { id: 2, restaurantName: 'Global Sushi', deliveryFee: 3000, imageUrl: null, businessHours: '11:00-22:00' },
            { id: 3, restaurantName: 'Korean BBQ', deliveryFee: 4000, imageUrl: null, businessHours: '17:00-23:00' },
          ],
        },
      },
    },
  })
  @Get('list')
  async getRestaurantList() {
    const result = await this.restaurantService.getRestaurantList();
    return { message: '레스토랑 목록 전체', data: result };
  }

  @ApiOperation({ summary: '음식 전체 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
  description: '레스토랑 음식 목록',
  schema: {
    example: {
      message: "해당 레스토랑 음식 목록 전체",
      data: [
        {
          id: 2,
          foodName: "Cheese Pizza",
          foodPrice: 10000,
          imageUrl: "http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%99%84%EB%9D%BC%EB%8C%80%EC%9D%BC%EB%B3%B4_410x271.jpg",
        },
        {
          id: 1,
          foodName: "Pepperoni Pizza",
          foodPrice: 12000,
          imageUrl: "http://www.bhc.co.kr/upload/bhc/menu/HOT%ED%99%84%EB%9D%BC%EB%8C%80%EC%9D%BC%EB%B3%B4_410x271.jpg",
        },
      ],
    },
  },
})
  @ApiParam({ name: 'restaurantId', type: String, example: 1})
  @Get('list/:restaurantId')
  async getFoodList(@Param('restaurantId') restaurantId: string) {
    const result = await this.restaurantService.getFoodList(+restaurantId);
    return { message: '해당 레스토랑 음식 목록 전체', data: result };
  }
  
  @ApiOperation({ summary: '선택한 방에 있는 유저 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
    description: '해당 방의 참여 유저 리스트',
    content: {
      'application/json': {
        example: {
          message: '1방에 참여한 유저 목록',
          data: [
            { user_id: 1, name: '', student_number: 20231234, is_creator: true },
            { user_id: 2, name: '', student_number: 20235678, is_creator: false },
          ],
        },
      },
    },
  })
  @ApiParam({ name: 'roomId', type: String, example: 1 })
  @Get('user-list/:roomId')
  async getUserInRoom(@Param('roomId') roomId: string) {
    const result = await this.restaurantService.getUserInRoom(+roomId);
    return { message: `${roomId}방에 참여한 유저 목록`, data: result };
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '방의 현재 진행 상태 조회'})
  @ApiParam({ name: 'roomId', type: String, example: 1 })
  @ApiOkResponse({
    description: '방의 현재 진행 상태 조회 성공',
    content: {
      'application/json': {
        example: {
          message: '1방의 현재 progress',
          data: {
            result: 0,
          },
        },
      },
    }
  })
  @Get('progress/:roomId')
  async getProgress(@Param('roomId') roomId: string, @Req() req: Request) {
    const result = await this.restaurantService.getProgress(+roomId, req.user.id);
    return { message: `${roomId}방의 현재 progress`, data: result };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '내가 소속된 방 조회',
    description:
      '현재 내가 참여 중인 방이 있으면 방 ID와 역할(CREATOR/MEMBER)을 반환. 진행 중(progress=0)인 방만 조회.',
  })
  @ApiOkResponse({
    description: '내가 참여 중인 방 정보 (없으면 inRoom=false)',
    content: {
      'application/json': {
        example: {
          message: '현재 내가 참여 중인 방',
          data: {
            inRoom: true,
            roomId: 3,
            role: 'MEMBER',
          },
        },
      },
    },
  })
  @Get('my-room')
  async getMyRoom(@Req() req: Request) {
    const result = await this.restaurantService.getMyRoom(req.user.id);
    return { message: '현재 내가 참여 중인 방', data: result };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('food-order/:roomId/:foodOrderId')
  async deleteFoodOrder(@Param('roomId') roomId: string, @Param('foodOrderId') orderId: string, @Req() req:Request) {
    const result = await this.restaurantService.deleteFoodOrder(+roomId, +orderId, req.user.id);
    return { message: `${roomId}방의 foodOrderId 삭제`, data: result }
  }
}
