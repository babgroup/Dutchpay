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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 기본 이동 막기
    if (onClick) {
      onClick();
    } else {
      router.push(href); // onClick 이 없을 겅우 href로 이동
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition
        ${isActive ? "bg-gray-200" : "bg-white"} hover:bg-gray-200 cursor-pointer`}
    >
      <Image src={iconSrc} alt={alt} fill className="object-contain p-2.5" />
    </div>
  );
}