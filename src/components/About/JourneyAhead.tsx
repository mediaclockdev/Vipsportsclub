import Image from "next/image";
import React from "react";
import handshake from "../../../public/icon-handshake.svg";
import blub from "../../../public/blub.svg";
import box from "../../../public/box.svg";
import hands from "../../../public/joinhands.svg";
import bg from "../../../public/aboutbg.svg";

const JourneyAhead = () => {
  return (
    <div className="bg-[#212E36] text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        {/* Reverse on desktop only */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT (Desktop): Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start ml-0 lg:ml-20">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src={bg}
                alt="Journey Ahead"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* RIGHT (Desktop): Text */}
          <div className="w-full lg:w-1/2 space-y-6 ">
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
                <div className="bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={handshake} alt="" className="size-5" />
                </div>
                <p>Expanding our partner network</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={blub} alt="" className="size-5" />
                </div>
                <p>Introduce new member-only exclusives</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#4A9B7A57] p-2 rounded-full">
                  <Image src={box} alt="" className="size-5" />
                </div>
                <p>Launch bigger and better prize draws</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#4A9B7A57] p-2 rounded-full">
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
