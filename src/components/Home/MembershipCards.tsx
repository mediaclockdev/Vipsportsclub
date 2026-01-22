"use client";

import React from "react";
import Image from "next/image";
import gift from "../../../public/gift.svg";

const MembershipCards = () => {
  const Membership = [
    {
      title: "SILVER",
      price: "$10/month",
      content: [
        "Access to exclusive discounts from leading sports, fitness, wellness, and lifestyle partners",
        "Full access to the members-only portal",
        "1 entry into every weekly VIP prize draws",
      ],
    },
    {
      title: "GOLD",
      price: "$20/month",
      content: [
        "All Silver Membership benefits",
        "Access to premium, higher-value discounts and partner offers",
        "3 entries into every weekly VIP prize draws",
      ],
    },
    // {
    //   title: "BUY AS A GIFT",
    //   isGift: true,
    // },
  ];

  return (
    <div className="w-full flex justify-center py-5 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-center text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-14">
          MEMBERSHIP OPTIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Membership.map((item, id) => (
            <div
              key={id}
              className="rounded-3xl p-[3px]"
              style={{
                background:
                  item.title === "GOLD"
                    ? "linear-gradient(180deg, #E0D19B 0%, #B6983D 100%)"
                    : "linear-gradient(180deg, #E8E8E8 0%, #A0A0A0 100%)",
              }}
            >
              {/* INNER CARD */}
              <div
                className="relative rounded-3xl p-8 h-full min-h-[420px] flex flex-col overflow-visible"
                style={{
                  background:
                    item.title === "GOLD"
                      ? "linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)"
                      : "linear-gradient(180deg, #F3F3F3 0%, #B5BCC0 100%)",
                }}
              >
                {/* 🎁 GIFT CARD */}
                {/* {item.isGift ? ( */}
                {/* <> */}
                {/* <h3 className="text-2xl font-extrabold text-center text-[#1f2a30] mb-8">
                      BUY AS A GIFT
                    </h3> */}
                {/* GIFT BOX WITH EMERGING CARDS */}
                {/* <div className="relative flex justify-center items-center grow group overflow-visible"> */}
                {/* GOLD CARD */}
                {/* <div className="absolute bottom-16 left-1/2 -translate-x-[70%] w-20 h-28 rounded-xl bg-gradient-to-b from-[#E0D19B] to-[#B6983D] shadow-2xl flex items-center justify-center text-[#1f2a30] font-bold transition-all duration-500 ease-out opacity-0 translate-y-8 rotate-[-20deg] group-hover:opacity-100 group-hover:translate-y-[-70px] group-hover:scale-105 z-20">
                        GOLD
                      </div> */}
                {/* SILVER CARD */}
                {/* <div className="absolute bottom-16 left-1/2 -translate-x-[20%] w-20 h-28 rounded-xl bg-gradient-to-b from-[#F3F3F3] to-[#B5BCC0] shadow-2xl flex items-center justify-center text-[#1f2a30] font-bold transition-all duration-500 ease-out delay-75 opacity-0 translate-y-8 rotate-20 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:scale-105 z-10">
                        SILVER
                      </div> */}
                {/* GIFT IMAGE */}
                {/* <Image
                        src={gift}
                        alt="gift"
                        className="relative z-30 size-40"
                      />
                    </div> */}
                {/* <button className="mt-8 w-full bg-[#1f2a30] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                      SIGN UP NOW
                    </button> */}
                {/* </> */}
                <>
                  {/* NORMAL MEMBERSHIP CARD */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-extrabold text-[#1f2a30]">
                      {item.title}
                    </h3>
                    <p className="text-4xl font-bold text-[#1f2a30] mt-3">
                      {item.price}
                    </p>
                  </div>

                  <div className="space-y-3 grow">
                    {item.content?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#1f2a30] flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="text-[#1f2a30] text-sm leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 w-full bg-[#1f2a30] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                    SIGN UP NOW
                  </button>
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipCards;
