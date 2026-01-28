/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/3dlogo.svg";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const menu = ["Home", "About Us", "Membership", "Winners", "Contact Us"];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1B242C] dark:bg-[#212E36]">
      <nav className="max-w-screen-2xl mx-auto px-2 lg:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="VIP Sports Club"
            width={250}
            height={220}
            className="h-32 lg:h-40 w-auto"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10 text-white text-xl">
          {menu.map((item) => {
            const href =
              item === "Home"
                ? "/homepage"
                : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item}
                href={href}
                className={`relative transition
                  ${
                    isActive
                      ? "text-[#F4D35E] font-semibold"
                      : "hover:text-[#F4D35E]"
                  }
                `}
              >
                {item}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#F4D35E] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative w-14 h-8 sm:w-16 sm:h-9 lg:w-[72px] lg:h-10 
              rounded-full transition-all duration-300 ease-in-out
              ${isDark ? "bg-[#6AA98A]" : "bg-white"}
              border-2 border-[#6AA98A]
              hover:shadow-lg hover:shadow-[#6AA98A]/20
              focus:outline-none
            `}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <span
              className={`absolute top-0.5 left-0.5 sm:top-0.5 sm:left-1 
                w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8
                rounded-full flex items-center justify-center 
                transition-all duration-300 ease-in-out
                shadow-md
                ${
                  isDark
                    ? "translate-x-6 sm:translate-x-7 lg:translate-x-8 bg-[#1B242C]"
                    : "translate-x-0 bg-[#6AA98A]"
                }
              `}
            >
              <span
                className={`text-base sm:text-lg transition-transform duration-300
                  ${isDark ? "text-[#F4D35E] rotate-12" : "text-[#1B242C] rotate-0"}
                `}
              >
                {isDark ? "🌙" : "☀️"}
              </span>
            </span>
          </button>

          {/* Desktop Login Button */}
          <Link href="/login">
            <button
              className="hidden lg:block px-4 sm:px-5 lg:px-7 py-2 sm:py-2.5
            border-2 border-[#6AA98A] rounded-xl 
            text-white text-sm sm:text-base font-medium
            transition-all duration-300 ease-in-out
            hover:bg-[#6AA98A] hover:text-[#0f172a] hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Login
            </button>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5
              focus:outline-none z-50 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out
                ${isMenuOpen ? "rotate-45 translate-y-2" : ""}
              `}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out
                ${isMenuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out
                ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}
              `}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] 
          bg-[#1B242C] dark:bg-[#212E36] transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-6">
            {menu.map((item) => {
              const href =
                item === "Home"
                  ? "/homepage"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={item}
                  href={href}
                  className={`text-2xl font-medium py-3 border-b border-gray-700/50
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-[#F4D35E] border-[#F4D35E]"
                        : "text-white hover:text-[#F4D35E] hover:border-[#F4D35E]"
                    }
                  `}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Mobile Login Button */}
          <Link href="/login">
            <button
              className="mt-8 cursor-pointer px-6 py-3 w-full
            border-2 border-[#6AA98A] rounded-xl 
            text-white text-lg font-medium
            transition-all duration-300 ease-in-out
            hover:bg-[#6AA98A] hover:text-[#0f172a] hover:shadow-lg active:scale-95 "
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
