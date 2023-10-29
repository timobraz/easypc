import React from "react";
import { useMotionValueEvent, motion, useScroll, useTransform } from "framer-motion";







export default function Question(props: any) {
  return (
    
    <motion.div className="flex flex-col w-full rounded-lg h-32 bg-white cursor-pointer shadow-lg shadow-gray-[350] ring-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: -1,}}
      transition={{ duration: 1 }}
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.9}}
      
      >
      <img src={"mag.png"} className="rounded-lg" alt="" />
      <div className="flex flex-col p-4"
      
      >
        <h4 className="text-xl">{props.build.title || "NameName"}</h4>
        <h4 className="text-lg font-semibold">{props.build.totalPrice || "$$$$"}</h4>
      </div>
    </motion.div>
  );
}
