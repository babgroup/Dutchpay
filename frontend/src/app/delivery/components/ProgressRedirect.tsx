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
        const progress = res.data; 
        console.log(progress)
        if (progress !== 3 && progress !== 2) {
          router.replace(`/delivery/${role}/${roomId}`);
        }
      } catch(error) {
        console.log(error);
      }
    }

    fetchProgress();
  }, [apiFetch, router]);

  return null; // ui X
}