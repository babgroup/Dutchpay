import CopyRight from "@/app/(authPages)/components/CopyRight";
import UserInfoContainer from "../components/UserInfoContainer";
import BottomNavLayout from "@/app/components/BottomNavLayout";

export default function UserPage() {

  return (
    <div className="flex flex-col text-black items-center h-full w-full">
        
        <UserInfoContainer/>        
        <CopyRight />
        <BottomNavLayout />
    </div>
  );
}
