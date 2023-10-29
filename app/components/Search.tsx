import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import axios from "axios";

export default function Search(props: any) {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const { setLoading } = props;
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const resp = await axios.post("/api/search", { prompt: prompt });
      console.log(resp.data);
      if (resp.data) {
        localStorage.setItem("build", JSON.stringify(resp.data));
        localStorage.setItem("prompt", prompt);
        router.push("/build");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="rounded-xl w-full px-5 py-2  h-16 text-secondary flex  justify-between items-center text-2xl outline ring-4 bg-white focus:outline-gray-400 outline-gray-200 shadow-lg shadow-cyan-700"
    >
      <input
        type="text"
        placeholder={props.ph}
        className="outline-none flex-1 w-full"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button type="submit">
        <Image src="/search.png" className="w-8 h-8 cursor-pointer" width="80" height="80" alt="search"></Image>
      </button>
    </form>
  );
}
