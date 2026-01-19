import Image from "next/image";
import React from "react";
import curry from "../../../public/stephancurry.webp";

const OurWinners = () => {
  const winners = Array(6).fill({
    name: "STEPHEN, WA",
    title: "AFL GATHER ROUND Experience",
  });

  return (
    <div className="bg-[#212E36] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white uppercase">
            Our Winners
          </h2>
          <p className="mt-4 text-gray-300 tracking-wide">
            CHECKOUT SOME OF Our Previous Winners
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {winners.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg bg-[#9C9C9C]"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={curry}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Footer */}
              <div className="bg-[#CFCFCF] text-center py-4 px-3">
                <p className="text-sm font-semibold text-gray-700">
                  {item.name}
                </p>
                <p className="text-xs text-gray-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurWinners;
