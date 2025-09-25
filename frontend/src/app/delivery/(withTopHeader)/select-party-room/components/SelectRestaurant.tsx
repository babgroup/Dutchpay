'use client'

import BasicButton from "@/app/components/BasicButton";
import { useEffect, useState } from "react";
import RestaurantListDiv from "./RestaurantListDiv";

export default function SelectRestaurant({
    onBack,
    onNext,
    selectedType,
    selectedPartySize
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    const getDescription = () => {
        if (selectedType === 'A') {
            return selectedPartySize ? `${selectedPartySize}명이 모일 경우...` :  '';
        }
        if (selectedType === 'B') {
            return '1/N의 배달비가 나옵니다.'
        }
    };
    // const isButtonDisabled = !selectedRestaurant

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex flex-col justify-center items-center m-4">
                <p className="text-xl text-black">{getDescription()}</p>
                <p className="text-xs text-gray-400 m-4">* 해당 목록은 영업시간에 따른 배달 가능 매장 목록입니다. 가게 사정 등으로 현재 배달이 불가능 한 곳이 있을 수 있으니 직접 확인 해주세요.</p>
            </div>

            <div>
                <RestaurantListDiv />
            </div>
            
            <div className="flex flex-col m-10 items-center">
                <BasicButton
                text="다음 단계로 이동"
                onClick={onNext}
            />
            </div>
        </div>
    );
}