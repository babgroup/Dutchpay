import Title from "@/app/components/Title";
import TopHeader from "../../components/TopHeader";
import Toggle from "./components/Toggle";

export default function PartyBrakeUpPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 gap-6 w-full text-black">
      <TopHeader pageTitle="파티 해산하기" />
      
      <div className="flex flex-col items-center text-center gap-2 w-full">
        <h1 className="text-3xl font-semibold">해산 사유를 선택해주세요.</h1>
        <p className="text-gray-600 text-lg">
          비정상적인 사유로 인한 해산일 경우 추후 검토에 따라 <br />
          이용 정지 등의 불이익이 발생할 수 있습니다.
        </p>
      </div>

      <Toggle />
    </div>
  );
}