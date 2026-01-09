import React from "react";
import Image from "next/image";
import search from "../../../public/searchicon.svg";

const Transparency = () => {
  return (
    <div className=" bg-[#212E36] text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 space-y-2">
        <div className="flex items-center gap-6">
          <h2 className="text-4xl font-bold ">Transparency you can trust</h2>

          <Image src={search} alt="search icon" className="size-8" />
        </div>
        <div className="space-y-4 text-gray-300">
          <p>We’re committed to honesty and fairness:</p>
          <div className="px-6">
            <ul className="list-disc space-y-2">
              <li>
                <p>
                  All prize draws are conducted under verified Australian
                  promotion permits.
                </p>
              </li>
              <li>
                <p>Membership terms are simple and crystal clear</p>
              </li>
              <li>
                <p>Winners are publicly announced and verified.</p>
              </li>
              <li>
                <p>Aussie-based support is always here to help</p>
              </li>
            </ul>
          </div>
          <p>
            Your trust means everything to us — and we work hard to earn it
            every day.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Transparency;
