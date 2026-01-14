import BecomeMemberBanner from "@/components/Membership/BecomeMemberBanner";
import WhyBecomeMember from "@/components/Membership/WhyBecomeMember";
import MembershipCards from "@/components/Home/MembershipCards";
import MemberWhatCanYouWin from "@/components/Membership/MemberWhatCanYouWin";
import ReadyToLive from "@/components/Membership/ReadyToLive";

export default function Membership() {
  return (
    <div>
      <BecomeMemberBanner />
      <WhyBecomeMember />
      <MembershipCards />
      <MemberWhatCanYouWin />
      <ReadyToLive />
    </div>
  );
}
