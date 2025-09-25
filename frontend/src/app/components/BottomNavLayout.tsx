'use client';

import BottomNav from "./BottomNav";
import isTokenValid from "@/common/jwdTokenVaild";

export default function BottomNavLayout() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-12 bg-white rounded-3xl shadow-md flex items-center justify-around p-2">
      <BottomNav href="/" iconSrc="/home.svg" alt="home icon" />
      <BottomNav href="/delivery" iconSrc="/delivery.svg" alt="delivery icon" />
      {/* 로그인 여부에 따라 /user 또는 /login 이동, 로컬 스토리지 */}
      <BottomNav
        iconSrc="/user.svg"
        alt="user icon"
        onClick={() => {
          const token = localStorage.getItem("jwtToken");
          if (token && isTokenValid(token)) {
            window.location.href = `/user`;
          } else {
            window.location.href = "/login";
          }
        }}
      />
    </div>
  );
}