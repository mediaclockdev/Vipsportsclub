import AboutHero from "@/components/About/AboutHero";
import MembershipCards from "@/components/Home/MembershipCards";
import UpcomingEvents from "@/components/About/UpcomingEvents";
import Transparency from "@/components/About/Transparency";
import JourneyAhead from "@/components/About/JourneyAhead";
import JoinCTA from "@/components/About/JoinCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MembershipCards />
      <UpcomingEvents />
      <Transparency />
      <JourneyAhead />
      <JoinCTA />
    </>
  );
}
