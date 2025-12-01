import Image from "next/image";
import React from "react";
import rewardImage from "../../public/reward.svg";
import winner from "../../public/winner.svg";

const Hero = () => {
  return (
    <div className="bg-[#212E36B2]">
      <div className="max-w-screen-2xl mx-auto px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center gap-10 justify-center">
          <div className="space-y-5">
            <div className="space-y-4">
              <h1 className="font-extrabold text-4xl ">JOIN AUSTRALIA’s</h1>
              <Image src={rewardImage} alt="Reward" />
              <h2 className="text-4xl">& GIVEAWAY CLUB</h2>
            </div>
            <p className="text-xl max-w-[540px]">
              Unlock exclusive member discounts, VIP experiences, and
              life-changing prize draws — all in one Australian-owned club.
            </p>
            <div className="flex items-center gap-5">
              <button className="darkbutton">Join Now</button>
              <button>Membership</button>
            </div>
          </div>
          <div>
            <Image src={winner} alt="Winner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
