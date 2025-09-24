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