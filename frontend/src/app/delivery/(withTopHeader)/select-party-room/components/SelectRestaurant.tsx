'use client'

import BasicButton from "@/app/components/BasicButton";
import RestaurantListDiv from "./RestaurantListDiv";
import type { RestaurantList } from "@/types/restaurant";

type PartySelection =
    | { type: 'A', partySize: number }
    | { type: 'B'};

interface SelectRestaurantProps {
    onNext: () => void;
    selectedParty: PartySelection | null;
    selectedRestaurant: RestaurantList | null;
    onSelectRestaurant: (res: RestaurantList) => void;
}

export default function SelectRestaurant({
    onNext,
    selectedParty,
    selectedRestaurant,
    onSelectRestaurant
}: SelectRestaurantProps) {
    const getDescription = () => {
        if (selectedParty?.type === 'A') {
            if (selectedParty.partySize && selectedRestaurant) {
                const perPersonFee = Math.ceil(selectedRestaurant.deliveryFee / selectedParty.partySize);
                return (
                    <div>
                        <div className="text-xl">
                            {selectedParty.partySize}명이 모이면 1인당 <span className="text-orange-500">{perPersonFee}원</span>
                        </div>
                    </div>
                )
            }
            return selectedParty.partySize ? `${selectedParty.partySize}명이 모이면...` :  '';
        }
        if (selectedParty?.type === 'B') {
            return '1/N의 배달비가 나옵니다.'
        }
    };
    const isButtonDisabled = !selectedRestaurant

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex flex-col justify-center items-center m-4">
                <div className="text-xl text-black">{getDescription()}</div>
                <p className="text-xs text-gray-400 m-4">* 해당 목록은 영업시간에 따른 배달 가능 매장 목록입니다. 가게 사정 등으로 현재 배달이 불가능 한 곳이 있을 수 있으니 직접 확인 해주세요.</p>
            </div>

            <div>
                <RestaurantListDiv
                selectedRestaurant={selectedRestaurant}
                onSelect={onSelectRestaurant}
                />
            </div>
            
            <div className="flex flex-col m-13 items-center">
                <BasicButton 
                    text="다음 단계로 이동" 
                    isDisable={isButtonDisabled}
                    onClick={isButtonDisabled ? () => {} : onNext}
                />
            </div>
        </div>
    );
}