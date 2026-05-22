"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, PRODUCTS, Product, Category } from "../data/products";
import { X, Check } from "lucide-react";

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  slotIndex: number;
  selectedCategoryName: string | null; // Lock the category if other slots already have products
}

const SelectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  slotIndex,
  selectedCategoryName
}: SelectionModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // When category changes, filter the products
  useEffect(() => {
    if (selectedCategory) {
      const prods = PRODUCTS.filter((p) => p.category === selectedCategory);
      setFilteredProducts(prods);
      setSelectedProduct(null); // Reset selection
    } else {
      setFilteredProducts([]);
      setSelectedProduct(null);
    }
  }, [selectedCategory]);

  // When modal opens or locks, sync category locking rules
  useEffect(() => {
    if (isOpen) {
      if (selectedCategoryName) {
        setSelectedCategory(selectedCategoryName);
      } else {
        setSelectedCategory(CATEGORIES[0]?.uniqueName || "");
      }
    }
  }, [isOpen, selectedCategoryName]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedProduct) {
      onConfirm(selectedProduct);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Neumorphic Modal Panel */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#e6e7ee] p-6 text-left align-middle border border-[#d1d9e6] shadow-[10px_10px_30px_#b8c4d2,_-10px_-10px_30px_#ffffff] transition-all z-10">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-5">
          <h3 className="text-lg sm:text-xl font-black text-[#313842]">
            Select Product (Slot {slotIndex + 1})
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full btn-neomorphic focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-4.5 w-4.5 text-[#313842]" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Category Selection */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
              Product Category
            </label>
            {selectedCategoryName ? (
              <div className="w-full p-3 rounded-xl bg-[#e6e7ee] shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] text-sm text-[#313842] border border-[#d1d9e6] font-semibold flex items-center justify-between">
                <span>
                  {CATEGORIES.find((c) => c.uniqueName === selectedCategoryName)?.name}
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md font-bold uppercase border border-amber-500/20">
                  Locked
                </span>
              </div>
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-xl input-neomorphic text-sm text-[#313842] border border-[#d1d9e6] font-semibold cursor-pointer"
              >
                <option value="">Choose a Category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.uniqueName} value={c.uniqueName}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
            {selectedCategoryName && (
              <p className="text-[10px] text-gray-500 mt-1.5">
                Note: Category is locked to compare similar items together.
              </p>
            )}
          </div>

          {/* Product Selection */}
          {selectedCategory && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
                Available Products
              </label>
              <select
                value={selectedProduct?.id || ""}
                onChange={(e) => {
                  const prod = filteredProducts.find((p) => p.id === e.target.value);
                  setSelectedProduct(prod || null);
                }}
                className="w-full p-3 rounded-xl input-neomorphic text-sm text-[#313842] border border-[#d1d9e6] font-semibold cursor-pointer"
              >
                <option value="">Select a Product</option>
                {filteredProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.brand} - {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Product Preview Card */}
          {selectedProduct && (
            <div className="mt-4 p-4 rounded-xl bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] border border-[#d1d9e6] flex items-center gap-4 animate-fade-in">
              <div className="h-16 w-16 text-3xl flex items-center justify-center rounded-xl bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] border border-[#d1d9e6]">
                {selectedProduct.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] bg-[#F98A1A]/10 text-[#F98A1A] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  {selectedProduct.brand}
                </span>
                <h4 className="font-bold text-[#313842] text-sm sm:text-base mt-1 truncate">
                  {selectedProduct.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Comparison Score: <span className="font-extrabold text-[#F98A1A]">{selectedProduct.scoreValue} Points</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-300 pt-4">
          <button
            type="button"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider btn-neomorphic"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedProduct}
            onClick={handleConfirm}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
              selectedProduct
                ? "bg-[#F98A1A] text-white shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:bg-[#e0740d] active:translate-y-0.5 active:shadow-[inset_2px_2px_4px_#b8c4d2]"
                : "opacity-40 cursor-not-allowed border border-[#d1d9e6] text-gray-400 bg-gray-200"
            }`}
          >
            <Check className="h-4 w-4" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;
