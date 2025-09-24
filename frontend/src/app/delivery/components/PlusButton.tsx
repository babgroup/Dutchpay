import Link from "next/link";

export default function PlusButton() {
  return (
    <div className="w-13 h-14 bg-white border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg self-end mr-4 mb-20 z-50">
      <Link href="/delivery/select-party-room"> {/* 수정필요 */}
        <p className="text-4xl text-center">+</p>
      </Link>
    </div>
  );
}
