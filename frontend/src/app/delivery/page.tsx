"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RoomListDiv from "./components/RoomListDiv";
import Title from "../components/Title";
import PlusButton from "./components/PlusButton";
import BottomNavLayout from "../components/BottomNavLayout";
import useCustomFetch from "@/common/customFetch";

export default function Home() {
  const router = useRouter();
  const apiFetch = useCustomFetch();
  const [progress, setProgress] = useState();

  useEffect(() => {
    const roomId = localStorage.getItem("currentRoomId");
    const fetchProgress = async () => { 
      if (!roomId) return;
      try {
        const res = await apiFetch(`/restaurant/progress/${roomId}`, {method: 'GET'})
        if(res.ok) {
          setProgress(res.data)
        }
      } catch(error) {
        if(error instanceof Error) console.log(error.message);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    const roomId = localStorage.getItem("currentRoomId");
    const role = localStorage.getItem("currentRole"); 
    if (!roomId || !role || !progress) return;

      if (progress !== "3" && progress !== "2") { // 2(주문완료) 혹은 3(파티 해산)이 되었으면 더이상 강제 라우팅 X
        router.replace(`/delivery/${role}/${roomId}`);
      }
  }, [progress, router]);

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto pt-0 mb-20">
      <Title mainTitle="배달 Delivery" subTitle="배달비 부담은 낮추고, 포만감은 2배로!" />
      <RoomListDiv />
      
      
      <PlusButton />
      <BottomNavLayout />
    </div>
  );
}