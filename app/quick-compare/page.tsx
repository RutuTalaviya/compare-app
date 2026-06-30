"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Smartphone,
  Camera,
  BatteryCharging,
  Cpu,
  ChevronDown,
  Home,
  X,
  ChevronRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

import {
  getCategories,
  getSubCategoryWiseProducts,
} from "../services/categoryService";
import { DangerRight } from "../utils/toast";

interface SubCategory {
  _id: string;
  name: string;
  uniqueName: string;
}

interface Category {
  _id: string;
  name: string;
  sIcon: string;
  bIcon: string;
  subCategory: SubCategory[];
}

interface FeatureData {
  featureId: {
    featureName: string;
    unit: string;
  };
}

interface Product {
  _id: string;
  title: string;
  uniqueTitle: string;
  scoreValue: number;
  image: string[];
  thumbnail: string;
  featureData: FeatureData[];
  price: number;
  currency: string;
}

export default function QuickCompare() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCompare = () => {
    if (compareList.length < 2) {
      DangerRight("Please add at least 2 products to compare");
      return;
    }

    // Sabhi selected products ke uniqueTitle ko comma se join karna
    const slug = compareList
      .map((item) => {
        // Fallback: Agar uniqueTitle na ho, toh title ko slug bana dega
        return (item as any).uniqueTitle || (item as any).uniqueName || (item.title ? item.title.toLowerCase().replace(/\s+/g, '-') : '');
      })
      .filter(Boolean)
      .join(",");

    // Ab URL properly unique titles ke sath banega
    router.push(`/compare/${slug}`);
  };

  useEffect(() => {
    fetchCategories();
    // Load compareList from localStorage
    const stored = localStorage.getItem("quickCompareList");
    if (stored) {
      setCompareList(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quickCompareList", JSON.stringify(compareList));
    }
  }, [compareList, isLoaded]);

  const fetchCategories = async () => {
    try {
      const response: any = await getCategories();
      console.log("CATEGORY RESPONSE :", response);
      const categoryData = response?.data || [];
      setCategories(categoryData);
      if (categoryData.length > 0) {
        const firstCategory = categoryData[0];
        setSelectedCategory(firstCategory);
        if (firstCategory.subCategory?.length > 0) {
          const firstSubCategory = firstCategory.subCategory[0];
          setSelectedSubCategory(firstSubCategory);
          fetchProducts(firstSubCategory.uniqueName);
        }
      }
    } catch (error) {
      console.log("CATEGORY ERROR :", error);
    }
  };

  const fetchProducts = async (uniqueName: string) => {
    try {
      setLoading(true);
      const response = await getSubCategoryWiseProducts(uniqueName);
      console.log("PRODUCT RESPONSE :", response);
      setProducts((response as any) || []);
    } catch (error) {
      console.log("PRODUCT ERROR :", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompare = (product: Product) => {
    console.log("PRODUCT BEING ADDED:", product);
    const exists = compareList.find((p) => p._id === product._id);
    if (exists) return;

    // Limit to 4 products maximum
    if (compareList.length >= 4) {
      DangerRight("You can only compare up to 4 products at a time.");
      return;
    }

    const updated = [...compareList, product];
    setCompareList(updated);
    localStorage.setItem("quickCompareList", JSON.stringify(updated));
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setProducts([]);
    if (category.subCategory?.length > 0) {
      const firstSubCategory = category.subCategory[0];
      setSelectedSubCategory(firstSubCategory);
      fetchProducts(firstSubCategory.uniqueName);
    } else {
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (sub: SubCategory) => {
    setSelectedSubCategory(sub);
    fetchProducts(sub.uniqueName);
  };

  const getImageSrc = (product: Product) => {
    if (product.image?.[0]?.startsWith("http")) return product.image[0];
    return `https://admin.compareuniverse.com/${product.thumbnail}`;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#e6e7ee] pt-[85px] sm:pt-[95px] lg:pt-[105px] pb-32">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          {/* OUTER NEOMORPHIC CONTAINER */}
          <div className="bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[inset_6px_6px_12px_#b8c4d2,inset_-6px_-6px_12px_#ffffff] overflow-hidden">
            {/* BREADCRUMB */}
            <div className="min-h-[60px] border-b border-[#d1d9e6] flex flex-wrap items-center gap-2 px-4 sm:px-7 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Home size={15} className="text-gray-400" />
                <span
                  className="hover:text-[#F98A1A] cursor-pointer transition-colors"
                  onClick={() => router.push("/")}
                >
                  Home
                </span>
                <ChevronRight size={14} className="text-gray-400" />
                <span className="font-black text-[#313842]">Quick Compare</span>
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="border-b border-[#d1d9e6] px-4 sm:px-6 py-4 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold border border-[#d1d9e6] transition-all duration-300 cursor-pointer ${selectedCategory?._id === category._id
                    ? "bg-[#e6e7ee] text-[#F98A1A] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]"
                    : "bg-[#e6e7ee] text-[#555f6e] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[5px_5px_10px_#b8c4d2,_-5px_-5px_10px_#ffffff]"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* SUB CATEGORY TABS */}
            <div className="border-b border-[#d1d9e6] px-4 sm:px-6 py-4 flex flex-wrap gap-3">
              {selectedCategory?.subCategory?.length ? (
                selectedCategory.subCategory.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() => handleSubCategoryClick(sub)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold border border-[#d1d9e6] transition-all duration-300 cursor-pointer ${selectedSubCategory?._id === sub._id
                      ? "bg-[#e6e7ee] text-[#F98A1A] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]"
                      : "bg-[#e6e7ee] text-[#555f6e] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[5px_5px_10px_#b8c4d2,_-5px_-5px_10px_#b8c4d2,_-5px_-5px_10px_#ffffff]"
                      }`}
                  >
                    {sub.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No sub categories found
                </p>
              )}
            </div>

            {/* PRODUCTS GRID */}
            <div className="p-4 sm:p-6 lg:p-8">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-12 h-12 rounded-full border-4 border-[#d1d9e6] border-t-[#F98A1A] animate-spin shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff]" />
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {products.map((product) => {
                    const features = product.featureData || [];
                    const isInCompare = compareList.some(
                      (p) => p._id === product._id,
                    );

                    // Score circle
                    const radius = 24;
                    const circumference = 2 * Math.PI * radius;
                    const progress = Math.min(
                      (product.scoreValue || 0) / 100,
                      1,
                    );
                    const strokeDashoffset =
                      circumference - progress * circumference;

                    return (
                      <div
                        key={product._id}
                        className="relative bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] hover:shadow-[8px_8px_18px_#b8c4d2,_-8px_-8px_18px_#ffffff] p-4 transition-all duration-300"
                      >
                        {/* SCORE BADGE */}
                        <div className="absolute -top-4 -left-4 z-20">
                          <div className="w-16 h-16 bg-[#e6e7ee] rounded-full border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex flex-col items-center justify-center relative">
                            <svg height="64" width="64" className="absolute">
                              <circle
                                stroke="#d1d9e6"
                                fill="transparent"
                                strokeWidth={4}
                                r={radius}
                                cx={32}
                                cy={32}
                              />
                              <circle
                                stroke="#F98A1A"
                                fill="transparent"
                                strokeWidth={4}
                                strokeLinecap="round"
                                r={radius}
                                cx={32}
                                cy={32}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                transform="rotate(-90 32 32)"
                              />
                            </svg>
                            <span className="text-sm font-black text-[#F98A1A] leading-none z-10">
                              {product.scoreValue}
                            </span>
                            <span className="text-[10px] font-bold uppercase text-gray-500 z-10">
                              Points
                            </span>
                          </div>
                        </div>

                        {/* PLUS / REMOVE BUTTON */}
                        <button
                          onClick={() =>
                            isInCompare
                              ? handleRemoveCompare(product._id)
                              : handleAddCompare(product)
                          }
                          className={`absolute top-3 right-3 w-11 h-11 rounded-full border border-[#d1d9e6] flex items-center justify-center transition-all duration-300 ${isInCompare
                            ? "bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]"
                            : "bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8c4d2,_-6px_-6px_12px_#ffffff]"
                            }`}
                        >
                          {isInCompare ? (
                            <X size={20} className="text-red-500" />
                          ) : (
                            <Plus
                              size={22}
                              className="text-[#313842]"
                              strokeWidth={2.4}
                            />
                          )}
                        </button>

                        {/* PRODUCT IMAGE */}
                        <div className="mt-6 bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[inset_4px_4px_8px_#b8c4d2,_inset_-4px_-4px_8px_#ffffff] h-[240px] sm:h-[280px] flex items-center justify-center overflow-hidden">
                          <Image
                            src={getImageSrc(product)}
                            alt={product.title}
                            width={260}
                            height={260}
                            className="object-contain h-full w-auto p-3"
                          />
                        </div>

                        {/* TITLE */}
                        <h2 className="text-base sm:text-lg font-black text-[#313842] mt-4 leading-snug min-h-[52px] line-clamp-2">
                          {product.title}
                        </h2>

                        {/* DIVIDER */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5cdd9] to-transparent my-3" />

                        {/* SPECS */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-3 p-3 bg-[#e6e7ee] rounded-xl border border-[#d1d9e6] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]">
                          <div className="flex items-center gap-2 text-[#555f6e]">
                            <Smartphone
                              size={16}
                              strokeWidth={2}
                              className="text-[#F98A1A] shrink-0"
                            />
                            <span className="text-xs font-semibold truncate">
                              {features[0]?.featureId?.unit || "-"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#555f6e]">
                            <Camera
                              size={16}
                              strokeWidth={2}
                              className="text-[#F98A1A] shrink-0"
                            />
                            <span className="text-xs font-semibold truncate">
                              {features[1]?.featureId?.unit || "-"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#555f6e]">
                            <BatteryCharging
                              size={16}
                              strokeWidth={2}
                              className="text-[#F98A1A] shrink-0"
                            />
                            <span className="text-xs font-semibold truncate">
                              {features[2]?.featureId?.unit || "-"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#555f6e]">
                            <Cpu
                              size={16}
                              strokeWidth={2}
                              className="text-[#F98A1A] shrink-0"
                            />
                            <span className="text-xs font-semibold truncate">
                              {features[3]?.featureId?.unit || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-4">
                      <Smartphone size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-semibold">
                      No Products Found
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STICKY COMPARE BAR - Completely Orange */}
        {compareList.length > 0 && (
          <div className="fixed bottom-4 left-0 w-full z-40 px-4">
            <div
              onClick={() => setShowCompare(true)}
              className="max-w-2xl mx-auto bg-[#F98A1A] border border-[#e07b16] shadow-[0_8px_30px_rgba(249,138,26,0.4)] px-4 py-3 flex items-center justify-between cursor-pointer rounded-2xl hover:shadow-[0_12px_40px_rgba(249,138,26,0.6)] transition-all duration-300"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="bg-white text-[#F98A1A] font-black w-10 h-10 flex items-center justify-center rounded-full shadow-sm text-xs">
                  VS
                </div>
                <div className="leading-tight">
                  <p className="font-black text-sm md:text-base text-white">
                    Comparison List
                  </p>
                  <p className="text-xs text-orange-100 font-medium">
                    {compareList.length} products added (Max 4)
                  </p>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="hidden md:flex items-center gap-2">
                {compareList.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="w-10 h-10 bg-white rounded-xl shadow-sm p-1"
                  >
                    <Image
                      src={getImageSrc(item)}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                ))}
                {compareList.length > 3 && (
                  <div className="w-10 h-10 bg-[#e07b16] border border-[#f08518] text-white font-bold flex items-center justify-center rounded-xl text-sm shadow-inner">
                    +{compareList.length - 3}
                  </div>
                )}
              </div>

              {/* RIGHT ARROW */}
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ChevronRight className="w-5 h-5 text-[#F98A1A]" strokeWidth={3} />
              </div>
            </div>
          </div>
        )}

        {/* COMPARE MODAL - Black background overlay */}
        {showCompare && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center px-0 md:px-4">

            {/* Clicking outside the modal closes it */}
            <div className="absolute inset-0" onClick={() => setShowCompare(false)} />

            <div className="relative w-full md:max-w-[720px] bg-[#e6e7ee] rounded-t-3xl md:rounded-3xl border border-[#d1d9e6] shadow-2xl overflow-hidden z-10 animate-in slide-in-from-bottom-10 fade-in duration-300">
              {/* MODAL HEADER */}
              <div className="bg-[#e6e7ee] border-b border-[#d1d9e6] px-4 py-3 flex items-center justify-between shadow-[0_4px_8px_#b8c4d2]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F98A1A] rounded-full flex items-center justify-center shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] text-white font-black text-xs">
                    VS
                  </div>
                  <div>
                    <h2 className="font-black text-sm text-[#313842]">Comparison List</h2>
                    <p className="text-[10px] text-gray-500 font-semibold">{compareList.length}/4 products selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCompare(false)}
                  className="w-7 h-7 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-500 hover:text-red-500 transition-all font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-3 space-y-2 max-h-[50vh] md:max-h-[40vh] overflow-y-auto">
                {compareList.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-[#e6e7ee] rounded-xl p-3 border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#e6e7ee] rounded-xl border border-[#d1d9e6] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] flex items-center justify-center overflow-hidden p-1 shrink-0">
                        <Image
                          src={getImageSrc(item)}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-black text-[#313842] line-clamp-1 text-xs">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#F98A1A] font-black">
                          {item.currency}{item.price?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCompare(item._id)}
                      className="w-7 h-7 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-400 hover:text-red-500 transition-all font-bold shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* MODAL FOOTER */}
              <div className="p-3 border-t border-[#d1d9e6] bg-[#e6e7ee]">
                <div className="flex gap-2">
                  <button
                    onClick={handleCompare}
                    className="flex-1 py-2.5 rounded-xl bg-[#F98A1A] text-white font-black text-xs shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:bg-[#e0740d] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    Compare Now ({compareList.length})
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}