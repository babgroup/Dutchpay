import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('food-fare-room')
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto) {
    // 자기 자신의 id를 세션으로 처리하면 body에 자기자신의 id는 안보내도됨. 현재는 body에 넣어서 설계.
    return await this.restaurantService.createFoodFareRoom(dto);
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
