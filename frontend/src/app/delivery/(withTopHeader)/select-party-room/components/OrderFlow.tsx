'use client'

import { useState } from 'react';
import SelectPartyType from './SelectPartyType';
import SelectRestaurant from './SelectRestaurant';
import SelectTime from './SelectTime';
import type { DropdownOption } from './Dropdown';
import type { RestaurantList } from '@/types/restaurant';
import { useRouter } from 'next/router';
import useCustomFetch from '@/common/customFetch';

type PartySelection = { type: 'A'; partySize: number } | { type: 'B' };

export default function OrderFlow() {
    const [selectedParty, setSelectParty] = useState<PartySelection | null>(null);
    const [selectedRestaurant, setSelectRestaurant] = useState<RestaurantList | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [roomId, setRoomId] = useState<string | null>(null);

    const Fetch = useCustomFetch();

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

    const goNextStep = () => {setStep((prev) => prev + 1)};

    const handleSubmit = async () => {
        if (!selectedRestaurant || !selectedTime) {
            return { success: false };
        }

        const [hour, minute] = selectedTime.split(':').map(Number);
        const now = new Date();
        now.setHours(hour, minute, 0, 0);
        const isoDeadline = now.toISOString();

        const requestBody = {
            restaurantId: selectedRestaurant.id,
            minMember: selectedParty?.type === 'A' ? selectedParty.partySize : 1,
            deadline: isoDeadline,
        };

        const token = localStorage.getItem('jwtToken');

        try {
            const response = await Fetch('/restaurant/food-fare-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) return { success: false };

            const data = response.data;
            return { success: true, id: data.id };
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    }

    return (
        <div className="h-full">
            {step === 1 && (
                <SelectPartyType
                    selectedParty={selectedParty}
                    onSelectParty={setSelectParty}
                    partySizeOptions={partySizeOptions}
                    descriptions={descriptions}
                    onNext={goNextStep}
                />
            )}
    
            {step === 2 && (
                <SelectRestaurant
                    selectedParty={selectedParty}
                    selectedRestaurant={selectedRestaurant}
                    onSelectRestaurant={setSelectRestaurant}
                    onNext={goNextStep}
                />
            )}

            {step === 3 && (
                <SelectTime
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    onSubmit={handleSubmit}
                    id={roomId}
                />
            )}
        </div>
    );
}