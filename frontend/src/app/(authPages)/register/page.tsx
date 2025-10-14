import CopyRight from "../components/CopyRight";
import Title from "@/app/components/Title";
import BottomNavLayout from "@/app/components/BottomNavLayout";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {

  return (
    <div className="w-full flex flex-col justify-start h-full overflow-scroll">
      <Title mainTitle="회원가입" subTitle="회원가입 후 모든 서비스를 누려보세요!"/>
      <RegisterForm />
      <BottomNavLayout />
    </div>

  )
}