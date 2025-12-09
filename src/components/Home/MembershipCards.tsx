
"use client";

const MembershipCards = () => {
  return (
    <div
      className="w-full flex justify-center py-12 sm:py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      }}
    >
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        (Optional) Heading 
         <h2 className="text-center text-[#ffffff] text-[36px] sm:text-2xl lg:text-3xl font-bold tracking-[0.25em] mb-10">
          MEMBERSHIP OPTIONS
        </h2>

        {/* Cards wrapper */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* SILVER CARD */}
          <div className="rounded-2xl bg-linear-to-b from-[#C6C9CA] to-[#777F83] shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-10 border-[#D0D0D0] min-h-[360px]">
            <div>
              <h2 className="text-center text-2xl sm:text-3xl font-bold">
                SILVER
              </h2>
              <p className="text-center text-2xl sm:text-3xl font-bold mt-2">
                $10/month
              </p>

              <ul className="mt-6 space-y-3 text-gray-800 text-sm sm:text-base">
                <li>✔ Ideal for everyday savings</li>
                <li>✔ Includes access to all partner deals</li>
                <li>✔ Standard entries</li>
              </ul>
            </div>

            <button className="w-full bg-[#212E36] text-[#ffffff] py-3 sm:py-4 rounded-md hover:opacity-90 transition mt-6">
              SIGN UP NOW
            </button>
          </div>

          {/* GOLD CARD */}
          <div className="rounded-2xl bg-linear-to-b from-[#B6983D] to-[#BDA885] shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-10 border-[#A97B2E] min-h-[360px]">
            <div>
              <h2 className="text-center text-2xl sm:text-3xl font-bold">
                GOLD
              </h2>
              <p className="text-center text-2xl sm:text-3xl font-bold mt-2">
                $20/month
              </p>

              <ul className="mt-6 space-y-3 text-[#212E36] text-sm sm:text-base">
                <li>✔ Ideal for everyday savings</li>
                <li>✔ Includes access to all partner deals</li>
                <li>✔ Standard entries</li>
              </ul>
            </div>

            <button className="w-full bg-[#212E36] text-[#ffffff] py-3 sm:py-4 rounded-md hover:opacity-90 transition mt-6">
              SIGN UP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCards;
