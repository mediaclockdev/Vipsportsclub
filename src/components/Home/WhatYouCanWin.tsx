// components/WhatYouCanWin.tsx
import Image from "next/image";
import kayo from "../../../public/kayosports.svg";
import kingdom from "../../../public/kingdom.svg";
import gift from "../../../public/giftcard.svg";
import card8 from "../../../public/card8.svg";
import Link from "next/link";

const prizes = [
  {
    date: "MARCH 4",
    color: "bg-[#4FA07D]",
    image: kayo,
    points: ["12 Months Subscription"],
  },
  {
    date: "MARCH 11",
    color: "bg-[#E2C86B]",
    image: kingdom,
    points: [
      "Trip for 2 to Adelaide for the AFL Gather Round Flights",
      "Accommodation and Tickets to 3 Games",
    ],
  },
  {
    date: "MARCH 18",
    color: "bg-[#4FA07D]",
    image: gift,
    points: ["$500 LSKD Gift Card"],
  },
  {
    date: "MARCH 25",
    color: "bg-[#E2C86B]",
    image: card8,
    points: [
      "VIP tickets to EVERY 2026 NRL State of Origin game for 2 people",
      "Flights to Brisbane, Sydney and Melbourne",
      "Accommodation in each city",
    ],
  },
];

export default function WhatYouCanWin() {
  return (
    <div className="py-8 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-screen-2xl mx-auto px-6 space-y-5 ">
        {/* Header */}
        <div className="flex items-center ">
          {/* Left spacer */}
          <div className="lg:flex-1 " />

          {/* Center heading */}
          <h2 className="flex-none text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
            WHAT YOU CAN WIN?
          </h2>

          {/* Right button */}
          <div className="flex-1 flex justify-end mb-2">
            <Link href="/membership">
              <button className="border border-[#4A9B7A] dark:border-[#5DF0C0] text-black dark:text-white px-3 lg:px-5 py-1 lg:py-2 rounded-xl text-xs lg:text-sm hover:bg-[#5DF0C0] hover:text-black transition">
                View all
              </button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((item, index) => (
            <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
              {/* Image */}
              <div className="relative h-32 lg:h-44">
                <Image src={item.image} alt="" fill className="object-cover" />
              </div>

              {/* Content */}
              <div
                style={{
                  background:
                    item.color === "bg-[#E2C86B]"
                      ? "linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)"
                      : "linear-gradient(180deg, #8FE07D 0%, #4FA07D 50%)",
                }}
                className={`${item.color} p-6  lg:min-h-[220px]`}
              >
                <p className="text-black  font-bold text-lg">{item.date}</p>

                <ul className="space-y-2 text-black text-sm leading-relaxed">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
