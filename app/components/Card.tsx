import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Card(props: any) {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col w-[17rem] rounded-lg aspect-square bg-white ring-2 cursor-pointer shadow-md shadow-zinc-500"
      initial={{ opacity: 0, y: 30 }}
      onClick={() => router.push("/view/" + props.build._id)}
      animate={{ opacity: 1, y: -1 }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <img src={"./image.png"} className="rounded-lg" alt="" />
      <div className="flex flex-col p-4">
        <h4 className="text-xl">{props.build.title || "NameName"}</h4>
        <h4 className="text-lg font-semibold">{props.build.totalPrice || props.build.description}</h4>
      </div>
    </motion.div>
  );
}
