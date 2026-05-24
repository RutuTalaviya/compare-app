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

// ---------------- TYPES ----------------

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

  // Example => /categories/smartphone
  const pathSegments = pathname.split("/").filter(Boolean);

  // Last slug => smartphone
  const uniqueName = pathSegments[pathSegments.length - 1];

  // ---------------- STATES ----------------

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

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p._id !== id));
  };
  // ---------------- API CALL ----------------
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

  return (
    <div className="min-h-screen bg-[#eaeff4] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-gray-600 mb-8">
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
              <div className="sticky top-24 bg-[#eaeff4] p-6 rounded-[28px] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff]">
                {/* Sort */}
                <h2 className="font-black text-gray-700 mb-4 uppercase tracking-wider text-sm">
                  Sort By
                </h2>

                <select className="w-full p-3 rounded-2xl bg-[#eaeff4] border border-[#d1d9e6] shadow-inner mb-8 font-semibold text-sm text-gray-700 outline-none">
                  <option>Release date</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                  <option>Top Rated</option>
                </select>

                {/* Product Count */}
                <div className="bg-[#e6e7ee] rounded-3xl p-5 border border-[#d1d9e6] shadow-inner">
                  <h3 className="text-lg font-black text-gray-700">
                    {products.length}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Products Available
                  </p>
                </div>
              </div>
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
                /* Empty */
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
                /* Products */
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                  {products.map((product) => {
                    // ===== SCORE CIRCLE CALC =====
                    const radius = 22;
                    const stroke = 4;
                    const normalizedRadius = radius;
                    const circumference = 2 * Math.PI * radius;

                    const score = product.scoreValue || 0;
                    const progress = Math.min(score / 100, 1);
                    const strokeDashoffset =
                      circumference - progress * circumference;

                    return (
                      <div
                        key={product._id}
                        className="relative bg-[#eaeff4] p-4 md:p-5 rounded-2xl md:rounded-[30px] border border-[#d1d9e6] shadow-[6px_6px_12px_#b8c4d2,-6px_-6px_12px_#ffffff] flex flex-col sm:flex-row gap-4 md:gap-5 items-start hover:scale-[1.01] transition-all duration-300"
                      >
                        {/* SCORE BADGE */}
                        <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 z-10">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#eaeff4] rounded-full border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center relative">
                            <svg height="60" width="60" className="absolute">
                              {/* BACK CIRCLE */}
                              <circle
                                stroke="#d1d9e6"
                                fill="transparent"
                                strokeWidth={4}
                                r={radius}
                                cx={30}
                                cy={30}
                              />

                              {/* PROGRESS CIRCLE */}
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

                            {/* TEXT */}
                            <div className="flex flex-col items-center justify-center z-10">
                            <span className="text-xs md:text-[11px] font-black text-[#F98A1A] leading-none">
                                {product.scoreValue}
                              </span>
                              <span className="text-[7px] md:text-[8px] font-bold uppercase text-gray-600 mt-1">
                                Points
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* PRODUCT IMAGE */}
                        <div className="w-full sm:w-28 md:w-32 h-40 sm:h-28 md:h-32 bg-[#e6e7ee] rounded-xl md:rounded-[24px] border border-[#d1d9e6] shadow-inner flex items-center justify-center shrink-0 overflow-hidden">
                          <Image
                            src={getImageSrc(product?.image?.[0])}
                            alt={product.title}
                            width={120}
                            height={120}
                            className="object-contain w-full h-full"
                            unoptimized
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="flex-1 min-w-0">
                          {/* BRAND */}
                          <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                            {product.productCompany}
                          </p>

                          {/* TITLE */}
                          <h3 className="font-black text-gray-800 text-lg md:text-xl leading-tight line-clamp-2">
                            {product.title}
                          </h3>

                          {/* PRICE */}
                        <p className="text-[#F98A1A] font-black text-xl md:text-2xl mt-2">
                            {product.currency}
                            {product.price?.toLocaleString("en-IN")}
                          </p>

                          {/* FEATURES */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 p-3 md:p-4 bg-[#eaeff4] w-full sm:w-max rounded-lg mt-3">
                            {product.subfeatureData?.slice(0, 4).map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-2"
                              >
                                <img
                                  src={getImageSrc(item.icon)}
                                  alt={item.name}
                                  className="w-4 h-4 md:w-5 md:h-5 object-contain"
                                />

                              <span className="text-[#025ca6] text-sm md:text-[15px] font-medium">
                                  {item.unit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COMPARE BUTTON (FULL ROUND) */}
                        <button
                          onClick={() =>
                            compareList.some((p) => p._id === product._id)
                              ? handleRemoveCompare(product._id)
                              : handleAddCompare(product)
                          }
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center hover:scale-110 hover:bg-gray-100 transition-all self-end sm:self-auto"
                        >
                          {compareList.some((p) => p._id === product._id) ? (
                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-red-500 rotate-45" />
                          ) : (
                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                          )}
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
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div
            onClick={() => setShowCompare(true)}
            className="w-[80%] mx-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-2xl px-4 py-3 flex items-center justify-between cursor-pointer rounded-xl"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              {/* VS badge */}
              <div className="bg-white text-orange-500 font-black w-9 h-9 flex items-center justify-center rounded-full shadow-md">
                VS
              </div>

              <div className="leading-tight">
                <p className="font-bold text-sm md:text-base">
                  Comparison List
                </p>

                <p className="text-xs text-white/90">
                  {compareList.length} products added
                </p>
              </div>
            </div>

            {/* CENTER MINI PREVIEW */}
            <div className="hidden md:flex items-center gap-2">
              {compareList.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="w-10 h-10 bg-white rounded-lg p-1 shadow-md"
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
                <div className="w-10 h-10 bg-white text-orange-500 font-bold flex items-center justify-center rounded-lg">
                  +{compareList.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCompare && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">
          {/* PANEL */}
          <div className="w-full md:w-[700px] bg-[#eaeff4] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* VS badge */}
                <div className="bg-white text-orange-500 font-black w-8 h-8 flex items-center justify-center rounded-full text-sm">
                  VS
                </div>

                <h2 className="font-bold text-lg">
                  Comparison list ({compareList.length})
                </h2>
              </div>

              <button onClick={() => setShowCompare(false)}>✕</button>
            </div>

            {/* BODY */}
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {compareList.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={getImageSrc(item.image?.[0])}
                      alt={item.title}
                      width={45}
                      height={45}
                      className="rounded-lg"
                      unoptimized
                    />

                    <div>
                      <p className="font-bold text-gray-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.currency}
                        {item.price}
                      </p>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemoveCompare(item._id)}
                    className="text-gray-400 hover:text-red-500 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* FOOTER BUTTON */}
            <div className="p-4 bg-[#eaeff4]">
              <button
                className="w-full bg-white rounded-full py-3 font-bold text-orange-500 shadow-inner hover:scale-[1.01] transition"
                onClick={() => alert("Go to compare page")}
              >
                Compare ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
