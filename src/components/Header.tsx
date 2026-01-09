"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../public/darklogo.svg";
import { useTheme } from "next-themes";
import Link from "next/link";

const Header = () => {
  const heading = [
    "Home",
    "About Us",
    "Membership",
    "Winners",
    "FAQs",
    "Contact",
  ];
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="bg-[#1B242C] dark:bg-[#212E36] fixed top-0 left-0 w-full z-50 text-white">
      <header className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <nav className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="VIP Sports Club Logo"
              width={100}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            {heading.map((item) => {
              const slug =
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <Link
                  key={item}
                  href={slug}
                  className="hover:text-[#F4D35E] transition text-sm xl:text-[20px]"
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Right side (theme + login) desktop */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* theme pill */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-[70px] h-10 xl:w-[90px] xl:h-[51px] rounded-full bg-[#4A9B7A] border border-[#2a6a57]"
            >
              <span className="text-xs xl:text-sm">⚡</span>
            </button>

            <button className="border border-[#4A9B7A] rounded-xl py-2 px-5 xl:px-8 text-sm xl:text-[20px] hover:bg-[#4A9B7A] hover:text-[#0f172a] transition">
              Login
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-7 sm:w-10 sm:h-8 rounded-full bg-[#4A9B7A] border border-[#2a6a57]"
            >
              <span className="text-[10px] sm:text-xs">⚡</span>
            </button>

            <button
              onClick={() => setIsOpen((p) => !p)}
              className="inline-flex items-center justify-center p-2 rounded-md border border-white/20"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <span className="block h-0.5 w-5 sm:w-6 bg-white" />
                <span className="block h-0.5 w-5 sm:w-6 bg-white" />
                <span className="block h-0.5 w-5 sm:w-6 bg-white" />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="mt-3 lg:hidden border-t border-white/10 pt-3">
            <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
              {heading.map((item) => {
                const slug =
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <Link
                    key={item}
                    href={slug}
                    className="py-1 hover:text-[#F4D35E] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                );
              })}

              {/* mobile login button */}
              <button className="mt-2 w-full border border-[#4A9B7A] rounded-xl py-2 text-sm sm:text-base hover:bg-[#4A9B7A] hover:text-[#0f172a] transition">
                Login
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
