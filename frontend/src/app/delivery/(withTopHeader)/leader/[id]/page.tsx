import BasicButton from "@/app/components/BasicButton";
import PartyInfoDiv from "../../components/PartyInfoDiv"
import Link from "next/link";

export const metadata = {
  title: "내 파티",
};

export default function MyPartyPage() {
  return (
    <div className="flex flex-col">
      <div className="overflow-scroll mb-auto">
        <PartyInfoDiv />
      </div>
      <div className="w-full flex flex-col items-center p-4">
        <BasicButton text="메뉴 변경 요청하기"/>
        <BasicButton text="계좌번호 공개하기"/>
        <Link className="mt-2 text-gray-300" href="파티해산하기">
          파티 해산하기
        </Link>
      </div>
    </div>
  )
}
