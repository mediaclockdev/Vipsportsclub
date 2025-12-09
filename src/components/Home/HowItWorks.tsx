import React from "react";
import Image from "next/image";

import backgroundgradient from "../../../public/backgroundgradient.svg";

export default function HowItWorks () {
  const work = [
    {
      title1: "CHOOSE YOUR",
      title2: "MEMBERSHIP",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..",
      image: "/ticket.svg",
    },
    {
      title1: "ACCESS MEMBER",
      title2: "DISCOUNTS",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..",
      image: "/create_bat.svg",
    },
    {
      title1: "AUTOMATIC PRIZE",
      title2: "ENTRIES",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..",
      image: "/footbal.svg",
    },
    {
      title1: "WATCH THE WINNERS",
      title2: "ROLL IN",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..",
      image:"/cup.svg",
    },
  ];

  return (
    <div   style={{
    background: "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)"
  }}>
      <div className="max-w-screen-2xl mx-auto px-8 py-5 space-y-10">
        {/* HEADING */}
        <h2 className="text-center text-[36px] font-bold tracking-wide text-[#FFFFFF]">
          HOW IT WORKS
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  justify-items-center">
          {work.map((item, index) => (
            <div
              key={index}
              className="relative  rounded-2xl px-6 py-4 bg-linear-to-r from-[#4A9A7D]  to-[#2C3E49] to-95% overflow-hidden"
            >
              {/* BACKGROUND TEXTURE */}
              <Image
                src={backgroundgradient}
                alt="texture"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              {/* CONTENT */}
              <div className="relative flex gap-5">
                <div className="space-y-2 flex flex-col ">
                  <div className="text-white font-extrabold text-xl leading-tight flex gap-2 w-full">
                    <p className="text-white">{item.title1}</p>
                    <p className="text-[#B1D9C9]">{item.title2}</p>
                  </div>
                  <div className="flex">
                    <p className="text-white/90 max-w-[370px] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="">
                      <Image
                        src={item.image}
                        alt="illustration"
                        width={100}
                        height={100}
                        className="relative z-10 transition-transform duration-300 hover:-translate-y-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


