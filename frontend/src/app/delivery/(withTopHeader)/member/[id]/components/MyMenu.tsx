'use client';

import useCustomFetch from "@/common/customFetch";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { OrderItem } from "@/types/restaurant";

interface MyMenuProps {
    deliveryFee: number;
    progress: number | null;
    accountNumber?: string | null; // 나중에 API로 받아올 것
}

export default function MyMenu({ deliveryFee, progress, accountNumber }: MyMenuProps) {
    const apiFetch = useCustomFetch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [myOrderItems, setMyOrderItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const fetchMyMenu = async () => {
            setLoading(true);
            try {
                const res = await apiFetch(`/restaurant/member/${id}`)
                if (res.ok) {
                setMyOrderItems(res.data.myOrderItems || []);
                } else {
                    console.error("failed:", res.message);
                }
            } catch (error) {
                console.error("error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyMenu();
    }, [id]);

    const totalPrice = myOrderItems.reduce((sum, item) => sum + item.price, 0) + deliveryFee;

    console.log("progress:", progress);
    console.log("accountNumber", accountNumber);

    return (
        <div className="flex flex-col gap-2 bg-white px-6 py-6 rounded-2xl m-1 border border-gray-300">
            <p>내 메뉴</p>

            {/* 내 메뉴 */}
            <div className="pt-6">
                {myOrderItems.length === 0 ? (
                    <p className="pb-6">선택된 메뉴가 없습니다. 메뉴 변경 버튼을 눌러 메뉴를 선택해주세요.</p>
                ) : (
                    <ul className="space-y-1">
                        {myOrderItems.map(item => (
                            <li key={item.orderId} className="flex justify-between">
                                <span>{item.itemName}</span>
                                <span className="pl-30">x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr className="w-2/3 border-gray-300 mx-auto my-4" />

            <p className="flex justify-between">
                <span>배달비</span>
                <span className="pl-46">{deliveryFee.toLocaleString()}원</span>
            </p>

            <div className="flex justify-center pt-2 text-amber-500">
                총 {totalPrice.toLocaleString()}원
            </div>

            <div className={`rounded-xl flex items-center justify-center m-1 text-white p-3 text-xs ${progress === 0 ? 'bg-gray-300' : 'bg-amber-500'}`}>
                {progress === 0
                    ? '주문시간 10분 전 이곳에 방장의 계좌번호가 표시됩니다.'
                    : accountNumber || '임시번호 123-213'}
            </div>
        </div>
    )
}