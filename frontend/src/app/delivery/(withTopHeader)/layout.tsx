import TopHeader from "../components/TopHeader";

export default function TopLayout({ children, pageTitle }:Readonly<{
  children: React.ReactNode;
  pageTitle: string;
}>) {
  return (
    <div className="min-h-screen bg-beige-100 font-sans">
      <TopHeader pageTitle={pageTitle} />
      <main className="p-4">{children}</main>
    </div>
  );
}