
// FAQs.tsx
"use client";

import { useState } from "react";

const faqs = [
  { q: "How often are draws held?", a: "We run draws on a regular schedule. Once you’re a member, you’ll be notified before every draw." },
  { q: "Are your draws legal?", a: "Yes — all draws are conducted under approved Australian promotion permits." },
  { q: "How will I know if I win?", a: "Winners are contacted via email and instructions will be provided." },
  { q: "Can I cancel anytime?", a: "Yes — memberships can be cancelled from your account settings." },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-16"
      style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-[36px] font-semibold text-center text-[#ffffff] mb-10">
          FAQs
        </h2>

        {/* Items */}
        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const open = openIndex === idx;

            return (
              <div
                key={f.q}
                className="rounded-lg border  border-[#4A9B7A] bg-[#2C3E4A] backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-3 text-left text-[22px] text-[#ffffff]"
                  aria-expanded={open}
                >
                  <span>{f.q}</span>

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
                    {f.a}
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
