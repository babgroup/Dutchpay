export default function PartyPopup({ 
  open = false, 
  title = "",
  deliveryTime = "", 
  onJoin, 
  onClose 
}: {
  open: boolean;
  title?: string;
  deliveryTime?: string;
  onJoin: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-6 py-7 w-[25vw] max-w-md text-center flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="text-[16px] mb-2">배달 시작 시간 : <span className="font-medium">{deliveryTime}</span></div>
        <div className="text-gray-500 text-[15px] mb-6 leading-tight">
          해당 파티는 참여 인원이 만족되면<br/>배달이 시작됩니다.
        </div>
        <button
          className="bg-gray-900 text-white w-38 py-2 my-1 rounded-full font-medium active:scale-95 transition mb-2"
          onClick={onJoin}
        >
          파티 참가하기
        </button>
        <button
          className="bg-gray-200 text-gray-700 w-28 py-1.5 rounded-full font-medium active:scale-95 transition"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
