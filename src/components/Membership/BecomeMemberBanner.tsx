// components/BecomeMemberBanner.tsx
"use client";

import Image from "next/image";

export default function BecomeMemberBanner() {
  return (
    <section className="relative w-full h-[140px] sm:h-[180px] lg:h-[220px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/member-football-bg.svg" 
        alt="Sports background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay so text readable */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered text */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center text-[#ffffff] max-w-3xl">
          <p className="text-sm sm:text-base lg:text-lg font-semibold italic tracking-wide">
            BECOME A MEMBER
          </p>
          <p className="mt-1 text-base sm:text-2xl lg:text-3xl font-bold italic tracking-wide">
            UNLOCK SPORTS REWARDS EVERYDAY
          </p>
          <p className="mt-3 text-xs sm:text-sm lg:text-base opacity-90">
            The Club Built for People Who Live and Breathe Sports
          </p>
        </div>
      </div>
    </section>
  );
}
