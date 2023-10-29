"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex min-h-[7rem] items-center flex-row justify-between xl:px-12 px-4  w-full fixed z-10 self-center">
      <div className="flex h-full gap-1 items-center cursor-pointer" onClick={() => router.push("/")}>
        {/* <Logo tw={"hidden lg:inline-block"}></Logo> */}
        <h1 className="text-sec text-4xl relative bottom-1 tracking-tighter font-[800] ">EasyPC</h1>
      </div>
      <div className="md:flex flex-row xl:gap-10 gap-4 hiddenlg:text-2xl text-xl font-medium text-sec  cursor-pointer navlink  h-full ">
        <Link href="/" className="hover:text-accent  transition-all  duration-300 ease-in-out">
          Home
        </Link>
        <Link href="/guides" className="hover:text-accent transition-all  duration-300 ease-in-out">
          Build Guides
        </Link>
        <Link href="/dashboard" className="hover:text-accent transition-all  duration-300 ease-in-out">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
