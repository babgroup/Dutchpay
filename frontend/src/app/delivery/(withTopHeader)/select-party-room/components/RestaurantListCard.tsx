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
    const [openTime, closeTime] = businessHours.split("-");
    const now = new Date();

    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    const openDate = new Date(now);
    openDate.setHours(openHour, openMinute, 0, 0);

    const closeDate = new Date(now);
    closeDate.setHours(closeHour, closeMinute, 0, 0);

    const isOpen = now >= openDate && now <= closeDate;

    return (
        <div
            className={`relative flex items-center justify-between p-4 bg-white rounded-xl shadow-sm transition
                ${isOpen && isSelected ? 'border-1 border-orange-500 shadow-sm' : 'border-1 border-transparent'}`}
            onClick={isOpen ? () => onClick(id) : undefined}
        >
            <div className="text-left text-black">
                <h2 className="font-semibold">{restaurantName}</h2>
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

            {!isOpen && (
                <div className="absolute inset-0 bg-black/20 z-0 rounded-xl">
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold z-10">영업이 마감되었습니다.</span>
                </div>
            )}
        </div>
    );
}