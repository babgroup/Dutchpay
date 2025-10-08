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
        <div className="flex flex-col gap-2 bg-white px-10 py-12 rounded-2xl m-1 border border-gray-200 shadow-lg">
            <p>내 메뉴</p>

            {/* 내 메뉴 */}
            <div>
                {myOrderItems.length === 0 ? (
                    <p>선택된 메뉴가 없습니다. 메뉴 변경 버튼을 눌러 메뉴를 선택해주세요.</p>
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

            <p>배달비  {deliveryFee.toLocaleString()}원</p>
            <p>총 {totalPrice.toLocaleString()}원</p>

            <div>
                계좌번호
            </div>
        </div>
    )
}