import Image from "next/image";
import Link from "next/link";
import bg from "../../../public/aboutbg.svg";

export default function AboutIntro() {
  return (
    <div className="w-full bg-[#E4E4E4] dark:bg-[#212E36]  relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Centered content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 lg:py-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black dark:text-white mb-2 tracking-tight">
              ABOUT US
            </h2>
            <div className="w-24 h-1 bg-[#4A9B7A] mx-auto rounded-full"></div>
          </div>

          {/* Main content */}
          <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 xl:gap-16">
              {/* Text content */}
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <p className="text-black dark:text-gray-100 text-base sm:text-lg leading-relaxed">
                  VIP Sports Club is a new Australian membership platform
                  designed for people who love sport, fitness, and living an
                  active lifestyle. We bring together exclusive offers, premium
                  partner benefits, and unforgettable sporting experiences — all
                  in one place.
                </p>

                <p className="text-black dark:text-gray-100 text-base sm:text-lg leading-relaxed">
                  VIP Sports Club connects members with leading brands across
                  sport, health, fitness, and wellness. From discounted gear and
                  apparel to special rates on services, events, and
                  active-lifestyle products, our goal is to make every member
                  feel like a VIP.
                </p>

                <p className="text-black dark:text-gray-100 text-base sm:text-lg leading-relaxed font-medium">
                  And we don&apos;t stop at great offers — we deliver
                  unforgettable experiences.
                </p>

                <p className="text-black dark:text-gray-100 text-base sm:text-lg leading-relaxed">
                  Members can score exclusive prizes to the world&apos;s most
                  legendary sporting events. Once-in-a-lifetime, bucket list
                  sporting moments designed to thrill and inspire.
                </p>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <Image
                    src={bg}
                    alt="VIP Sports Club"
                    className="w-full h-auto drop-shadow-2xl rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 lg:mt-10">
            <Link
              href="/about-us"
              className="inline-block px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:brightness-110"
              style={{
                backgroundColor: "#4A9B7A",
                color: "#ffffff",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
