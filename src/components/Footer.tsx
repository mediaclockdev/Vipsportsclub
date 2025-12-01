import Image from "next/image";
import React from "react";
import logo from "../../public/darklogo.svg";
import instagram from "../../public/instagram.svg";
import tiktok from "../../public/tiktok.svg";
import facebook from "../../public/facebook.svg";
import youtube from "../../public/youtube.svg";

const Footer = () => {
  return (
    <div className="bg-white dark:bg-[#212E36B2]">
      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        {/* Top Divider */}
        <div className="border-t-2 border-b-2 border-[#D0B55A] py-8">
          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              <Image src={logo} alt="logo" />

              <p className="text-[#4A9B7A] font-semibold">
                TRANSPARENCY & TRUST
              </p>

              <p className="text-lg leading-relaxed max-w-[374px]">
                We believe in fair play, honest rewards, and supporting the
                local community. All draws are conducted under
                government-approved permits, and winners are publicly verified.
              </p>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="space-y-3">
              <p className="text-[#4A9B7A] font-semibold">CONTACT US</p>

              <p className="font-semibold text-lg">
                Have questions? We’re here to help.
              </p>

              <p>[Business Address], Australia</p>
              <p>[Email Address]</p>
              <p>[Phone Number]</p>

              <div className="flex items-center gap-5 pt-2">
                <Image src={instagram} alt="Instagram" />
                <Image src={tiktok} alt="TikTok" />
                <Image src={facebook} alt="Facebook" />
                <Image src={youtube} alt="YouTube" />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-3">
              <p className="text-[#4A9B7A] font-semibold">
                LEGAL & COMPLIANCES
              </p>

              <p>Trade Promotion T&amp;C</p>
              <p>Membership Agreement</p>
              <p>Privacy Policy</p>
              <p>Refund & Cancellation Policy</p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="flex flex-col items-center space-y-2 py-6">
          <p>© 2025 [Your Brand Name]. All Rights Reserved.</p>
          <p>
            Australian Business Number (ABN): [ABN]. Proudly Australian-owned
            and operated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
