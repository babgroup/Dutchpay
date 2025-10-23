'use client';

import { useEffect, useState } from "react";
import BasicButton from "@/app/components/BasicButton";
import useCustomFetch from "@/common/customFetch";
import { useRouter } from "next/navigation";

interface PartyButtonDivProps {
  startTime: string; // 부모에서 전달받은 시작 시간
  minUser?: number;
  currentUserCount?: number;
  roomId: string; // 상위 컴포넌트에서 useParams 로 가져오는데 값을 string으로 반환 함
}

export default function PartyButtonDiv({ startTime, roomId, minUser = 0, currentUserCount = 0 }: PartyButtonDivProps) {
  const apiFetch = useCustomFetch();
  const [progress, setProgress] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPartyProgress = async () => {
      try {
        const res = await apiFetch(`/restaurant/progress/${roomId}`);
        if (res.ok && res.data.data !== undefined) {
          setProgress(res.data.data); // 상태가 업데이트 되면 값 날아가지만 리랜더링 위해 값 할당
        } else {
          console.error("progress fetch failed:", res?.message ?? "Unknown error");
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchPartyProgress();
  }, [roomId]); // 파라미터 바뀌면 새 값 받아서 다시 그려주기

  const patchProgress = async (nextValue: number) => {
    try {
      await apiFetch(`/restaurant/leader/update-progress${nextValue}/${roomId}`, { method: "PATCH"});
      setProgress(nextValue);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }; // 프로그레스 번호 빼고 같은 api 하나로 합침, patchProgress(nextValue) 와 같은 형태로 사용

  const deadlinePassed = new Date(startTime).getTime() < Date.now();

  if (progress === null) return <p>로딩 중...</p>; // API 완료 전 렌더링 차단

  return (
    <div className="w-full flex flex-col items-center p-2 gap-2">
      {progress === 0 ? (
        // 0단계: 메뉴 선택/계좌번호 공개
        <>
          <BasicButton
            text="계좌번호 공개하기"
            isDisable={!deadlinePassed || currentUserCount < minUser} // 배달 시작 시간과 최소 인원 모두 만족 할 경우 활성화
            onClick={() => patchProgress(1)}
          />
        </>
      ) : progress === 1 ? (
        // 1단계: 배달 도착 알림
        <BasicButton
          text="배달 도착 알려주기"
          isDisable={progress !== 1}
          onClick={async () => {
            await patchProgress(2);
            localStorage.removeItem("currentRoomId");
            localStorage.removeItem("currentRole");
          }}
        />
      ) : (
        // 2단계 이상: 배달 완료 안내 -> 종료는 member 측에서 다 받았다고 해줘야 함
        <>
          <p className="flex flex-col text-center text-md">
            배달 도착을 알렸습니다. <br />
            모든 멤버의 음식수령이 끝난 후 파티는 종료됩니다.
          </p>
          <BasicButton
            text="파티 기록 보러가기"
            onClick={() => router.push("/")} // 파티 기록 보기는 경로로 수정 필요
          />
        </>
      )}
    </div>
  );
}