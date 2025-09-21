import { Type } from 'class-transformer';

class FoodOrderInformationType {
  itemName: string;
  quantity: number;
  price: number;
}

class JoinUserInformationType {
  userId: number;
  userName: string;
  @Type(() => FoodOrderInformationType)
  foodOrder: FoodOrderInformationType[];
}

export class FoodRoomLeaderResponseType {
  restaurantName: string;
  minUser: number;
  deadline: string;
  deliveryFee: number;
  @Type(() => JoinUserInformationType)
  user: JoinUserInformationType[];
}
