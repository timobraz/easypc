import Image from "next/image";
import React from "react";

export default function Search({ ph }: { ph: string }) {
  return (
    <div className="rounded-xl w-full px-5 py-2  h-16 text-secondary flex  justify-between items-center text-2xl outline ring-4 bg-white focus:outline-gray-400 outline-gray-200 shadow-lg shadow-cyan-700">
      <input type="text" placeholder={ph} className="outline-none flex-1"></input>
      <Image src="/search.png" className="w-8 h-8 cursor-pointer" width="80" height="80" alt="search"></Image>
    </div>
  );
}
