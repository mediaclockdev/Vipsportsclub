"use client";

import Image from "next/image";
import logo from "../../public/VIP.png";

export default function ComingSoon() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    window.location.href = `mailto:mediaclockdev@gmail.com?subject=VIP Sports Club - Early Access&body=Email: ${email}`;
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 pt-2 pb-6">
      <div className="max-w-2xl w-full flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="relative w-64 h-64 animate-pulse">
          <Image
            src={logo}
            alt="VIP Sports Club Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">
            Coming Soon
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed  font-serif">
            VIP Sports Club is getting ready to launch across Australia.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-4 py-6">
            <h2 className="text-2xl font-semibold text-white font-sans">
              Members will unlock:
            </h2>
            <ul className="flex flex-col gap-3 text-left text-gray-300">
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Exclusive discounts from leading sporting brands</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>VIP access to sports experiences and events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>
                  Members only giveaways to bucket-list sporting events
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Signup */}
        <div className="w-full flex flex-col gap-4 items-center">
          <p className="text-lg text-gray-300">
            Subscribe to be the first to know when we go live.
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-4 pt-8">
          <p className="text-gray-400">Follow us on social media</p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/VIPsportsclub_au"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/share/16Yu4SZmzt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
