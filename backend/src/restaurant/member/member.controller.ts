import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('restaurant/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/:roomId/:userId')
  async getMemberMenu(@Param('userId') userId: string, @Param('roomId') roomId: string) {
    const result = await this.memberService.getMemberMenu(+userId, +roomId)
    return {
      message: `${roomId}방에서 내가 시킨 메뉴`,
      data: result
    };
  }

  @Patch('delivery-confirmation/:id')
  async patch2Delivery(@Param('id') id: string) {
    await this.memberService.patch2Delivery(id)
    return {
      message: `foodJoinUser ${id}번 방에서 delivery_confirmation 1로 변경`,
    };
  }
}
