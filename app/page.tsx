"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Plus, X, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Footer from "./components/Footer";
import BlogPage from "./blog/page";
import { getCategories } from "./services/categoryService";

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  // UPDATED: Changed from 3 slots to 4 slots
  const slots = [1, 2, 3, 4];
  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      console.log("Categories:", response);

      setCategories(response?.data || []);
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-0 select-none">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Banner advertisement layout */}
        <div className="mb-12 max-w-[1280px] mx-auto">
          <div className="w-full h-24 sm:h-32 md:h-40 rounded-2xl bg-[#e6e7ee] shadow-[inset_4px_4px_8px_#b8c4d2,_inset_-4px_-4px_8px_#ffffff] border border-[#d1d9e6] flex flex-col items-center justify-center p-6 text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F98A1A] mb-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 fill-[#F98A1A]" /> Comparison Hub
            </span>
            <h2 className="text-sm sm:text-base md:text-lg font-black text-[#313842]">
              Compare specs, ratings, and design points side by side.
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
              Select products in the slots below to compute wins instantly.
            </p>
          </div>
        </div>

        {/* Quick Compare Section */}
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft overflow-hidden">
          <div className="border-b border-gray-300 bg-[#e6e7ee]/50 p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#F98A1A] animate-ping" />
              <h3 className="text-lg sm:text-xl font-black text-[#313842]">
                Quick Comparison
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* UPDATED: Flex layout adapted for 4 items (1 col mobile, 2 col tablet, 4 col desktop) */}
            <div className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap items-center justify-center gap-6 w-full relative">
              {slots.map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full sm:w-[calc(50%-10px)] xl:w-[24%] max-w-[420px] flex-shrink-0 flex flex-col xl:flex-row items-center justify-center relative"
                  >
                    {/* SLOT CARD */}
                    <div
                      onClick={() => router.push("/quick-compare")}
                      className="w-full min-h-[340px] sm:min-h-[360px] xl:h-[380px] rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] flex flex-col items-center justify-center p-4 sm:p-6 relative transition-all duration-300 shadow-inset hover:shadow-soft cursor-pointer group"
                    >
                      {/* EMPTY SLOT */}
                      <div className="h-16 w-16 rounded-full bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] group-hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center border border-[#d1d9e6] transition-shadow duration-300">
                        <Plus className="h-7 w-7 text-[#F98A1A]" />
                      </div>
                    </div>

                    {/* DESKTOP VS */}
                    {idx < 3 && (
                      <div className="hidden xl:flex absolute right-[-32px] top-1/2 -translate-y-1/2 z-10 flex-col items-center justify-center">
                        {/* TOP DIVIDER */}
                        <div className="h-10 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>

                        {/* VS BADGE */}
                        <div className="my-2 w-10 h-10 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center font-black text-[10px] text-gray-500 shrink-0">
                          VS
                        </div>

                        {/* BOTTOM DIVIDER */}
                        <div className="h-10 w-[2px] bg-gradient-to-t from-transparent via-gray-400 to-transparent"></div>
                      </div>
                    )}

                    {/* MOBILE/TABLET VS */}
                    {idx < 3 && (
                      <div className="flex xl:hidden items-center justify-center w-full my-5 z-10">
                        {/* LEFT DIVIDER */}
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

                        {/* VS BADGE */}
                        <div className="mx-4 w-10 h-10 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center font-black text-[10px] text-gray-500 shrink-0">
                          VS
                        </div>

                        {/* RIGHT DIVIDER */}
                        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-gray-400 to-transparent"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Compare Button */}
            <div className="flex flex-col items-center justify-center mt-10 gap-3">
              <button
                onClick={() => router.push("/quick-compare")}
                className="px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 bg-[#F98A1A] text-white shadow-soft hover:bg-[#e0740d] active:shadow-inset cursor-pointer"
              >
                More Compare
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto">
          {/* Categories Quick Filter Pill Buttons */}
          <div className="my-10 border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-5 px-6">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-5">
              <h3 className="text-base sm:text-lg font-black text-[#313842] flex items-center gap-2">
                📂 Categories
              </h3>

              <button
                onClick={() => router.push("/categories")}
                className="text-xs font-black text-[#F98A1A] hover:text-[#e0740d] transition-colors uppercase tracking-wider"
              >
                See All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => router.push(`/categories/${cat.uniqueName}`)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold btn-neomorphic"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog / Articles Section */}
          <div className="my-10">
            <BlogPage showBreadcrumb={false} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
