"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Shield,
  FileText,
  Users,
  Gift,
  AlertCircle,
  Scale,
  Lock,
  Mail,
  Phone,
} from "lucide-react";

export default function TermsAndConditions() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Definitions",
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-400">
          <p>In these Terms:</p>
          <p>
            &quot;Member&quot; means a person with an active, paid membership
            with VIP Sports Club.
          </p>
          <p>
            "Promotion" means any trade promotion, giveaway, prize draw,
            competition, contest, or reward activity conducted by VIP Sports
            Club.
          </p>
          <p>
            "Prize" means any benefit awarded through a Promotion, including
            travel, flights, accommodation, event tickets, merchandise, or
            experiences.
          </p>
          <p>"Website" means www.vipsportsclub.com.au.</p>
          <p>
            "Companion" means any person accompanying a winner where permitted
            by the prize.
          </p>
        </div>
      ),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Membership Terms",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.1 Eligibility
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Membership is open only to Australian residents aged 18 years or
              older. You warrant that all information you provide is accurate
              and complete.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.2 Membership Activation
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Membership activates immediately upon successful payment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.3 Membership Billing
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              VIP Sports Club offers: Monthly memberships, and Annual
              memberships. Your membership renews automatically unless
              cancelled.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.4 Fees
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Membership fees are charged in AUD. Membership fees are
              non-refundable, except where required under Australian Consumer
              Law ("ACL"). VIP Sports Club may change membership pricing at any
              time, with reasonable notice.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.5 Cancellation
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              You may cancel your membership at any time via your online
              account. Cancellation takes effect at the end of your current
              billing cycle. You remain eligible for Promotions until the paid
              period ends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.6 Account Ownership & Access
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Membership grants a revocable, non-exclusive, non-transferable
              licence to use VIP Sports Club services. You have no ownership
              rights to any account, service, or platform. Login credentials
              must not be shared. VIP Sports Club may suspend or terminate
              accounts for breach, misuse, or fraudulent activity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              2.7 Acceptable Use
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              You must not: Engage in fraudulent activity or create multiple
              accounts, Interfere with or manipulate Promotions or draws, Use
              bots, scripts, or automated systems, Harass or abuse staff or
              partners, Attempt to gain unauthorised access to the website or
              systems, Use the service for illegal or prohibited purposes
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              VIP Sports Club may take any necessary action including
              termination, disqualification, or referral to authorities.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Partner Offers & Third-Party Services",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.1 Partner Offers
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              VIP Sports Club partners with third-party brands to provide
              discounts and offers to Members. These offers: Are subject to
              availability, May change or be withdrawn without notice, May have
              their own terms and conditions
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.2 Third-Party Disclaimers
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              VIP Sports Club is not responsible for: The quality, fulfilment,
              or conduct of partner services, Withdrawn, modified, or
              unavailable partner offers, Loss arising from third-party actions
              or omissions
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Members enter third-party arrangements at their own risk.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Trade Promotions",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.1 Automatic Entry
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Active Members receive automatic entries into weekly prize draws.
              Gold Members may receive additional entries, as described on the
              Website.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.2 Eligibility for Draws
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              A Member must, at the time of the draw: Have an active paid
              membership, Not be suspended or terminated, Comply with these
              Terms
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.3 Conduct of Draws
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Draws are conducted using a computerised random selection system.
              Where required, an independent scrutineer is used. Draw dates and
              details will be published on the Website.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.4 Winner Notification
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners will be notified by email and/or phone within 48 hours.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.5 Publication of Winners
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winner details (first name, surname initial, suburb, State, prize)
              will be published on the VIP Sports Club website, in accordance
              with trade promotion regulations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.6 Unclaimed Prizes & Second-Chance Draws
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners have 14 days to claim a prize, unless the prize-specific
              rules require a shorter period. If a prize is unclaimed, a
              second-chance draw will occur. Second-chance winners are notified
              in the same manner as primary winners.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.7 Disqualification
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              VIP Sports Club may disqualify a member who: Provides false
              information, Attempts to manipulate or interfere with a draw,
              Creates multiple accounts, Breaches these Terms
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Prize Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-400">
            Prizes may include travel, flights, accommodation, event tickets,
            merchandise, cash-equivalents, or experiences.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.1 Acceptance of Prize Terms
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              By accepting a prize, the winner agrees to the prize-specific
              conditions provided by VIP Sports Club or third-party suppliers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.2 Identification
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners must provide valid government-issued ID. Prize bookings
              must use the exact name shown on the ID.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.3 Travel Requirements
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners are responsible for: Meeting all visa, passport,
              vaccination, and entry requirements, Obtaining necessary travel
              authorisations, Ensuring timely arrival for flights and events
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              VIP Sports Club is not responsible for missed flights, denied
              boarding, or refused entry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.4 Flights
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Unless stated otherwise: Flights are economy class from the
              winner's nearest major airport, Seat selection, baggage, upgrades,
              and changes are at the winner's cost, Deviations from the booked
              itinerary are not permitted
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.5 Accommodation
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Accommodation includes only what is specified. Winners are liable
              for: All incidental charges (minibar, food, upgrades, damages,
              cleaning fees, etc.), Any fines, penalties, or costs arising from
              misconduct
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Hotels may require a credit card security deposit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.6 Event Tickets
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners must comply with venue and event organiser rules. VIP
              Sports Club is not responsible if: A winner is refused entry, A
              winner is removed for misconduct, An event is cancelled or changed
              due to force majeure
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.7 Behaviour Requirements
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Winners and companions must: Behave safely and lawfully, Follow
              all instructions from airlines, hotels, and event staff, Refrain
              from disruptive or illegal conduct
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Failure may result in forfeiture of the prize without
              compensation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              5.8 Force Majeure
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              VIP Sports Club is not liable for events outside its control,
              including: Travel delays, Weather events, Venue restrictions,
              Health orders
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              If a prize is disrupted, VIP Sports Club may assist but is not
              obligated to provide alternative prizes.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Intellectual Property",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-400">
            All content on the Website, including branding, layout, text,
            images, and software, is owned by or licensed to VIP Sports Club.
            Members may not reproduce, distribute, or create derivative works
            without permission.
          </p>
        </div>
      ),
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: "Liability, Warranties & Indemnities",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              7.1 Limitation of Liability
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              To the extent permitted by law, VIP Sports Club excludes all
              liability for: Loss arising from partner services, Loss arising
              from travel changes or event cancellations, Loss from misuse of
              accounts, Indirect or consequential loss
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              7.2 No Professional Advice
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Membership does not constitute professional or financial advice.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              7.3 Indemnity
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              You agree to indemnify VIP Sports Club against any loss arising
              from: Your breach of these Terms, Misconduct by you or your
              companion, Damage caused to accommodation or transport, Fraudulent
              or unlawful activity
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              7.4 Australian Consumer Law
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Nothing in these Terms excludes guarantees under the Competition
              and Consumer Act 2010 (Cth).
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-400">
            VIP Sports Club handles personal information in accordance with its
            Privacy Policy. Winners consent to their details being published to
            comply with Promotion regulations.
          </p>
        </div>
      ),
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Amendment of Terms",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-400">
            VIP Sports Club may modify these Terms at any time. Updated Terms
            will be published on the Website. Continued use of the service
            constitutes acceptance.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#E4E4E4] dark:bg-[#212E36]">
      {/* Header */}
      <div className="bg-[#E4E4E4] dark:bg-[#212E36] pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            {/* <FileText className="w-12 h-12 text-gray-800 dark:text-blue-200" /> */}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="text-gray-700 dark:text-blue-100 text-center text-lg max-w-2xl mx-auto">
            These Terms govern your access to and use of VIP Sports Club
            membership services and participation in all trade promotions,
            giveaways, prize draws, discounts, and related activities.
          </p>
          <p className="text-gray-600 dark:text-blue-200 text-center text-sm mt-4">
            Last Updated: 21 January 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-300 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms and Conditions ("Terms") govern your access to and use
            of VIP Sports Club membership services and participation in all
            trade promotions, giveaways, prize draws, discounts, and related
            activities provided by VIP Sports Club Pty Ltd ACN 692 176 668 ("VIP
            Sports Club", "we", "us", "our").
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
            By purchasing a membership, accessing the VIP Sports Club website,
            or participating in any Promotion, you agree to be bound by these
            Terms.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:border-blue-500"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600 dark:text-blue-400">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                    openSection === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openSection === index
                    ? "max-h-[3000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">{section.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-white dark:bg-transparent rounded-lg p-4 lg:p-8 border border-gray-300 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 rounded-lg p-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-200" />
              <div>
                <p className="text-gray-600 dark:text-blue-200 text-sm">
                  Email
                </p>
                <a
                  href="mailto:partnerships@vipsportsclub.com.au"
                  className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-200 text-sm lg:text-base"
                >
                  partnerships@vipsportsclub.com.au
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-gray-100 dark:bg-white/10 rounded-lg p-4">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-200" />
              <div>
                <p className="text-gray-600 dark:text-blue-200 text-sm">
                  Phone
                </p>
                <a
                  href="tel:0403844590"
                  className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-200 text-sm lg:text-base"
                >
                  0403 844 590
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
