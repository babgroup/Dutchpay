'use client';

import Link from "next/link";

export default function PartyMenu() {

  return (
    <div className="flex flex-col w-4/5 m-4">
      <Link href={`/user/1to1Inquiry`} className="text-black py-3 border-b border-gray-200">
        1 : 1 문의
      </Link>
      <Link href="/" className="text-black py-3 border-b border-gray-200">
        유저 신고
      </Link>
      <p
        className="block text-black py-3 border-b border-gray-200 cursor-pointer"
        onClick={() => {
          
          // 로컬스토리지 값만 삭제
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
  );
}