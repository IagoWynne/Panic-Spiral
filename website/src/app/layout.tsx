import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const reconstruct = localFont({
  src: "./game/raw-assets/common{m}/fonts/Reconstruct{wf}.ttf",
});

export const metadata: Metadata = {
  title: "Panic Spiral",
  description: "A game where everything spirals out of control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${reconstruct.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-[64px_1fr_64px] grid-rows-[64px_1fr] gap-4 items-center justify-center">
          <Link href="/">
            <Image
              src="/panic-spiral.jpg"
              alt="Panic Spiral Logo"
              width={64}
              height={64}
              priority
            />
          </Link>
          <div className={reconstruct.className}>
            <div className="flex gap-4 justify-start items-center text-xl">
              <Link href="/">Home</Link>
              <Link href="/leaderboard">Leaderboard</Link>
            </div>
          </div>
          <div className="row-start-2 col-start-2 w-[1280px] h-[800px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
