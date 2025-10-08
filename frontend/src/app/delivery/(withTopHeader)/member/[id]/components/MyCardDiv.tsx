'use client';
import MyCard from "./MyCard";

export default function MyCardDiv() {
    return (
        <div className="flex flex-col items-center w-full">
            <p>
                가게 이름 | 주문 시간
            </p>
            <MyCard />
        </div>
    )
}