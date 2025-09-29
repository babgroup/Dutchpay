'use client';

import { useEffect, useState } from "react";
import BasicButton from "@/app/components/BasicButton";
import useCustomFetch from "@/common/customFetch";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PartyButtonDivProps {
  startTime: string; // 부모에서 전달받은 시작 시간
}

export default function PartyButtonDiv({ startTime }: PartyButtonDivProps) {
  const apiFetch = useCustomFetch();
  const [progress, setProgress] = useState<number>(0);
  const {id} = useParams(); //url 의 패스 파라ㅁ
  const router = useRouter();

  useEffect(() => {
    const fetchPartyProgress = async () => {
      try {
        const res = await apiFetch(`/restaurant/progress/${id}`) || { ok: false, data: {} }; //객체를 항상 반환 해 undefined 가 되지 않도록
        if (res.ok) {
          // 서버가 바뀐 progress를 반환하면 그걸 사용
          console.log(res?.data)
          if (res.data?.result !== undefined) setProgress(res.data.result); // 상태가 업데이트 되면 값 날아가지만 리랜더링 위해 값 할당
          else {
            // 서버가 반환 안 하면 서버에서 다시 조회
            const updated = await apiFetch(`/restaurant/progress/${id}`) || { ok: false, data: {} };
            if (updated.ok) setProgress(updated.data.result);
          }
        } else {
          console.error("patch failed", res.data?.message ?? "Unknown error");
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };
    fetchPartyProgress();
  }, [id]); // 파라미터 바뀌면 새 값 받아서 다시 그려주기

  const patchProgress1 = async () => {
    try {
      await apiFetch(`/restaurant/leader/update-progress1/${id}`, { method : "PATCH"});
      setProgress(1) // 새로고침 하면 날아가지만 화면을 다시 그려줘야 하기 때문에 값 변경
    }catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };
  
  const patchProgress2 = async () => {
    try {
      await apiFetch(`/restaurant/leader/update-progress2/${id}`, { method : "PATCH"});
      setProgress(2)
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

  const deadlinePassed = new Date(startTime).getTime() < Date.now();

  return (
    <div className="w-full flex flex-col items-center p-4 gap-2">
      {progress === 0 && (
        <BasicButton 
          text="메뉴 변경 요청하기"
          isDisable={progress !== 0}
        />
      )}
      
      {(progress === 0 || progress === 1) && (
        <BasicButton 
          text="계좌번호 공개하기"
          isDisable={!deadlinePassed} 
          onClick={patchProgress1}
        />
      )}

      {progress === 1 && (
        <BasicButton 
          text="배달 도착 알려주기"
          isDisable={progress < 100}
          onClick={patchProgress2}
        />
      )}

      {(progress !== 0 && progress !== 1) && (
        <>
          <p className="flex flex-col text-center mb-2 text-lg">배달 도착을 알렸습니다. <br/>모든 멤버의 음식수령이 끝난 후 파티는 종료됩니다.</p>
          <BasicButton 
            text="파티 기록 보러가기"
            onClick={() => router.push('/')} // 파티 기록 보기는 경로로 수정 필요
          />
        </>
      )}
    </div>
  );
}