// components/WhyBecomeMember.tsx
"use client";

import Image from "next/image";

const items = [
  "Automatic entry into monthly sports rewards giveaways",
  "Automatic entry into monthly sports rewards giveaways",
  "Automatic entry into monthly sports rewards giveaways",
  "Automatic entry into monthly sports rewards giveaways",
  "Automatic entry into monthly sports rewards giveaways",
];

export default function WhyBecomeMember() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 30%, #1e3336 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          Why Become a Member?
        </h2>

        {/* Sub text */}
        <p className="text-white/90 text-xs sm:text-sm lg:text-base mt-3 max-w-2xl mx-auto">
          Whether you play, train, coach or simply love watching sports — being a
          member pays off.
        </p>

        {/* Grid of icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 mt-12 justify-items-center">
          {items.map((text, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs">
              {/* Icon circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E3C15D] flex items-center justify-center">
                <Image
                  src="/images/icon-check-green.svg"  // 👈 change icon
                  alt=""
                  width={40}
                  height={40}
                />
              </div>

              {/* Text */}
              <p className="text-white mt-4 text-sm sm:text-base leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
