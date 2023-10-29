"use client";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "@/../convex/_generated/api";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { materialOpacity } from "three/examples/jsm/nodes/Nodes.js";

interface PartProps {
  src: string;
  model: string;
  type: string;
  price: number;
  desc?: string;
}

export default function Build() {
  const listBuilds = useQuery(api.myFunctions.listBuilds);

  return (
    <main className="flex min-h-screen h-full  p-24 py-40 bg-primary w-full flex-col relative gap-4 items-center">
      <h1 className="text-3xl font-bold w-auto self-start">Saved Builds</h1>
      <div className="flex flex-row  flex-wrap gap- w-full justify-start gap-6">
        {listBuilds?.map((build) => (
          <Card key={build._id} build={build}></Card>
        ))}
      </div>
    </main>
  );
}
