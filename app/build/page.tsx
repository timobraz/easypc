"use client";
import Part from "@/components/Part";
import Model from "@/components/models/pc";
import { Bounds, CameraControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "@/../convex/_generated/api";
interface PartProps {
  src: string;
  model: string;
  type: string;
  price: number;
  desc?: string;
}

export default function Build() {
  const saveToConvex = useMutation(api.myFunctions.saveBuild);
  const [parts, setParts] = useState<PartProps[]>([
    { src: "https://m.media-amazon.com/images/I/71TaSwsWCxL._AC_UF894,1000_QL80_.jpg", model: "X79", type: "Motherboard", price: "115.49" },

    {
      src: "https://www.digitaltrends.com/wp-content/uploads/2022/01/nvidia-rtx-3050-review-2.jpg?fit=720%2C480&p=1",
      model: "RX 580",
      type: "GPU",
      price: 96.27,
    },
  ]);

  async function save_to_convex() {
    const result = await saveToConvex({
      parts: parts.map((part) => {
        return { preview: part.src, title: part.model, type: part.type, price: part.price, description: "test" };
      }),
      description: "adawdawd",
      title: "test",
      totalPrice: 1000,
    });
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
        <button className="px-10 py-4 font-extrabold rounded-xl text-2xl bg-slate-800 text-primary" onClick={save_to_convex}>
          Confirm
        </button>
      </div>

      <div className="w-full flex flex-1 flex-col items-center justify-between gap-4 h-full  p-4">
        {parts.map((part) => {
          return <Part key={part.src} src={part.src} model={part.mode} type={part.type} price={part.price}></Part>;
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
