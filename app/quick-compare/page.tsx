"use client";

import React from "react";
import {
  Plus,
  Smartphone,
  Camera,
  BatteryCharging,
  Cpu,
  ChevronDown,
  Home,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const tabs = ["Mobile device", "TV", "Refrigerator", "Cameras", "smart phones"];

const subTabs = ["Smartphone", "laptops"];

const products = [
  {
    id: 1,
    name: "Apple IPhone 17 Pro Max",
    points: 58,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    specs: {
      mobile: 14,
      camera: 64,
      battery: "1500mAh",
      cpu: 64,
    },
  },
  {
    id: 2,
    name: "dini",
    points: 58,
    image: null,
    specs: {
      mobile: 14,
      camera: 64,
      battery: "1500mAh",
      cpu: 64,
    },
  },
  {
    id: 3,
    name: "duwhu",
    points: 58,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    specs: {
      mobile: 13,
      camera: 14,
      battery: "1500mAh",
      cpu: 64,
    },
  },
  {
    id: 4,
    name: "j uhbh",
    points: 58,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    specs: {
      mobile: 13,
      camera: 14,
      battery: "1500mAh",
      cpu: 64,
    },
  },
];

export default function QuickCompare() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="w-full min-h-screen bg-[#eef0f6] pt-24 sm:pt-28 lg:pt-32 pb-32">
        {/* OUTER SPACE */}
        <div className="px-3 sm:px-5 lg:px-8 xl:px-10">
          {/* MAIN BOX */}
          <div className="w-full border border-[#d7dbe5] bg-[#eef0f6] rounded-xl overflow-hidden shadow-sm">
            {/* BREADCRUMB */}
            <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-5 border-b border-[#d7dbe5] flex flex-wrap items-center gap-2 text-[14px] sm:text-[15px]">
              <Home size={15} className="text-gray-500" />

              <span className="text-gray-500">Home</span>

              <span className="text-gray-400">/</span>

              <span className="font-semibold text-black">Quick Compare</span>
            </div>

            {/* CATEGORY */}
            <div className="px-4 sm:px-6 py-4 border-b border-[#d7dbe5] flex flex-wrap gap-3">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-[15px] whitespace-nowrap transition-all duration-300
                  ${
                    index === 0
                      ? "bg-white text-black shadow-[4px_4px_10px_#c8ccd3,-4px_-4px_10px_#ffffff]"
                      : "bg-[#eef0f6] text-[#4b5563] shadow-[4px_4px_10px_#c8ccd3,-4px_-4px_10px_#ffffff]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SUB CATEGORY */}
            <div className="px-4 sm:px-6 py-4 border-b border-[#d7dbe5] flex flex-wrap gap-3">
              {subTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-[15px] whitespace-nowrap transition-all duration-300
                  ${
                    index === 0
                      ? "bg-white text-black shadow-[4px_4px_10px_#c8ccd3,-4px_-4px_10px_#ffffff]"
                      : "bg-[#eef0f6] text-[#4b5563] shadow-[4px_4px_10px_#c8ccd3,-4px_-4px_10px_#ffffff]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* PRODUCTS */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#eef0f6] border border-[#d8dce5] rounded-2xl p-4 sm:p-5 relative shadow-[5px_5px_14px_#cfd3dc,-5px_-5px_14px_#ffffff]"
                  >
                    {/* POINTS */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-[65px] h-[65px] sm:w-[72px] sm:h-[72px] rounded-full border-[5px] border-[#f98a1a] bg-white flex flex-col items-center justify-center z-10">
                      <span className="text-[16px] sm:text-[18px] font-black leading-none">
                        {product.points}
                      </span>

                      <span className="text-[10px] font-bold text-gray-700">
                        Points
                      </span>
                    </div>

                    {/* PLUS BUTTON */}
                    <button className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#eef0f6] shadow-[4px_4px_10px_#c8ccd3,-4px_-4px_10px_#ffffff] flex items-center justify-center">
                      <Plus size={24} strokeWidth={2.5} />
                    </button>

                    {/* IMAGE */}
                    <div className="w-full h-[240px] sm:h-[300px] lg:h-[320px] bg-white rounded-md flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-contain h-full w-auto"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm sm:text-base text-center px-4">
                          Image not available
                        </span>
                      )}
                    </div>

                    {/* TITLE */}
                    <h2 className="text-[18px] sm:text-[22px] font-semibold mt-5 text-black leading-snug min-h-[56px]">
                      {product.name}
                    </h2>

                    {/* DIVIDER */}
                    <div className="w-full h-[1px] bg-[#d6dae3] my-4" />

                    {/* SPECS */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-[14px] sm:text-[15px] text-[#4b5563]">
                      <div className="flex items-center gap-2">
                        <Smartphone size={18} />
                        <span>{product.specs.mobile}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Camera size={18} />
                        <span>{product.specs.camera}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <BatteryCharging size={18} />
                        <span>{product.specs.battery}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Cpu size={18} />
                        <span>{product.specs.cpu}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STICKY BAR */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[80%] bg-[#f98a1a] text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-2xl z-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-[#f98a1a] flex items-center justify-center text-xs font-black">
              VS
            </div>

            <span className="font-semibold text-sm sm:text-base">
              Comparison list (2)
            </span>
          </div>

          <button>
            <ChevronDown size={22} />
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
