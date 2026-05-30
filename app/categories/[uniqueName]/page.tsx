"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Plus,
  ChevronRight,
  Loader2,
  BatteryCharging,
  Aperture,
  Smartphone,
  MemoryStick,
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getSubCategoryWiseProducts } from "@/app/services/categoryService";
import FilterSidebar from "@/app/components/FilterSidebar";
import { useRouter } from "next/navigation";
import { DangerRight } from "@/app/utils/toast";

interface FeatureItem {
  featureId: {
    _id: string;
    featureName: string;
    unit: string;
    icon: string;
  };
  scoreValue: number;
  _id: string;
}

interface Product {
  _id: string;
  title: string;
  uniqueTitle: string;
  productCompany: string;
  productReviewTitle: string;
  affiliateLink: string;
  description: string;
  image: string[];
  thumbnail: string;
  scoreValue: number;
  price: number;
  currency: string;
  subfeatureData: SubFeatureItem[];
}

interface SubFeatureItem {
  _id: string;
  name: string;
  icon: string;
  unit: string;
}

type IconKey = "battery" | "camera" | "display" | "ram";

export default function SubCategoryUI() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const uniqueName = pathSegments[pathSegments.length - 1];

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const iconMap: Record<IconKey, any> = {
    battery: BatteryCharging,
    camera: Aperture,
    display: Smartphone,
    ram: MemoryStick,
  };

  const getImageSrc = (img?: string) => {
    if (!img) return "/iphone.png";
    if (img.startsWith("http")) return img;
    return `https://admin.compareuniverse.com/${img}`;
  };

  const handleAddCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const handleCompare = () => {
    if (compareList.length < 2) {
      DangerRight("Please add at least 2 products");
      return;
    }
    const slug = compareList.map((item) => item.uniqueTitle).join(",");
    router.push(`/compare/${slug}`);
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p._id !== id));
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getSubCategoryWiseProducts(uniqueName);
      console.log("Products :", response);
      setProducts(response || []);
    } catch (error) {
      console.log("Fetch Product Error :", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueName) {
      fetchProducts();
    }
  }, [uniqueName]);

  const handleFilterChange = (filters: any) => {
    console.log("Filters Updated:", filters);
  };

  return (
    <div className="min-h-screen bg-[#e6e7ee] flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Outer Neomorphic Container */}
          <div className="bg-[#e6e7ee] rounded-2xl p-4 md:p-8 shadow-[inset_6px_6px_12px_#b8c4d2,inset_-6px_-6px_12px_#ffffff] border border-[#d1d9e6]">
            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-gray-600 mb-8 pb-4 border-b border-[#d1d9e6]">
              <Link href="/" className="hover:text-[#F98A1A] transition-all">
                Home
              </Link>
              {pathSegments.map((segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/");
                const isLast = index === pathSegments.length - 1;
                return (
                  <React.Fragment key={segment}>
                    <ChevronRight size={16} className="text-gray-400" />
                    {isLast ? (
                      <span className="capitalize text-[#F98A1A] font-semibold">
                        {segment.replace(/-/g, " ")}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="capitalize hover:text-[#F98A1A] transition-all"
                      >
                        {segment.replace(/-/g, " ")}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              {products.length > 0 && (
                <aside className="w-full lg:w-80 flex-shrink-0">
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </aside>
              )}

              {/* Product Grid */}
              <main className="flex-1">
                {/* Loading */}
                {loading ? (
                  <div className="flex items-center justify-center py-32">
                    <Loader2 className="w-10 h-10 animate-spin text-[#F98A1A]" />
                  </div>
                ) : products.length === 0 ? (
                  <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-gray-700">
                        No Products Found
                      </h2>
                      <p className="text-gray-500 mt-2">
                        Products are not available in this category.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                    {products.map((product) => {
                      const radius = 22;
                      const circumference = 2 * Math.PI * radius;
                      const score = product.scoreValue || 0;
                      const progress = Math.min(score / 100, 1);
                      const strokeDashoffset =
                        circumference - progress * circumference;
                      const isInCompare = compareList.some(
                        (p) => p._id === product._id,
                      );

                      return (
                        <div
                          key={product._id}
                          className="relative bg-[#e6e7ee] p-4 md:p-5 rounded-2xl border border-[#d1d9e6] shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] hover:shadow-[8px_8px_18px_#b8c4d2,_-8px_-8px_18px_#ffffff] flex flex-col sm:flex-row gap-4 md:gap-5 items-start transition-all duration-300"
                        >
                          {/* SCORE BADGE */}
                          <div className="absolute -top-4 -left-4 z-10">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#e6e7ee] rounded-full border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex items-center justify-center relative">
                              <svg height="60" width="60" className="absolute">
                                <circle
                                  stroke="#d1d9e6"
                                  fill="transparent"
                                  strokeWidth={4}
                                  r={radius}
                                  cx={30}
                                  cy={30}
                                />
                                <circle
                                  stroke="#F98A1A"
                                  fill="transparent"
                                  strokeWidth={4}
                                  strokeLinecap="round"
                                  r={radius}
                                  cx={30}
                                  cy={30}
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <div className="flex flex-col items-center justify-center z-10">
                                <span className="text-xs font-black text-[#F98A1A] leading-none">
                                  {product.scoreValue}
                                </span>
                                <span className="text-[7px] font-bold uppercase text-gray-500 mt-0.5">
                                  Points
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* PRODUCT IMAGE */}
                          <div className="w-full sm:w-28 md:w-32 h-36 sm:h-28 md:h-32 bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[inset_4px_4px_8px_#b8c4d2,_inset_-4px_-4px_8px_#ffffff] flex items-center justify-center shrink-0 overflow-hidden">
                            <Image
                              src={getImageSrc(product?.image?.[0])}
                              alt={product.title}
                              width={120}
                              height={120}
                              className="object-contain w-full h-full p-2"
                              unoptimized
                            />
                          </div>

                          {/* DETAILS */}
                          <div className="flex-1 min-w-0">
                            {/* BRAND */}
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                              {product.productCompany}
                            </p>

                            {/* TITLE */}
                            <h3 className="font-black text-[#313842] text-base md:text-lg leading-tight line-clamp-2">
                              {product.title}
                            </h3>

                            {/* PRICE */}
                            <p className="text-[#F98A1A] font-black text-xl md:text-2xl mt-1.5">
                              {product.currency}
                              {product.price?.toLocaleString("en-IN")}
                            </p>

                            {/* FEATURES */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 p-3 bg-[#e6e7ee] rounded-xl mt-3 shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] border border-[#d1d9e6] w-full sm:w-max">
                              {product.subfeatureData
                                ?.slice(0, 4)
                                .map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-2"
                                  >
                                    <img
                                      src={getImageSrc(item.icon)}
                                      alt={item.name}
                                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                                    />
                                    <span className="text-[#025ca6] text-xs md:text-sm font-semibold">
                                      {item.unit}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* COMPARE BUTTON */}
                          <button
                            onClick={() =>
                              isInCompare
                                ? handleRemoveCompare(product._id)
                                : handleAddCompare(product)
                            }
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d1d9e6] flex items-center justify-center transition-all duration-300 self-end sm:self-auto shrink-0 ${
                              isInCompare
                                ? "bg-[#e6e7ee] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]"
                                : "bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8c4d2,_-6px_-6px_12px_#ffffff]"
                            }`}
                          >
                            <Plus
                              className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                                isInCompare
                                  ? "text-red-500 rotate-45"
                                  : "text-[#313842]"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARE BOTTOM BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-0 w-full z-50 px-4">
          <div
            onClick={() => setShowCompare(true)}
            className="max-w-2xl mx-auto bg-[#e6e7ee] border border-[#d1d9e6] shadow-[6px_6px_16px_#b8c4d2,_-6px_-6px_16px_#ffffff] px-4 py-3 flex items-center justify-between cursor-pointer rounded-2xl transition-all duration-300 hover:shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff]"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="bg-[#F98A1A] text-white font-black w-10 h-10 flex items-center justify-center rounded-full shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] text-xs">
                VS
              </div>
              <div className="leading-tight">
                <p className="font-black text-sm md:text-base text-[#313842]">
                  Comparison List
                </p>
                <p className="text-xs text-gray-500">
                  {compareList.length} products added
                </p>
              </div>
            </div>

            {/* CENTER MINI PREVIEW */}
            <div className="hidden md:flex items-center gap-2">
              {compareList.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="w-10 h-10 bg-[#e6e7ee] rounded-xl border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] p-1"
                >
                  <Image
                    src={getImageSrc(item.image?.[0])}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
              ))}
              {compareList.length > 3 && (
                <div className="w-10 h-10 bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] text-[#F98A1A] font-bold flex items-center justify-center rounded-xl text-sm">
                  +{compareList.length - 3}
                </div>
              )}
            </div>

            {/* RIGHT ARROW */}
            <div className="w-9 h-9 rounded-full bg-[#F98A1A] flex items-center justify-center shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff]">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {showCompare && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end md:items-center justify-center px-0 md:px-4">
          <div className="w-full md:max-w-[680px] bg-[#e6e7ee] rounded-t-3xl md:rounded-3xl border border-[#d1d9e6] shadow-[8px_8px_24px_#b8c4d2,_-8px_-8px_24px_#ffffff] overflow-hidden">
            {/* HEADER */}
            <div className="bg-[#e6e7ee] border-b border-[#d1d9e6] shadow-[0_4px_8px_#b8c4d2] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F98A1A] text-white font-black w-9 h-9 flex items-center justify-center rounded-full shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] text-xs">
                  VS
                </div>
                <h2 className="font-black text-lg text-[#313842]">
                  Comparison list ({compareList.length})
                </h2>
              </div>
              <button
                onClick={() => setShowCompare(false)}
                className="w-8 h-8 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 space-y-3 max-h-[55vh] overflow-y-auto">
              {compareList.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-[#e6e7ee] rounded-2xl p-3 border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#e6e7ee] rounded-xl border border-[#d1d9e6] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] flex items-center justify-center overflow-hidden p-1">
                      <Image
                        src={getImageSrc(item.image?.[0])}
                        alt={item.title}
                        width={45}
                        height={45}
                        className="object-contain w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-black text-[#313842] line-clamp-1 text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#F98A1A] font-bold">
                        {item.currency}
                        {item.price?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCompare(item._id)}
                    className="w-8 h-8 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors font-bold text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* FOOTER BUTTON */}
            <div className="p-4 border-t border-[#d1d9e6]">
              <button
                className="w-full bg-[#F98A1A] text-white rounded-2xl py-3.5 font-black text-base shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:bg-[#e0740d] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] transition-all duration-300"
                onClick={handleCompare}
              >
                Compare Now ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
