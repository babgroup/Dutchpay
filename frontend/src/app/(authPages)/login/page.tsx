import LoginForm from "../components/LoginForm";
import CopyRight from "../components/CopyRight";
import Title from "@/app/components/Title";
import BottomNavLayout from "@/app/components/BottomNavLayout";

export default function LoginPage() {

  return (
    <div className="w-full flex flex-col justify-start h-full">
      <Title mainTitle="로그인" subTitle="로그인 후 모든 서비스를 누려보세요!"/>
      <LoginForm />
      <CopyRight />
      <BottomNavLayout />
    </div>

  )
}