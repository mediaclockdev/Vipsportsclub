import React from "react";
import Image from "next/image";
import kayo from "../../../public/kayosports.svg";
import kingdom from "../../../public/kingdom.svg";
import gift from "../../../public/giftcard.svg";
import card from "../../../public/card2.svg";
import card3 from "../../../public/card3.svg";
import card4 from "../../../public/card4.svg";

import card6 from "../../../public/card6.svg";
import card7 from "../../../public/card7.svg";
import card8 from "../../../public/card8.svg";

const MemberWhatCanYouWin = () => {
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
      border: "",
      image: kingdom,
      points: [
        "Trip for 2 to Adelaide for the AFL Gather Round",
        "Flights, Accommodation and Tickets to 3 Games",
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
    {
      date: "APRIL 1",
      color: "bg-[#4FA07D]",
      image: kayo,
      points: ["12 Months Subscription"],
    },
    {
      date: "APRIL 8",
      color: "bg-[#E2C86B]",
      image: card,
      points: [
        "Trip for 2 to Brisbane for the 2026 NRL Magic Round",
        "Flights, Accommodation and Tickets to Every Game",
      ],
    },
    {
      date: "APRIL 15",
      color: "bg-[#4FA07D]",
      image: gift,
      points: ["$500 True Protein Gift Card"],
    },
    {
      date: "APRIL 22",
      color: "bg-[#E2C86B]",
      image: card3,
      points: [
        "Trip for 2 to Melbourne for the Australian Open Tennis ",
        "Seats in a Corporate Suite of Rod Laver Arena",
        "Flights, accommodation and  food and beverage package included",
      ],
    },
    {
      date: "APRIL 29",
      color: "bg-[#4FA07D]",
      image: card4,
      points: ["3 Free Appointments with The   Ideal Nutrition"],
    },
    {
      date: "MAY 6",
      color: "bg-[#E2C86B]",
      image: card6,
      points: [
        "Trip for 2 to Sydney for the Bledisloe Cup",
        "Flights, Accommodation and VIP Tickets ",
      ],
    },
    {
      date: "MAY13",
      color: "bg-[#4FA07D]",
      image: gift,
      points: ["6 Months Membership to Goodlife Health Club"],
    },
    {
      date: "MAY 20",
      color: "bg-[#E2C86B]",
      image: card7,
      points: [
        "Trip for 2 to the AFL Grand Final including lunch in the MCG.",
        "Flights, Accommodation, Lunch & Drinks package and VIP seats.",
      ],
    },
    {
      date: "MAY 27",
      color: "bg-[#4FA07D]",
      image: kayo,
      points: ["12 Months Subscription"],
    },
  ];

  return (
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] min-h-screen py-8 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-black dark:text-white text-4xl font-bold mb-12">
          What you can win?
        </h2>

        {/* Grid - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Image Section */}
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.date}
                  className="object-cover"
                  fill
                  priority={index < 4}
                />
              </div>

              {/* Content Section */}
              <div
                style={{
                  background:
                    item.color === "bg-[#E2C86B]"
                      ? "linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)"
                      : "linear-gradient(180deg, #8FE07D 0%, #4FA07D 50%)",
                }}
                className={`${item.color} p-6 min-h-[250px]`}
              >
                <p className="text-black font-bold text-sm mb-4 tracking-wide">
                  {item.date}
                </p>

                <ul className="space-y-2.5 text-black text-sm">
                  {item.points.map((point, i) => (
                    <li key={i} className="leading-relaxed flex">
                      <span className="mr-2">•</span>
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
};

export default MemberWhatCanYouWin;
