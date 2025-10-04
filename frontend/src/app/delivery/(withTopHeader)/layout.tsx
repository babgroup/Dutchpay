import TopHeader from "../components/TopHeader";

export default function TopLayout({ children, pageTitle }: Readonly<{ children: React.ReactNode; pageTitle: string }>) {
  return (
    <div className="bg-beige-100 font-sans flex flex-col">
      <TopHeader pageTitle={pageTitle} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
