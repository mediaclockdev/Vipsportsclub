import Image from "next/image";
import React from "react";
import office from "../../../public/office.jpg";

const Results = () => {
  const items = Array(8).fill({
    name: "STEPHEN, WA",
    title: "AFL GATHER ROUND Experience",
  });

  return (
    <div className="bg-[#212E36] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-16">
          Recent Results
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg bg-[#9C9C9C]"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={office}
                  alt="name"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Footer */}
              <div className="bg-[#CFCFCF] text-center py-4 px-3">
                <p className="text-sm font-semibold text-gray-700">
                  {item.name}
                </p>
                <p className="text-xs text-gray-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
