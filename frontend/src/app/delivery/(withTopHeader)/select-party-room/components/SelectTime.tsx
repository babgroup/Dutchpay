'use client'

import { useState } from "react";
import BasicButton from "@/app/components/BasicButton";

interface SelectTimeProps {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    onSubmit: () => void;
}

export default function SelectTime({
    selectedTime,
    onSelectTime,
    onSubmit
}: SelectTimeProps) {
    const isButtonDisabled = !selectedTime;

    return (
        <div className="flex flex-col h-full p-6">
            <label className="text-black text-base">주문 시작 시간 입력</label>
            
            <div className="flex flex-col m-10 items-center">
                <BasicButton
                    text="주문 완료"
                    onClick={isButtonDisabled ? () => {} : onSubmit}
                    isDisable={isButtonDisabled}
                />
            </div>
        </div>
    );
}