'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCustomFetch from "@/common/customFetch";
import MyCardDiv from "./MyCardDiv";
import { MyPartyData } from "@/types/restaurant";
import Link from "next/link";

export default function MyPartyContainer() {
    const { id } = useParams();
    const apiFetch = useCustomFetch();

    const [party, setParty] = useState<MyPartyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParty = async () => {
            const res = await apiFetch(`/restaurant/member/${id}`);
            if (res.ok) {
                setParty(res.data);
            }
            setLoading(false);
        };
        fetchParty();
    }, [id]);

    if(loading) return <p>로딩 중...</p>;
    if (!party) return <p>파티 정보가 없습니다..</p>;

    return (
        <div className="flex flex-col p-4">
            <div>
                <MyCardDiv party={party}/>
            </div>

            <p>
                총 <span>...원</span>의 배달비를 아꼈어요!
            </p>

            <div>
                <button>메뉴 변경</button>
            </div>

            <Link href={`/delivery`} className="text-gray-300 text-center text-sm mb-1">파티 나가기</Link>
        </div>
    )
}

