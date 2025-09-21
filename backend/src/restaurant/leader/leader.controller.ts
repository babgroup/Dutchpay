import { Controller, Get, Param, Patch } from '@nestjs/common';
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

  @Patch('update-progress/:id')
  async patch3Progress(@Param('id') id: string) {
    await this.leaderService.patch3Progress(id)

    return {
      message: `foodFareRoom ID ${id}번 방에서 progress 3으로 변경`,
    };
  }
}
