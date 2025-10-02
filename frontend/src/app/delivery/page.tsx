import RoomListDiv from "./components/RoomListDiv";
import Title from "../components/Title";
import PlusButton from "./components/PlusButton";
import BottomNavLayout from "../components/BottomNavLayout";

export default async function Home() {

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto pt-0 mb-20">
      <Title mainTitle="배달 Delivery" subTitle="배달비 부담은 낮추고, 포만감은 2배로!" />
      <RoomListDiv />
      
      
      <PlusButton />
      <BottomNavLayout />
    </div>
  );
}