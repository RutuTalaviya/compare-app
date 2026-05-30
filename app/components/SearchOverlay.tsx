"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Added useRouter for navigation
import { X, ArrowRight, Search } from "lucide-react";
import { searchProducts } from "../services/productService";
import { imageUrl } from "../config";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// 2. Added uniqueTitle in Product Interface
interface Product {
  _id: string;
  title: string;
  uniqueTitle: string; 
  thumbnail: string;
  price: number;
  currency: string;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const router = useRouter(); // Initialize router

  // Input values (Sirf text store karne ke liye)
  const [inputs, setInputs] = useState<string[]>([""]);

  // 3. New state: Selected products ka actual data store karne ke liye
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null]);

  // Search results
  const [results, setResults] = useState<Product[][]>([[]]);

  // Loading states
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  // Maximum compare items
  const MAX_ITEMS = 4;

  /**
   * Search products API
   */
  const fetchProducts = async (value: string, index: number) => {
    try {
      if (!value.trim()) {
        const updatedResults = [...results];
        updatedResults[index] = [];
        setResults(updatedResults);
        return;
      }

      setLoadingIndex(index);
      const response = await searchProducts(value);
      const updatedResults = [...results];
      updatedResults[index] = response?.data || [];
      setResults(updatedResults);
    } catch (error) {
      console.log("Search error:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = async (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;

    const updatedSelected = [...selectedProducts];
    updatedSelected[index] = null;

    // Auto add new input
    if (
      index === updatedInputs.length - 1 &&
      value.trim() !== "" &&
      updatedInputs.length < MAX_ITEMS
    ) {
      updatedInputs.push("");
      updatedSelected.push(null);
      setResults((prev) => [...prev, []]);
    }

    setInputs(updatedInputs);
    setSelectedProducts(updatedSelected);

    // API call
    await fetchProducts(value, index);
  };

  /**
   * Select product
   */
  // 4. Update kiya taaki pura product object accept kare, na ki sirf title string
  const handleSelectProduct = (index: number, product: Product) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = product.title;
    setInputs(updatedInputs);

    // Product ko state me save karo
    const updatedSelected = [...selectedProducts];
    updatedSelected[index] = product;
    setSelectedProducts(updatedSelected);

    // Hide dropdown after selection
    const updatedResults = [...results];
    updatedResults[index] = [];
    setResults(updatedResults);
  };

  /**
   * Remove input
   */
  const handleRemove = (indexToRemove: number) => {
    let updatedInputs = inputs.filter((_, index) => index !== indexToRemove);
    let updatedResults = results.filter((_, index) => index !== indexToRemove);
    let updatedSelected = selectedProducts.filter((_, index) => index !== indexToRemove);

    // Always keep one input
    if (updatedInputs.length === 0) {
      updatedInputs = [""];
      updatedResults = [[]];
      updatedSelected = [null];
    }
    // Auto add empty field
    else if (
      updatedInputs[updatedInputs.length - 1].trim() !== "" &&
      updatedInputs.length < MAX_ITEMS
    ) {
      updatedInputs.push("");
      updatedResults.push([]);
      updatedSelected.push(null);
    }

    setInputs(updatedInputs);
    setResults(updatedResults);
    setSelectedProducts(updatedSelected);
  };

  // Valid compare items ab selected products se aayenge
  const validSelectedItems = selectedProducts.filter((product) => product !== null) as Product[];

  // Disable compare button
  const isCompareDisabled = validSelectedItems.length < 2;

  /**
   * Compare products
   */
  const handleCompare = () => {
    if (isCompareDisabled) return;

    // 5. Saare valid selected products ke uniqueTitle ko comma se separate karo
    const slugs = validSelectedItems.map((item) => item.uniqueTitle).join(",");
    
    console.log("Compare products slug:", slugs);

    // Compare page pe navigate karo aur overlay band kardo
    router.push(`/compare/${slugs}`);
    onClose(); 
  };

  return (
    <div
      className={`fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#1a1a1a]/95 backdrop-blur-sm z-40 overflow-y-auto pb-24 transition-all duration-400 ease-in-out ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-5"
      }`}
    >
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-16 flex flex-col">
        {/* Input Container */}
        <div className="relative flex flex-col gap-5 pl-8 md:pl-12">
          {inputs.map((value, index) => {
            const isLastBox = index === inputs.length - 1;
            const isMaxReached = inputs.length === MAX_ITEMS && isLastBox;
            const showCompareBtn = isLastBox;

            return (
              <div
                key={index}
                className="relative flex items-start w-full gap-2 md:gap-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
              >
                {/* VS Line */}
                {index > 0 && (
                  <div className="absolute -left-6 md:-left-9 top-[-10px] flex items-center justify-center w-px h-px">
                    <div className="absolute w-px h-[68px] bg-[#f97316]"></div>
                    <div className="relative bg-white rounded-full p-[3px] border-[3px] border-[#1a1a1a] flex items-center justify-center z-10">
                      <span className="text-[#f97316] text-[9px] font-extrabold uppercase tracking-widest leading-none">
                        vs
                      </span>
                    </div>
                  </div>
                )}

                {/* Input + Dropdown */}
                <div className="relative flex-1">
                  {/* Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full bg-[#eef2f6] text-black placeholder-gray-500 text-sm md:text-base px-4 py-3 md:py-3.5 rounded-lg focus:outline-none shadow-md pr-10"
                    />

                    {/* Search Icon */}
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    {/* Remove Button */}
                    {(index < inputs.length - 1 ||
                      (isMaxReached && value.trim() !== "")) && (
                      <button
                        onClick={() => handleRemove(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    )}
                  </div>

                  {/* Search Results */}
                  {results[index]?.length > 0 && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-50 max-h-[320px] overflow-y-auto">
                      {results[index].map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleSelectProduct(index, product)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 text-left"
                        >
                          {/* Product Image */}
                          <div className="w-[55px] h-[55px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                            <Image
                              src={`${imageUrl}${product.thumbnail}`}
                              alt={product.title}
                              width={55}
                              height={55}
                              className="object-contain"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-black line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {product.currency}
                              {product.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Loading */}
                  {loadingIndex === index && (
                    <div className="absolute left-0 top-full mt-2 text-white text-sm">
                      Searching...
                    </div>
                  )}
                </div>

                {/* Compare Button */}
                {showCompareBtn && (
                  <button
                    onClick={handleCompare}
                    disabled={isCompareDisabled}
                    className={`shrink-0 font-semibold text-sm md:text-base px-4 md:px-6 py-3 md:py-3.5 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 ${
                      isCompareDisabled
                        ? "bg-[#3a3a3a] text-gray-500 cursor-not-allowed border border-zinc-700"
                        : "bg-[#f97316] hover:bg-[#ea580c] text-white"
                    }`}
                  >
                    Compare
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Max Limit Message */}
          {inputs.length === MAX_ITEMS &&
            inputs[MAX_ITEMS - 1].trim() !== "" && (
              <div className="text-gray-400 text-sm text-center mt-2 animate-in fade-in duration-300">
                Maximum of {MAX_ITEMS} items can be compared at once.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;