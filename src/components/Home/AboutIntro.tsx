import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="w-full">
      {/* full-width gradient background */}
      <div
        className="relative w-full min-h-[380px] flex items-center"
          style={{
    background: "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)"
  }}
      >
        {/* centered content (no inner card) */}
        <div className="w-full px-4 py-12 sm:py-16 md:py-20">
          <div className="max-w-[760px] mx-auto text-center">
            <h2 className="text-[36px] sm:text-3xl md:text-4xl font-extrabold mb-6 text-[#ffffff]">
              ABOUT US
            </h2>

            <div className="text-[#ffffff] leading-7 text-[20px] lg:text-xl sm:text-base md:text-base mb-6">
              <p className="mb-3">
                We’re proudly Australian and passionate about rewarding everyday Aussies.
                At <strong>[Your Brand Name]</strong>, we’ve built a members-only community that
                combines real value and real excitement. Our goal is simple — to help you save
                more, live better, and win big.
              </p>

              <p>
                Every membership supports local businesses through exclusive offers and gives you
                automatic entry into our major monthly giveaways. From utes and 4WDs to holidays
                and cash — our members get chances to win prizes that make life extraordinary.
              </p>
            </div>

            <div className="mt-4">
              <Link
                href="/about-us"
                className="inline-block mt-2 px-20 py-3 rounded-2xl font-semibold shadow-md"
                style={{ backgroundColor: "#4A9B7A", color: "#ffffff", minWidth: 180 }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
