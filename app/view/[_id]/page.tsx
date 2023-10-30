"use client";
import Part from "@/components/Part";
import Model from "@/components/models/pc";
import { Bounds, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { PartProps } from "@/build/page";

export default function Build({
  params,
}: {
  params: {
    _id: string;
  };
}) {
  console.log("idd",params._id);
  const build =  useQuery(api.myFunctions.getSingle, { _id: params._id as Id<"builds"> });
  console.log("build",build);
  return (
    <main className="flex min-h-screen h-full justify-center p-24 bg-primary w-full  relative">
      <div className="flex-1 flex-col flex relative w-[40rem] h-[40rem] items-center justify-center">
        <Canvas>
          <Bounds fit margin={1.4}>
            <ambientLight position={[-1, 1, -2]} intensity={2} />
            <Model></Model>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={-Math.PI / 4}
            />
          </Bounds>
        </Canvas>
        {/* <form action="" className="w-full flex flex-col items-center" onSubmit={save_to_convex}>
          <input
            type="text"
            placeholder="Name this build"
            className="rounded-xl w-1/2 px-5 py-2 my-6 h-16 text-secondary flex  justify-between items-center text-2xl outline ring-4 bg-white focus:outline-gray-400 outline-gray-200 shadow-lg shadow-cyan-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className=" shadow-md shadow-gray-500 px-10 py-4 font-extrabold rounded-xl text-2xl bg-slate-800 text-primary" type="submit">
            Save Build
          </button>
        </form> */}
      </div>

      <div className="w-full flex flex-1 flex-col items-center justify-between gap-4 h-full  p-4">
        {build&& build.parts.map((part: any) => {
          return <Part key={part.src} src={part.preview} model={part.title} type={part.type} price={part.price}></Part>;
        })}
      </div>
    </main>
  );
}
