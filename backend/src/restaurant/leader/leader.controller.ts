import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('restaurant/leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  async getLeaderFoodFareRoom(@Param('id') id: string, @Req() req: Request) {
    const result = await this.leaderService.getLeaderFoodFareRoom(id, req.user.id);

    return {
      message: `${id}방장 방 정보`,
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('update-progress/:id')
  async patch3Progress(@Param('id') id: string, @Req() req: Request) {
    await this.leaderService.patch3Progress(id, req.user.id)

    return {
      message: `foodFareRoom ID ${id}번 방에서 progress 3으로 변경`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('break-up/:id')
  async patch4progress(@Param('id') id: string, @Req() req: Request) {
    await this.leaderService.patch4Progress(id, req.user.id)

    return {
      message: `foodFareRoom ID ${id}방에서 progress 4로 변경`,
    };
  }
}
