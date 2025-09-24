'use client';

import { useState, useEffect } from 'react';
import BasicButton from '../../components/BasicButton';
import PartyTypeCard from './components/PartyTypeCard';
import Dropdown, { DropdownOption } from './components/Dropdown';
import SelectDropdown from './components/Dropdown';

const descriptions: { [key: string]: string } = {
    A: '파티 인원과 배달 시간이 모두 만족 되면 주문해요.',
    B: '인원수와 관계 없이 배달 시간이 되면 바로 주문해요.'
}

export default function PartySelectionPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPartySize, setSelectedPartySize] = useState<string | null>(null);

  const partySizeOptions: DropdownOption[] = [
    { value: '2', label: '2명' },
    { value: '3', label: '3명' },
    { value: '4', label: '4명' },
    { value: '5', label: '5명' },
    { value: '6', label: '6명' },
  ];

  const isDropdownDisabled = selectedType !== 'A';

  useEffect(() => {
    if (selectedType !== 'A') {
      setSelectedPartySize(null);
    }
  }, [selectedType]);

  return (
    <div className="flex flex-col h-full p-6">
        <div className="mb-37" />

      {/* 카드 */}
      <div className="flex flex-col gap-4">
        <PartyTypeCard
          text="배달시간에 설정한 인원이 모이면 시킬래요."
          isSelected={selectedType === 'A'}
          onClick={() => setSelectedType('A')}
        />
        <PartyTypeCard
          text="인원수에 관계 없이 배달 시간이 되면 무조건 시킬래요."
          isSelected={selectedType === 'B'}
          onClick={() => setSelectedType('B')}
        />
      </div>

        {/* 안내문 */}
      <div className={`text-center m-6 text-orange-500 h-6`}>
        {selectedType && descriptions[selectedType]}
      </div>

        {/* 드롭다운 메뉴 */}
      <div className="mt-4 w-80 mx-auto">
        <SelectDropdown 
            label="파티 인원 선택"
            placeholder="인원을 선택해주세요"
            options={partySizeOptions}
            selectedValue={selectedPartySize}
            onSelect={setSelectedPartySize}
            disabled={isDropdownDisabled}
        />
      </div>


      <div className="flex flex-col m-10 items-center">
        <BasicButton 
          text="다음 단계로 이동" 
          isDisable={!selectedType}
        />
      </div>
    </div>
  );
}