import React from "react";
import Image from "next/image";
import world from "../../public/world.svg";

const WhyAussLoveUs = () => {
  const globe = [
    {
      icon: world,
      title: "100% Australian-owned and operated",
    },
    {
      icon: world,
      title: "Verified prize draws and public winner announcements",
    },
    {
      icon: world,
      title: "Transparent memberships — no hidden fees, no surprises",
    },
    {
      icon: world,
      title: "Exclusive partnerships with trusted Aussie brands",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-[#1D3A36] via-[#1A2B32] to-[#131E24]">
      <div className="max-w-screen-2xl mx-auto px-8 py-5 space-y-15">
        <div className="flex justify-center">
          <h2 className="text-4xl">Why Aussies Love Us</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {globe.map((item, id) => (
            <div key={id} className="flex flex-col items-center gap-4">
              <div className="bg-[#4A9B7A] rounded-full p-2 lg:p-5">
                <Image src={item.icon} alt="World" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="max-w-[500px] lg:max-w-[255px] text-center text-sm lg:text-base">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyAussLoveUs;


import React from "react";
import Image from "next/image";
import world from "../../public/world.svg";

const WhyAussLoveUs = () => {
  const globe = [
    {
      icon: world,
      title: "100% Australian-owned and operated",
    },
    {
      icon: world,
      title: "Verified prize draws and public winner announcements",
    },
    {
      icon: world,
      title: "Transparent memberships — no hidden fees, no surprises",
    },
    {
      icon: world,
      title: "Exclusive partnerships with trusted Aussie brands",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-[#1D3A36] via-[#1A2B32] to-[#131E24]">
      <div className="max-w-screen-2xl mx-auto px-8 py-5 space-y-15">
        <div className="flex justify-center">
          <h2 className="text-4xl">Why Aussies Love Us</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {globe.map((item, id) => (
            <div key={id} className="flex flex-col items-center gap-4">
              <div className="bg-[#4A9B7A] rounded-full p-2 lg:p-5">
                <Image src={item.icon} alt="World" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="max-w-[500px] lg:max-w-[255px] text-center text-sm lg:text-base">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyAussLoveUs;
