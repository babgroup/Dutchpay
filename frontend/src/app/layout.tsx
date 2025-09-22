import type { Metadata } from "next";
import "./globals.css";
import Title from "./components/Title";

export const metadata: Metadata = {
  title: "글로벌캠퍼스 더치페이",
  description: "",
};

export default function RootLayout({
  children, pageTitle
}: Readonly<{
  children: React.ReactNode;
  pageTitle: string;
}>) {
  return (
    <html lang="kr">
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="w-full h-full max-w-screen max-h-screen aspect-[9/16] bg-white shadow-lg"
          style={{
            maxWidth: "calc(100vh * 9 / 16)",
            maxHeight: "100vh",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}