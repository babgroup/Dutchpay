import BasicButton from "./components/BasicButton";
import BottomNavLayout from "./components/BottomNavLayout";
import Title from "./components/Title";

export default function Home() {
  return (
    <div>
      <Title mainTitle="홈 Home" subTitle="배달비 부담은 낮추고, 포만감은 2배로!"/>

      <div className="flex flex-col justify-center items-center m-4">
        <p className="">글로벌 캠퍼스 입주생들을 위한</p>
        <p className="">캠퍼스 라이프 메이트</p>
        <p className="m-6 text-2xl">
          함께 <span className="text-amber-500 font-bold">모여</span>, 배달비 <span className="text--500 font-bold">아껴</span>!
        </p>
      </div>
      
      <div className="mt-70 w-full flex justify-center">
        <BasicButton text="배달비 아끼러 가기!" href="/delivery" />
      </div>

      <BottomNavLayout />
    </div>
  );
}
