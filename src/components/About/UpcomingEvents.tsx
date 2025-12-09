// UpcomingEvents.tsx
import Image from "next/image";

const events = [
  { title: "AFL Gather Round", month: "March", img: "/images/event-1.jpg" },
  { title: "NRL Magic Round", month: "April", img: "/images/event-2.jpg" },
  { title: "Birdsville Cup", month: "May", img: "/images/event-3.jpg" },
];

export default function UpcomingEvents() {
  return (
    <section className="py-12" style={{
        background:
          "linear-gradient(180deg, #0f1b20 0%, #14262a 35%, #1e3336 100%)",
      }}>
      <div className="max-w-screen-2xl mx-auto px-6">
        <h2 className="text-[36px] font-bold mb-6 text-[#ffffff] text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.title} className="rounded-xl overflow-hidden  text-[#ffffff]">
              <div className="relative h-48 w-full">
                <Image src={ev.img} alt={ev.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg">{ev.title}</h4>
                <p className="text-sm text-[#ffffff]">{ev.month}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
