"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ParallaxProvider } from "react-scroll-parallax";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "EasyPC",
//   description: "Generate PC builds with AI",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
  return (
    <html lang="en">
      <ConvexProvider client={convex}>
        <body className={poppins.className + " " + "text-gray-800"}>
          {<Navbar />}
          {children}
        </body>
      </ConvexProvider>
    </html>
  );
}
