import BasicButton from "./components/BasicButton";
import BottomNavLayout from "./components/BottomNavLayout";
import Title from "./components/Title";

export default function Home() {
  return (
    <div>
      <Title
        mainTitle="홈 Home"
        subTitle="배달비 부담은 낮추고, 포만감은 2배로!"
      />

      {/* 본문 */}
      <div className="mt-14 flex flex-col justify-center items-center max-h-[50vh] overflow-y-auto p-4 text-black">
        <p className="text-xl mt-[18vh]">글로벌 캠퍼스 입주생들을 위한</p>
        <p className="text-xl">캠퍼스 라이프 메이트</p>
        <p className="py-6 text-2xl">
          함께 <span className="text-amber-500 font-bold">모여</span>, 배달비{" "}
          <span className="text-amber-500 font-bold">아껴</span>!
        </p>
        <p className="mt-[8vh] text-lg">방장의 역할은 뭐예요? 🤔</p><br/>
        <div className="max-w-md text-center ">
          <p className="text-sm">
            방장은 파티를 만들고 팀원들을 위해 주문을 해요.<br/>
            주문 시간 전, 가게의 상황을 확인해 배달 가능 여부를 확인하고
            주문이 불가능할 경우 메뉴 변경을 요청해야 해요.
          </p>
        
          <p className="mt-[6vh] text-lg">팀원의 역할은 뭐예요? 🤨</p><br/>
          <p className="text-sm">
            팀원은 이미 만들어진 파티에 참가해요.<br /> 주문시간 전까지 메뉴를 골라야 해요.
            주문 시간이 되어 방장이 주문 가능 여부를 확인했을 때,
            방장의 계좌번호로 입금을 해야 해요.
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="h-[13vh] w-full flex justify-center items-end">
        <BasicButton text="배달비 아끼러 가기!" href="/delivery" />
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavLayout />
    </div>
  );
}
