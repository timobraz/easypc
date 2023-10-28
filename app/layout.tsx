"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ParallaxProvider } from "react-scroll-parallax";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "EasyPC",
//   description: "Generate PC builds with AI",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {<Navbar />}
        {children}
      </body>
    </html>
  );
}
