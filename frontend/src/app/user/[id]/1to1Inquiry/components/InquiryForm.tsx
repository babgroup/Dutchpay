'use client'

import { useState, useRef } from "react";
import Dropdown, { DropdownOption} from "@/app/delivery/(withTopHeader)/select-party-room/components/Dropdown";
import InquiryInput from "./InquiryInput";
import BasicButton from "@/app/components/BasicButton";
import { useParams, useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

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
    const params = useParams();

    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedInquiry || !inquiryText.trim()) {
            alert("카테고리와 문의 내용을 모두 입력해주세요.");
            return;
        }

        if (!formRef.current) return;

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            toast.success("💌 문의가 성공적으로 제출되었습니다", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                theme: "colored",
            });
            console.log("✅ toast 실행됨");

            alert("💌 문의가 성공적으로 제출되었습니다");

            // 2초 후 이동
            setTimeout(() => router.push(`/user/${userId}`), 2500);
        } catch (error) {
            toast.error('메일 전송에 실패했습니다 🥲', {
                position: 'top-center',
                icon: <span>🥲</span>,
                hideProgressBar: true
            });
            console.error(error);
        }

        router.push(`/user/${userId}`);
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-full p-6">
            <div className="mb-8">
                <Dropdown
                    label="카테고리 선택"
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

            {/* EmailJS에 필요한 hidden input */}
            <input type="hidden" name="user_name" value="사용자 이름" />
            <input type="hidden" name="user_email" value="사용자 email" />
            <input type="hidden" name="inquiry_value" value={selectedInquiry || ''} />
            <input
                type="hidden"
                name="inquiry_label"
                value={inquiryOptions.find(opt => opt.value === selectedInquiry)?.label || ''}
            />
            <input type="hidden" name="inquiry_text" value={inquiryText} />

    
            <div className="w-full flex justify-center mt-30">
                <BasicButton
                    text="제출하기"
                    isDisable={!selectedInquiry || !inquiryText.trim()}
                />
            </div>
        </form>
    )
}