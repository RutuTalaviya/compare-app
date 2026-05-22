"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, CATEGORIES, Product, Category, SpecMetadata } from "../data/products";
import Navbar from "../components/Navbar";
import CircularScore from "../components/CircularScore";
import SelectionModal from "../components/SelectionModal";
import { Plus, X, Award, Check, AlertCircle, Sparkles, Sliders } from "lucide-react";

export default function QuickCompareWorkbench() {
  // Support up to 4 slots in the workbench
  const [slots, setSlots] = useState<(Product | null)[]>([null, null, null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotIdx, setActiveSlotIdx] = useState<number | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync category locking based on filled slots
  useEffect(() => {
    const filled = slots.find((s) => s !== null);
    if (filled) {
      setLockedCategory(filled.category);
    } else {
      setLockedCategory(null);
    }
  }, [slots]);

  // Load workbench slots from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("workbenchSlots");
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const loadedSlots = parsed.map(id => PRODUCTS.find(p => p.id === id) || null);
        while (loadedSlots.length < 4) loadedSlots.push(null);
        setSlots(loadedSlots.slice(0, 4));
      }
    } catch (e) {
      console.error("Failed to load workbench slots:", e);
    }
  }, []);

  const saveSlots = (updatedSlots: (Product | null)[]) => {
    setSlots(updatedSlots);
    try {
      const ids = updatedSlots.filter(s => s !== null).map(s => s!.id);
      localStorage.setItem("workbenchSlots", JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to save workbench slots:", e);
    }
  };

  const handleOpenModal = (index: number) => {
    setActiveSlotIdx(index);
    setIsModalOpen(true);
  };

  const handleConfirmProduct = (product: Product) => {
    if (activeSlotIdx !== null) {
      // Check if product already exists in another slot
      if (slots.some((s) => s?.id === product.id)) {
        setErrorMessage(`${product.title} is already selected.`);
        return;
      }

      const newSlots = [...slots];
      newSlots[activeSlotIdx] = product;
      saveSlots(newSlots);
      setErrorMessage(null);
    }
  };

  const handleClearSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSlots = [...slots];
    newSlots[index] = null;
    saveSlots(newSlots);
    setErrorMessage(null);
  };

  const handleClearAll = () => {
    saveSlots([null, null, null, null]);
    localStorage.removeItem("workbenchSlots");
    setErrorMessage(null);
  };

  const activeProducts = slots.filter((p): p is Product => p !== null);
  const activeCount = activeProducts.length;

  const categoryMeta = activeProducts.length > 0
    ? CATEGORIES.find((c) => c.uniqueName === activeProducts[0].category)
    : null;

  // Helper to determine the winner of a specific numerical specification
  const getWinnerInfo = (spec: SpecMetadata, products: Product[]) => {
    let winningValue = spec.higherIsBetter ? -Infinity : Infinity;
    let winnerIds: string[] = [];

    products.forEach((p) => {
      const val = p.specs[spec.key];
      if (typeof val === "number") {
        if (spec.higherIsBetter) {
          if (val > winningValue) {
            winningValue = val;
            winnerIds = [p.id];
          } else if (val === winningValue) {
            winnerIds.push(p.id);
          }
        } else {
          if (val < winningValue) {
            winningValue = val;
            winnerIds = [p.id];
          } else if (val === winningValue) {
            winnerIds.push(p.id);
          }
        }
      }
    });

    return { winnerIds, winningValue };
  };

  // Helper to get maximum spec value across compared products (used to scale progress bars)
  const getMaxSpecValue = (specKey: string, products: Product[]): number => {
    let max = 0;
    products.forEach((p) => {
      const val = p.specs[specKey];
      if (typeof val === "number" && val > max) {
        max = val;
      }
    });
    return max || 1;
  };

  return (
    <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-24 select-none">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#313842] flex items-center gap-2">
              <Sliders className="h-6.5 w-6.5 text-[#F98A1A]" /> Compare Workbench
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Add up to 4 items and watch the comparison matrix render dynamically in real-time.
            </p>
          </div>
          {activeCount > 0 && (
            <button
              onClick={handleClearAll}
              className="sm:self-end px-5 py-2.5 text-xs font-black uppercase tracking-wider text-gray-500 hover:text-red-500 bg-[#e6e7ee] rounded-xl shadow-soft border border-[#d1d9e6] active:shadow-inset transition-all"
            >
              Clear All Slots
            </button>
          )}
        </div>

        {/* Error / Alert banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-soft-sm">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-700 font-black p-1 hover:bg-red-100 rounded"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        )}

        {/* Dynamic slots section */}
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {slots.map((product, idx) => (
              <div
                key={idx}
                onClick={() => !product && handleOpenModal(idx)}
                className={`h-[280px] rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] flex flex-col items-center justify-center p-5 relative transition-all duration-300 ${
                  product
                    ? "shadow-soft cursor-default"
                    : "shadow-inset hover:shadow-soft cursor-pointer group"
                }`}
              >
                {product ? (
                  <>
                    {/* Circular Score Rating Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <CircularScore value={product.scoreValue} />
                    </div>

                    {/* Clear Slot button */}
                    <button
                      onClick={(e) => handleClearSlot(idx, e)}
                      className="absolute top-3.5 right-3.5 p-1 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-soft-sm hover:text-red-500 active:shadow-inset-sm transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Thumbnail & Title */}
                    <div className="h-20 w-20 text-4xl flex items-center justify-center bg-[#e6e7ee] rounded-2xl shadow-inset border border-[#d1d9e6] mb-3 mt-4">
                      {product.thumbnail}
                    </div>
                    <span className="text-[9px] bg-[#F98A1A]/10 text-[#F98A1A] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#F98A1A]/20">
                      {product.brand}
                    </span>
                    <h4 className="text-sm font-black text-[#313842] text-center mt-2.5 line-clamp-2 px-1">
                      {product.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-1">
                      Slot {idx + 1}
                    </p>
                  </>
                ) : (
                  <>
                    {/* Empty Slot state */}
                    <div className="h-12 w-12 rounded-full bg-[#e6e7ee] shadow-soft group-hover:shadow-inset flex items-center justify-center border border-[#d1d9e6] transition-all duration-300">
                      <Plus className="h-6 w-6 text-[#F98A1A]" />
                    </div>
                    <span className="text-xs font-black text-gray-400 mt-3.5 uppercase tracking-wider group-hover:text-[#F98A1A] transition-colors">
                      Add Product {idx + 1}
                    </span>
                    {lockedCategory && (
                      <span className="text-[9px] text-amber-600 font-bold mt-1 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                        {lockedCategory} only
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Comparison Matrix Rendering */}
        {activeCount >= 2 && categoryMeta ? (
          <div className="space-y-8 animate-fade-in">
            
            {/* Summary Highlights Matrix */}
            <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6">
              <h2 className="text-lg font-black text-[#313842] border-b border-gray-300 pb-3 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#F98A1A]" /> Quick Summary Matrix
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-5 rounded-2xl bg-[#e6e7ee] shadow-inset border border-[#d1d9e6] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-black text-[#313842] truncate max-w-[160px]">
                          {product.title}
                        </span>
                        <span className="text-xs font-black text-[#F98A1A] bg-orange-500/10 px-2 py-0.5 rounded border border-[#F98A1A]/20">
                          {product.scoreValue} Pts
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <Award className="h-3.5 w-3.5 text-[#F98A1A]" /> Key Strengths
                        </h4>
                        <ul className="space-y-2">
                          {product.pros.slice(0, 3).map((pro, index) => (
                            <li key={index} className="flex items-start gap-1.5 text-xs text-gray-600 leading-normal">
                              <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6">
              <h2 className="text-lg font-black text-[#313842] border-b border-gray-300 pb-3 mb-6">
                📊 Detailed Specs Grid
              </h2>

              <div className="space-y-8">
                {categoryMeta.specs.map((spec) => {
                  const { winnerIds } = getWinnerInfo(spec, activeProducts);
                  const maxVal = getMaxSpecValue(spec.key, activeProducts);

                  return (
                    <div
                      key={spec.key}
                      className="p-5 rounded-2xl bg-[#e6e7ee] shadow-inset border border-[#d1d9e6] flex flex-col gap-4"
                    >
                      {/* Spec header */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider border-b border-gray-300 pb-2">
                        <span>{spec.label}</span>
                        <span className="text-[10px] text-gray-400 lowercase font-medium">({spec.unit.trim() || "unit"})</span>
                      </div>

                      {/* Values comparison grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeProducts.map((product) => {
                          const val = product.specs[spec.key];
                          const isWinner = winnerIds.includes(product.id);
                          const percent = typeof val === "number" ? Math.min(100, (val / maxVal) * 100) : 0;

                          return (
                            <div key={product.id} className="flex flex-col justify-between">
                              <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-black text-[#313842] truncate max-w-[130px]">
                                  {product.title}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className={`text-xs sm:text-sm font-black ${isWinner ? "text-[#F98A1A]" : "text-gray-500"}`}>
                                    {val}
                                    {spec.unit}
                                  </span>
                                  {isWinner && typeof val === "number" && (
                                    <span className="text-[8px] bg-orange-500/10 text-[#F98A1A] font-extrabold px-1 rounded border border-[#F98A1A]/20 uppercase">
                                      Win
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Progress bar or text representation */}
                              {typeof val === "number" ? (
                                <div className="w-full h-2.5 rounded-full bg-[#e6e7ee] shadow-[inset_1px_1px_2px_#b8c4d2,_inset_-1px_-1px_2px_#ffffff] p-[1.5px] border border-[#d1d9e6]">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isWinner
                                        ? "bg-[#F98A1A]"
                                        : "bg-gray-400"
                                    }`}
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                              ) : (
                                <div className="text-[11px] text-gray-500 font-bold bg-[#e6e7ee] p-1.5 rounded-lg border border-[#d1d9e6] shadow-[inset_1px_1px_2px_#b8c4d2,_inset_-1px_-1px_2px_#ffffff] text-center">
                                  {val || "N/A"}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft flex flex-col items-center max-w-2xl mx-auto">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-black text-[#313842] uppercase tracking-wider">Matrix Awaiting Items</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-sm px-4 leading-relaxed">
              Add at least 2 products belonging to the same category to unlock the real-time specifications comparison grid.
            </p>
          </div>
        )}
      </div>

      {/* Modal for selecting products */}
      <SelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmProduct}
        slotIndex={activeSlotIdx || 0}
        selectedCategoryName={lockedCategory}
      />
    </main>
  );
}
