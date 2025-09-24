import BottomNav from "./BottomNav";

export default function BottomNavLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-12 bg-white rounded-3xl shadow-md flex items-center justify-around p-2">
      <BottomNav href="/" iconSrc="/home.svg" alt="home icon" />
      <BottomNav href="/delivery" iconSrc="/delivery.svg" alt="delivery icon" />
      <BottomNav href="/user" iconSrc="/user.svg" alt="user icon" />
    </div>
  );
}