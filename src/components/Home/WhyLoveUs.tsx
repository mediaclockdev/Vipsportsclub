import Image from "next/image";

const features = [
  {
    title: "100% Australian owned and operated",
    icon: "/icon-aus.svg",
  },
  {
    title: "Verified prize draws and public winner announcements",
    icon: "/icon-shield.svg",
  },
  {
    title: "Transparent memberships — no hidden fees, no surprises",
    icon: "/icon-search.svg",
  },
  {
    title: "Exclusive partnerships with trusted Aussie brands",
    icon: "/icon-handshake.svg",
  },
];

export default function WhyLoveUs() {
  return (
    <div
      className="py-20 bg-[#212E36]"
      // style={{
      //   background:
      //     "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      // }}
    >
      <div className="max-w-screen-2xl mx-auto px-6">
        <h2 className="text-center text-[#ffffff] text-[36px] font-semibold mb-16 ml-5">
          WHY AUSSIES LOVE US
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-6">
              {/* Icon circle */}
              <div className="w-[124px] h-[124px] rounded-full bg-[#2A6A57] flex items-center justify-center">
                <Image src={f.icon} alt={" "} width={64} height={64} />
              </div>

              <p className="text-center text-white text-[22px] leading-[22px]">
                {f.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
