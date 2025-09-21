import { Type } from 'class-transformer';

class MyOrderItemType {
  itemName: string;
  quantity: number;
  price: number;
}

export class FoodRoomMemberResponseType {
  foodJoinUserId: number;
  restaurantName: string;
  deadline: string;
  deliveryFee: number;
  memberCount: number;
  @Type(() => MyOrderItemType)
  myOrderItems: MyOrderItemType[];
}
