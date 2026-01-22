"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Shield,
  Lock,
  Users,
  Globe,
  Mail,
  Phone,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Types of Personal Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.1 Membership & Identity Information
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Full name, date of birth, residential address, email address,
              phone number, account login details (encrypted), and payment
              information (processed via secure third-party providers; we do not
              store card numbers).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.2 Information Required for Prize Fulfilment
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Where a prize involves travel, accommodation, event tickets, or
              experiences, we may collect passport details, visa information,
              travel dates and preferences, companion information, emergency
              contact details, and dietary or accessibility requirements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.3 Sensitive Information
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              We only collect sensitive information with your consent and where
              reasonably required (e.g., medical or accessibility information
              needed for prize fulfilment).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.4 Technical & Behavioural Information
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              When you use our website or portal, we automatically collect IP
              address, device type, browser type, pages visited, access times,
              and cookies, pixels, tags, and analytics data.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.5 Communication & Interaction Data
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Enquiries, complaints, service requests, emails, phone call logs,
              support messages, survey responses, or competition entries.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              1.6 Marketing Preference Information
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Opt-in/opt-out choices and engagement with emails or promotions.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "How We Collect Your Personal Information",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-400">
            We may collect personal information when you:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Sign up for a membership
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Enter or are automatically entered into promotions
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Contact us via email or phone
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Visit or use our website or member portal
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Claim, accept, or participate in a prize experience
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Use partner offers or services
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>{" "}
              Complete surveys, forms, or feedback requests
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            We collect information directly from you wherever possible. We may
            also collect some information automatically through analytics
            technologies.
          </p>
        </div>
      ),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Why We Collect & How We Use Personal Information",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.1 Membership Administration
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Creating and maintaining your account, processing payments and
              renewals, providing access to member-only benefits and discounts,
              and verifying your identity and eligibility.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.2 Trade Promotion Management
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Automatic entry into weekly member draws, conducting draws in
              accordance with regulations, verifying winners and fulfilling
              prizes, and publishing winner details as required by law.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.3 Prize Fulfilment
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Booking flights, accommodation, transfers, and event tickets;
              providing information to airlines, hotels, venues, and event
              organisers; ensuring safety, accessibility, and compliance with
              travel requirements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.4 Communication
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Responding to enquiries, sending important membership updates,
              providing prize notifications, and administering service surveys
              or feedback forms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.5 Marketing & Personalisation
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Sending promotional offers (with your consent), suggesting deals
              or services relevant to your interests, and analysing usage to
              improve our offerings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3.6 Legal, Compliance & Security
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Meeting trade promotion permit requirements, preventing fraud or
              misuse, complying with Australian Consumer Law, and maintaining IT
              security and platform integrity.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Disclosure of Personal Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-400">
            We may disclose your personal information to:
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.1 Service Providers
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              IT and hosting providers, payment processors, marketing and
              analytics platforms, identity verification services, and customer
              support services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.2 Prize Fulfilment Partners
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              If you win a prize, we may disclose necessary information to
              airlines, hotels, travel booking agents, event venues, experience
              providers, and transportation suppliers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.3 Partners & Third-Party Discount Providers
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              To deliver partner offers, we may share limited information as
              required.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.4 Regulators & Government Authorities
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              We may disclose information to state or territory regulators, law
              enforcement agencies (if required), and courts or tribunals as
              compelled by legal process.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              4.5 Public Disclosure of Winner Information
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              As required by trade promotion laws, we publish winner's first
              name, surname initial, suburb and state, and prize won. Entry into
              any Promotion constitutes consent to this disclosure.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data Security & Retention",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Security Measures
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              We take reasonable steps to safeguard personal information from
              unauthorised access, misuse, interference, loss, unauthorised
              modification, or disclosure. Our measures include secure cloud
              hosting, encryption, access controls and authentication,
              monitoring and auditing of systems, and secure destruction or
              de-identification of data when no longer required.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              However, no online service can ever be completely secure. You
              acknowledge that the transmission of information online is at your
              own risk.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Retention Period
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              We retain information for as long as you remain a Member, for as
              long as necessary to fulfil promotion, travel, or regulatory
              obligations, and for any period required by law (e.g., tax, audit,
              or regulatory records). When information is no longer required, it
              is securely destroyed or permanently de-identified.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Your Rights & Choices",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Access, Correction & Deletion
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              You may request access to personal information we hold about you,
              correction of inaccurate information, or deletion of information
              where legally permitted.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Marketing Communications
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              You may opt out of marketing emails at any time. Opting out does
              not affect service-related communications (membership, billing,
              prize notifications). We do not sell or rent personal information
              to third parties for marketing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Cookies & Website Tracking
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              We use cookies, pixels, and analytics tools to improve website
              performance, understand user behaviour, and deliver and optimise
              advertisements. You may disable cookies in your browser settings,
              noting some features may not function properly.
            </p>
          </div>
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
            {/* <Shield className="w-12 h-12 text-gray-800 dark:text-blue-200" /> */}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-700 dark:text-blue-100 text-center text-lg max-w-2xl mx-auto">
            VIP Sports Club Pty Ltd ACN 692 176 668 is committed to protecting
            your privacy and handling your personal information in accordance
            with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs).
          </p>
          <p className="text-gray-600 dark:text-blue-200 text-center text-sm mt-4">
            Last Updated: January 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-300 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By using our website, purchasing a membership, or participating in
            our trade promotions, you consent to your personal information being
            collected, held, used, and disclosed as described in this Privacy
            Policy.
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
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">{section.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="mt-8 space-y-6">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Overseas Data Transfers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Some prize-related service providers (e.g., airlines,
              international hotels, ticketing agencies) may be located overseas.
              By accepting a prize involving international travel, you
              acknowledge and consent that your personal information may be
              transferred to foreign jurisdictions that may not have equivalent
              privacy protections.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Acceptable Use
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              To protect members and system integrity, you must not:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-2">✕</span>{" "}
                Attempt to hack, disrupt, or overload systems
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-2">✕</span>{" "}
                Use automated scripts/bots
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-2">✕</span>{" "}
                Misuse personal information belonging to others
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-2">✕</span>{" "}
                Attempt to circumvent eligibility or promotion rules
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-400 mt-3">
              Breaches may result in termination of membership, reporting to
              authorities, and legal action.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Complaints
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you believe we have breached your privacy rights, you may lodge
              a complaint with us. We will investigate and respond. If
              unresolved, you may contact the Office of the Australian
              Information Commissioner (OAIC) at{" "}
              <a
                href="https://www.oaic.gov.au"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
              >
                www.oaic.gov.au
              </a>
            </p>
          </div>
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

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            We may amend this Privacy Policy from time to time. The updated
            version will be published on our website with a revised "Last
            Updated" date.
          </p>
          <p className="mt-2">
            Continued use of our services constitutes acceptance of any updates.
          </p>
        </div>
      </div>
    </div>
  );
}
