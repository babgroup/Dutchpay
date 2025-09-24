import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('food-fare-room')
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
          deadline: '2024-09-20T20:00:00.000Z',
          minMember: 4,
        },
      },
    },
  })
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto, @Req() req: Request) {
    return await this.restaurantService.createFoodFareRoom(dto, req.user.id);
  }

  @Get('current-rooms')
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
  async getCurrentRooms() {
    const result = await this.restaurantService.getCurrentRooms();
    return { message: '현재 생성된 방 전체', data: result };
  }

  @Get('list')
  @ApiOperation({ summary: '식당 전체 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
    description: '레스토랑 전체 리스트',
    content: {
      'application/json': {
        example: {
          message: '레스토랑 목록 전체',
          data: [
            { id: 1, restaurantName: '', deliveryFee: 2000, imageUrl: null, businessHours: '' },
            { id: 2, restaurantName: '', deliveryFee: 3000, imageUrl: null, businessHours: '' },
            { id: 3, restaurantName: '', deliveryFee: 4000, imageUrl: null, businessHours: '' },
          ],
        },
      },
    },
  })
  async getRestaurantList() {
    const result = await this.restaurantService.getRestaurantList();
    return { message: '레스토랑 목록 전체', data: result };
  }

  @Get('user-list/:id')
  @ApiOperation({ summary: '선택한 방에 있는 유저 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  @ApiOkResponse({
    description: '해당 방의 참여 유저 리스트',
    content: {
      'application/json': {
        example: {
          message: '1방에 참여한 유저 목록',
          data: [
            { user_id: 20231234, name: '', student_number: 20231234, is_creator: true },
            { user_id: 20235678, name: '', student_number: 20235678, is_creator: false },
          ],
        },
      },
    },
  })
  async getUserInRoom(@Param('id') id: string) {
    const result = await this.restaurantService.getUserInRoom(id);
    return { message: `${id}방에 참여한 유저 목록`, data: result };
  }
}
