import React from "react";
import curry from "../../../public/stephancurry.webp";
import ricky from "../../../public/rickypointing.jpg";
import player from "../../../public/player1.webp";
import player2 from "../../../public/player2.avif";
import player3 from "../../../public/player3.webp";
import player4 from "../../../public/player4.avif";

import Image from "next/image";

const OurWinners = () => {
  const winners = [
    {
      name: "STEPHEN, WA",
      title: "AFL GATHER ROUND Experience",
      image: curry,
    },
    {
      name: "RICKY POINTING",
      title: "AFL GATHER ROUND Experience",
      image: ricky,
    },
    {
      name: "PLAYER 1",
      title: "AFL GATHER ROUND Experience",
      image: player,
    },
    {
      name: "PLAYER 2",
      title: "AFL GATHER ROUND Experience",
      image: player2,
    },
    {
      name: "PLAYER 1",
      title: "AFL GATHER ROUND Experience",
      image: player3,
    },
    {
      name: "PLAYER 2",
      title: "AFL GATHER ROUND Experience",
      image: player4,
    },
  ];
  return (
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] pt-18 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-5 lg:mb-10">
          <div className="inline-block">
            <h2 className="text-4xl lg:text-5xl tracking-wide font-bold text-black dark:text-white uppercase mb-2 relative">
              Our Winners
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </h2>
          </div>
          <p className="mt-4 text-lg text-black dark:text-gray-300 tracking-wide font-light">
            Celebrating Our Lucky Prize Recipients
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {winners.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-gray-700 to-gray-800"
            >
              {/* Winner Badge */}
              {/* <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                Winner
              </div> */}

              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden bg-gray-600">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover  object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Footer */}
              <div className="relative bg-gradient-to-br from-black-200 to-black-300 text-center py-5 px-4 border-t-4 border-yellow-400">
                <p className="text-base font-bold text-gray-50 mb-1 tracking-wide">
                  {item.name}
                </p>
                <p className="text-sm text-gray-50 font-medium leading-relaxed  ">
                  {item.title}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: View All Button */}
        <div className="text-center mt-10 pb-5">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm">
            View All Winners
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurWinners;
