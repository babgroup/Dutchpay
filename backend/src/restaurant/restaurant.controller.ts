import { Controller, Post, Body} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('food-fare-room')
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto) {
    //자기 자신의 id를 세션으로 처리하면 body에 자기자신의 id는 안보내도됨. 현재는 body에 넣어서 설계.
    return await this.restaurantService.createFoodFareRoom(dto);
  }
}
