'use client'

import { useState } from "react";
import Dropdown, { DropdownOption} from "@/app/delivery/(withTopHeader)/select-party-room/components/Dropdown";
import InquiryInput from "./InquiryInput";
import BasicButton from "@/app/components/BasicButton";
import { useRouter } from "next/navigation";

export default function InquiryForm() {
    const inquiryOptions: DropdownOption[] = [
        { value: '1', label: '계정/개인정보' },
        { value: '2', label: '결제' },
        { value: '3', label: '서비스 이용' },
        { value: '4', label: '기기/환경' },
        { value: '5', label: '제안/피드백' },
        { value: '6', label: '기타' },
    ]

    const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
    const [inquiryText, setInquiryText] = useState<string>("");

    const router = useRouter();
    const handleSubmit = () => {
        if (!selectedInquiry || !inquiryText.trim()) {
            alert("카테고리와 문의 내용을 모두 입력해주세요.");
            return;
        }
        console.log({
            category: selectedInquiry,
            content: inquiryText
        }); // api 요청
        alert("제출되었습니다.");
        router.back();
    }

    return (
            <div className="flex flex-col h-full p-6">
    
                <div className="mb-8">
                    <Dropdown
                        label=" 카테고리 선택"
                        placeholder="문의 사항을 선택해주세요"
                        options={inquiryOptions}
                        selectedValue={selectedInquiry}
                        onSelect={setSelectedInquiry}
                    />
                </div>
    
                <div className="flex-grow mb-10">
                    <InquiryInput
                        label="문의 내용을 입력해주세요"
                        placeholder="Type here..."
                        value={inquiryText}
                        onChange={setInquiryText}
                    />
                </div>
    
                <div className="w-full flex justify-center mt-30">
                    <BasicButton
                        text="제출하기"
                        onClick={handleSubmit}
                        isDisable={!selectedInquiry || !inquiryText.trim()}
                    />
                </div>
            </div>
        )
}