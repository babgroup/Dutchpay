'use client';

import Link from "next/link";
import PartyMenu from "./PartyMenu";
import { useEffect, useState } from "react";
import useCustomFetch from "@/common/customFetch";

interface UserInfo {
  name: string;
  studentNumber: string;
  email: string;
  bankAccounts: {
    bankName: string;
    accountNumber: string;
  }[];
}

export default function UserInfoContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const apiFetch = useCustomFetch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await apiFetch('/user/me', {method: "GET"});
        setUserInfo(res.data);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
    fetchUserInfo();

  }, []);

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div className="mb-6 w-4/5">
      <div className="mt-10 mb-6 w-4/5 pl-2">
        <div className="text-xl">{userInfo.name} / {userInfo.studentNumber}</div>
        <div className="underline">{userInfo.email}</div>
      </div>

      {/* <div className="block bg-gray-100 rounded-xl px-4 py-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">내 파티 / 이용 내역</span>
          <span className="text-lg text-gray-300">&gt;</span>
        </div>
        <div className="mt-2 text-base rounded-xl bg-gray-200 m-2 p-2 pl-4">
          현재까지 <span className="text-orange-400 font-semibold">0000원</span> 아꼈어요!
        </div>
      </div> */}

      <div className="block bg-gray-100 rounded-xl px-4 py-3 mt-4">
        <p className="font-medium">내 계좌</p>
        {userInfo.bankAccounts && userInfo.bankAccounts.length > 0 ? (
          <>
            <span className="text-orange-400 font-semibold">{userInfo.bankAccounts[0].bankName}은행 </span>
            <span className="text-orange-400 font-semibold"> {userInfo.bankAccounts[0].accountNumber}</span>
          </>
        ) : (
          <span className="text-gray-400">등록된 계좌가 없습니다.</span>
        )}
      </div>
      
      <PartyMenu />
    </div>
  )
}