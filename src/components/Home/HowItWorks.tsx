import React from "react";
import Image from "next/image";

import backgroundgradient from "../../../public/backgroundgradient.svg";

export default function HowItWorks() {
  const work = [
    {
      title: "CHOOSE YOUR MEMBERSHIP",
      description:
        "Select the membership that suits your lifestyle, gold or silver, and get instant access to exclusive offers, partner benefits, and weekly prize draws.",
      image: "/ticket.svg",
    },
    {
      title: "ACCESS MEMBER DISCOUNTS",
      description:
        "Log into the members-only portal to browse exclusive offers and discounts from our partner brands, all ready for you to use instantly.",
      image: "/create_bat.svg",
    },
    {
      title: "AUTOMATIC PRIZE ENTRIES",
      description:
        "Once you’re a member, you’re automatically entered into every weekly prize draw — no forms, no effort, just the chance to win unforgettable sporting experiences.",
      image: "/footbal.svg",
    },
  ];

  return (
    <div className="mt-0 lg:-mt-2.5 py-3 lg:py-12 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-10">
          HOW IT WORKS
        </h2>

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <HowCard {...work[0]} />
          <HowCard {...work[1]} />
        </div>

        {/* BOTTOM CENTER CARD */}
        <div className="flex justify-center ">
          <HowCard {...work[2]} />
        </div>
      </div>
    </div>
  );
}

function HowCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="relative h-[220px] rounded-2xl overflow-hidden bg-gradient-to-r from-[#4A9A7D] to-[#2C3E49] p-4">
      {/* Texture */}
      <Image
        src={backgroundgradient}
        alt=""
        fill
        className="object-cover opacity-30"
      />

      {/* Content */}
      <div className="relative z-10 h-full  flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-extrabold mb-3">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed max-w-[420px]">
            {description}
          </p>
        </div>

        {/* Illustration */}
        <Image
          src={image}
          alt=""
          width={120}
          height={120}
          className="absolute top-24 right-[-20]"
        />
      </div>
    </div>
  );
}
