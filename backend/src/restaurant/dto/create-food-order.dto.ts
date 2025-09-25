import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsInt, Min, ValidateNested } from "class-validator";

export class CreateFoodOrderDto {
  @ApiProperty({ type: Number, description: '메뉴 번호', required: true, example: 1 })
  @IsInt()
  @IsDefined()
  @Min(1)
  foodItemId: number;
  
  @ApiProperty({ type: Number, description: '수량', required: true, example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateMyOrdersDto {
  @ApiProperty({
    type: [CreateFoodOrderDto],
    description: '주문 항목 목록',
    required: true,
    example: [
      { foodItemId: 1, quantity: 2 },
      { foodItemId: 3, quantity: 1 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateFoodOrderDto)
  items: CreateFoodOrderDto[];
}