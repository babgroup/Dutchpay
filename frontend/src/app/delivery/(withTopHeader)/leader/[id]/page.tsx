'use client';

import BasicButton from "@/app/components/BasicButton";
import PartyInfoDiv from "../../components/PartyInfoDiv"
import Link from "next/link";
import { useState } from "react";
import useFetch from "@/common/customFetch";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function MyPartyPage() {
  const Fetch = useFetch();
  const params = useParams();
  const router = useRouter();
  const roomId = params.id; //

  const [deadline, setDeadline] = useState<string>('');
  const [isAccountVisible, setIsAccountVisible] = useState(false); // 계좌 공개 여부

  const now = new Date(); //현재 로컬 날짜 가져오기
  const deadlineDate = deadline ? new Date(deadline) : null; //데드라인이 없어도 오류 나지 않도록
  const isAfterDeadline = deadlineDate ? now >= deadlineDate : false;

  const fetchUpdateProg = async () => {
    alert('해당 매장의 주문 가능 여부를 확인 하셨나요?');
    try {
      const response = await Fetch(`/restaurant/leader/update-progress/${roomId}`, {method: "PATCH"});
      console.log(response.message);
      setIsAccountVisible(true);
    } catch (error) {
      if(error instanceof Error) console.log(error.message);
    } 
  };

  const handleDelivered = () => {
    alert("파티원들에게 배달 도착 완료 알람을 보냈어요! 홈 페이지로 이동 합니다!");
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-scroll mb-auto">
        <PartyInfoDiv onDeadlineChange={setDeadline} /> {/* infos.deadline 가져와서 쓰기 */}
      </div>
      <div className="w-full flex flex-col items-center p-4">
        {!isAccountVisible ? (
          <>
            <BasicButton
              text="메뉴 변경 요청하기"
              isDisable={isAfterDeadline}
            />
            <BasicButton
              text="계좌번호 공개하기"
              onClick={() => fetchUpdateProg()}
              isDisable={!isAfterDeadline}
            />
            <Link className="mt-2 text-gray-300" href="파티해산하기"> {/* href 변경 필요 */}
              파티 해산하기
            </Link>
          </>
        ) : ( //patch 요청 성공하면 아래 두 버튼만 보이게
          <>
            <BasicButton
              text="메뉴 변경 요청하기"
              isDisable={true}
            />
            <BasicButton
              text="배달 도착 완료"
              onClick={() => handleDelivered()}
            />
          </>
        )}
      </div>
    </div>
  )
}
