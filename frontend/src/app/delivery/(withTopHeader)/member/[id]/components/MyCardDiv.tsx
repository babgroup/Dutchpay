import MyMenu from "./MyMenu";
import { MyPartyData } from "@/types/restaurant";
import { formaTime } from "@/common/formatDate";

interface MyCardProps {
    party: MyPartyData;
}

export default function MyCardDiv({ party }: MyCardProps) {
    return (
        <div className="flex flex-col items-center w-full">
            <p>
                {party.restaurantName} | 주문 시간 {formaTime(party.deadline)}
            </p>

            <div className="py-8">
                <MyMenu deliveryFee={party.deliveryFee}/>
            </div>
        </div>
    )
}