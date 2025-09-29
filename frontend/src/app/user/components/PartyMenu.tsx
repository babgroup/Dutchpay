'use client';

import Link from "next/link"

export default function PartyMenu() {

  return (
    <div className="flex flex-col w-4/5 m-4">
      <Link href="/내계좌설정" className="text-black py-3 border-b border-t border-gray-200">내 계좌 설정</Link>
      <Link href="/1:1문의" className="text-black py-3 border-b border-gray-200">1 : 1 문의</Link>
      <Link href="/유저신고" className="text-black py-3 border-b border-gray-200">유저 신고</Link>
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