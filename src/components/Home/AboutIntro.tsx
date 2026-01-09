import Link from "next/link";

export default function AboutIntro() {
  return (
    <div className="w-full">
      {/* full-width gradient background */}
      <div
        className="relative w-full min-h-[380px] flex items-center bg-[#212E36]"
        // style={{
        //   background:
        //     "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
        // }}
      >
        {/* centered content (no inner card) */}
        <div className="max-w-[820px] mx-auto px-6 py-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-[36px] sm:text-3xl md:text-4xl font-extrabold mb-6 text-[#ffffff]">
              ABOUT US
            </h2>

            <div className="text-white text-xl space-y-4">
              <p className="">
                VIP Sports Club is a new Australian membership platform designed
                for people who love sport, fitness, and living an active
                lifestyle. We bring together exclusive offers, premium partner
                benefits, and unforgettable sporting experiences — all in one
                place.
              </p>

              <p>
                VIP Sports Club connects members with leading brands across
                sport, health, fitness, and wellness. From discounted gear and
                apparel to special rates on services, events, and
                active-lifestyle products, our goal is to make every member feel
                like a VIP. 
              </p>
              <p>
                And we don’t stop at great offers — we deliver unforgettable
                experiences.
              </p>
              <p>
                Members can score exclusive prizes to the world’s most legendary
                sporting events. Once-in-a-lifetime, bucket list sporting
                moments designed to thrill and inspire. 
              </p>
            </div>

            <div className="mt-4">
              <Link
                href="/about-us"
                className="inline-block mt-2 px-20 py-3 rounded-2xl font-semibold shadow-md"
                style={{
                  backgroundColor: "#4A9B7A",
                  color: "#ffffff",
                  minWidth: 180,
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
