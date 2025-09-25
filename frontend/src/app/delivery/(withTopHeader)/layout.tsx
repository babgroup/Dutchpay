

export default function TopLayout({ children }: Readonly<{ children: React.ReactNode; pageTitle: string }>) {
  return (
    <div className="bg-beige-100 font-sans flex flex-col">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
