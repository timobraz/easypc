import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Search({ ph }: { ph: string }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    prompt.trim().length > 3 && router.push("/build?" + prompt.trim());
  }
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="rounded-xl w-full px-5 py-2  h-16 text-secondary flex  justify-between items-center text-2xl outline ring-4 bg-white focus:outline-gray-400 outline-gray-200 shadow-lg shadow-cyan-700"
    >
      <input type="text" placeholder={ph} className="outline-none flex-1 w-full" value={prompt} onChange={(e) => setPrompt(e.target.value)}></input>
      <button type="submit">
        <Image src="/search.png" className="w-8 h-8 cursor-pointer" width="80" height="80" alt="search"></Image>
      </button>
    </form>
  );
}
