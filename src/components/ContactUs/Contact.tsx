"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#E4E4E4] dark:bg-[#212E36] pb-10 pt-20 mt-5 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            CONTACT US
          </h1>
          <p className="text-black dark:text-slate-300 text-lg">
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
              <h3 className="text-white text-xl font-semibold">0403 844 590</h3>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-white text-xl font-semibold">
                partnerships@vipsportsclub.com.au
              </h3>
            </div>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="w-full">
            <div className="bg-white dark:bg-[#212E36] rounded-3xl shadow-2xl overflow-hidden h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h2 className="text-white text-3xl font-bold mb-2">
                  Contact Us
                </h2>
                <p className="text-yellow-100">
                  We'd love to hear from you. Send us a message!
                </p>
              </div>

              {/* Form */}
              <div className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us what's on your mind..."
                          rows={6}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-500 resize-none transition-colors"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    {/* Additional Info */}
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By submitting this form, you agree to our{" "}
                        <a
                          href="#"
                          className="text-yellow-600 dark:text-yellow-500 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full">
            <div className="bg-[#212E36] dark:bg-slate-700/80 rounded-2xl p-8 h-full">
              <h2 className="text-white text-2xl font-bold mb-4">
                WE ARE HERE
              </h2>
              <h3 className="text-slate-300 text-lg mb-4">Location</h3>
              <div className="w-full">
                {/* Map Card */}
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                  {/* Dark overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-black/20 z-10" />

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
    </div>
  );
};

export default Contact;
