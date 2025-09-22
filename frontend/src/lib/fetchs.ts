import { BASE_URL } from "@/common/apiUrl";
import { CurrentRoom, PostFoodFareRoomData } from "@/types/restaurant";
import { RestaurantList } from "@/types/restaurant";

//일단 fetch코드들 분리해서 적어보기...

//GET

// 모든 룸 정보 가져오기 - /restaurant/current-room
export async function getCurrentRooms(): Promise<CurrentRoom[]> {
  const res = await fetch(`${BASE_URL}/current-room`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return (
    res.json()
  )
};

// 레스토랑 전체 목록 반환 - /restaurant/list 
// 프로미스로 반환 될 데이터가 RestaurantList 타입
export async function getRestaurantsList(): Promise<RestaurantList[]> {
  const res = await fetch(`${BASE_URL}/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return (
    res.json()
  )
};


// POST

// 배달 룸 만들기 - /restaurant/food-fare-room 
// Promise로 반환 될 json 데이터가 RestaurantList 타입
export async function postFoodFareRoom(data: PostFoodFareRoomData): Promise<RestaurantList[]> {
  const res = await fetch(`${BASE_URL}/food-fare-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ foodFareRoom: data }), //JSON.stringify로 문자열화
  });

  if (!res.ok) {
    throw new Error("Failed to create food fare room");
  }

  return res.json();
};

// 다른 컴포넌트에서 이렇게 사용
// await postFoodFareRoom({
//   restaurant_id: 3,
//   min_member: 4,
//   deadline: "2025-07-07T15:30:00"
// });