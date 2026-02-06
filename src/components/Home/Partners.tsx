"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";

import ideal from "../../../public/Ideal Nutrition.svg";
import funky from "../../../public/funky-trunks-logo.svg";
import trueprotein from "../../../public/True Protein.svg";
import lskd from "../../../public/LSKD_Logo.svg";
import Goodlife from "../../../public/Goodlife.svg";

const partners = [ideal, funky, trueprotein, lskd, Goodlife];

export default function Partners() {
  return (
    <section className="bg-white dark:bg-[#212E36] py-10">
      <h2 className="text-center text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
        OUR PARTNERS
      </h2>

      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white dark:from-[#212E36] to-transparent" />

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white dark:from-[#212E36] to-transparent" />

        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={50}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full"
        >
          {[...partners, ...partners].map((logo, i) => (
            <SwiperSlide
              key={i}
              className="!w-[140px] flex items-center justify-center"
            >
              <div className="h-16 w-36 flex items-center justify-center rounded-2xl">
                <Image
                  src={logo}
                  alt="partner logo"
                  className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
