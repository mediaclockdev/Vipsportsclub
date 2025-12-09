import Link from "next/link";

export default function JoinClub() {
  return (
    <section className="w-full relative">
      {/* Background Image */}
      <div className="w-full h-[442px] relative overflow-hidden">
        
        <img
          src="/join-club-bg.jpg"   // rename your image correctly
          alt="Join the club"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay exactly like Figma */}
        <div className="absolute inset-0 bg-[#0F1B21]/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-[#FFFFFF] text-4xl sm:text-5xl font-extrabold italic tracking-wide">
            JOIN THE CLUB
          </h2>

          <p className="text-[#FFFFFF] max-w-2xl mt-4 text-sm sm:text-base leading-7">
            Whether you’re here for the savings, the thrill of the giveaways, or the sense of community — 
            there’s a membership level designed for you.
          </p>

          <p className="text-[#FFFFFF] max-w-2xl mt-2 text-sm sm:text-base leading-7">
            Because at <span className="font-semibold">VIP Sports Club</span>, we don’t just promise rewards… <br />
            We deliver unforgettable experiences.
          </p>

          {/* BUTTON */}
          <Link
            href="/membership"
            className="mt-6 inline-block px-20 py-3 bg-[#4A9B7A] hover:bg-[#4A9B7A] text-white font-semibold rounded-full transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
}
