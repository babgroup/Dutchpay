import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('food-fare-room')
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto, @Req() req: Request) {
    return await this.restaurantService.createFoodFareRoom(dto, req.user.id);
  }

  @Get('current-rooms')
  async getCurrentRooms() {
    const result = await this.restaurantService.getCurrentRooms();
    return { message: '현재 생성된 방 전체', data: result };
  }

  @Get('list')
  async getRestaurantList() {
    const result = await this.restaurantService.getRestaurantList();
    return { message: '레스토랑 목록 전체', data: result };
  }

  @Get('user-list/:id')
  async getUserInRoom(@Param('id') id: string) {
    const result = await this.restaurantService.getUserInRoom(id);
    return { message: `${id}방에 참여한 유저 목록`, data: result };
  }
}
