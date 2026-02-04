"use client";

import React, { useState } from "react";
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

const OurWinners = () => {
  const [showAll, setShowAll] = useState(false);

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

        {/* Optional: View All Button */}

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
