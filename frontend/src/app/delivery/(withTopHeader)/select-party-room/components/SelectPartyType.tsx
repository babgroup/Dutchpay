'use client'

import { useState } from 'react';
import BasicButton from '@/app/components/BasicButton';
import PartyTypeCard from './PartyTypeCard';
import Dropdown, { DropdownOption } from './Dropdown';

type PartySelection = { type: 'A'; partySize: number } | { type: 'B' };

interface SelectPartyTypeProps {
    selectedParty: PartySelection | null;
    onSelectParty: (party: PartySelection) => void;
    partySizeOptions: DropdownOption[];
    descriptions: { [key: string]: string };
    onNext: () => void;
}

export default function SelectPartyType({
    selectedParty,
    onSelectParty,
    partySizeOptions,
    descriptions,
    onNext,
}: SelectPartyTypeProps) {
    const [type, setType] = useState<string | null>(selectedParty?.type ?? null);
    const [partySize, setPartySize] = useState<number | null>(
        selectedParty?.type === 'A' ? selectedParty.partySize : null
    );

    const isDropdownDisabled = type !== 'A';
    const isButtonDisabled = !type || (type === 'A' && !partySize);

    const handleNext = () => {
        if (type === 'A' && partySize) {
            onSelectParty({ type: 'A', partySize });
        } else if (type === 'B') {
            onSelectParty({ type: 'B' });
        }
        onNext();
    };
  
    return (
        <div className="flex flex-col h-full p-6">
            <div className="mb-10" />

            {/* 카드 */}
            <div className="flex flex-col gap-4">
                <PartyTypeCard
                    text="배달시간에 설정한 인원이 모이면 시킬래요."
                    isSelected={type === 'A'}
                    onClick={() => setType('A')}
                />
                <PartyTypeCard
                    text="인원수에 관계없이 배달 시간이 되면 무조건 시킬래요."
                    isSelected={type === 'B'}
                    onClick={() => setType('B')}
                />
            </div>

            {/* 안내문 */}
            <div className={`text-center m-6 text-orange-500 h-6`}>
                {type && descriptions[type]}
            </div>

            {/* 드롭다운 메뉴 */}
            <div className="mt-4 w-80 h-[92px] mx-auto">
                {type === 'A' && (
                    <Dropdown 
                        label="파티 인원 선택"
                        placeholder="인원을 선택해주세요"
                        options={partySizeOptions}
                        selectedValue={partySize ? String(partySize) : ''}
                        onSelect={val => setPartySize(Number(val))}
                        disabled={isDropdownDisabled}
                    />
                )}  
            </div>

            <div className="flex flex-col m-10 items-center">
                <BasicButton 
                    text="다음 단계로 이동" 
                    isDisable={isButtonDisabled}
                    onClick={handleNext}
                />
            </div>
        </div>
    );
}