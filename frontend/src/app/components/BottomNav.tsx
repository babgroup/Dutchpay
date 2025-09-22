'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return(
    <div className="w-3/4 h-12 bg-white rounded-3xl shadow-lg flex items-center justify-around">
      <Link href="/">
        <div className={`relative w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition
          ${pathname === "/" ? "bg-gray-200" : "bg-white"}`}
        >
          <Image src="/home.svg" alt="home icon" fill className={`object-contain p-2.5`} />
        </div>
      </Link>

      <Link href="/delivery">
        <div className={`relative w-10 h-10  rounded-full hover:bg-gray-200 flex items-center justify-center transition
          ${pathname === "/delivery" ? "bg-gray-200" : "bg-white"}`}
        >
          <Image src="/delivery.svg" alt="delivery icon" fill className={`object-contain p-2.5`} />
        </div>
      </Link>

      <Link href="/user">
        <div className={`relative w-10 h-10  rounded-full hover:bg-gray-200 flex items-center justify-center transition
          ${pathname === "/user" ? "bg-gray-200" : "bg-white"}`}
        >
          <Image src="/user.svg" alt="user icon" fill className={`object-contain p-2.5`} />
        </div>
      </Link>
    </div>
  )
}