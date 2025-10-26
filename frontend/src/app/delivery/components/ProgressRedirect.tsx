"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/common/customFetch";

export default function ProgressRedirect() {
  const router = useRouter();
  const apiFetch = useCustomFetch();

  useEffect(() => {
    const init = async () => {
      try {
        let roomId = localStorage.getItem("currentRoomId");
        let role: string = localStorage.getItem("currentRole") ?? "";

        // 로컬에 정보 없으면 API로 조회
        if (!roomId || !role) {
          const res = await apiFetch("/restaurant/my-room");
          const { inRoom, roomId: fetchedRoomId, role: fetchedRole } = res.data.data;

          // 참여 중인 방이 없으면 코드 중지
          if (!inRoom) return;

          // 가져온 값 로컬에 저장
          roomId = String(fetchedRoomId);
          role = fetchedRole.toLowerCase(); // api 로 받아온 role 데이터를 항상 소문자로
          localStorage.setItem("currentRoomId", roomId);
          localStorage.setItem("currentRole", role);
        } else {
          // 기존 저장된 role도 소문자 통일
          role = role.toLowerCase();
        }

        // 진행 상태 조회
        const progressRes = await apiFetch(`/restaurant/progress/${roomId}`);
        const progress = progressRes.data.data;
        console.log("Progress:", progress);

        // 끝난 상태(완료, 해산)일 때 로컬 스토리지에서 값 지우기
        if (progress === 2 || progress === 3) {
          // 완료 or 해산 상태라면 로컬 데이터 삭제
          localStorage.removeItem("currentRoomId");
          localStorage.removeItem("currentRole");
        } else {
          // 파티 끝나지 않았으면 해당 페이지로 이동
          router.replace(`/delivery/${role}/${roomId}`);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    init();
  }, [apiFetch, router]);

  return null; // ui X
}