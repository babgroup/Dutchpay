import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('restaurant/leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '방장 방 정보', description: 'jwt토큰을 이용해 자신이 만든 방인지 체크 후 해당 방의 정보를 불러옴.' })
  @ApiResponse({
    description: '방장용 상세 정보',
    content: {
      'application/json': {
        example: {
          message: '1번 방 정보',
          data: {
            restaurantName: '',
            minUser: 3,
            deadline: '2025-07-07T15:30:00.000Z',
            deliveryFee: 2000,
            user: [
              {
                userId: 20231234,
                userName: '',
                foodOrder: [
                  { itemName: '', quantity: 1, price: 12000 },
                ],
              },
              {
                userId: 20235678,
                userName: '',
                foodOrder: [
                  { itemName: '', quantity: 2, price: 10000 },
                ],
              },
            ],
          },
        },
      },
    },
  })
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
  @ApiOperation({ summary: '주문 성공', description: '해당 방 번호를 param으로 받아 jwt토큰 인증 후 상태를 주문 성공으로 변경' })
  @ApiParam({ name: 'id', type: Number, description: '업데이트할 방 ID', example: 1, })
  @ApiOkResponse({
    description: '업데이트 결과 메시지',
    content: {
      'application/json': {
        example: { message: 'foodFareRoom ID 1번 방에서 progress 3으로 변경' },
      },
    },
  })
  @Patch('update-progress/:id')
  async patch3Progress(@Param('id') id: string, @Req() req: Request) {
    await this.leaderService.patch3Progress(id, req.user.id)

    return {
      message: `foodFareRoom ID ${id}번 방에서 progress 3으로 변경`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '파티 해산', description: '해당 방 번호를 param으로 받아 jwt토큰 인증 후 방 해산' })
  @ApiParam({ name: 'id', type: Number, description: '업데이트할 방 ID', example: 1, })
  @ApiOkResponse({
    description: '업데이트 결과 메시지',
    content: {
      'application/json': {
        example: { message: 'foodFareRoom ID 1번 방에서 progress 4로 변경' },
      },
    },
  })
  @Patch('break-up/:id')
  async patch4progress(@Param('id') id: string, @Req() req: Request) {
    await this.leaderService.patch4Progress(id, req.user.id)

    return {
      message: `foodFareRoom ID ${id}방에서 progress 4로 변경`,
    };
  }
}
