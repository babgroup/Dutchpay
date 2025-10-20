'use client';

import Link from "next/link"
import { useParams } from "next/navigation";
import useCustomFetch from "@/common/customFetch";

export default function PartyMenu() {
  const params = useParams();
  const id = (params && params.id) as string;
  const apiFetch = useCustomFetch();

  return (
    <div className="flex flex-col w-4/5 m-4">
      <Link href={`/user/${id}/1to1Inquiry`} className="text-black py-3 border-b border-gray-200">1 : 1 문의</Link>
      <Link href="/" className="text-black py-3 border-b border-gray-200">유저 신고</Link> {/* url 수정 필요 */}
      <p
        className="block text-black py-3 border-b border-gray-200 cursor-pointer"
        onClick={async () => {
          const roomId = localStorage.getItem("currentRoomId");
          if (roomId) {
            try {
              const res = await apiFetch(`/restaurant/progress/${roomId}`);
              const progress = res.data.data;
              console.log(res);
              if (progress === 0 || progress === 1) {
                alert("현재 진행 중인 파티가 있습니다. 파티 완료 전에는 로그아웃할 수 없습니다.");
                return;
              }
            } catch (err) {c
              console.error(err);
            }
          }

          // 로그아웃 실행하는 부분
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentRoomId");
          localStorage.removeItem("currentRole");
          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        }}
      >
        로그아웃
      </p>
    </div>
  )
}