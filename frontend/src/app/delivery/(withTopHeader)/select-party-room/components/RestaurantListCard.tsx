import Image from "next/image";
import { RestaurantList } from "@/types/restaurant";

interface RestaurantProps extends RestaurantList {
    isSelected: boolean,
    onClick: (id: number) => void;
}

export default function RestaurantListCard({
    id,
    restaurantName,
    deliveryFee,
    imageUrl,
    businessHours,
    isSelected,
    onClick
}: RestaurantProps) {
    return (
        <div
            className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm cursor-pointer ${isSelected ? 'border-1 border-orange-500 shadow-sm' : 'border-1 border-transparent'}`}
            onClick={() => onClick(id)}
        >
            <div className="text-left text-black">
                <h2>{restaurantName}</h2>
                <p>배달비 {deliveryFee}</p>
            </div>
            
            <div className="flex-shrink-0 ml-4">
                <Image
                    src={imageUrl}
                    alt={restaurantName}
                    width={90}
                    height={90}
                    className="rounded-xl object-cover"
                />
            </div>
        </div>
    );
}