import { Controller, Get, Param } from '@nestjs/common';
import { LeaderService } from './leader.service';

@Controller('restaurant/leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}

  @Get(':id')
  async getLeaderFoodFareRoom(@Param('id') id: string) {
    const result = await this.leaderService.getLeaderFoodFareRoom(id);

    return {
      message: `${id}방장 방 정보`,
      data: result,
    };
  }
}
