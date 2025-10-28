import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('restaurant/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  
  @Post(':roomId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '해당 방에 참여', description: 'jwt토큰으로 이미 참여한 방인지 체크'})
  @ApiParam({ name: 'roomId', type: Number, description: '방 번호', example: 2 })
  @ApiCreatedResponse({
    description: 'member가 2방에 참여',
    content: {
      'application/json': {
        example: {
          message: 'member가 2방 참여',
          data: {
            id: 5,
            user: { id: 1 },
            deliveryConfirmation: 0,
            foodFareRoom: { id: 2 },
          },
        },
      },
    },
  })
  async joinFoodRoom(@Param('roomId') roomId: string, @Req() req: Request) {
    const result = await this.memberService.joinFoodRoom(+roomId, req.user.id);
    return {
      message: `member가 ${roomId}방 참여`,
      data: result
    }
  }

  @Get(':roomId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '내가 시킨 메뉴 조회', description: 'jwt토큰 인증 후 자신이 참여한 방만 보이게. 현재 참여코드가 없음'})
  @ApiParam({ name: 'roomId', type: Number, description: '방 번호', example: 1 })
  @ApiOkResponse({
    description: '성공 시 내 주문 항목을 반환',
    content: {
      'application/json': {
        example: {
          message: '1번방에서 내가 시킨 메뉴',
          data: {
            foodJoinUserId: 1,
            restaurantId: 1, 
            restaurantName: 'aaaa',
            deadline: 'Mon Jul 07 2025 15:30:00 GMT+0000 (Coordinated Universal Time)',
            deliveryFee: 2000,
            memberCount: 2,
            myOrderItems: [
              { orderId: '6', itemName: '치킨', quantity: 1, price: 12000 },
            ],
          },
        },
      },
    },
  })
  async getMemberMenu(@Param('roomId') roomId: string, @Req() req: Request) {
    const result = await this.memberService.getMemberMenu(+roomId, req.user.id)
    return {
      message: `${roomId}방에서 내가 시킨 메뉴`,
      data: result
    };
  }

  @Patch('delivery-confirmation/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '배달 수령 확인', description: 'jwt토큰 확인 후 자신의 주문에만 상태를 변경가능' })
  @ApiParam({ name: 'id', type: Number, description: '방 ID', example: 1, })
  @ApiOkResponse({
    description: '성공 메시지',
    content: {
      'application/json': {
        example: {
          message: 'foodJoinUser 1번 방에서 delivery_confirmation 1로 변경',
        },
      },
    },
  })
  async patch2Delivery(@Param('id') id: string, @Req() req: Request) {
    await this.memberService.patch2Delivery(id, req.user.id)
    return {
      message: `foodJoinUser ${id}번 방에서 delivery_confirmation 1로 변경`,
    };
  }

  @Delete('foodFareRoom/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '해당 방 나가기', description: 'jwt토큰 인증 후 자신이 참여한 방에서 나가기' })
  @ApiParam({ name: 'id', type: Number, description: '방 ID', example: 2 })
  @ApiOkResponse({
    description: '삭제 성공 시 200 반환',
  })
  async leaveFoodFareRoom(@Param('id') roomId: string, @Req() req: Request): Promise<void> {
    await this.memberService.leaveFoodFareRoom(+roomId, req.user.id);
  }
}
