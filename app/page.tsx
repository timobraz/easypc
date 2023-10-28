"use client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Model from "./components/models/pc";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { AmbientLight, Light, PointLight, PointLightShadow } from "three";
import { motion, useScroll } from "framer-motion";
import Search from "./components/Search";
export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary">
      <div className="z-10 flex-1 h-full max-w-5xl w-full items-center justify-center text-sm flex flex-col gap-4">
        <Canvas className="" linear>
          <Bounds fit margin={1.4}>
            <ambientLight position={[-1, 1, -2]} intensity={0.5} />

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

        <div className="flex flex-col items-center justify-between w-full gap-4  h-full">
          <Search ph="What's this PC for?"></Search>
          <h3 className="text-gray-500 text-2xl  ">Build your dream PC, and have it make sense.</h3>
        </div>
      </div>
    </main>
  );
}
