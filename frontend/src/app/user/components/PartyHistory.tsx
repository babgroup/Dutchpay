'use client';

import Link from "next/link";
import PartyMenu from "./PartyMenu";
import { useEffect, useState } from "react";

interface UserInfo {
  userName: string;
  userId: string;
  userEmail: string;
}

export default function PartyHistory() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("디코딩한 JWT:", decodeJWT(token));
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUserInfo({
          userName: "임시이륾",
          userId: decoded.userStuNum,
          userEmail: decoded.email,
        });
      }
    }
  }, []); // 실제로는 토큰을 브라우저에 저장하지 않아서 이렇게 사용 X, 임시 기능

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div className="mb-6 w-4/5">
      <div className="mt-10 mb-10 w-4/5 pl-2">
        <div className="text-xl">{userInfo.userName} / {userInfo.userId}</div>
        <div className="underline">{userInfo.userEmail}</div>
      </div>

      <Link
        href="/파티이용내역"
        className="block bg-gray-100 rounded-xl px-4 py-3"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">내 파티 / 이용 내역</span>
          <span className="text-lg text-gray-300">&gt;</span>
        </div>
        <div className="mt-2 text-base rounded-xl bg-gray-200 m-2 p-2 pl-4">
          현재까지 <span className="text-orange-400 font-semibold">0000원</span> 아꼈어요!
        </div>
      </Link>
      <PartyMenu />
    </div>
  )
}

// JWT 디코딩 함수
function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("JWT 디코딩 실패", error);
    return;
  }
}