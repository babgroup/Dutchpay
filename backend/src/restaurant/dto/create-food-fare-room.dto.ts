import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601 } from 'class-validator';

export class FoodFareRoomDto {
  @ApiProperty({ type: Number, description: '식당 번호', required: true, example: 1 })
  @IsInt()
  restaurantId: number;

  @ApiProperty({ type: Number, description: '주문을 시작하기 위해 필요한 최소 인원', required: true, example: 4 })
  @IsInt()
  minMember: number;

  @ApiProperty({ type: String, description: '방의 마감기한 (ISO8601 형식)', required: true, example: '2024-09-20T20:00:00Z' })
  @IsISO8601()
  deadline: string;
}
