"use client";

import RoomListDiv from "./components/RoomListDiv";
import Title from "../components/Title";
import PlusButton from "./components/PlusButton";
import BottomNavLayout from "../components/BottomNavLayout";
import ProgressRedirect from "./components/ProgressRedirect";

export default function Home() {

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto pt-0 mb-20">
      <Title mainTitle="배달 Delivery" subTitle="배달비 부담은 낮추고, 포만감은 2배로!" />
      <RoomListDiv />
      <PlusButton />
      <BottomNavLayout />

      <ProgressRedirect /> {/*서버 컴포넌트로 유지하기 위해 클라이언트 훅 쓴 부분 따로 분리*/}
    </div>
  );
}