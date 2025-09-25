'use client';

import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import useFetch from "@/common/customFetch";
import { MyPartyData } from "@/types/restaurant";
import { formaTime } from "@/common/formatDate";

interface PartyInfoDivProps {
  onDeadlineChange?: (deadline: string) => void; // 부모 컴포넌트에 데드라인 전달(주문버튼 버튼 활성화용)
}

export default function PartyInfoDiv({ onDeadlineChange }: PartyInfoDivProps) {
  const Fetch = useFetch();
  const [infos, setInfos] = useState<MyPartyData>({
    restaurantName: "",
    minUser: 0,
    deadline: "",
    deliveryFee: 0,
    user: [],});
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  useEffect(() => {
    const fetchMyParty = async () => {
      setLoading(true);
      setMessage('로딩 중입니다...');
      try {
        const data = await Fetch("/restaurant/leader/1");
        setInfos(data.data);
        if(onDeadlineChange) onDeadlineChange(data.data.deadline);
      } catch (error) {
        if(error instanceof Error) setMessage(error.message) 
          //error instanceof Error 사용하면 모든 에러 객체가 true값이 되므로 모든 에러 종류에 대해 일괄적으로 처리가능(JS 표준 에러 객체, 라이브러리(axios 같은) 에러 객체 등)...
          // = Error객체를 상속받는 모든 에러 객체가 true가 됨
        setInfos({
          restaurantName: "",
          minUser: 0,
          deadline: "",
          deliveryFee: 0,
          user: [],
        });
      } finally {
        setLoading(false);
        setMessage('');
      }
    };
    fetchMyParty();
  }, [])


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="mb-4 text-xl font-black">{infos.restaurantName} | 주문 시간 : {formaTime(infos.deadline)}</p>
      {(!infos.user || infos.user.length === 0) ? (
        <p className="text-center text-gray-400 mt-2">아직 파티에 참가한 사람이 없어요. 😳</p>
      ) : (
        <div className="w-full h-[33vw] overflow-y-auto flex flex-col items-center">
          {infos.user.map((member) => (
            <MemberCard
              key={member.userId}
              userId={member.userId}
              userName={member.userName}
              foodOrder={member.foodOrder}
            />
          ))}
        </div>
      )}
    </div>
  )
}