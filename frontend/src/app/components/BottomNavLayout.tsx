'use client';

import BottomNav from "./BottomNav";
import useFetch from "@/common/customFetch";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


export default function BottomNavLayout() {
  const router = useRouter();

  const handleUserClick = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    // 토큰 없으면 로그인 페이지로
    router.push("/login");
    return;
  } try {
    // 토큰 디코딩
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT에서 payload 부분 추출(토큰 디코딩 후 json 객체로 변환)
    const userId = payload.sub; // 이 부분에 id에 관한 정보(sub: 만들어진 순서)가 있음
    router.push(`/user/${userId}`);
  } catch (error) {
    console.error("Invalid token:", error);
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