'use client'

import { useEffect, useState } from "react"
import BasicButton from "@/app/components/BasicButton"
import useCustomFetch from "@/common/customFetch"
import { useParams, useRouter } from "next/navigation";

interface PartyData {
    deliveryFee: number;
    user: { userId: number }[];
    memberCount: number;
}

interface ProgressButtonDivProps {
    onProgressUpdate?: (progress: number) => void;
}

export default function ProgressButtonDiv({ onProgressUpdate }: ProgressButtonDivProps) {
    const apiFetch = useCustomFetch();
    const { id } = useParams();
    const [progress, setProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [party, setParty] = useState<PartyData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPartyData = async () => {
            try {
                const res = await apiFetch(`/restaurant/member/${id}`);
                if (res.ok && res.data) {
                    setParty(res.data);
                } else {
                    console.error("failed to fetch party data:", res?.message)
                }
            } catch (error) {
                console.error("error:", error);
            }
        };

        const fetchPartyProgress = async() => {
            try {
                const res = await apiFetch(`/restaurant/progress/${id}`);
                if (res.ok && res.data.data !== undefined) {
                    console.log("progress:", res.data.data);
                    setProgress(res.data.data);

                    if (onProgressUpdate) {
                        onProgressUpdate(res.data.data);
                    }
                } else {
                    console.error("failed to fetch progress:", res?.message);
                }
            } catch (error) {
                console.error("error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartyProgress();
        fetchPartyData();
    }, [id]);

    const participants = party?.memberCount ?? 1;
    const deliveryFee = party?.deliveryFee ?? 0;
    const perPersonFee = Math.ceil(deliveryFee / participants);
    const savedFee = deliveryFee - perPersonFee;

    console.log("participants:", participants);
    console.log("per person fee:", perPersonFee);
    console.log("saved fee", savedFee);

    const handleClick = () => {
        if (progress === 2) {
            router.push("/delivery");
        } else {
            router.push(`/delivery/choose-menu/${id}`);
        }
    };

    const buttonText = progress === 2 ? "수령 확인" : "메뉴 변경";
    const isDisabled = progress === 1;

    return (
        <div>
            <p className="text-black pb-4">
                {progress === 2 ? (
                    "생활관 앞에서 음식을 픽업해주세요!"
                ) : (
                    <>
                        총 <span className="text-amber-500">{savedFee.toLocaleString()}원</span>의 배달비를 아꼈어요!
                    </>
                )} 
            </p>

            <div className="flex justify-center w-full">
                <BasicButton
                    text={buttonText}
                    isDisable={isDisabled}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}