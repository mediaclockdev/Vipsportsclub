"use client";

import { useState, FormEvent, useEffect } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("vip_user");

    if (user) {
      router.replace("/homepage");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isActive && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password,
    };

    // Save user data (demo purpose only)
    localStorage.setItem("vip_user", JSON.stringify(userData));

    // Redirect to homepage
    router.replace("/homepage");
  };

  return (
    <div className="min-h-screen bg-[#E4E4E4] dark:bg-[#212E36] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex w-full border-b border-gray-200">
          <button
            type="button"
            onClick={handleLoginClick}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
              !isActive
                ? "text-black border-b-2 border-indigo-600 bg-indigo-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "text-black border-b-2 border-indigo-600 bg-indigo-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative min-h-[550px]">
          {/* Sign Up Form */}
          <div
            className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
              isActive
                ? "translate-x-full opacity-100 z-[5] pointer-events-auto"
                : "translate-x-0 opacity-0 z-[1] pointer-events-none"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-transparent flex items-center justify-center flex-col px-12 h-full"
            >
              <h1 className="text-4xl font-bold mb-3 text-black bg-clip-text ">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm mb-6">Join us today!</p>

              <input
                name="name"
                type="text"
                placeholder="Name"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <div className="relative w-full my-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!error}
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <p role="alert" className="text-red-600 text-xs mt-1">
                  {error}
                </p>
              )}

              <div className="relative w-full my-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  aria-label="Confirm password"
                  aria-invalid={!!error}
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_50%)] text-white text-sm px-12 py-3 border-none rounded-xl font-semibold tracking-wide uppercase mt-4 cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div
            className={`absolute top-0 h-full left-0 w-1/2 transition-all duration-700 ease-in-out ${
              isActive
                ? "translate-x-full opacity-0 z-[1] pointer-events-none"
                : "translate-x-0 opacity-100 z-[5] pointer-events-auto"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-transparent flex items-center justify-center flex-col px-12 h-full"
            >
              <h1 className="text-4xl font-bold mb-3 text-black bg-clip-text    ">
                Sign In
              </h1>
              <p className="text-gray-600 text-sm mb-6">Welcome back!</p>

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <div className="relative w-full my-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <a
                href="#"
                className="text-black text-sm font-medium no-underline my-4  transition-colors duration-300"
              >
                Forgot Your Password?
              </a>
              <button
                type="submit"
                className="bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_50%)] text-black text-sm px-12 py-3 border-none rounded-xl font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Toggle Container */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-[100] ${
              isActive
                ? "-translate-x-full rounded-r-[200px]"
                : "translate-x-0 rounded-l-[200px]"
            }`}
          >
            <div
              className={`bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_50%)]  text-black relative -left-full h-full w-[200%] transition-all duration-700 ease-in-out ${
                isActive ? "translate-x-1/2" : "translate-x-0"
              }`}
            >
              {/* Toggle Left Panel */}
              <div
                className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-10 text-center top-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-[200%] opacity-0"
                }`}
              >
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-sm leading-6 tracking-wide my-6 opacity-90 max-w-xs">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="bg-white backdrop-blur-sm border-2 border-white text-black text-sm px-12 py-3 rounded-xl font-semibold tracking-wide uppercase mt-4 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign In
                </button>
              </div>

              {/* Toggle Right Panel */}
              <div
                className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-10 text-center top-0 right-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "translate-x-[200%] opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-sm leading-6 tracking-wide my-6 opacity-90 max-w-xs">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="bg-white backdrop-blur-sm border-2 border-white text-black text-sm px-12 py-3 rounded-xl font-semibold tracking-wide uppercase mt-4 cursor-pointer hover:bg-white  transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Sign In Form - Mobile */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isActive ? "hidden" : "block"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-transparent flex items-center justify-center flex-col px-6 py-8"
            >
              <h1 className="text-3xl font-bold mb-2 text-black bg-clip-text ">
                Sign In
              </h1>
              <p className="text-gray-600 text-sm mb-6">Welcome back!</p>

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-4 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <div className="relative w-full my-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!error}
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <a
                href="#"
                className="text-black text-sm font-medium no-underline my-4 hover:text-purple-600 transition-colors duration-300"
              >
                Forgot Your Password?
              </a>
              <button
                type="submit"
                className="bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_50%)] text-black text-sm px-12 py-3 border-none rounded-xl font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg w-full"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Sign Up Form - Mobile */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              !isActive ? "hidden" : "block"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-transparent flex items-center justify-center flex-col px-6 py-8"
            >
              <h1 className="text-3xl font-bold mb-2  bg-clip-text text-black">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm mb-6">Join us today!</p>

              <input
                type="text"
                placeholder="Name"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-4 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="bg-gray-50 border-2 border-gray-200 my-2 px-4 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
              />
              <div className="relative w-full my-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!error}
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative w-full my-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  aria-label="Confirm password"
                  aria-invalid={!!error}
                  className="bg-gray-50 border-2 border-gray-200 px-5 py-3 text-sm rounded-xl w-full outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="bg-[linear-gradient(180deg,#E0D19B_0%,#B6983D_50%)] text-black text-sm px-12 py-3 border-none rounded-xl font-semibold tracking-wide uppercase mt-4 cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg w-full"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
