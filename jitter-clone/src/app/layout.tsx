import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jitter - Fast and simple animation tool",
  description: "Super fast motion for every team. Create stunning animations online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white text-black selection:bg-[#B392F8] selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
