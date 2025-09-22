import BottomNav from "./BottomNav";

export default function BottomNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-16">
      <header className="w-full flex justify-center">
        {/* 헤더 영역 필요 시 추가 */}
      </header>

      <main className="w-full flex justify-center items-center">{children}</main>

      <footer className="w-full flex justify-center items-center">
        <BottomNav />
      </footer>
    </div>
  );
}
