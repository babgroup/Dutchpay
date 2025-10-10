'use client';

import Link from "next/link";
import PartyMenu from "./PartyMenu";
import { useEffect, useState } from "react";
import useCustomFetch from "@/common/customFetch";

interface UserInfo {
  name: string;
  studentNumber: number;
  email: string;
}

export default function UserInfoContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const apiFetch = useCustomFetch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await apiFetch(`/user/me`, {method: "GET"})
        setUserInfo(res.data)
      } catch(error) {
        console.log(error);
      }
    }

    fetchUserInfo();
  }, []); // 실제로는 토큰을 브라우저에 저장하지 않아서 이렇게 사용 X, 임시 기능

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div className="mb-6 w-4/5">
      <div className="mt-10 mb-10 w-4/5 pl-2">
        <div className="text-xl">{userInfo.name} / {userInfo.studentNumber}</div>
        <div className="underline">{userInfo.email}</div>
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