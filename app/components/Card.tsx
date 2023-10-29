import React from "react";
import { useRouter } from "next/navigation";

export default function Card(props: any) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col w-[17rem] rounded-lg aspect-square bg-white ring-2 cursor-pointer shadow-md shadow-zinc-500"
      onClick={() => router.push("/view/" + props.build._id)}
    >
      <img src={"./image.png"} className="rounded-lg" alt="" />
      <div className="flex flex-col p-4 justify-around">
        <h4 className="text-xl font-bold">{props.build.title || "NameName"}</h4>
        <h4 className="text-xl font-semibold">{props.build.usecase || "UseCase"}</h4>

        <h4 className="text-lg font-light">${props.build.totalPrice || "$$$$"}</h4>
      </div>
    </div>
  );
}
