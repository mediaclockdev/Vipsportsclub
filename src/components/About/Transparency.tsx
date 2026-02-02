import React from "react";
import Image from "next/image";
import search from "../../../public/searchicon.svg";
import shield from "../../../public/shield.svg";

const Transparency = () => {
  return (
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-0 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT: Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 ml-0 lg:ml-20">
            <div className="flex items-center gap-2 lg:gap-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
                <span className="text-[#B6983D]">Transparency you </span>
                can trust
              </h2>
              <Image
                src={search}
                alt="search icon"
                className="size-6 lg:ize-8"
              />
            </div>

            <div className="space-y-4 text-black dark:text-gray-300">
              <p className="text-xl">
                We’re committed to honesty and fairness:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>
                  All prize draws are conducted under verified Australian
                  promotion permits.
                </li>
                <li>Membership terms are simple and crystal clear</li>
                <li>Winners are publicly announced and verified.</li>
                <li>Aussie-based support is always here to help</li>
              </ul>

              <p className="text-lg">
                Your trust means everything to us — and we work hard to earn it
                every day.
              </p>
            </div>
          </div>

          {/* RIGHT: Image */}
          {/* <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mr-0 lg:mr-28 ">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src={shield}
                alt="Trust & Transparency"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
                priority
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Transparency;
