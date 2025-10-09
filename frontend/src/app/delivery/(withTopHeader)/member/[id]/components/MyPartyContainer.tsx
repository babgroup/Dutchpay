'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCustomFetch from "@/common/customFetch";
import MyCardDiv from "./MyCardDiv";
import { MyPartyData } from "@/types/restaurant";
import Link from "next/link";
import ProgressButtonDiv from "./ProgressButtonDiv";

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

    const savedFee = ((party.user?.length ?? 1) -1) * party.deliveryFee;

    return (
        <div className="flex flex-col p-4">
            <div className="text-black">
                <MyCardDiv party={party}/>
            </div>

            <div className="flex w-full mt-8 justify-center items-center">
                <ProgressButtonDiv />
            </div>

            <Link href={`/delivery`} className="text-gray-300 text-center text-sm mb-1 pt-2">파티 나가기</Link>
        </div>
    )
}