'use client'

import BasicButton from "@/app/components/BasicButton";
import Dropdown, { DropdownOption } from "./Dropdown";

interface SelectTimeProps {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    onSubmit: () => Promise<{ success: boolean; id?: string }>;
    selectedRestaurant: { businessHours: string };
}

export default function SelectTime({
    selectedTime,
    onSelectTime,
    onSubmit,
    selectedRestaurant,
}: SelectTimeProps) {
    const now = new Date();

    const [openTime, closeTime] = selectedRestaurant.businessHours.split("-");
    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);
    
    const openDate = new Date();
    openDate.setHours(openHour, openMinute, 0, 0);

    const closeDate = new Date();
    closeDate.setHours(closeHour, closeMinute, 0, 0);

    const lastAvailable = new Date(closeDate.getTime()-30*60*1000);

    const generateTimeOptions = () : DropdownOption[] => {
        const times: DropdownOption[] = [];

        for (let hour = 9; hour < 23; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const value = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

                const optionTime = new Date();
                optionTime.setHours(hour, min, 0, 0);

                const isDisabled = optionTime <= now || optionTime < openDate || optionTime > lastAvailable;

                times.push({ value, label: value, disabled: isDisabled });
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const selectedOption = timeOptions.find((t) => t.value === selectedTime);
    const isButtonDisabled = !selectedTime || selectedOption?.disabled;

    const handleClick = async () => {
        if (isButtonDisabled) return;
        await onSubmit();
    };

    return (
        <div className="flex flex-col h-full p-6 justify-between">

            <div>
                <Dropdown
                    label="주문 시작 시간 입력"
                    placeholder="시간을 선택해주세요"
                    options={timeOptions}
                    selectedValue={selectedTime}
                    onSelect={(time) => {
                        const option = timeOptions.find((t) => t.value === time);
                        if (option?.disabled) return;
                            onSelectTime(time);
                    }}
                    disabled={false}
                />
            </div>

            <div className="p-8 rounded-2xl bg-gray-100 text-gray-400 mt-45">
                <p>✱ 방장은 주문시간 10분 전 가게의 상황을 파악해 주문 가능 여부를 확인 해야해요. 확인이 되지 않으면 팀원들에게 입금 계좌를 보여 줄 수 없어요.</p>
                <p>✱ 주문 시간 10분 전 까지 멤버를 모집 할 수 있어요.</p>
                <p>✱ 확정된 파티는 취소 할 수 없어요.</p>
            </div>
            
            <div className="flex flex-col m-6 items-center">
                <BasicButton
                    text="파티 만들기"
                    onClick={handleClick}
                    isDisable={isButtonDisabled}
                />
            </div>
        </div>
    );
}