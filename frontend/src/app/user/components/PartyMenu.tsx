'use client';

import Link from "next/link"
import { useParams } from "next/navigation";

export default function PartyMenu() {
  const params = useParams();
  const id = (params && params.id) as string;

  return (
    <div className="flex flex-col w-4/5 m-4">
      <Link href="/" className="text-black py-3 border-b border-t border-gray-200">내 계좌 설정</Link> {/* url 수정 필요 */}
      <Link href={`/user/${id}/1to1Inquiry`} className="text-black py-3 border-b border-gray-200">1 : 1 문의</Link>
      <Link href="/" className="text-black py-3 border-b border-gray-200">유저 신고</Link> {/* url 수정 필요 */}
      <p
        className="block text-black py-3 border-b border-gray-200 cursor-pointer"
        onClick={() => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("refreshToken");
          alert("로그아웃 되었습니다.")
          window.location.href = "/"; // 로그인 페이지로 이동
        }}>로그아웃</p>
    </div>
  )
}