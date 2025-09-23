import BottomNav from "../components/BottomNav";
import RoomListDiv from "./components/RoomListDiv";
import Title from "../components/Title";

export default async function Home() {

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto pt-0">
      <Title mainTitle="배달 Delivery" subTitle="배달비 부담은 낮추고, 포만감은 2배로!" />
      <RoomListDiv />
      
      
      <div className="w-full flex justify-center">
        <BottomNav />
      </div>
    </div>
  );
}