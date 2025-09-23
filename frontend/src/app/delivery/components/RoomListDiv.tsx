'use client'

import { formatDate } from "@/common/formatDate";
import { useEffect, useState } from "react";
import useFetch from "@/common/customFetch";
import RoomListCard from "./RoomListCard";
import { CurrentRoom }  from "@/types/restaurant"
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";

export default function RoomListDiv() {
  const Fetch = useFetch();
  const [rooms, setRooms] = useState<CurrentRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortingOption, setSortingOption] = useState<'최신순' | '종료일순' | '가게이름순'>('최신순'); //최신순 기본
 

  useEffect(() => {
    const fetchCurrentRooms = async () => {
      setLoading(true);
      setMessage('로딩 중...')
      try {
        const data = await Fetch("/restaurant/current-rooms", { method: "GET" });
        setRooms(data.data);
      } catch (e: unknown) {
        setMessage(e.message)
        setRooms([]);
      } finally {
        setLoading(false);
        setMessage('')
      }
    };
    fetchCurrentRooms();
  }, []);

  // 검색어 필터
  const filteredRooms = rooms.filter((room) =>
    room.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) //영어일 경우 소문자로 맞춰서 검색
  );

  // 정렬
  // 자바스크립트의 Array.prototype.sort() 메서드가 내부적으로 배열의 순서를 바꿔줌, filteredRooms는 배열이라 자동으로 Array의 매소드를 상속
  const sortedRooms = filteredRooms.sort((a, b) => {
    if (sortingOption === '최신순') {
      return b.id - a.id; // id가 큰게 가장 최신이라고 가정
    } else if (sortingOption === '종료일순') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else { //가게이름순
      return a.restaurantName.localeCompare(b.restaurantName);
    }
  });

  return (
    <div className="flex flex-col items-center h-8/12 overflow-auto m-4 w-full">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortButton sortingOption={sortingOption} setSortingOption={setSortingOption} />
      {loading ? (
        <p>{message}</p>
      ) : rooms.length < 1 ? (
        <p className="bottom-1/2" >현재 모집중인 파티가 없습니다. 😢</p>
      ) : (
        sortedRooms.map((room) => (
          <RoomListCard 
            key={room.id}
            id={room.id}
            restaurantName={room.restaurantName}
            deliveryFee={room.deliveryFee}
            minUser={room.minUser}
            currentUsers={room.currentUsers}
            imageUrl={room.imageUrl}
            deadline={formatDate(room.deadline)}
            discount={((room.deliveryFee - room.deliveryFee / room.minUser) / room.deliveryFee) * 100}
          />
        ))
      )}
    </div>
  );
}