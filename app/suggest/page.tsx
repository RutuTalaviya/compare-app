"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiLightningBolt, HiSparkles, HiPaperClip } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

export default function SuggestProductPage() {
  const [productName, setProductName] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setProductName("");
    setSource("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#e6e7ee] select-none flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F98A1A] mb-3 flex items-center justify-center gap-1">
              <HiLightningBolt className="w-3.5 h-3.5" /> Suggestion
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#313842] mb-5 leading-tight">
              Suggest Product
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We work hard to have all the latest products but sometimes we miss something. If you notice a missing product please let us know, we will do our best to include it.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[inset_6px_6px_12px_#b8c4d2,_inset_-6px_-6px_12px_#ffffff]">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Product Name */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <HiSparkles className="w-5 h-5 text-[#F98A1A]" />
                </div>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name (*Required)"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d1d9e6] rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_5px_#b8c4d2,_inset_-2px_-2px_5px_#ffffff] text-[#313842] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F98A1A] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Source */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <HiPaperClip className="w-5 h-5 text-[#F98A1A]" />
                </div>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Source e.g. official website (Optional)"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#d1d9e6] rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_5px_#b8c4d2,_inset_-2px_-2px_5px_#ffffff] text-[#313842] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F98A1A] focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3.5 bg-[#F98A1A] text-white rounded-xl shadow-[4px_4px_10px_#b8c4d2,_-4px_-4px_10px_#ffffff] hover:shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2 hover:bg-[#e0740d] ${isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                  <FiSend className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}