"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SuggestProductPage() {
  const [productName, setProductName] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Submitted Data:", { productName, source });
      alert("Thank you! Your product suggestion has been submitted.");
      setProductName("");
      setSource("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#eaeff4] font-sans flex flex-col">
      <Navbar />

      {/* Dark Purple Gradient Header Section */}
      <div className="bg-[#2d2f33] pt-32 pb-20 px-5 md:px-8 w-full text-center md:text-left">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-white text-4xl md:text-[54px] font-extrabold tracking-tight">
            Suggest Product
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Help us keep our database accurate and complete.
          </p>
        </div>
      </div>

      {/* Main Content & Form Area */}
      <main className="flex-grow w-full max-w-[650px] mx-auto px-5 -mt-16 pb-16">
        {/* Decorative Neumorphic Card */}
        <div className="bg-[#e8edf2] rounded-3xl p-8 md:p-12 shadow-[12px_12px_24px_#cfd6e0,-12px_-12px_24px_#ffffff] border border-white/50">
          <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed font-medium mb-10">
            We work hard to have all the latest products but sometimes we miss
            something. If you notice a missing product, please let us know, and
            we will do our best to include it.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Product Name Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="productName"
                className="text-sm font-bold text-gray-900 uppercase tracking-wider"
              >
                Product Name{" "}
                <span className="text-gray-400 font-normal normal-case">
                  (*Required)
                </span>
              </label>
              <input
                type="text"
                id="productName"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Apple iPhone 17 Pro"
                className="w-full bg-[#e8edf2] rounded-xl px-5 py-4 text-gray-800 border border-white/60 shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Source Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="source"
                className="text-sm font-bold text-gray-900 uppercase tracking-wider"
              >
                Source{" "}
                <span className="text-gray-400 font-normal normal-case">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. link to official website"
                className="w-full bg-[#e8edf2] rounded-xl px-5 py-4 text-gray-800 border border-white/60 shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[6px_6px_12px_#cfd6e0,-6px_-6px_12px_#ffffff] ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#f97316] text-white hover:bg-[#ea580c] active:shadow-[inset_4px_4px_8px_#b45309]"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Suggestion"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
