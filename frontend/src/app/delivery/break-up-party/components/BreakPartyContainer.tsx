'use client';

import BasicButton from "@/app/components/BasicButton";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useCustomFetch from "@/common/customFetch";

export default function BreakPartyContainer() {
  const [selected, setSelected] = useState<string>("매장 사정");
  const {id} = useParams();
  const apiFetch = useCustomFetch();
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setMessage("")
      const res = await apiFetch(`/restaurant/leader/update-progress3/${id}`, {method: 'PATCH'})
      if(!res.ok) {
        setMessage(`파티 해산에 실패했습니다. 잠시 후 다시 시도해주세요.`)
        return;
      }
      alert("성공적으로 파티가 해산 되었습니다. 메인 페이지로 이동합니다.");
      router.push('/');
    } catch (error) {
      if(error instanceof Error) setMessage(`오류 발생 : ${error.message}`)
    }
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

      { message != "" && (
        <p className="text-center m-1 text-md text-amber-500">{message}</p>
      )}

      {/* 하단: 버튼 */}
      <div className="w-full flex justify-center mt-10">
        <BasicButton 
          text="네. 파티를 해산합니다." 
          onClick={handleSubmit} 
          isDisable={!selected}
        />
      </div>
    </div>
  );
}