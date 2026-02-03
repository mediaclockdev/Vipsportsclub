import Image from "next/image";
import React from "react";
import handshake from "../../../public/icon-handshake.svg";
import blub from "../../../public/blub.svg";
import box from "../../../public/box.svg";
import hands from "../../../public/joinhands.svg";

const JourneyAhead = () => {
  return (
    <div className="bg-[#E4E4E4] dark:bg-[#212E36] text-black dark:text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        {/* Reverse on desktop only */}
        <div className="ml-0 lg:ml-20">
          <div className="w-full space-y-6 ">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="text-[#B6983D]">The Journey </span>
              Ahead
            </h2>

            <div className="space-y-2 text-xl">
              <p>We’re just getting started.</p>
              <p>Our team is continuously working to:</p>
            </div>

            <div className="space-y-3 text-lg">
              <div className="flex items-center gap-4">
                <div className="bg-[#212E36] dark:bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={handshake} alt="" className="size-5" />
                </div>
                <p>Expand our partner network</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#212E36] dark:bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={blub} alt="" className="size-5" />
                </div>
                <p>Introduce new member-only exclusives</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#212E36] dark:bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={box} alt="" className="size-5" />
                </div>
                <p>Launch bigger and better prize draws</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#212E36] dark:bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={hands} alt="" className="size-5" />
                </div>
                <p>Build Australia’s most exciting rewards community</p>
              </div>
            </div>

            <p className="font-normal text-lg">
              And we’d love for you to be part of it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyAhead;
