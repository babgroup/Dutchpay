'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useCustomFetch from "@/common/customFetch";
import MyCardDiv from "./MyCardDiv";
import { MyPartyData } from "@/types/restaurant";
import ProgressButtonDiv from "./ProgressButtonDiv";

export default function MyPartyContainer() {
    const { id } = useParams();
    const apiFetch = useCustomFetch();
    const router = useRouter();

    const [party, setParty] = useState<MyPartyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        const fetchParty = async () => {
            const token = localStorage.getItem("access-token");
            const res = await apiFetch(`/restaurant/member/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (res.ok) {
                setParty(res.data);
            }
            setLoading(false);
        };
        fetchParty();
    }, [id]);

    const handleLeaveParty = async () => {
        if (!party) return;

        try {
            const token = localStorage.getItem("access-token");
            const res = await apiFetch(`/restaurant/member/foodFareRoom/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res.status)
            if (!(res.status === 204)) {
                alert("파티 나가기에 실패했습니다. 다시 시도해주세요.");
                return;
            }

            localStorage.removeItem("currentRole");
            localStorage.removeItem("currentRoomId");

            alert("파티를 나갔습니다.");
            router.push("/delivery");
        } catch (error) {
            console.error("Error leaving party:", error);
        }
    }

    if(loading) return <p className="text-center">로딩 중...</p>;
    if (!party) return <p className="text-center">파티 정보가 없습니다..</p>;

    return (
        <div className="flex flex-col p-4">
            <div className="text-black">
                <MyCardDiv
                    party={party}
                    progress={progress}
                    bankName={party.primaryBankAccount?.bankName || null}
                    accountNumber={party.primaryBankAccount?.accountNumber || null}
                />
            </div>

            <div className="flex w-full mt-8 justify-center items-center">
                <ProgressButtonDiv onProgressUpdate={setProgress} />
            </div>

            {progress === 0 && !loading && (
                <button 
                    onClick={handleLeaveParty}
                    className="text-gray-300 text-center text-sm mb-1 pt-2"
                >
                    파티 나가기
                </button>
            )}
        </div>
    )
}