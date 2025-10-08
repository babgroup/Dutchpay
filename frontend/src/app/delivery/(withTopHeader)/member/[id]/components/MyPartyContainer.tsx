'use client'

import MyCardDiv from "./MyCardDiv";
import Link from "next/link";

export default function MyPartyContainer() {
    return (
        <div className="flex flex-col p-4">
            <div>
                <MyCardDiv />
            </div>

            <p>
                총 <span>...</span>원의 배달비를 아꼈어요!
            </p>

            <div>
                <button>메뉴 변경</button>
            </div>

            <Link href={`/delivery`} className="text-gray-300 text-center text-sm mb-1">파티 나가기</Link>
        </div>
    )
}

