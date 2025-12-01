import ComingSoon from "@/components/comingsoon";
import Hero from "../components/Hero";
import About from "@/components/About";
import WhyAussLoveUs from "@/components/WhyAussLoveUs";
import OurPatnersAndDiscount from "@/components/OurPatnersAndDiscount";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div>
      {/* <ComingSoon /> */}
      <Hero />
      <About />
      <OurPatnersAndDiscount />
      <WhyAussLoveUs />
      <HowItWorks />
    </div>
  );
}
