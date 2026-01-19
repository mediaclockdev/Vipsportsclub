/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/3dlogo.svg";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const menu = ["Home", "About Us", "Membership", "Winners", "Contact"];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1B242C] dark:bg-[#212E36]">
      <nav className="max-w-screen-2xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="VIP Sports Club"
            width={120}
            height={48}
            className="h-28 w-auto"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-10 text-white text-[18px]">
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
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#F4D35E] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative w-[72px] h-10 rounded-full transition-colors duration-300
              ${isDark ? "bg-[#6AA98A]" : "bg-white"}
              border border-[#6AA98A]
            `}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-1 left-1 w-8 h-8 rounded-full 
                flex items-center justify-center transition-all duration-300
                ${
                  isDark
                    ? "translate-x-8 bg-[#1B242C]"
                    : "translate-x-0 bg-[#6AA98A]"
                }
              `}
            >
              <span
                className={`text-lg ${
                  isDark ? "text-[#F4D35E]" : "text-[#1B242C]"
                }`}
              >
                ⚡
              </span>
            </span>
          </button>

          {/* Login */}
          <button className="px-4 lg:px-7 py-2 border border-[#6AA98A] rounded-xl text-white text-sm lg:text-base hover:bg-[#6AA98A] hover:text-[#0f172a] transition">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
