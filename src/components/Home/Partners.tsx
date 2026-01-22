"use client";
import React from "react";
import Image from "next/image";
import acer from "../../../public/partner-acer.svg";
import everlast from "../../../public/partner-everlast.svg";
import boohoo from "../../../public/partner-booho.svg";
import tarocash from "../../../public/partner-tarocash.svg";

const partners = [
  { src: acer, bg: "bg-[#D9D9D9]" },
  { src: everlast, bg: "bg-black" },
  { src: boohoo, bg: "bg-[#D9D9D9]" },
  { src: tarocash, bg: "bg-black" },
];

export default function PartnersMarquee() {
  return (
    <div className="py-8 overflow-hidden bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-screen-2xl mx-auto px-2 lg:px-6">
        <h3 className="text-center text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 tracking-wide">
          OUR PARTNERS AND DISCOUNTS
        </h3>

        <div className="border-t border-white/10">
          {/* Row 1 */}
          <MarqueeRow direction="left" />

          <div className="h-px bg-white/10" />

          {/* Row 2 */}
          {/* <MarqueeRow direction="right" /> */}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max marquee ${
          direction === "left"
            ? "animate-[marquee-left_15s_linear_infinite]"
            : "animate-[marquee-right_15s_linear_infinite]"
        }`}
      >
        {[...partners, ...partners].map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-center h-28 md:h-32 lg:h-36 w-40 md:w-56 lg:w-64 ${item.bg}`}
          >
            <Image
              src={item.src}
              alt="partner"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
