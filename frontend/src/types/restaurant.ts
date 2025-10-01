export interface CurrentRoom {
	id: number,
	restaurantName: string,
	deliveryFee: number,
	minUser: number,
	currentUsers: number,
	deadline: string
	imageUrl: string,
};

export interface RoomListProps {
	id: number,
	restaurantName: string,
	deliveryFee: number,
	minUser: number,
	currentUsers: number,
	deadline: string
	imageUrl: string,
	discount: number,
	onClick?: React.MouseEventHandler<HTMLDivElement>
};

export interface RestaurantList {
	id:1,
	restaurantName: string,
	deliveryFee: number,
	imageUrl: string,
	businessHours: string
}

export interface PostFoodFareRoomData {
  restaurant_id: number;
  min_member: number;
  deadline: string;
}

export interface RoomMemberProps {
  userId: number;
  userName: string;
  foodOrder: FoodItem[];
}

export interface FoodItem {
  id: number;
  foodName: string;
  foodPrice?: number;
  imageUrl: string;
}

export interface MyPartyData {
  restaurantName: string;
  minUser: number;
  deadline: string;
  deliveryFee: number;
  user: RoomMemberProps[];
}
