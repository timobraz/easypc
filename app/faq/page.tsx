"use client";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "@/../convex/_generated/api";
import Question from "@/components/Question";
import { motion } from "framer-motion";
import { materialOpacity } from "three/examples/jsm/nodes/Nodes.js";


interface PartProps {
  src: string;
  model: string;
  type: string;
  price: number;
  desc?: string;
}

export default function faq() {
  const listBuilds = useQuery(api.myFunctions.listBuilds); 

  return (
    <main className="flex min-h-screen h-full  p-12 py-40 bg-primary w-full items-center flex-col gap-6 relative">
      <div 
      className="flex flex-row flex-wrap gap-5 justify-evenly w-1/2 font-bold">
      <h1 className="text-2xl w-full"> Frequently Asked Questions</h1>
        {listBuilds?.map((build) => (
          <Question key={build._id} build={build}
          
      >

          </Question>
        ))}
      </div>

     
    </main>
  );    
}
