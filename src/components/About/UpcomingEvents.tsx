"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

import kayo from "../../../public/kayosports.svg";
import kingdom from "../../../public/kingdom.svg";
import gift from "../../../public/giftcard.svg";
import card from "../../../public/card2.svg";
import card3 from "../../../public/card3.svg";
import card4 from "../../../public/card4.svg";
import card6 from "../../../public/card6.svg";
import card7 from "../../../public/card7.svg";
import card8 from "../../../public/card8.svg";

const prizes = [
  {
    date: "MARCH 4",
    image: kayo,
    points: ["12 Months Subscription"],
    type: "green",
  },
  {
    date: "MARCH 11",
    image: kingdom,
    points: [
      "Trip for 2 to Adelaide for the AFL Gather Round",
      "Flights, Accommodation and Tickets to 3 Games",
    ],
    type: "gold",
  },
  {
    date: "MARCH 18",
    image: gift,
    points: ["$500 LSKD Gift Card"],
    type: "green",
  },
  {
    date: "MARCH 25",
    image: card8,
    points: [
      "VIP tickets to EVERY 2026 NRL State of Origin game for 2 people",
      "Flights to Brisbane, Sydney and Melbourne",
      "Accommodation in each city",
    ],
    type: "gold",
  },
  {
    date: "APRIL 1",
    image: kayo,
    points: ["12 Months Subscription"],
    type: "green",
  },
  {
    date: "APRIL 8",
    image: card,
    points: [
      "Trip for 2 to Brisbane for the 2026 NRL Magic Round",
      "Flights, Accommodation and Tickets to Every Game",
    ],
    type: "gold",
  },
  {
    date: "APRIL 15",
    image: gift,
    points: ["$500 True Protein Gift Card"],
    type: "green",
  },
  {
    date: "APRIL 22",
    image: card3,
    points: [
      "Trip for 2 to Melbourne for the Australian Open Tennis",
      "Corporate Suite at Rod Laver Arena",
      "Flights, accommodation & food package",
    ],
    type: "gold",
  },
  {
    date: "APRIL 29",
    image: card4,
    points: ["3 Free Appointments with Ideal Nutrition"],
    type: "green",
  },
  {
    date: "MAY 6",
    image: card6,
    points: [
      "Trip for 2 to Sydney for the Bledisloe Cup",
      "Flights, Accommodation and VIP Tickets",
    ],
    type: "gold",
  },
  {
    date: "MAY 13",
    image: gift,
    points: ["6 Months Membership to Goodlife Health Club"],
    type: "green",
  },
  {
    date: "MAY 20",
    image: card7,
    points: [
      "Trip for 2 to the AFL Grand Final",
      "Flights, Accommodation & VIP seats",
    ],
    type: "gold",
  },
  {
    date: "MAY 27",
    image: kayo,
    points: ["12 Months Subscription"],
    type: "green",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-[#E4E4E4] dark:bg-[#212E36] py-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-black dark:text-white">
        UPCOMING EVENTS
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={60}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full"
      >
        {prizes.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[300px] !h-[420px] rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="relative h-44">
              <Image src={item.image} alt="" fill className="object-cover" />
            </div>

            <div
              style={{
                background:
                  item.type === "gold"
                    ? "linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)"
                    : "linear-gradient(180deg, #8FE07D 0%, #4FA07D 100%)",
              }}
              className="p-5 h-full"
            >
              <p className="font-bold text-black mb-3">{item.date}</p>

              <ul className="space-y-2 text-black text-sm">
                {item.points.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
