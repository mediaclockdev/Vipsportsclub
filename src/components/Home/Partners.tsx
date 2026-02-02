"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import ideal from "../../../public/Ideal Nutrition.svg";
import funky from "../../../public/funky-trunks-logo.svg";
import trueprotein from "../../../public/True Protein.svg";
import lskd from "../../../public/LSKD_Logo.svg";
import Goodlife from "../../../public/Goodlife.svg";

const partners = [ideal, funky, trueprotein, lskd, Goodlife];

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate the width of one set of logos
    const firstSet = track.children.length / 3; // We have 3 sets now
    let singleSetWidth = 0;

    for (let i = 0; i < firstSet; i++) {
      const child = track.children[i] as HTMLElement;
      singleSetWidth +=
        child.offsetWidth +
        parseFloat(getComputedStyle(child).marginLeft) +
        parseFloat(getComputedStyle(child).marginRight);
    }

    gsap.set(track, { x: 0 });

    // Store animation reference for pause/play control
    animationRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          return `${parseFloat(x) % singleSetWidth}px`;
        },
      },
    });

    // Cleanup on unmount
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  return (
    <section className=" bg-[#E4E4E4] dark:bg-[#212E36] py-4">
      <h2 className=" text-center text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
        OUR PARTNERS & DISCOUNTS
      </h2>

      {/* VIEWPORT */}
      <div className="relative overflow-hidden">
        {/* Optional gradient overlays for fade effect */}
        {/* <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" /> */}

        {/* TRACK */}
        <div ref={trackRef} className="flex w-max">
          {[...partners, ...partners, ...partners].map((logo, i) => (
            <div
              key={i}
              className="mx-2 flex h-20 w-40 shrink-0 items-center justify-center  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={logo}
                alt="partner logo"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
