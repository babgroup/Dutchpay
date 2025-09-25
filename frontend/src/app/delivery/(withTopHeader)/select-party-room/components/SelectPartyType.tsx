import BasicButton from '@/app/components/BasicButton';
import PartyTypeCard from './PartyTypeCard';
import SelectDropdown, { DropdownOption } from './Dropdown';


interface SelectPartyTypeProps {
    selectedType: string | null;
    setSelectedType: (type: string | null) => void;
    selectedPartySize: string | null;
    setSelectedPartySize: (size: string | null) => void;
    partySizeOptions: DropdownOption[];
    descriptions: { [key: string]: string };
    onNext: () => void;
}

export default function SelectPartyType({
    selectedType,
    setSelectedType,
    selectedPartySize,
    setSelectedPartySize,
    partySizeOptions,
    descriptions,
    onNext,
}: SelectPartyTypeProps) {
    const isDropdownDisabled = selectedType !== 'A';
    const isButtonDisabled = !selectedType || (selectedType === 'A' && !selectedPartySize);
  
    return (
        <div className="flex flex-col h-full p-6">
            {/* delivery/(withTopHeader)/layout.tsx 에서 title 수정필요 */}
            <div className="mb-10" />

            {/* 카드 */}
            <div className="flex flex-col gap-4">
                <PartyTypeCard
                    text="배달시간에 설정한 인원이 모이면 시킬래요."
                    isSelected={selectedType === 'A'}
                    onClick={() => setSelectedType('A')}
                />
                <PartyTypeCard
                    text="인원수에 관계없이 배달 시간이 되면 무조건 시킬래요."
                    isSelected={selectedType === 'B'}
                    onClick={() => setSelectedType('B')}
                />
            </div>

            {/* 안내문 */}
            <div className={`text-center m-6 text-orange-500 h-6`}>
                {selectedType && descriptions[selectedType]}
            </div>

            {/* 드롭다운 메뉴 */}
            <div className="mt-4 w-80 h-[92px] mx-auto">
                {selectedType === 'A' && (
                    <SelectDropdown 
                        label="파티 인원 선택"
                        placeholder="인원을 선택해주세요"
                        options={partySizeOptions}
                        selectedValue={selectedPartySize}
                        onSelect={setSelectedPartySize}
                        disabled={isDropdownDisabled}
                    />
                )}  
            </div>

            <div className="flex flex-col m-10 items-center">
                <BasicButton 
                    text="다음 단계로 이동" 
                    isDisable={isButtonDisabled}
                    onClick={isButtonDisabled ? () => {} : onNext}
                />
            </div>
        </div>
    );
}