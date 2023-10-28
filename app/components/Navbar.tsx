"use client";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex min-h-[7rem] items-center flex-row justify-between xl:px-12 px-4  w-full fixed z-10 self-center">
      <div className="flex h-full gap-1 items-center">
        {/* <Logo tw={"hidden lg:inline-block"}></Logo> */}
        <h1 className="font-extrabold text-sec lg:text-4xl text-3xl relative bottom-1 tracking-tighter">EasyPC</h1>
      </div>
      <div className="md:flex flex-row xl:gap-10 gap-4 hidden lg:text-2xl text-xl font-medium text-sec  ">
        <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out h-full">Home</span>
        <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out">Build Guides</span>
        <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out">FAQ</span>
      </div>
      <Link className="navlink " href="/register">
        Login
      </Link>
    </nav>
  );
}
