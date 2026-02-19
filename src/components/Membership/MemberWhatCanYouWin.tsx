"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import type { Prize } from "@/lib/content-types";
import {
  formatPrizeDate,
  getPrizeCardGradient,
  getPrizeColorClass,
  getPrizeImage,
} from "@/lib/prize-ui";

const MemberWhatCanYouWin = () => {
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
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] min-h-screen py-8 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-black dark:text-white text-4xl font-bold mb-12">
          What you can win?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48">
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
                className={`${getPrizeColorClass(index)} p-6 min-h-[250px]`}
              >
                <p className="text-black font-bold text-sm mb-4 tracking-wide">
                  {formatPrizeDate(item.drawDate)}
                </p>

                <ul className="space-y-2.5 text-black text-sm">
                  {item.points.map((point, pointIndex) => (
                    <li
                      key={`${item.id}-${pointIndex}`}
                      className="leading-relaxed flex"
                    >
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
