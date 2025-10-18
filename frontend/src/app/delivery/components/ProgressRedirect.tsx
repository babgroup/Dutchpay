"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/common/customFetch";

export default function ProgressRedirect() {
  const router = useRouter();
  const apiFetch = useCustomFetch();

  useEffect(() => {
    const roomId = localStorage.getItem("currentRoomId");
    const role = localStorage.getItem("currentRole"); 
    if (!roomId || !role) return;

    const fetchProgress = async () => {
      try {
        const res = await apiFetch(`/restaurant/progress/${roomId}`);
        const progress = res.data.data; 
        console.log(progress)

        // 끝난 상태(완료, 해산)일 때 로컬 스토리지에서 값 지우기
        if (progress === 2 || progress === 3) {
          localStorage.removeItem("currentRoomId");
          localStorage.removeItem("currentRole");
        }

        // 파티 끝나지 않았으면 해당 페이지로 이동
        if (progress !== 2 && progress !== 3) {
          router.replace(`/delivery/${role}/${roomId}`);
        }
      } catch(error) {
        if (error instanceof Error) console.log(error.message)
      }
    };
    fetchProgress();
  }, [apiFetch, router]);

  return null; // ui X
}