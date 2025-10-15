'use client'

import { useEffect, useState } from "react";
import RestaurantListCard from "./RestaurantListCard";
import useCustomFetch from "@/common/customFetch";
import type { RestaurantList } from "@/types/restaurant";

interface RestaurantDivProps {
    selectedRestaurant: RestaurantList | null;
    onSelect: (res: RestaurantList) => void;
}

export default function RestaurantListDiv({ selectedRestaurant, onSelect }: RestaurantDivProps) {
    const apiFetch = useCustomFetch();
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<RestaurantList[]>([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRestaurantList = async () => {
            setLoading(true);
            setMessage('로딩 중...');
            try {
                const response = await apiFetch("/restaurant/list", { method: "GET" })
                if (response && Array.isArray(response.data)) {
                    setList(response.data);
                } else {
                    setList([]);
                    console.error('오류', response);
                }
            } catch (error: unknown) {
                console.error('API 요청 오류', error);
                setList([]);
            } finally {
                setLoading(false);
                setMessage('');
            }
        };
        fetchRestaurantList();
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {loading && <p className="text-gray-500">로딩 중...</p>}
            {message && !loading && <p className="text-red-500">{message}</p>}
            {list.map((res) => (
                <RestaurantListCard
                    key={res.id} 
                    id={res.id}
                    restaurantName={res.restaurantName}
                    deliveryFee={res.deliveryFee}
                    imageUrl={res.imageUrl}
                    businessHours={res.businessHours}
                    isSelected={selectedRestaurant?.id === res.id}
                    onClick={() => onSelect(res)}
                />
            ))}
        </div>
    );
}