// FAQs.tsx
"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is VIP Sports Club?",
    a: "VIP Sports Club is an Australian membership platform that gives members access to exclusive discounts from leading sports, fitness, wellness and lifestyle brands — plus weekly entries into members-only giveaways.",
  },
  {
    q: "What do members receive?",
    a: "Access to exclusive partner discounts, weekly automatic entries into draws and a members-only portal to manage all benefits in one place",
  },
  {
    q: "How do the weekly prize draws work?",
    a: "Every active member is automatically entered into our weekly draws — no need to register each time. Winners are contacted directly by phone or email and announced on our site.",
  },
  {
    q: "What kinds of prizes can I win?",
    a: "Prizes include VIP sporting experiences, premium event tickets, sports merchandise packs, and other bucket-list moments curated for sports fans and active Australians.",
  },
  {
    q: "What is the difference between Silver and Gold membership?",
    a: "Silver offers great value with full access to all standard partner discounts and weekly draw entries. Gold includes everything in Silver, plus additional benefits: Premium, higher-value discounts, Extra weekly draw entries",
  },
  {
    q: "When does my membership start?",
    a: "Your membership activates immediately upon sign-up, giving you instant access to all discounts and automatic entry into the next weekly prize draw.",
  },
  {
    q: "Can I cancel my membership?",
    a: "Yes — you can cancel at any time through your account settings. Your membership will remain active until the end of your current billing cycle.",
  },
  {
    q: "Are there any extra costs or hidden fees?",
    a: "No. The membership fee covers all your access, discounts and weekly draw entries.",
  },
  {
    q: "Will new partners get added for member discounts?",
    a: "We’re continually expanding our network across sport, fitness, wellness, apparel, nutrition, and lifestyle brands.",
  },
  {
    q: "Can I change my membership between Silver and Gold?",
    a: "Absolutely — you can change your membership via your member dashboard. The change will come into effect at your next billing period.",
  },
  {
    q: "Who can join VIP Sports Club?",
    a: "Anyone aged 18+ who loves sport, fitness, or great deals is welcome. Membership is available Australia-wide.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-8 overflow-hidden bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-black dark:text-[#ffffff] mb-6 lg:mb-10 capitalize">
          FREQUENTLY ASKED QUESTION
        </h2>

        {/* Items */}
        <div className="space-y-4">
          {faqs.map((items, idx) => {
            const open = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-lg border  border-[#4A9B7A] bg-[#2C3E4A] backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-3 text-left text-[22px] text-[#ffffff]"
                  aria-expanded={open}
                >
                  <span>{items.q}</span>

                  {/* chevron icon */}
                  <span
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-4 pt-1  border-t border-[#1f6b76]/60">
                    <p className="text-base lg:text-lg text-slate-200">
                      {items.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
