'use client';
import { RoomMemberProps } from "@/types/restaurant";

export default function MemberCard({
  userId,
  userName,
  foodOrder = [],
}: RoomMemberProps) {
  //최종 가격 계산
  const totalPrice = foodOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 w-full max-w-xs flex flex-col gap-2 m-1 border border-gray-200 hover:bg-gray-50">
      {/* 유저 이름, 아이디 */}
      <div className="inline-flex items-center bg-gray-100 rounded-md px-3 py-0.5 text-base font-medium text-gray-700 w-fit mb-1 text-center">
        <span className="">{userId} {userName}</span>
      </div>

      {/* 음식 주문 내역 */}
      <div className="flex flex-col gap-0.5 text-sm text-gray-800 font-medium mb-1">
        {foodOrder.map((menu, index) => (
          <div key={index}>
            {menu.itemName} x {menu.quantity} = {menu.price * menu.quantity}원
          </div>
        ))}
      </div>

      <hr className="my-2 border-0.5 border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-md text-orange-400">
          메뉴 + 배달비 = <span className="font-black">{totalPrice}원</span>
        </span>
      </div>
    </div>
  );
}