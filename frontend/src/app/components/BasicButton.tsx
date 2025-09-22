import Link from "next/link";
import { ButtonProps } from "@/types/ButtonProps";

export default function BasicButton({
  text,
  size = "w-3/4 h-12 text-[4vw] sm:text-base", // 부모 대비 너비 2/3, 높이 3rem, vw 단위 폰트
  onClick,
  href,
}: ButtonProps) {

  if (href) {
    return (
      <Link
        href={href}
        className={`bg-amber-500 text-white rounded-xl hover:opacity-90 transition flex items-center justify-center ${size}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`bg-amber-500 text-white rounded-xl hover:opacity-90 transition flex items-center justify-center ${size}`}
    >
      {text}
    </button>
  );
}