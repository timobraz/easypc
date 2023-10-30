"use client";
import Part from "@/components/Part";
import Model from "@/components/models/pc";
import { Bounds, CameraControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMutation } from "convex/react";
import React, { FormEvent, useEffect, useState } from "react";
import { api } from "@/../convex/_generated/api";
import { useRouter } from "next/navigation";
import axios from "axios";
export interface PartProps {
  src?: string;
  model: string;
  type: string;
  price?: number;
  desc?: string;
}

export default function Build() {
  const saveToConvex = useMutation(api.myFunctions.saveBuild);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [parts, setParts] = useState<PartProps[]>([]);
  //const part_descriptions = {
  //       CPU: cpu_description,
  //       GPU: gpu_description,
  //       RAM: ram_description,
  //       MOBO: mobo_description,
  //       PSU: psu_description,
  //       STORAGE: storage_description,
  //       CASE: case_description,
  //   }
  useEffect(() => {
    async function handleDesc(prompt: string, parsed: any) {
      try {
        const resp = await axios.post("/api/descriptions", { prompt: prompt, build });
        console.log(resp.data);
        if (resp.data) {
          setParts((parts: any) => {
            return parts.map((part: any) => {
              return { ...part, desc: resp.data[part.type] };
            });
          });
        }
      } finally {
      }
    }
    const build = JSON.parse(localStorage.getItem("build") || "{}");

    if (build) {
      const pars: any = [];
      for (const [key, value] of Object.entries(build)) {
        pars.push({ type: key, model: value });
      }
      setParts(pars);
      handleDesc(localStorage.getItem("prompt")!, build);
    }
  }, []);
  async function save_to_convex(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    const result = await saveToConvex({
      parts: parts.map((part) => {
        return { preview: part.src, title: part.model, type: part.type, price: part.price, description: "test" };
      }),
      description: localStorage.getItem("prompt")!,
      title: name || "My build",
      // totalPrice: parts.reduce((a, b) => a + b.price, 0),
    });
    name.trim().length > 1 && router.push("/dashboard");
  }

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
        <form action="" className="w-full flex flex-col items-center" onSubmit={save_to_convex}>
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
        </form>
      </div>

      <div className="w-full flex flex-1 flex-col items-center justify-between gap-4 h-full  p-4">
        {parts.map((part) => {
          return <Part key={part.src} src={part.src} model={part.model} type={part.type} price={part.price}></Part>;
        })}
        {/* <Part></Part>
        <Part></Part>
        <Part></Part>
        <Part></Part> */}
      </div>
      {/* <button onClick={save_to_convex}>Save test</button> */}
    </main>
  );
}
