import BecomeMemberBanner  from "@/components/Membership/BecomeMemberBanner";
import WhyBecomeMember  from "@/components/Membership/WhyBecomeMember";
import MembershipCards from "@/components/Home/MembershipCards";



export default function Membership() {
  return (
    <div>
     <BecomeMemberBanner />
     <WhyBecomeMember />
       <MembershipCards />
      
    </div>
  );
}