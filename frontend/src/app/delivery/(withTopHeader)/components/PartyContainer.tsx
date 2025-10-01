'use client';

import { useEffect, useState } from "react";
import useCustomFetch from "@/common/customFetch";
import PartyInfoDiv from "./PartyInfoDiv";
import PartyButtonDiv from "./PartyButtonDiv";
import { MyPartyData } from "@/types/restaurant";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PartyContainer() {
  const apiFetch = useCustomFetch();
  const [party, setParty] = useState<MyPartyData | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const {id} = useParams(); // 현재 url의 패스파라미터 값이 들어옴

  useEffect(() => {
    const fetchParty = async () => {
      setLoading(true);
      try {
        const res = await apiFetch(`/restaurant/leader/${id}`) || { ok: false, data: {} };
        
        if(res.ok) {
          setParty(res.data);
        }
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParty();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">에러 발생: {error}</p>;
  if (!party) return <p>파티 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 mb-4 max-h-[46vh] min-h-[60vh]">
        <PartyInfoDiv party={party} />
      </div>

      <div className="flex-shrink-0 justify-center text-center">
        <Link
          href={`/delivery/choose-menu/${id}`}
          className="text-md text-gray-400 underline underline-offset-2">
          내 메뉴
        </Link>
        <PartyButtonDiv startTime={party.deadline} minUser={party.minUser} currentUserCount={party.user?.length || 0} roomId={id} />
      </div>

      <Link href={`/delivery/break-up-party/${id}`} className=" text-gray-300 text-center text-sm mb-1"      
          >
        파티 해산하기
      </Link>
    </div>
  );
}