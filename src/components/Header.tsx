"use client";

import Image from "next/image";
import React from "react";
import logo from "../../public/darklogo.svg";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Header = () => {
  const heading = ["Home", "About", "Membership", "Winners", "FAQs", "Contact"];
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-[#212E36B2]">
      <header className="max-w-screen-2xl mx-auto px-8 py-5">
        <nav className="flex items-center justify-between">
          <div>
            <Image
              src={logo}
              alt="VIP Sports Club Logo"
              width={100}
              height={50}
            />
          </div>

          <div className="hidden lg:flex gap-10 ">
            {heading.map((item) => (
              <p key={item} className=" ">
                {item}
              </p>
            ))}
          </div>

          <div className="flex justify-between items-center gap-10">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 border rounded"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <button className="border border-[#4A9B7A] rounded-xl py-2 px-6">
              Login
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
