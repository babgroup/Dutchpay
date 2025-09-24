"use client";

import { useRouter } from "next/navigation";

export default function TopHeader({ pageTitle }: { pageTitle: string }) {
  const router = useRouter();
  return (
    <header className="w-full flex items-center p-4">
      <button onClick={() => router.back()} className="px-3 py-1 rounded-full">
        ←
      </button>
      <h1 className="flex-1 text-center font-semibold">{pageTitle}</h1>
    </header>
  );
}