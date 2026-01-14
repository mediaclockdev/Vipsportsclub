// components/WhyBecomeMember.tsx
"use client";

import Image from "next/image";
import tick from "../../../public/tick.svg";


const items = [
  {
    title: "Automatic Entry Into Weekly Sports Prize Draws",
    sub: "Every member is entered into our weekly draws for bucket-list sporting experiences — no forms, no fuss.",
  },
  {
    title: "Exclusive Discounts From Leading Sports & Fitness Brands",
    sub: "Enjoy member-only pricing on apparel, equipment, coaching, nutrition, wellness and more, with premium partners curated to elevate your active lifestyle.",
  },
  {
    title: "Access to the Members-Only Portal",
    sub: "Browse exclusive offers, unlock fresh discounts, and stay across upcoming promotions — all in a beautifully streamlined, members-only space.",
  },
  {
    title: "Unforgettable Sporting Rewards & Experiences",
    sub: "From dream giveaways to premium partner perks, membership gives you access to experiences designed to inspire and reward passionate sports lovers.",
  },
];

export default function WhyBecomeMember() {
  return (
    <div className="py-12 bg-[#212E36]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        {/* Heading */}
        <div className="pb-10">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
            Why Become a Member?
          </h2>
        </div>

        {/* Grid of icons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {items.map((items, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-5">
              {/* Icon circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E3C15D] flex items-center justify-center">
                <Image src={tick} alt="" width={40} height={40} />
              </div>

              {/* Text */}
              <div className="max-w-[427px]">
                <p className="text-white  text-sm sm:text-base leading-relaxed max-w-[350px]">
                  {items.title}
                </p>
                <p className="text-white  text-sm sm:text-base leading-relaxed max-w-[350px]">
                  {items.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
