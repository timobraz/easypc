"use client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Model from "../models/pc";
import { Canvas } from "@react-three/fiber";
import { Bounds, Float, OrbitControls } from "@react-three/drei";
import { motion, useScroll } from "framer-motion";
import Search from "../Search";
export default function Hero() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="flex  min-h-screen h-screen flex-col items-center justify-center p-24 bg-primary relative w-full">
      <div className="z-10  flex-1   h-full max-w-5xl w-full items-center justify-center text-sm flex flex-col gap-6 ">
        <div className=" w-full flex-1 flex-grow-[5] flex">
          <Canvas>
            <Bounds fit margin={1.2}>
              <ambientLight position={[-1, 1, -2]} intensity={0.5} />
              <Float speed={1} rotationIntensity={1}>
                <Model></Model>
              </Float>

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
        </div>

        <div className="flex-1 flex-shrink-0 flex flex-col items-center  w-3/4 gap-4 h-full">
          <Search ph="What's this PC for?"></Search>
          <h3 className="text-gray-500 text-2xl  ">Build your dream PC, and have it make sense.</h3>
        </div>
      </div>
    </main>
  );
}
