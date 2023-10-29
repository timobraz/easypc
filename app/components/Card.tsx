import React from "react";

export default function Card(props: any) {
  return (
    <div className="flex flex-col w-72 rounded-lg aspect-square bg-white ring-2 cursor-pointer ">
      <img src={"./image.png"} className="rounded-lg" alt="" />
      <div className="flex flex-col p-4">
        <h4 className="text-xl">{props.build.title || "NameName"}</h4>
        <h4 className="text-lg font-semibold">{props.build.totalPrice || "$$$$"}</h4>
      </div>
    </div>
  );
}
