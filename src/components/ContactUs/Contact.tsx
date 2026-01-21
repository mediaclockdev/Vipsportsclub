"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ fullName: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#212E36] pb-10 pt-20 mt-5 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CONTACT US
          </h1>
          <p className="text-slate-300 text-lg">
            We are here to help, contact us anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mb-12 border-2 border-yellow-600 rounded-2xl p-8 bg-[#212E36]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-white text-xl font-semibold">LOCATION</h3>
            </div>
            <div className="text-center border-l-0 md:border-l-2 border-r-0 md:border-r-2 border-slate-600">
              <div className="flex justify-center mb-4">
                <Phone className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-white text-xl font-semibold">PHONE NUMBER</h3>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-white text-xl font-semibold">EMAIL</h3>
            </div>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="bg-slate-700/80 rounded-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-transparent border-2 border-yellow-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-transparent border-2 border-yellow-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="6"
                className="w-full px-4 py-3 bg-transparent border-2 border-yellow-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 resize-none"
              ></textarea>
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-slate-700/80 rounded-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-4">WE ARE HERE</h2>
            <h3 className="text-slate-300 text-lg mb-4">Location</h3>
            <div className="w-full max-w-6xl mx-auto p-4">
              {/* Map Card */}
              <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/20 z-10" />

                {/* Address Overlay */}
                {/* <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-3 shadow-lg">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    📍 120 Collins St
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Melbourne VIC 3000, Australia
                  </p>
                </div> */}

                {/* Google Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450918!2d144.9701043153158!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642caa0e2a3b5%3A0x5e1c6d7a5d8f4c3e!2s120%20Collins%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="120 Collins Street Melbourne"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
