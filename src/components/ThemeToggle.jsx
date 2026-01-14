"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = ({ size = "md" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`
        relative flex items-center
        ${size === "md" ? "w-[90px] h-[46px]" : "w-[60px] h-[32px]"}
        rounded-full
        transition-colors duration-300
        ${isDark ? "bg-[#4A9B7A]" : "bg-white"}
        border border-[#2a6a57]
      `}
    >
      {/* Knob */}
      <span
        className={`
          absolute flex items-center justify-center
          rounded-full
          transition-all duration-300 ease-in-out
          ${size === "md" ? "w-9 h-9" : "w-6 h-6"}
          ${
            isDark
              ? "translate-x-[44px] bg-[#1B242C] text-yellow-400"
              : "translate-x-[6px] bg-[#4A9B7A] text-black"
          }
        `}
      >
        {isDark ? "⚡" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;
