import React from "react";
import Image from "next/image";
import partner1 from "../../public/partner.svg";

const OurPatnersAndDiscount = () => {
  return (
    <div className="bg-white dark:bg-[#212E36B2] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 py-5 space-y-10">
        <div className="flex justify-center">
          <h2 className="text-4xl ">Our Partners and Discounts</h2>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div>
            <Image src={partner1} alt="partner 1" />
          </div>
          <div>
            <Image src={partner1} alt="partner 1" />
          </div>
          <div>
            <Image src={partner1} alt="partner 1" />
          </div>
          <div>
            <Image src={partner1} alt="partner 1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPatnersAndDiscount;
