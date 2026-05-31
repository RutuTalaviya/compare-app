"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiUser,
  HiOutlineMail,
  HiChatAlt2,
  HiUserGroup,
  HiEye,
  HiGlobeAlt,
  HiLightningBolt
} from "react-icons/hi";
import { FiSend } from "react-icons/fi";

function AnimatedCounter({ end, duration = 2000, icon: Icon, label }: { end: number; duration?: number; icon: any; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] p-8 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-[#F98A1A]" />
      </div>
      <span className="text-4xl font-black text-[#313842] mb-2">{count}+</span>
      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#e6e7ee] select-none">
      <Navbar />

      {/* Main Content Container matching the website's grid & spacing */}
      <main className="max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">

        {/* Neumorphic Card Container */}
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">

          {/* Google Maps Section */}
          <div className="mb-10 sm:mb-12">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-[#d1d9e6] shadow-[inset_4px_4px_8px_#b8c4d2,_inset_-4px_-4px_8px_#ffffff]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509037!2d-122.4194155846814!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Map Info Overlay */}
              <div className="absolute top-4 left-4 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl shadow-[4px_4px_10px_#b8c4d2,_-4px_-4px_10px_#ffffff] p-4 max-w-[200px] sm:max-w-[250px]">
                <h3 className="font-black text-[#313842] mb-1">San Francisco</h3>
                <p className="text-xs font-bold text-gray-500 mb-2">California, USA</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#F98A1A] hover:underline mb-3 block">
                  View larger map
                </a>
                <button
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F98A1A] text-white rounded-lg text-xs font-black uppercase tracking-wider hover:bg-[#e0740d] transition-all duration-300 shadow-soft cursor-pointer"
                >
                  <span>Directions</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Get in touch Section */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F98A1A] mb-3 flex items-center justify-center gap-1">
              <HiLightningBolt className="w-3.5 h-3.5" /> Contact
            </span>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-5 leading-tight">
              Get in touch today
            </h3>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Have a new project in mind? Need help with an ongoing one? Drop us a line about your project needs, we answer same day.
            </p>
          </div>

          {/* Contact Information Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 sm:mb-16">
            {/* Visit Us */}
            <div className="flex flex-col items-center text-center p-6 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d1d9e6] bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] flex items-center justify-center mb-4">
                <HiLocationMarker className="w-7 h-7 sm:w-8 sm:h-8 text-[#F98A1A]" />
              </div>
              <h3 className="font-black text-lg sm:text-xl text-[#313842] mb-2">Visit us</h3>
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">27 Silicon Valley</p>
              <p className="text-sm sm:text-base text-gray-500 font-medium">USA, California</p>
            </div>

            {/* Call */}
            <div className="flex flex-col items-center text-center p-6 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d1d9e6] bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] flex items-center justify-center mb-4">
                <HiPhone className="w-7 h-7 sm:w-8 sm:h-8 text-[#F98A1A]" />
              </div>
              <h3 className="font-black text-lg sm:text-xl text-[#313842] mb-2">Call</h3>
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">+3912345678</p>
              <p className="text-sm sm:text-base text-gray-500 font-medium">Mon - Fri, 8am - 4pm</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center p-6 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d1d9e6] bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] flex items-center justify-center mb-4">
                <HiMail className="w-7 h-7 sm:w-8 sm:h-8 text-[#F98A1A]" />
              </div>
              <h3 className="font-black text-lg sm:text-xl text-[#313842] mb-2">Email</h3>
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-1">example@company.com</p>
              <p className="text-sm sm:text-base text-gray-500 font-medium">name@company.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[inset_6px_6px_12px_#b8c4d2,_inset_-6px_-6px_12px_#ffffff]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <HiUser className="w-5 h-5 text-[#F98A1A]" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Bonnie Green"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d1d9e6] rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_5px_#b8c4d2,_inset_-2px_-2px_5px_#ffffff] text-[#313842] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F98A1A] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <HiOutlineMail className="w-5 h-5 text-[#F98A1A]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d1d9e6] rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_5px_#b8c4d2,_inset_-2px_-2px_5px_#ffffff] text-[#313842] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F98A1A] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <div className="absolute left-4 top-4">
                  <HiChatAlt2 className="w-5 h-5 text-[#F98A1A]" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message...."
                  rows={5}
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d1d9e6] rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_5px_#b8c4d2,_inset_-2px_-2px_5px_#ffffff] text-[#313842] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F98A1A] focus:border-transparent resize-none transition-all duration-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#F98A1A] text-white rounded-xl shadow-[4px_4px_10px_#b8c4d2,_-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer hover:bg-[#e0740d]"
                >
                  <span>Send message</span>
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Statistics Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 pt-10 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Members */}
              <AnimatedCounter
                end={245}
                duration={2000}
                icon={HiUserGroup}
                label="Team Members"
              />

              {/* Projects Published */}
              <AnimatedCounter
                end={816}
                duration={2000}
                icon={HiEye}
                label="Projects Published"
              />

              {/* Countries */}
              <AnimatedCounter
                end={80}
                duration={2000}
                icon={HiGlobeAlt}
                label="Countries"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
