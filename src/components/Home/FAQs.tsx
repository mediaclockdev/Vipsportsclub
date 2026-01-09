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
    a: "Access to exclusive partner discounts ,Weekly automatic entries into sports experience draws,A members-only portal to manage all benefits in one place",
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
    a: "Silver offers great value with full access to all standard partner discounts and weekly draw entries. Gold includes everything in Silver, plus additional benefits:Premium, higher-value discounts, Extra weekly draw entries",
  },
  {
    q: "What is the difference between Silver and Gold membership?",
    a: "Silver offers great value with full access to all standard partner discounts and weekly draw entries. Gold includes everything in Silver, plus additional benefits:Premium, higher-value discounts, Extra weekly draw entries",
  },
  {
    q: "What is the difference between Silver and Gold membership?",
    a: "Silver offers great value with full access to all standard partner discounts and weekly draw entries. Gold includes everything in Silver, plus additional benefits:Premium, higher-value discounts, Extra weekly draw entries",
  },
  {
    q: "What is the difference between Silver and Gold membership?",
    a: "Silver offers great value with full access to all standard partner discounts and weekly draw entries. Gold includes everything in Silver, plus additional benefits:Premium, higher-value discounts, Extra weekly draw entries",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-16 overflow-hidden bg-[#212E36]"
      // style={{
      //   background:
      //     "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      // }}
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-[36px] font-semibold text-center text-[#ffffff] mb-10">
          FAQs
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
                  <div className="px-5 pb-4 pt-1 text-sm text-slate-200 border-t border-[#1f6b76]/60">
                    {items.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
