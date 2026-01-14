// components/BecomeMemberBanner.tsx
"use client";

import Image from "next/image";

export default function BecomeMemberBanner() {
  return (
    <div className="relative h-auto lg:h-[85vh] w-full bg-[url('/memberbackground.jpg')] bg-cover bg-center  py-5 ">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center text-white px-4 space-y-5">
        {/* Top text */}
        <p className="text-3xl md:text-5xl font-semibold">BECOME A MEMBER</p>

        {/* Badge */}

        {/* Main heading */}
        <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-tight ">
          UNLOCK SPORTS REWARDS EVERYDAY
        </p>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm md:text-lg text-white/80 ">
          The Club Built for People Who Live and Breathe Sports
        </p>
      </div>
    </div>
  );
}
