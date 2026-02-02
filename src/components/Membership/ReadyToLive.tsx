import React from "react";
import Link from "next/link";

const ReadyToLive = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="relative h-[440px] overflow-hidden  bg-[url('/footballbackground.jpg')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold italic tracking-wide mb-6">
            JOIN THE CLUB
          </h2>

          {/* Description */}
          <p className="max-w-[800px] text-base md:text-lg leading-relaxed mb-4">
            Whether you’re here for the savings or to win awesome prizes –
            there’s a membership level designed for you
          </p>
          <p className="max-w-[500px] text-base md:text-lg leading-relaxed mb-8">
            Because at VIP Sports Club, we don’t just promise rewards…
            <br />
            We deliver unforgettable experiences.
          </p>
          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#6fae8f] hover:bg-[#5e9c7f] transition text-white font-semibold px-14 py-4 rounded-full text-lg shadow-lg"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadyToLive;
