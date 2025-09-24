'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  href: string;
  iconSrc: string;
  alt: string;
}

export default function BottomNav({ href, iconSrc, alt }: BottomNavProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition
        ${isActive ? "bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
        <Image src={iconSrc} alt={alt} fill className="object-contain p-2.5" />
      </div>
    </Link>
  );
}