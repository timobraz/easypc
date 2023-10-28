import React from "react";

export default function Search({ ph }: { ph: string }) {
  return (
    <input
      type="text"
      placeholder={ph}
      className="rounded-xl w-3/5 px-5 py-2  h-16 text-secondary  text-2xl outline ring-4  focus:outline-gray-400 outline-gray-200 shadow-lg shadow-cyan-700"
    />
  );
}
