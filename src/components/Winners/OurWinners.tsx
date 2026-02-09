"use client";

import React, { useState , useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";

import curry from "../../../public/stephancurry.webp";
import ricky from "../../../public/rickypointing.jpg";
import player from "../../../public/player1.webp";
import player2 from "../../../public/player2.webp";
import player3 from "../../../public/player3.webp";
import player4 from "../../../public/player4.avif";
import harry from "../../../public/harry kewell.webp";
import kim from "../../../public/KimGarth.png";
import pat from "../../../public/pat cummins.jpeg";

import Image from "next/image";
import Trophy3D from "./Trophy3D";
import dynamic from "next/dynamic";

const OurWinners = () => {
  const [burstKey, setBurstKey] = useState(0);

  
  const [showAll, setShowAll] = useState(false);
  // Set this to false to show "Coming Soon", set to true to show winners
  const [showWinners, setShowWinners] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setBurstKey(prev => prev + 1);
    }, 4000); // every 4 seconds
  
    return () => clearInterval(interval);
  }, []);

  const winners = [
    {
      name: "Stephen M. — WA",
      title: "NBA Champion & League MVP",
      image: curry,
    },
    {
      name: "Ricky P. — VIC",
      title: "ICC Cricket World Cup Winner",
      image: ricky,
    },
    {
      name: "Daniel R. — NSW",
      title: "Formula 1 Grand Prix Winner",
      image: player,
    },
    {
      name: "Ellyse P. — SA",
      title: "International Cricket World Cup Champion",
      image: player2,
    },
    {
      name: "Joe I. — QLD",
      title: "NBA Playoffs Scoring Leader",
      image: player3,
    },
    {
      name: "Ben S. — VIC",
      title: "Professional Motorsport Race Winner",
      image: player4,
    },
    {
      name: "Harry Kewell - Aus",
      title: "International Football Tournament Winner",
      image: harry,
    },
    {
      name: "Kim Garth - Aus",
      title: "International Cricket World Cup Champion",
      image: kim,
    },
    {
      name: "Pat Cummins - Aus",
      title: "International Cricket World Cup Champion ",
      image: pat,
    },
  ];
  
  const visibleWinners = winners.slice(0, 6);
  const extraWinners = winners.slice(6);

  // ==========================================
  // COMING SOON PAGE
  // ==========================================
  if (!showWinners) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E4E4E4] dark:bg-[#212E36]">
        {/* Main Container */}
        <div className="text-center px-5 relative z-10 pt-5">
          {/* Championship Badge */}
          {/* <div className="inline-block bg-[linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)] text-white text-xs font-extrabold tracking-[3px] px-6 py-2 rounded-[20px] mb-8 uppercase shadow-[0_4px_15px_rgba(255,107,53,0.3)] animate-fadeInDown">
            Championship
          </div> */}
           <h1 className="block lg:hidden text-[#212E36] dark:text-[#E4E4E4] text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase mb-10">
            <span className="inline-block opacity-0 animate-fadeInUp-delay-300">
              Winners
            </span>{" "}
            <span className="inline-block opacity-0 animate-fadeInUp-delay-600">
              Announced
            </span>{" "}
            <span className="inline-block opacity-0 animate-fadeInUp-delay-900">
              Soon
              <span className="inline-block opacity-0 animate-blink-delay-1200">
                .
              </span>
              <span className="inline-block opacity-0 animate-blink-delay-1300">
                .
              </span>
              <span className="inline-block opacity-0 animate-blink-delay-1400">
                .
              </span>
            </span>
          </h1>

          {/* Trophies Container */}
        <div className="mb-5 flex items-end justify-center gap-8 relative max-sm:gap-4">
            <div className="relative mb-5 flex items-center justify-center">
        <div
  key={burstKey}
  className="absolute inset-0 pointer-events-none flex items-center justify-center"
>
  {[...Array(28)].map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 260 + 100;

    return (
      <motion.span
        key={i}
       className="absolute text-[#212E36] dark:text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]"

        style={{ fontSize: `${Math.random() * 14 + 10}px` }}
        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
        animate={{
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: [1, 1, 0],
          scale: [0.5, 1.2, 1],
          rotate: 360,
        }}
        transition={{
          duration: 2,
          delay: i * 0.03,
          ease: "easeOut",
        }}
      >
        ✦
      </motion.span>
    );
  })}
</div>




  {/* Glow */}
  <motion.div
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.4, 0.8, 0.4],
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
    }}
    className="absolute w-56 h-56 bg-yellow-400/30 blur-3xl rounded-full"
  />

  {/* Trophy */}
  <motion.div
    animate={{
      scale: [1, 1.12, 1],
    }}
    transition={{
      duration: 2.2,
      ease: "easeInOut",
      repeat: Infinity,
    }}
    className="text-[180px] relative drop-shadow-[0_25px_40px_rgba(255,215,0,0.6)]"
  >
    🏆
  </motion.div>
</div>

        </div>


          {/* Main Heading */}
          <h1 className="hidden lg:block text-[#212E36] dark:text-[#E4E4E4] text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
            <span className="inline-block opacity-0 animate-fadeInUp-delay-300">
              Winners
            </span>{" "}
            <span className="inline-block opacity-0 animate-fadeInUp-delay-600">
              Announced
            </span>{" "}
            <span className="inline-block opacity-0 animate-fadeInUp-delay-900">
              Soon
              <span className="inline-block opacity-0 animate-blink-delay-1200">
                .
              </span>
              <span className="inline-block opacity-0 animate-blink-delay-1300">
                .
              </span>
              <span className="inline-block opacity-0 animate-blink-delay-1400">
                .
              </span>
            </span>
          </h1>
        </div>
      </div>
    );
  }

  // ==========================================
  // WINNERS LIST PAGE
  // ==========================================
  return (
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] pb-10 pt-18 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-5 lg:mb-10">
          <div className="inline-block">
            <h2 className="text-4xl lg:text-5xl tracking-wide font-bold text-black dark:text-white uppercase mb-2 relative">
              Our Winners
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </h2>
          </div>
          <p className="mt-4 text-lg text-black dark:text-gray-300 tracking-wide font-light">
            Celebrating Our Lucky Prize Recipients
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Always visible cards */}
          {visibleWinners.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-gray-700 to-gray-800"
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden bg-gray-600">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Footer */}
              <div className="relative text-center py-5 px-4 border-t-4 border-yellow-400">
                <p className="text-base font-bold text-gray-50 mb-1 tracking-wide">
                  {item.name}
                </p>
                <p className="text-sm text-gray-50 font-medium leading-relaxed">
                  {item.title}
                </p>
              </div>
            </div>
          ))}

          {/* Animated extra cards */}
          <AnimatePresence>
            {showAll &&
              extraWinners.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-gray-700 to-gray-800"
                >
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden bg-gray-600">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Footer */}
                  <div className="relative text-center py-5 px-4 border-t-4 border-yellow-400">
                    <p className="text-base font-bold text-gray-50 mb-1 tracking-wide">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-50 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 pb-5">
          <button
            onClick={() => {
              if (showAll) {
                document
                  .getElementById("winners-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
              setShowAll((prev) => !prev);
            }}
            className={`px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl cursor-pointer
      transform hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm
      ${
        showAll
          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900"
          : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900"
      }`}
          >
            {showAll ? "Load Less" : "View All Winners"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurWinners;