"use client";

import Image from "next/image";
import React from "react";
import rewardImage from "../../../public/rewardImage.svg";
import winner from "../../../public/winner.svg";
import Link from "next/link";

export default function Hero() {
  return (
    <>
    <section
    
    className="w-full h-full  bg-center bg-cover bg-[url('/home_hero_back.svg')] bg-[#1B242C] dark:bg-[#212E36]     text-[#FFFFFF]"
    >
      <div className="max-w-screen-2xl mx-auto px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left max-w-xl mt-15">
            <h1 className=" italic ml-20 font-extrabold text-[56px]  leading-none text-[#FFFFFF]">
              JOIN AUSTRALIA’s
            </h1>

            {/* #1 Reward Image */}
            <div className=" flex justify-center lg:justify-start">
              <Image
                src={rewardImage}
                alt="Reward"
                className="w-[323.98px] h-[143px]  ml-[150px]"
              />
            </div>

            <h2 className=" ml-10  italic text-[56px] lg:text-4xl font-semibold text-[#FFFFFF]">
              & GIVEAWAY CLUB
            </h2>

            {/* Paragraph */}
            <p className=" ml-10  text-[20px] lg:text-xl opacity-90 text-[#FFFFFF]">
              Unlock exclusive member discounts, VIP experiences, and
              life-changing prize draws — all in one Australian-owned club.
            </p>

            {/* Buttons */}
            <div className="ml-10  flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-2">
              {/* Use Link as a styled anchor (no nested button) */}
              <Link
                href="/membership"
                aria-label="Join membership"
                className="px-20 py-3 rounded-2xl text-[#FFFFFF] font-semibold bg-[#4A9B7A] transition duration-300 hover:ring-2 hover:ring-yellow-300 hover:text-white"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE (Winner collage) */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={winner}
              alt="Winner"
              className="w-[282px] lg:w-96 h-auto drop-shadow-xl rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
