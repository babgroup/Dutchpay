'use client';

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface BottomNavProps {
  href?: string;
  iconSrc: string;
  alt: string;
  onClick?: () => void;
}

export default function BottomNav({ href, iconSrc, alt, onClick }: BottomNavProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (href) {
        router.push(href);
      } // onClick props가 없을 겅우 href로 이동
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition
        ${isActive ? "bg-gray-200" : "bg-white"} hover:bg-gray-200 cursor-pointer`}
    >
      <Image src={iconSrc} alt={alt} fill className="object-contain p-2.5" />
    </button>
  ); // div -> button 으로 변경, 스크린 리더 & 키보드 사용자의 사용자 경험 🔝
}