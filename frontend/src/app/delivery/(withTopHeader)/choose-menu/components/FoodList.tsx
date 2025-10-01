'use client';

import { FoodItem } from "@/types/restaurant";
import Image from "next/image";

interface FoodListProps {
  foods: FoodItem[];
  selectedFoods: { foodId: number; quantity: number }[];
  onSelect: (food: FoodItem) => void;
  onDecrease: (foodId: number) => void;
}

export default function FoodList({ foods, selectedFoods, onSelect, onDecrease }: FoodListProps) {
  return (
    <div className="m-4 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      {foods.map(food => {
        const selected = selectedFoods.find(f => f.foodId === food.id);
        return (
          <div
            key={food.id}
            className={`rounded-lg p-2 flex flex-col items-center border-2 ${
              selected ? "border-amber-400" : "border-transparent"
            }`}
          >
            <div className="w-full h-24 relative">
              <Image
                src={food.imageUrl || "/placeholder.png"}
                alt={food.foodName}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium">{food.foodName}</p>
              <p className="text-sm text-gray-500">{food.foodPrice.toLocaleString()}원</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => onDecrease(food.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{selected?.quantity || 0}</span>
              <button
                onClick={() => onSelect(food)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}