import React from "react";

const CheckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const items = [
  {
    title: "Automatic Entry Into Weekly Sports Prize Draws",
    sub: "Every member is entered into our weekly draws for bucket-list sporting experiences — no forms, no fuss.",
  },
  {
    title: "Exclusive Discounts From Leading Sports & Fitness",
    sub: "Enjoy member-only pricing on apparel, equipment, coaching, nutrition, wellness and more, with premium partners curated to elevate your active lifestyle.",
  },
  {
    title: "Access to the Members-Only Portal",
    sub: "Browse exclusive offers, unlock fresh discounts, and stay across upcoming promotions — all in a beautifully streamlined, members-only space.",
  },
  {
    title: "Unforgettable Sporting Rewards & Experiences",
    sub: "From dream giveaways to premium partner perks, membership gives you access to experiences designed to inspire and reward passionate sports lovers.",
  },
];

export default function WhyBecomeMember() {
  return (
    <div className="py-10 lg:py-12 bg-[#E4E4E4] dark:bg-[#212E36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why Become a Member?
          </h2>
          <p className="text-lg text-slate-600 dark:text-white max-w-2xl mx-auto">
            Unlock exclusive benefits designed to enhance your sporting journey
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-400"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckIcon />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.sub}</p>
                </div>
              </div>

              {/* Number badge */}
              {/* <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                {idx + 1}
              </div> */}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Join Now
          </button>
        </div> */}
      </div>
    </div>
  );
}
