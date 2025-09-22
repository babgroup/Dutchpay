import Link from "next/link";
import BottomNav from "./components/BottomNav";
import BasicButton from "./components/BasicButton";
import Title from "./components/Title";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pt-0 gap-16">
      <Title mainTitle="홈 Home" subTitle="배달비 부담은 낮추고, 포만감은 2배로!"/>
      <div className="w-full flex justify-center">
        <BasicButton text="배달비 아끼러 가기!" href="/delivery" />
      </div>

      <div className="w-full flex justify-center items-center">
      </div>

      <div className="w-full flex justify-center">
        <BottomNav />
      </div>
    </div>
  );
}
