// "use client";

// import Image from "next/image";
// import React from "react";
// import logo from "../../public/darklogo.svg";
// import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// const Header = () => {
//   const heading = ["Home", "About", "Membership", "Winners", "FAQs", "Contact"];
//   const { theme, setTheme } = useTheme();

//   const [mounted, setMounted] = useState(false);
//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   return (
//     <div className="bg-[#1B242C] dark:bg-[#212E36] fixed top-0 left-0 w-full z-50 text-[#FFFFFF]">
//       <header className="max-w-screen-2xl mx-auto px-8 py-5">
//         <nav className="flex items-center justify-between">
//           <div>
//             <Image
//               src={logo}
//               alt="VIP Sports Club Logo"
//               width={100}
//               height={50}
//             />
//           </div>

//           <div className="hidden lg:flex gap-10 ">
//             {heading.map((item) => (
//               <Link
//                 key={item}
//                 href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
//                 className="hover:text-[#4A9B7A] transition"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>

//           <div className="flex justify-between items-center gap-10">
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 border rounded"
//             >
//               {theme === "dark" ? "🌙" : "☀️"}
//             </button>

//             <button className="border border-[#4A9B7A] rounded-xl py-2 px-6">
//               Login
//             </button>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header;


"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../public/darklogo.svg";
import { useTheme } from "next-themes";
import Link from "next/link";

const Header = () => {
  const heading = ["Home", "About Us", "Membership", "Winners", "FAQs", "Contact"];
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="bg-[#1B242C] dark:bg-[#212E36] fixed top-0 left-0 w-full z-50 text-white">
      <header className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="VIP Sports Club Logo"
              width={100}
              height={50}
              className="h-15 sm:h-17 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8 text-sm">
            {heading.map((item) => {
              const slug =
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <Link
                key={item}
                href={slug}
                className="hover:text-[#F4D35E] transition text-[20px]"
              >
                {item}
              </Link>
            );
            })}
          </div>

          {/* Right side (theme + login) desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* theme pill */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-[90px] h-[51px] rounded-full bg-[#4A9B7A] border border-[#2a6a57]"
            >
              <span className="text-sm">⚡</span>
            </button>

            <button className="border border-[#4A9B7A] rounded-xl py-2 px-8 text-[20px] hover:bg-[#4A9B7A] hover:text-[#0f172a] transition">
              Login
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-7 rounded-full bg-[#4A9B7A] border border-[#2a6a57]"
            >
              <span className="text-xs">⚡</span>
            </button>

            <button
              onClick={() => setIsOpen((p) => !p)}
              className="inline-flex items-center justify-center p-2 rounded-md border border-white/20"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="mt-3 lg:hidden border-t border-white/10 pt-3">
            <div className="flex flex-col gap-3 text-sm">
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
              <button className="mt-2 w-full border border-[#4A9B7A] rounded-xl py-2 text-sm hover:bg-[#4A9B7A] hover:text-[#0f172a] transition">
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
