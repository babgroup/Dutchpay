'use client'

import SelectDropdown, { DropdownOption } from "../delivery/(withTopHeader)/select-party-room/components/Dropdown"
import { useState } from "react";


export default function Inquiry() {
    const inquiryOptions: DropdownOption[] = [
        { value: '1', label: '계정/개인정보' },
        { value: '2', label: '결제' },
        { value: '3', label: '서비스 이용' },
        { value: '4', label: '기기/환경' },
        { value: '5', label: '제안/피드백' },
        { value: '6', label: '기타' },
    ]

    const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-full p-6">
            <div className="mb-15" />

            <SelectDropdown
                label=" 카테고리 선택"
                placeholder="문의 사항을 선택해주세요"
                options={inquiryOptions}
                selectedValue={selectedInquiry}
                onSelect={setSelectedInquiry}
            />
        </div>
    )
}