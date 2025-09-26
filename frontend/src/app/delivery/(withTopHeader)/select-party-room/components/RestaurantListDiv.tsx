'use client'

import { useEffect, useState } from "react";
import RestaurantListCard from "./RestaurantListCard";
import useFetch from "@/common/customFetch";
import type { RestaurantList } from "@/types/restaurant";

interface RestaurantDivProps {
    selectedRestaurant: RestaurantList | null;
    onSelect: (res: RestaurantList) => void;
}

export default function RestaurantListDiv({ selectedRestaurant, onSelect }: RestaurantDivProps) {
    const Fetch = useFetch();
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<RestaurantList[]>([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRestaurantList = async () => {
            setLoading(true);
            setMessage('로딩 중...');
            try {
                const response = await Fetch("restaurant/list", { method: "GET" })
                console.log(response);
                if (response && Array.isArray(response.data)) {
                    setList(response.data);
                } else {
                    setList([]);
                    setMessage('데이터를 불러오는 데 실패했습니다');
                }
            } catch (e: unknown) {
                setMessage(e.message || '오류가 발생했습니다');
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