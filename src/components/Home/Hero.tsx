//final fix
"use client";

import React from "react";
import Image from "next/image";
import reward from "../../../public/rewardImage.svg";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/stedium.svg')] bg-cover bg-center  py-5 ">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center text-white px-4 space-y-5">
        {/* Top text */}
        <p className="text-3xl md:text-5xl font-semibold">Join Australia’s</p>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Image src={reward} alt="reward badge" />
        </div>

        {/* Main heading */}
        <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-tight ">
          Rewards & Giveaway Club
        </p>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm md:text-lg text-white/80 ">
          Unlock exclusive member discounts, VIP experiences, and life-changing
          prize draws — all in one Australian-owned club.
        </p>

        {/* CTA */}
        <button className="bg-emerald-600 hover:bg-emerald-700 transition px-10 py-4 rounded-xl text-lg font-semibold shadow-lg">
          <Link href="/contact-us">
            <p>Join Now</p>
          </Link>
        </button>
      </div>
    </div>
  );
}
