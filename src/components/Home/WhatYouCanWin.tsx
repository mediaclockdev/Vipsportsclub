// // components/WhatYouCanWin.tsx
// import Image from "next/image";

// const prizes = [
//   {
//     title: "TOP SPORTS REWARDS",
//     sub: "Win all expenses paid trips to watch the world's biggest sporting events live",
//     image: "/images/reward-tennis.jpg", // 👈 change to your image
//   },
//   {
//     title: "TRAVEL TO BIG SPOTTING EVENTS",
//     sub: "Win all expenses paid trips to watch the world's biggest sporting events live",
//     image: "/images/reward-stadium.jpg", // 👈 change to your image
//   },
// ];

// export default function WhatYouCanWin() {
//   return (
//     <section className=" py-16" style={{
//         background:
//           "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
//       }}>
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Heading + button */}
//         <div className="relative mb-10">
//           <h2 className="text-center text-[#FFFFFF] text-[36px] md:text-3xl font-bold tracking-[0.25em]">
//             WHAT YOU CAN WIN
//           </h2>

//           <button
//             className="absolute right-0 top-1/2 -translate-y-1/2 border border-[#5DF0C0] text-[#FFFFFF]    text-sm px-6 py-2 rounded-xl
//                        hover:bg-[#5DF0C0] hover:text-[#111827] transition"
//           >
//             View all
//           </button>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {prizes.map((item) => (
//             <div
//               key={item.title}
//               className="relative h-[220px] rounded-xl overflow-hidden"
//             >
//               {/* Background image */}
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />

//               {/* Dark overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20" />

//               {/* Text */}
//               <div className="relative h-full flex flex-col justify-center items-center p-6 text-white gap-10 text-center ">
//                 <h3 className="text-[34px] md:text-xl font-bold tracking-[0.15em] uppercase">
//                   {item.title}
//                 </h3>
//                 <p className="text-[22px] md:text-base max-w-xs ">
//                   {item.sub}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// components/WhatYouCanWin.tsx
import Image from "next/image";

const prizes = [
  {
    title: "TOP SPORTS REWARDS",
    sub: "Win all expenses paid trips to watch the world's biggest sporting events live",
    image: "/images/reward-tennis.jpg",
  },
  {
    title: "TRAVEL TO BIG SPOTTING EVENTS",
    sub: "Win all expenses paid trips to watch the world's biggest sporting events live",
    image: "/images/reward-stadium.jpg",
  },
];

export default function WhatYouCanWin() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + button */}
        <div className="mb-8 sm:mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <h2 className="text-center md:text-left text-[#FFFFFF] text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.25em]">
            WHAT YOU CAN WIN
          </h2>

          <button
            className="border border-[#5DF0C0] text-[#FFFFFF] text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-xl
                       hover:bg-[#5DF0C0] hover:text-[#111827] transition ml-10"
          >
            View all
          </button> 
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {prizes.map((item) => (
            <div
              key={item.title}
              className="relative h-[230px] sm:h-[260px] lg:h-[280px] rounded-xl overflow-hidden"
            >
              {/* Background image */}
              <Image
                src={item.image}
                alt={""}
                fill
                className="object-cover"
                priority
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20" />

              {/* Text */}
              <div className="relative h-full flex flex-col justify-center items-center px-4 sm:px-6 text-[#ffffff] gap-3 sm:gap-4 text-center">
                <h3 className="text-xl sm:text-2xl text-[34px] font-bold tracking-[0.15em] uppercase">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-[18px] max-w-xs">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
