"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, PRODUCTS, BLOG_ARTICLES, Product, Category } from "./data/products";
import Navbar from "./components/Navbar";
import CircularScore from "./components/CircularScore";
import SelectionModal from "./components/SelectionModal";
import { Plus, X, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  // UPDATED: Changed from 3 slots to 4 slots
  const [slots, setSlots] = useState<(Product | null)[]>([null, null, null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  
  // Track selected category to lock comparison slots to items of the same category
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);

  // Sync locked category based on selected slot items
  useEffect(() => {
    const selectedItem = slots.find((item) => item !== null);
    if (selectedItem) {
      setLockedCategory(selectedItem.category);
    } else {
      setLockedCategory(null);
    }
  }, [slots]);

  // Load any previously saved comparison state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quickCompareSlots");
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const loadedSlots = parsed.map(id => PRODUCTS.find(p => p.id === id) || null);
        
        // UPDATED: Fill up to 4 slots
        while (loadedSlots.length < 4) loadedSlots.push(null);
        setSlots(loadedSlots.slice(0, 4));
      }
    } catch (e) {
      console.error("Failed to load saved comparison slots:", e);
    }
  }, []);

  // Save current slots to localStorage on change
  const saveSlotsToStorage = (updatedSlots: (Product | null)[]) => {
    try {
      const ids = updatedSlots.filter(s => s !== null).map(s => s!.id);
      localStorage.setItem("quickCompareSlots", JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to save slots:", e);
    }
  };

  const handleOpenModal = (index: number) => {
    setActiveSlotIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmProduct = (product: Product) => {
    if (activeSlotIndex !== null) {
      const newSlots = [...slots];
      newSlots[activeSlotIndex] = product;
      setSlots(newSlots);
      saveSlotsToStorage(newSlots);
    }
  };

  const handleClearSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open modal click
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    saveSlotsToStorage(newSlots);
  };

  const handleCompareClick = () => {
    const activeProducts = slots.filter((p): p is Product => p !== null);
    if (activeProducts.length < 2) return;

    // Build vs slug
    const slug = activeProducts.map((p) => p.uniqueTitle).join("-vs-");
    router.push(`/compare/${slug}`);
  };

  const activeCount = slots.filter((p) => p !== null).length;

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
                Quick Specs Comparison
              </h3>
            </div>
            {activeCount > 0 && (
              <button
                onClick={() => {
                  // UPDATED: Clear all 4 slots
                  setSlots([null, null, null, null]);
                  localStorage.removeItem("quickCompareSlots");
                }}
                className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider bg-[#e6e7ee] px-3 py-1.5 rounded-lg shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8c4d2]"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* UPDATED: Flex layout adapted for 4 items (1 col mobile, 2 col tablet, 4 col desktop) */}
            <div className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap items-center justify-center gap-6 w-full relative">
              
              {slots.map((product, idx) => {
                const categoryMeta = product
                  ? CATEGORIES.find((c) => c.uniqueName === product.category)
                  : null;

                return (
                  <div
                    key={idx}
                    // Width is adjusted to ~24% on xl screens to perfectly fit 4 slots
                    className="w-full md:w-[calc(50%-12px)] xl:w-[24%] max-w-[420px] flex-shrink-0 flex items-center justify-center relative"
                  >
                    {/* Slot Card */}
                    <div
                      onClick={() => !product && handleOpenModal(idx)}
                      className={`w-full h-[380px] rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] flex flex-col items-center justify-center p-6 relative transition-all duration-300 ${
                        product
                          ? "shadow-soft cursor-default"
                          : "shadow-inset hover:shadow-soft cursor-pointer group"
                      }`}
                    >
                      {product ? (
                        <>
                          {/* Circular Score Rating Badge */}
                          <div className="absolute top-4 left-4">
                            <CircularScore value={product.scoreValue} />
                          </div>

                          {/* Clear slot Button */}
                          <button
                            onClick={(e) => handleClearSlot(idx, e)}
                            className="absolute top-4 right-4 p-1.5 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff] hover:text-red-500 active:shadow-[inset_1px_1px_2px_#b8c4d2]"
                          >
                            <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                          </button>

                          {/* Product Graphics */}
                          <div className="h-28 w-28 text-6xl flex items-center justify-center bg-[#e6e7ee] rounded-2xl shadow-inset border border-[#d1d9e6] mb-4 mt-6">
                            {product.thumbnail}
                          </div>

                          {/* Product Details */}
                          <span className="text-[10px] bg-[#F98A1A]/10 text-[#F98A1A] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-[#F98A1A]/20">
                            {product.brand}
                          </span>
                          <h4 className="text-base sm:text-lg font-black text-[#313842] text-center mt-2 truncate w-full hover:text-[#F98A1A] transition-colors cursor-pointer"
                              onClick={() => router.push(`/compare/${product.uniqueTitle}`)}>
                            {product.title}
                          </h4>

                          {/* Pre-populated specs highlights */}
                          <div className="w-full mt-4 pt-3 border-t border-[#d1d9e6] flex flex-col gap-1.5 text-xs text-gray-500 text-left">
                            {categoryMeta?.specs.slice(0, 3).map((spec) => {
                              const val = product.specs[spec.key];
                              return (
                                <div key={spec.key} className="flex justify-between items-center py-0.5">
                                  <span className="font-medium text-gray-400">{spec.label}</span>
                                  <span className="font-extrabold text-[#313842]">
                                    {val}
                                    {spec.unit}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Empty Slot */}
                          <div className="h-16 w-16 rounded-full bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] group-hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center border border-[#d1d9e6] transition-shadow duration-300">
                            <Plus className="h-7 w-7 text-[#F98A1A]" />
                          </div>
                          <span className="text-sm font-black text-gray-400 mt-4 uppercase tracking-wider group-hover:text-[#F98A1A] transition-colors">
                            Add Product
                          </span>
                        </>
                      )}
                    </div>

                    {/* VS separators (only display up to 3rd item, hidden on mobile/tablet to avoid overflow) */}
                    {idx < 3 && (
                      <div className="absolute right-[-20px] xl:right-[-20px] top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-[#e6e7ee] shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] border border-[#d1d9e6] flex items-center justify-center font-black text-xs text-gray-400">
                          VS
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

            {/* Compare Button */}
            <div className="flex flex-col items-center justify-center mt-10 gap-3">
              <button
                disabled={activeCount < 2}
                onClick={handleCompareClick}
                className={`px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeCount >= 2
                    ? "bg-[#F98A1A] text-white shadow-soft hover:bg-[#e0740d] active:shadow-inset cursor-pointer"
                    : "opacity-40 cursor-not-allowed border border-[#d1d9e6] text-gray-400 bg-gray-200"
                }`}
              >
                Compare Now ({activeCount})
                <ArrowRight className="h-5 w-5" />
              </button>
              {activeCount === 1 && (
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                  Add at least 1 more product of the same category to start comparing.
                </p>
              )}
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
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.uniqueName}
                  onClick={() => router.push(`/categories?c=${cat.uniqueName}`)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold btn-neomorphic"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog / Articles Section */}
          <div className="my-10">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5.5 w-5.5 text-[#F98A1A]" />
              <h3 className="text-lg sm:text-xl font-black text-[#313842]">
                Latest Comparisons & Guides
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BLOG_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => router.push(`/blog/${article.uniqueTitle}`)}
                  className="group cursor-pointer border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-4 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-40 overflow-hidden rounded-xl bg-[#e6e7ee] shadow-inset border border-[#d1d9e6] relative mb-3">
                      {/* fallback image placeholder or actual */}
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[9px] font-extrabold text-[#F98A1A] uppercase tracking-widest">
                      {article.date}
                    </span>
                    <h4 className="text-sm font-black text-[#313842] mt-1.5 leading-tight group-hover:text-[#F98A1A] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 group-hover:text-[#F98A1A] transition-colors mt-4 uppercase tracking-wider">
                    Read Article <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal for selecting products */}
      <SelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmProduct}
        slotIndex={activeSlotIndex || 0}
        selectedCategoryName={lockedCategory}
      />

      <Footer/>
    </main>
  );
}