import MemberCard from "./MemberCard";
import { MyPartyData } from "@/types/restaurant";
import { formaTime } from "@/common/formatDate";

interface PartyInfoDivProps {
  party: MyPartyData;
}

export default function PartyInfoDiv({ party } : PartyInfoDivProps ) {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-4 text-xl font-black text-center">
        {party.restaurantName} | 주문 시간 : {formaTime(party.deadline)}
      </p>

      {/* 카드 리스트 영역만 스크롤 가능 */}
      <div className="w-full flex flex-col items-center gap-2">
        {(!party.user || party.user.length === 0) ? (
          <p className="text-center text-gray-400 mt-2">
            아직 파티에 참가한 사람이 없어요. 😳
          </p>
        ) : (
          party.user.map((member) => (
            <MemberCard
              key={member.userId}
              userId={member.userId}
              userName={member.userName}
              foodOrder={member.foodOrder}
            />
          ))
        )}
      </div>
    </div>
  )
}