'use client'

import { useEffect, useState } from "react"
import BasicButton from "@/app/components/BasicButton"
import useCustomFetch from "@/common/customFetch"
import { useParams, useRouter } from "next/navigation";

export default function ProgressButtonDiv() {
    const apiFetch = useCustomFetch();
    const { id } = useParams();
    const [progress, setProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPartyProgress = async() => {
            try {
                const res = await apiFetch(`/restaurant/progress/${id}`);
                if (res.ok && res.data.data !== undefined) {
                    setProgress(res.data.data);
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
    }, [id]);

    const handleClick = () => {
        if (progress === 2) {
            router.push("/delivery");
        } else {
            router.push(`/delivery/choose-menu/${id}`);
        }
    };

    const buttonText = progress >= 2 ? "수령 확인" : "메뉴 변경";
    const isDisabled = progress === 1;

    return (
        <div className="flex justify-center w-full">
            <BasicButton
                text={buttonText}
                isDisable={isDisabled}
                onClick={handleClick}
            />
        </div>
    )
}