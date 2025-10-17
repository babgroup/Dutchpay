'use client';

import { useState, useEffect } from "react";
import BasicButton from "@/app/components/BasicButton";
import useCustomFetch from "@/common/customFetch";
import { FoodItem } from "@/types/restaurant";
import FoodList from "./FoodList";
import { useParams, useRouter } from "next/navigation";

interface SelectedFood {
  foodId: number;
  quantity: number;
  orderId?: number;
}

export default function MenuSelectDiv() {
  const apiFetch = useCustomFetch();
  const router = useRouter();
  const { id } = useParams();

  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  // API 호출 함수 분리
  const fetchRoomData = async () => {
    const res = await apiFetch(`/restaurant/member/${id}`);
    if (!res.ok) throw new Error(res.message || "방 정보를 가져오지 못했습니다.");
    return res.data;
  };

  const fetchFoods = async (restaurantId: number) => {
    const res = await apiFetch(`/restaurant/list/${restaurantId}`);
    if (!res.ok) throw new Error(res.message || "음식 목록을 가져오지 못했습니다.");
    return res.data;
  };

  // 주문 내역 → selectedFoods 매핑
  const mapOrdersToSelectedFoods = (myOrderItems: any[], foods: FoodItem[]): SelectedFood[] => {
    return myOrderItems.map(item => {
      const food = foods.find(f => f.foodName === item.itemName);
      if (!food) return null;
      return {
        foodId: food.id,
        quantity: item.quantity,
        orderId: item.orderId,
      };
    }).filter(Boolean) as SelectedFood[];
  };

  // 초기 데이터 로딩

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. 내가 시킨 메뉴 조회
        const roomData = await fetchRoomData();
        setRestaurantName(roomData.restaurantName || "이름 없음");

        // 2. 음식 목록 가져오기
        const foodsList = await fetchFoods(roomData.restaurantId);
        setFoods(foodsList || []);

        // 3. 기존 주문이 있으면 selectedFoods 초기화
        if (roomData.myOrderItems?.length) {
          setSelectedFoods(mapOrdersToSelectedFoods(roomData.myOrderItems, foodsList));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "서버 요청 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 메뉴 선택, 수량 증가
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFoods(prev => {
      const exists = prev.find(f => f.foodId === food.id);
      if (exists) {
        return prev.map(f =>
          f.foodId === food.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { foodId: food.id, quantity: 1 }];
    });
  };

  // 수량 감소 / 0이면 DELETE
  const handleDecrease = async (foodId: number) => {
    const food = selectedFoods.find(f => f.foodId === foodId);
    if (!food) return;

    if (food.quantity <= 1) {
      if (food.orderId) {
        await apiFetch(`/restaurant/food-order/${id}/${food.orderId}`, { method: "DELETE" });
      }
      setSelectedFoods(prev => prev.filter(f => f.foodId !== foodId));
    } else {
      setSelectedFoods(prev =>
        prev.map(f => f.foodId === foodId ? { ...f, quantity: f.quantity - 1 } : f)
      );
    }
  };

  // 메뉴 결정 / POST 요청
  
  const handleSubmit = async () => {
    if (!selectedFoods.length) return alert("최소 한 개 이상의 메뉴를 선택해주세요.");
    setPosting(true);

    try {
      const updatedFoods: SelectedFood[] = [];

      for (const f of selectedFoods) {
        const res = await apiFetch(`/restaurant/food-order/${id}`, {
          method: "POST",
          body: JSON.stringify({
            foodItemId: f.foodId,
            quantity: f.quantity,
          }),
        });
        if (!res.ok) {
          alert("주문 실패: " + res.message);
          updatedFoods.push(f); // 실패하면 기존 상태 유지
        } else {
          updatedFoods.push({ ...f, orderId: res.data?.orderId || f.orderId });
        }
      }

      setSelectedFoods(updatedFoods);
      alert("메뉴 선택 완료!");
      
      const currentRole = localStorage.getItem("currentRole");

      if (currentRole === "leader") {
        router.push(`/delivery/leader/${id}`)
      } else {
        router.push(`/delivery/member/${id}`)
      }

    } catch (err) {
      alert("주문 중 오류 발생");
      if (err instanceof Error) console.log(err.message);
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col w-full justify-center items-center text-black">
      {restaurantName && <h2 className="text-xl font-bold mb-4">{restaurantName}</h2>}
      <FoodList
        foods={foods}
        selectedFoods={selectedFoods}
        onSelect={handleSelectFood}
        onDecrease={handleDecrease}
      />
      <BasicButton
        text={posting ? "주문 중..." : "메뉴 결정하기"}
        isDisable={posting || selectedFoods.length === 0} // 최소 메뉴 1개 이상은 선택되어 있어야 하도록
        onClick={handleSubmit}
      />
    </div>
  );
}