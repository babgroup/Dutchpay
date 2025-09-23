import Link from "next/link";
import { ButtonProps } from "@/types/ButtonProps";

interface ModeButtonProps extends ButtonProps {
  isDisable?: boolean;  
} // isDisable = disable 을 표현하는 색(그레이)를 true로 할겅지 false로 할건지

export default function BasicButton({
  text,
  size = "w-3/4 h-12 text-[4vw] sm:text-base",
  onClick,
  href,
  isDisable = false,
}: ModeButtonProps) {

  // 색상 결정 
  const bgClass = isDisable ? "bg-gray-400 text-white" : "bg-amber-500 text-white";

  if (href) {
    return (
      <Link
        href={href}
        className={`${bgClass} rounded-xl hover:opacity-90 transition flex items-center justify-center ${size}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${bgClass} rounded-xl hover:opacity-90 transition flex items-center justify-center ${size}`}
    >
      {text}
    </button>
  );
}