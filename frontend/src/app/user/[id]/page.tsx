import CopyRight from "@/app/(authPages)/components/CopyRight";
import PartyHistory from "../components/PartyHistory";
import BottomNavLayout from "@/app/components/BottomNavLayout";

export default function UserPage() {

  return (
    <div className="flex flex-col text-black items-center h-full w-full">
        
        <PartyHistory/>

        {/* 메뉴 리스트 */}
        
        <CopyRight />
        <BottomNavLayout />
    </div>
  );
}
