'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BasicButton from "@/app/components/BasicButton";
import useCustomFetch from "@/common/customFetch";
import { FoodItem } from "@/types/restaurant";
import FoodList from "./FoodList";
import { useParams } from "next/navigation";

interface SelectedFood {
  foodId: number;
  quantity: number;
  orderId?: number;
}

export default function MenuSelectDiv() {
  const apiFetch = useCustomFetch();
  const router = useRouter();
  const {id} = useParams();

  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. 내가 시킨 메뉴 조회
        const roomRes = await apiFetch(`/restaurant/member/${id}`);
        if (!roomRes.ok) {
          setError(roomRes.message || "방 정보를 가져오지 못했습니다.");
          return;
        }
        const roomData = roomRes.data;
        setRestaurantName(roomData.restaurantName || "이름 없음");

        // 2. 전체 레스토랑 목록에서 id 찾기 - 데이터 수가 적어서 가능한 방법...
        const listRes = await apiFetch(`/restaurant/list`);
        if (!listRes.ok) {
          setError(listRes.message || "레스토랑 목록을 가져오지 못했습니다.");
          return;
        }
        const restaurant = listRes.data.find((r) => r.restaurantName === roomData.restaurantName);
        if (!restaurant) {
          setError("해당 이름의 레스토랑을 찾을 수 없습니다.");
          return;
        } // find() = 조건을 만족하는 첫 번째 요소를 찾아 반환, map 처럼 사용

        // 3. 음식 목록 가져오기
        const foodsRes = await apiFetch(`/restaurant/list/${restaurant.id}`);
        if (!foodsRes.ok) {
          setError(foodsRes.message || "음식 목록을 가져오지 못했습니다.");
          return;
        }
        setFoods(foodsRes.data || []); // 메뉴가 없으면 빈 배열로 초기화

        // 4. 기존 주문이 있으면 selectedFoods 초기화
        if (roomData.myOrderItems?.length) {
          const mappedOrders: SelectedFood[] = roomData.myOrderItems.map((item) => {
            const food = foodsRes.data.find((f) => f.foodName === item.itemName); // 주문 내역(myOrderItems) - 찾은 메뉴(foodsRes.data) 매핑해서

            if (!food) return null;
            return {
              foodId: food.id, // 이런 객체를 만들어서(myOrderItems의 음식 이름, 수량 + foodsRes의 이름, 음식 id) 반환
              quantity: item.quantity,
              orderId: item.orderId,
            };
          }).filter(Boolean) as SelectedFood[];
          setSelectedFoods(mappedOrders);
        }
      } catch {
        setError("서버 요청 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFoods(prev => {
      const exists = prev.find(f => f.foodId === food.id);
      // 이미 선택 된 음식인지 찾기

      if (exists) {
        // 이미 있다면 quantity +1
        return prev.map(f =>
          f.foodId === food.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      // 없으면 새 음식 추가, quantity = 1
      return [...prev, { foodId: food.id, quantity: 1 }];
    });
  };

  const handleDecrease = async (foodId: number) => {
    const food = selectedFoods.find(f => f.foodId === foodId);
    // 이미 선택한 음식 중에서 같은 foodId 찾기
    if (!food) return;

    if (food.quantity <= 1) {
      // 수량이 1 이하
      if (food.orderId) {
        // 이미 주문된 음식이라면 DELETE API 요청
        await apiFetch(`/restaurant/food-order/${id}/${food.orderId}`, { method: "DELETE" });
      }
      // 상태에서도 해당 음식 제거
      setSelectedFoods(prev => prev.filter(f => f.foodId !== foodId));
    } else {
      // 수량이 2 이상일 경우 - 1 빼기
      setSelectedFoods(prev =>
        prev.map(f =>
          f.foodId === foodId ? { ...f, quantity: f.quantity - 1 } : f
        )
      );
    }
  };

  const handleSubmit = async () => {
    if (!selectedFoods.length) return alert("최소 한 개 이상의 메뉴를 선택해주세요.");
    setPosting(true);

    try {
      const updatedFoods: SelectedFood[] = [];

      for (const f of selectedFoods) {
        // 1 - 새 주문 (orderId 없음 → POST)
        if (!f.orderId) {
          const res = await apiFetch(`/restaurant/food-order/${id}`, {
            method: "POST",
            body: JSON.stringify({
              foodItemId: f.foodId,
              quantity: f.quantity,
            }),
          });
          if (!res.ok) {
            alert("메뉴 주문 실패: " + res.message);
          } else {
            updatedFoods.push({
              ...f,
              orderId: res.data?.orderId, // 서버가 준 orderId 저장
            });
          }
        }
        // 2 - 기존 주문 수정 - POST 다시 하기
        else {
          const res = await apiFetch(`/restaurant/food-order/${id}`, {
            method: "POST",
            body: JSON.stringify({
              foodItemId: f.foodId,
              quantity: f.quantity,
            }),
          });
          if (!res.ok) {
            alert("수정 실패: " + res.message);
            updatedFoods.push(f); // 실패하면 기존 상태 유지
          } else {
            updatedFoods.push(f);
          }
        }
      }

      setSelectedFoods(updatedFoods);
      alert("메뉴 선택 완료!");
      // router.back();
    } catch (error) {
      alert("주문 중 오류 발생");
      if (error instanceof Error) console.log(error.message);
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