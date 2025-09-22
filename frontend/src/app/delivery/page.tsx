import BottomNav from "../components/BottomNav";
import { getCurrentRooms } from "../../lib/fetchs";
import RoomList from "./components/RoomList";
import Title from "../components/Title";

export default async function Home() {
  const currentRooms = await getCurrentRooms();


  return (
    <div className="flex flex-col items-center h-full overflow-auto p-8 pt-0">
      <Title mainTitle="배달 Delivery" subTitle="배달비 부담은 낮추고, 포만감은 2배로!" />
      {currentRooms.map((room) => (
        <RoomList 
          key={room.id}
          restaurantName={room.restaurantName}
          deliveryFee={room.deliveryFee}
          maxUser={room.maxUser}
          currentUsers={room.currentUsers}
          imageUrl={room.imageUrl}
          deadline={room.deadline}
          discount={((room.deliveryFee - room.deliveryFee / room.maxUser) / room.deliveryFee) * 100}
        />
      ))}

      <div className="w-full flex justify-center">
        <BottomNav />
      </div>
    </div>
  );
}