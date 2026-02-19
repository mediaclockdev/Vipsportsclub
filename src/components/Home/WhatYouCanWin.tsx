"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Prize } from "@/lib/content-types";
import {
  formatPrizeDate,
  getPrizeCardGradient,
  getPrizeColorClass,
  getPrizeImage,
} from "@/lib/prize-ui";

export default function WhatYouCanWin() {
  const [prizes, setPrizes] = useState<Prize[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadPrizes = async () => {
      try {
        const response = await fetch("/api/prizes?limit=4");
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
    <div className="py-8 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-screen-2xl mx-auto px-6 space-y-5 ">
        <div className="flex items-center ">
          <div className="lg:flex-1 " />

          <h2 className="flex-none text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
            WHAT YOU CAN WIN?
          </h2>

          <div className="flex-1 flex justify-end mb-2">
            <Link href="/membership">
              <button className="border border-[#4A9B7A] dark:border-[#5DF0C0] text-black dark:text-white px-3 lg:px-5 py-1 lg:py-2 rounded-xl text-xs lg:text-sm hover:bg-[#5DF0C0] hover:text-black transition">
                View all
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-32 lg:h-44">
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
                className={`${getPrizeColorClass(index)} p-6 lg:min-h-[220px]`}
              >
                <p className="text-black font-bold text-lg">
                  {formatPrizeDate(item.drawDate)}
                </p>

                <ul className="space-y-2 text-black text-sm leading-relaxed">
                  {item.points.map((point, pointIndex) => (
                    <li key={`${item.id}-${pointIndex}`} className="flex gap-2">
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
