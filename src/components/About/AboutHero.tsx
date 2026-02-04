import Link from "next/link";

const AboutHero = () => {
  return (
    <div className="w-full relative">
      {/* Hero Image Section */}
      <div
        className="w-full h-[300px] bg-cover bg-center  relative"
        style={{
          backgroundImage: "url('/stadium-hero.png')",
        }}
      >
        {/* Overlay */}

        {/* ABOUT US Heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-wide mt-10">
            ABOUT US
          </h1>
        </div>
      </div>

      {/* Content Section Under Image */}
      <div className="w-full  pb-8 pt-6 bg-[#212E36]">
        <div className="max-w-3xl mx-auto px-6 text-center text-[#ffffff] text-[20px]">
          <p className="leading-7 mb-4 mt-0 lg:mt-2">
            At{" "}
            <span className="text-[#4A987A] font-semibold">
              VIP Sports Club
            </span>
            , we believe every Aussie deserves a chance to win big while
            enjoying real-world savings every day.
          </p>

          <p className="leading-7 mb-6">
            We’re an Australian-owned and operated rewards membership club built
            to give our community access to exclusive member discounts, premium
            perks, VIP experiences and life-changing prize draws. Whether you’re
            chasing unbeatable deals or dreaming of winning a once in a lifetime
            sporting experience – you’re in the right place.
          </p>

          {/* Button */}
          <Link
            href="/contact-us"
            className="inline-block px-20 py-3  bg-[#4A987A] hover:bg-[#4A987A] text-white font-semibold rounded-full shadow-md transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
