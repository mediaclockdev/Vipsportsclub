import Image from "next/image";
import React from "react";
import handshake from "../../../public/icon-handshake.svg";
import blub from "../../../public/blub.svg";
import box from "../../../public/box.svg";
import hands from "../../../public/joinhands.svg";

const JourneyAhead = () => {
  return (
    <div className=" bg-[#212E36] ">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-2">
        <h2 className="text-4xl font-bold  text-[#ffffff]">
          The Journey Ahead
        </h2>
        <div className="space-y-3">
          <p className="text-white">We’re just getting started.</p>
          <p className="text-white">Our team is continuously working to:</p>
        </div>

        <div className="space-y-2 text-[#ffffff]">
          <div className="flex items-center gap-4">
            <div className="bg-[#4A9B7A57] p-2 rounded-full">
              <Image src={handshake} alt="" className="size-5 " />
            </div>
            <p>Expanding our partner network</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#4A9B7A57] p-2 rounded-full">
              <Image src={blub} alt="" className="size-5 " />
            </div>
            <p>Introduce new member-only exclusives</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#4A9B7A57] p-2 rounded-full">
              <Image src={box} alt="" className="size-5 " />
            </div>
            <p>Launch bigger and better prize draws</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#4A9B7A57] p-2 rounded-full">
              <Image src={hands} alt="" className="size-5 " />
            </div>
            <p>Build Australia’s most exciting rewards community</p>
          </div>

          <p>And we’d love for you to be part of it.</p>
        </div>
      </div>
    </div>
  );
};
export default JourneyAhead;
