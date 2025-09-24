import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('food-fare-room')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'dutchPay 방 생성', description: 'foodFareRoom을 생성한다. jwt토큰을 이용해 creatorUser에 자신의 Id를 넣는다.' })
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto, @Req() req: Request) {
    return await this.restaurantService.createFoodFareRoom(dto, req.user.id);
  }

  @Get('current-rooms')
  @ApiOperation({ summary: '현재 생성되어 있는 방 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  async getCurrentRooms() {
    const result = await this.restaurantService.getCurrentRooms();
    return { message: '현재 생성된 방 전체', data: result };
  }

  @Get('list')
  @ApiOperation({ summary: '식당 전체 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  async getRestaurantList() {
    const result = await this.restaurantService.getRestaurantList();
    return { message: '레스토랑 목록 전체', data: result };
  }

  @Get('user-list/:id')
  @ApiOperation({ summary: '선택한 방에 있는 유저 목록', description: 'jwt토큰 검사 없이 누구나 볼 수 있음.' })
  async getUserInRoom(@Param('id') id: string) {
    const result = await this.restaurantService.getUserInRoom(id);
    return { message: `${id}방에 참여한 유저 목록`, data: result };
  }
}
