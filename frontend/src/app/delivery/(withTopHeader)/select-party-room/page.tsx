'use client'

import { useState, useEffect } from 'react';
import type { DropdownOption } from './components/Dropdown';

import SelectPartyType from './components/SelectPartyType';

export default function PartySelectionPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPartySize, setSelectedPartySize] = useState<string | null>(null);

  useEffect(() => {
    if (selectedType !== 'A') {
      setSelectedPartySize(null);
    }
  }, [selectedType]);

  const partySizeOptions: DropdownOption[] = [
    { value: '2', label: '2명' },
    { value: '3', label: '3명' },
    { value: '4', label: '4명' },
    { value: '5', label: '5명' },
    { value: '6', label: '6명' },
  ];

  const descriptions = {
    A: '파티 인원과 배달 시간이 모두 만족 되면 주문해요.',
    B: '인원수와 관계 없이 배달 시간이 되면 바로 주문해요.'
  };

  const handleNext = () => {
    // 지금은 간단히 alert만 띄우고, 나중에 2단계로 넘어가는 로직을 추가합니다.
    alert('다음 단계로 넘어갑니다!'); 
  };

  return (
    <div>
      <SelectPartyType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedPartySize={selectedPartySize}
        setSelectedPartySize={setSelectedPartySize}
        partySizeOptions={partySizeOptions}
        descriptions={descriptions}
        onNext={handleNext}
      />
    </div>
  )
}