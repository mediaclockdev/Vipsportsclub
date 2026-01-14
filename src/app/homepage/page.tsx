import Hero from "@/components/Home/Hero";
import AboutIntro from "@/components/Home/AboutIntro";
import Partners from "@/components/Home/Partners";
import WhyLoveUs from "@/components/Home/WhyLoveUs";
import HowItWorks from "@/components/Home/HowItWorks";
import MembershipCards from "@/components/Home/MembershipCards";
import WhatYouCanWin from "@/components/Home/WhatYouCanWin";
import Testimonials from "@/components/Home/Testimonials";
import FAQs from "@/components/Home/FAQs";

import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <WhatYouCanWin />
      <Partners />
      <HowItWorks />
      <MembershipCards />
      <WhyLoveUs />
      <AboutIntro />
      <FAQs />
    </div>
  );
};

export default page;
