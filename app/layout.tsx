import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GithubIcon, BilibiliIcon, DogIcon } from "@/components/icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "📦我超 盒！",
  description: "Nextjs learning project",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">📦 我超 盒！</h1>
            <div className="flex items-center space-x-4">
              <a
                href="https://dogxi.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="个人主页"
              >
                <DogIcon className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/dogyyds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Github"
              >
                <GithubIcon className="w-7 h-7" />
              </a>
              <a
                href="https://space.bilibili.com/524190453"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Bilibili"
              >
                <BilibiliIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 pt-20">{children}</main>
      </body>
    </html>
  );
}
