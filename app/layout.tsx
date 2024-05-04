import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { SonnerToastProiver } from "@/providers/SonnerToastProvier";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A powerful blogging platform built with Next.js, enabling you to create, publish, and share your thoughts with the world effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="lg:max-w-[900px] min-h-screen px-8 lg:px-16 mx-auto py-8 shadow-xl flex flex-col">
            <NavBar />
            <div className="flex-auto">{children}</div>
            <Footer />
          </div>
          <SonnerToastProiver />
        </NextAuthProvider>
      </body>
    </html>
  );
}
