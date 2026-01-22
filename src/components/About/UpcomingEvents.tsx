"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import kayo from "../../../public/kayosports.svg";
import kingdom from "../../../public/kingdom.svg";
import gift from "../../../public/giftcard.svg";
import card from "../../../public/card2.svg";
import card3 from "../../../public/card3.svg";
import card4 from "../../../public/card4.svg";

import card6 from "../../../public/card6.svg";
import card7 from "../../../public/card7.svg";
import card8 from "../../../public/card8.svg";
import { motion } from "framer-motion";

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

export default function UpcomingEvents() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const cards = document.querySelectorAll(".coverflow-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0.6 },
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="py-8 lg:py-12 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="w-full px-3 lg:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold  text-black dark:text-white text-center">
          UPCOMING EVENTS
        </h2>
        <div className="coverflow-wrapper w-screen relative left-1/2 -translate-x-1/2">
          <div className="coverflow-scroll">
            {prizes.map((item, index) => (
              <div key={index} className="coverflow-card">
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>

                <div className={`${item.color} p-4 h-68 lg:h-80`}>
                  <p className="text-black font-bold mb-2">{item.date}</p>

                  <ul className="space-y-2 text-black text-sm">
                    {item.points.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
