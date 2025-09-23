import Image from "next/image";
import { RoomListProps } from "@/types/restaurant";

export default function RoomListCard({
  id,
	restaurantName,
	deliveryFee,
	maxUser,
	currentUsers,
	deadline,
	imageUrl,
  discount
}: RoomListProps) {

  return (
    <div key={id} className="w-4/5 bg-white rounded-2xl shadow-md flex justify-center items-center p-4 mb-4 hover:border-amber-500">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">{restaurantName}</h2>
        <p className="text-gray-600 text-sm">배달비 {deliveryFee}</p>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          {maxUser == 0 ? 
            (<p className="mr-1">👤 {currentUsers}/∞ </p>)
            :
            (<p className="mr-1">👤 {currentUsers}/{maxUser}</p>)
          }
        </div>
        <p className="flex items-center text-gray-500 text-sm mt-1">{deadline}</p>
      </div>

      {/* 오른쪽 음식 썸네일, 디스카운트 뱃지 */}
      <div className="relative ml-8">
        <Image
          src={imageUrl}
          alt="thumbnail"
          width={80}
          height={80}
          className="rounded-xl object-cover"
        />

          <span className="absolute top-0.5 right-1 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-lg shadow">
            {discount.toFixed(0)}%
          </span>
      </div>
    </div>
  );
}