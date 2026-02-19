"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Prize } from "@/lib/content-types";
import { formatPrizeDate, getPrizeCardGradient, getPrizeImage } from "@/lib/prize-ui";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

export default function UpcomingEvents() {
  const [prizes, setPrizes] = useState<Prize[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadPrizes = async () => {
      try {
        const response = await fetch("/api/prizes");
        if (!response.ok) {
          throw new Error("Failed to load prize entries");
        }

        const payload = (await response.json()) as { prizes?: Prize[] };
        if (mounted) {
          setPrizes(Array.isArray(payload.prizes) ? payload.prizes : []);
        }
      } catch {
        if (mounted) {
          setPrizes([]);
        }
      }
    };

    loadPrizes();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-[#E4E4E4] dark:bg-[#212E36] py-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-black dark:text-white">
        UPCOMING EVENTS
      </h2>

      {prizes.length === 0 ? (
        <p className="mx-auto max-w-4xl rounded-xl border border-dashed border-black/15 bg-white/60 px-4 py-8 text-center text-sm text-[#4b5563] dark:border-white/15 dark:bg-[#1a242c]/70 dark:text-gray-300">
          Prize entries will appear here once published.
        </p>
      ) : null}

      {prizes.length > 0 ? (
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
              key={item.id}
              className="!w-[300px] !h-[420px] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-44">
                <img
                  src={getPrizeImage(item)}
                  alt={formatPrizeDate(item.drawDate)}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/winner.svg";
                  }}
                />
              </div>

              <div
                style={{ background: getPrizeCardGradient(index) }}
                className="p-5 h-full"
              >
                <p className="font-bold text-black mb-3">
                  {formatPrizeDate(item.drawDate)}
                </p>

                <ul className="space-y-2 text-black text-sm">
                  {item.points.map((p, i) => (
                    <li key={`${item.id}-${i}`}>• {p}</li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </section>
  );
}
