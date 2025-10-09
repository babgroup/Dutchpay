'use client';

import useCustomFetch from "@/common/customFetch";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { OrderItem } from "@/types/restaurant";

interface MyMenuProps {
    deliveryFee: number;
}

export default function MyMenu({ deliveryFee }: MyMenuProps) {
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

    return (
        <div className="flex flex-col gap-2 bg-white px-6 py-6 rounded-2xl m-1 border border-gray-200 shadow-lg">
            <p>내 메뉴</p>

            {/* 내 메뉴 */}
            <div className="pt-6">
                {myOrderItems.length === 0 ? (
                    <p className="pb-6">선택된 메뉴가 없습니다. 메뉴 변경 버튼을 눌러 메뉴를 선택해주세요.</p>
                ) : (
                    <ul>
                        {myOrderItems.map(item => (
                            <li key={item.orderId}>
                                {item.itemName}  x{item.quantity}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr />

            <p className="pt-2">배달비<span className="pl-46">{deliveryFee.toLocaleString()}원</span></p>

            <div className="pt-2 justify-center items-center">
                총 {totalPrice.toLocaleString()}원
            </div>

            <div className="rounded-xl flex items-center justify-center m-1 bg-amber-500 text-white p-2">
                계좌번호
            </div>
        </div>
    )
}