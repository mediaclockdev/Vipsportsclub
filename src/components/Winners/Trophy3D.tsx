"use client";

import { motion } from "framer-motion";

export default function WinnersHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E4E4E4] dark:bg-[#212E36]">

      {/* CONFETTI */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ y: -50, x: 0, opacity: 0 }}
            animate={{
              y: 500,
              x: Math.random() * 400 - 200,
              opacity: 1,
            }}
            transition={{
              duration: 1.8,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      <div className="text-center px-5 relative z-10">

        {/* SPOTLIGHT */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-80 h-80 bg-yellow-400/20 blur-3xl rounded-full" />

        {/* TROPHY */}
        <motion.div
          initial={{ y: 120, scale: 0.6, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-[120px] mb-8"
        >
          <motion.span
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="drop-shadow-[0_25px_40px_rgba(255,215,0,0.6)]"
          >
            🏆
          </motion.span>
        </motion.div>



        {/* SHIMMER HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tight
          bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300
          bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent"
        >
          Winners Announced Soon
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-lg text-gray-700 dark:text-gray-300"
        >
          Stay tuned for the champions reveal
        </motion.p>
      </div>
    </div>
  );
}
