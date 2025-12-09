// components/Testimonials.tsx
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah M.",
    city: "Melbourne",
    avatar: "/images/testimonial-sarah.png",
  },
  {
    name: "Emily R",
    city: "Brisbane",
    avatar: "/images/testimonial-emily.png",
  },
  {
    name: "Liam T.",
    city: "Perth",
    avatar: "/images/testimonial-liam.png",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16" style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text- text-[36px] md:text-3xl font-bold tracking-[0.25em] text-[#ffffff]">
          TESTIMONIALS
        </h2>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 rounded-2xl px-8 py-10 flex flex-col items-center text-center shadow-sm"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border border-white/40">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + city */}
              <p className="text-[#ffffff] text-[34px] font-semibold">{t.name}</p>
              <p className="text-gray-300 text-[24px] mt-1">{t.city}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#F5D76E]" />
          <span className="w-2 h-2 rounded-full bg-[#F5D76E]/40" />
          <span className="w-2 h-2 rounded-full bg-[#F5D76E]/40" />
        </div>
      </div>
    </section>
  );
}
