import Image from "next/image";
import React from "react";

interface PartProps {
  src?: string;
  model: string;
  type: string;
  price?: number;
  desc?: string;
}

export default function Part(props: PartProps) {
  return (
    <div className="bg-gray-200 min-w-full height-14 shadow-md shadow-gray-600 p-2 rounded-xl ring-1 ring-slate-600 flex h-32 items-center gap-4 gap">
      {props.src && <img className="rounded-xl h-full object-cover w-40 " src={props.src} alt="" />}
      {/* https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer-motherboard.jpg/640px-Computer-motherboard.jpg */}
      <div className="flex  gap-2  flex-col flex-nowrap overflow-y-auto overflow-x-hidden h-full">
        <div className="flex gap-2 w-full flex-1">
          <p className="text-xl font-bold">{props.type || "PartType"}</p>
          {props.price && <p className="text-xl font-bold">${props.price || "000"}</p>}
          <p className="text-xl font-light self-end">{props.model || "modelname"}</p>
        </div>
        <p className="font-light">
          {props.desc ||
            `rem ipsum dolor sit amet consectetur adipisicing elit. Vero numquam, saepe nulla molestias optio quaerat odio commodi quasi molestiae
          repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, consequuntur cumque distinctio mollitia earum quae fugit
          dicta natus fuga perferendis?`}
        </p>
      </div>
    </div>
  );
}
