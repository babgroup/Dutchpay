import { Type } from 'class-transformer';

class MyOrderItemType {
  itemName: string;
  quantity: number;
  price: number;
}

export class FoodRoomMemberResponseType {
  restaurantId: number;
  foodJoinUserId: number;
  restaurantName: string;
  deadline: string;
  deliveryFee: number;
  memberCount: number;
  @Type(() => MyOrderItemType)
  myOrderItems: MyOrderItemType[];
  primaryBankAccount: {
    id: number;
    bankName: string;
    accountNumber: string;
  };
}
