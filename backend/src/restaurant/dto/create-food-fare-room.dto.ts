import { IsInt, IsISO8601 } from 'class-validator';

export class FoodFareRoomDto {
  @IsInt()
  restaurantId: number;

  @IsInt()
  minMember: number;

  @IsISO8601()
  deadline: string;

  @IsInt()
  userId: number;
}
