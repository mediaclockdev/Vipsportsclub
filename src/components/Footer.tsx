import Image from "next/image";
import React from "react";
import logo from "../../public/3dlogo.png";
import instagram from "../../public/instagram.svg";
import tiktok from "../../public/tiktok.svg";
import facebook from "../../public/facebook.svg";
import youtube from "../../public/youtube.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1B242C] dark:bg-[#212E36] text-white">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8">
        {/* Top Section */}
        <div className="border-t-2 border-b-2 border-[#D0B55A] py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* LEFT */}
            <div className="space-y-6">
              <div>
                <Link href="/homepage">
                  <Image src={logo} alt="logo" className="w-36" />
                </Link>
              </div>

              <p className="text-[#4A9B7A] font-semibold tracking-wide">
                TRANSPARENCY & TRUST
              </p>

              <p className="text-sm leading-relaxed max-w-sm text-gray-200">
                We believe in fair play, honest rewards, and supporting the
                local community. All draws are conducted under
                government-approved permits, and winners are publicly verified.
              </p>
            </div>

            {/* MIDDLE */}
            <div className="space-y-4">
              <p className="text-[#4A9B7A] font-semibold tracking-wide">
                QUICK LINK
              </p>

              <ul className="space-y-2 text-gray-200">
                <li className="hover:text-white cursor-pointer">
                  <Link href="/homepage">
                    <p>Home</p>
                  </Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/about-us">
                    <p>About Us</p>
                  </Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/membership">
                    <p>Membership</p>
                  </Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/terms-and-conditions">
                    <p>Terms and Condtions</p>
                  </Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/private-policy">
                    <p>Private Policy</p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <p className="text-[#4A9B7A] font-semibold tracking-wide">
                CONTACT US
              </p>

              <div className="space-y-2 text-gray-200">
                <div>
                  <a
                    href="mailto:partnerships@vipsportsclub.com.au"
                    aria-label="Email VIP Sports Club partnerships team"
                  >
                    <h3 className="">partnerships@vipsportsclub.com.au</h3>
                  </a>
                </div>
                <div>
                  <a href="tel:+61403844590">
                    <h3 className="">0403 844 590</h3>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <Image
                  src={instagram}
                  alt="Instagram"
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                />
                <Image
                  src={tiktok}
                  alt="TikTok"
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                />
                <Image
                  src={facebook}
                  alt="Facebook"
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                />
                <Image
                  src={youtube}
                  alt="YouTube"
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 text-center space-y-2 text-sm text-gray-300">
          <p>© 2026 VIP Sports Club. All Rights Reserved.</p>
          <p>
            Australian Business Number (ABN): [ABN]. Proudly Australian-owned
            and operated.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
