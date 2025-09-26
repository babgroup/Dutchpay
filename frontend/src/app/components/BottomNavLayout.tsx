'use client';

import BottomNav from "./BottomNav";
import useFetch from "@/common/customFetch";
import { useRouter } from "next/navigation";


export default function BottomNavLayout() {
  const Fetch = useFetch();
  const router = useRouter();

  const handleUserClick = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/login"; // 토큰이 없을 경우 로그인 페이지로 라우트
      return;
    }
    try {
      const res = await Fetch("/auth/me", {method: "GET"});

      if (!res.ok) {
        localStorage.removeItem("jwtToken");
        router.push("/login");
        return;
      }
      router.push(`/user/${res.data.id}`); // 응답 내 유저 id 사용
    } catch (error) {
      localStorage.removeItem("jwtToken");
      router.push("/login");
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-12 bg-white rounded-3xl shadow-md flex items-center justify-around p-2">
      <BottomNav href="/" iconSrc="/home.svg" alt="home icon" />
      <BottomNav href="/delivery" iconSrc="/delivery.svg" alt="delivery icon" />
      {/* 로그인 여부에 따라 /user 또는 /login 이동, 로컬 스토리지 */}
      <BottomNav
        iconSrc="/user.svg"
        alt="user icon"
        onClick={handleUserClick}
      />
    </div>
  );
}