// components/BecomeMemberBanner.tsx
"use client";

import Image from "next/image";

export default function BecomeMemberBanner() {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/austrailanbg.jpg"
        alt="VIP Sports Club players in action"
        fill
        priority
        className="object-cover object-center lg:object-top"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-xl sm:text-3xl md:text-5xl font-semibold text-white">
          BECOME A MEMBER
        </p>

        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white max-w-4xl leading-tight">
          UNLOCK SPORTS REWARDS EVERYDAY
        </p>
      </div>
    </div>
  );
}
