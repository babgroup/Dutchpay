'use client';

import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import useFetch from "@/common/customFetch";
import { MyPartyData } from "@/types/restaurant";
import { formaTime } from "@/common/formatDate";

export default function PartyInfoDiv() {
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
        const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null; //로컬스토리지에서 토큰 받아오기, 임시

        // api id 임시
        const data = await Fetch("/restaurant/leader/1", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Fetch 결과:", data);
        setInfos(data.data);
      } catch (e: unknown) {
        setMessage(e.message);
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
        infos.user.map((member) => (
          <MemberCard
            key={member.userId}
            userId={member.userId}
            userName={member.userName}
            foodOrder={member.foodOrder}
          />
        ))
      )}
    </div>
  )
}