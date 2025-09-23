'use client'

import { formatDate } from "@/common/formatDate";
import { useEffect, useState } from "react";
import useFetch from "@/common/customFetch";
import RoomListCard from "./RoomListCard";
import { CurrentRoom }  from "@/types/restaurant"

export default function RoomListDiv() {
  const Fetch = useFetch();
  const [rooms, setRooms] = useState<CurrentRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchCurrentRooms = async () => {
      setLoading(true);
      setMessage('로딩 중...')
      try {
        const data = await Fetch("/restaurant/current-rooms", { method: "GET" });
        setRooms(data.data);
      } catch (e: any) {
        setMessage(e.message)
        setRooms([]);
      } finally {
        setLoading(false);
        setMessage('')
      }
    };
    fetchCurrentRooms();
  }, []);

  return (
    <div className="h-8/12 overflow-scroll m-4">
      {loading ? (
        <p>{message}</p>
      ) : rooms.length < 1 ? (
        <p>현재 모집중인 파티가 없습니다. 😢</p>
      ) : (
        rooms.map((room) => (
          <RoomListCard 
            key={room.id}
            id={room.id}
            restaurantName={room.restaurantName}
            deliveryFee={room.deliveryFee}
            minUser={room.minUser}
            currentUsers={room.currentUsers}
            imageUrl={room.imageUrl}
            deadline={formatDate(room.deadline)}
            discount={((room.deliveryFee - room.deliveryFee / room.maxUser) / room.deliveryFee) * 100}
          />
        ))
      )}
    </div>
  );
}