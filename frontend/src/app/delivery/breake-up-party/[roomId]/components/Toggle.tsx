'use client';

import BasicButton from "@/app/components/BasicButton";
import { useState } from "react";

export default function Toggle() {
  const [selected, setSelected] = useState<string>("매장 사정");

  const handleSubmit = async () => {
    console.log("선택한 해산 사유:", selected);
    // api 요청 들어갈 자리
  };

  return (
    <div className="flex flex-col justify-between h-[60vh] w-full max-w-md mx-auto p-4">
      {/* 상단: 레이블 + select */}
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="reason" className="block mb-2 text-base font-medium text-gray-700">
          해산 사유
        </label>
        <select
          id="reason"
          name="reason"
          className="block w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="매장 사정">주문 불가 - 매장 사정</option>
          <option value="인원 부족">인원 부족</option>
          <option value="기타">기타</option>
        </select>
      </div>

      {/* 하단: 버튼 */}
      <div className="w-full flex justify-center mt-10">
        <BasicButton 
          text="네. 파티를 해산합니다." 
          onClick={handleSubmit} 
        />
      </div>
    </div>
  );
}