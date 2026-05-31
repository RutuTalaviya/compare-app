"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Share2,
  Settings,
  Smartphone,
  Aperture,
  BatteryCharging,
  MemoryStick,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { compareProducts } from "@/app/services/categoryService";

// Helper function for mapping Image URLs properly
const getImageUrl = (path: string) => {
  if (!path) return "/iphone.png";
  if (path.startsWith("http")) return path;
  return `https://admin.compareuniverse.com/${path}`;
};

export default function ComparePage() {
  const params = useParams();
  const uniqueTitles = params?.slug as string;

  // API Data aur Loading State
  const [compareData, setCompareData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Tabs states
  const [activeSpecTab, setActiveSpecTab] = useState<string>("");
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("display");

  // API Fetch Effect
  useEffect(() => {
    const fetchComparisonData = async () => {
      // Jab tak URL params na mile, hold karo
      if (!uniqueTitles) return;

      try {
        setIsLoading(true);
        const response = await compareProducts(uniqueTitles);
        setCompareData(response);

        if (response?.data?.comparedProducts?.length > 0) {
          setActiveSpecTab(response.data.comparedProducts[0]._id);

          if (response.data.comparedProducts[0].featureData?.length > 0) {
            const firstFeatureName =
              response.data.comparedProducts[0].featureData[0].featureName;
            setActiveSidebarTab(
              firstFeatureName.toLowerCase().replace(/\s+/g, "-"),
            );
          }
        }
      } catch (error) {
        console.error("Failed to load comparison data:", error);
      } finally {
        // Finally hamesha run hoga, jisse loading state false ho jayegi
        setIsLoading(false);
      }
    };

    fetchComparisonData();
  }, [uniqueTitles]);

  // Safe data extraction (Crash proof)
  const products = compareData?.comparedProducts || [];
  const popularComparisons = compareData?.popularComparison || [];
  console.log("1. URL Slug (uniqueTitles):", uniqueTitles);
  console.log("2. Full State (compareData):", compareData);
  console.log("3. Extracted Products Array:", products);
  const activeProduct =
    products.find((p: any) => p._id === activeSpecTab) || products[0] || {};

  // Dynamic detailed specs extraction
  const detailedSpecs = (products[0]?.featureData || []).map((feature: any) => {
    let IconComponent = Settings;
    const fnLower = feature.featureName?.toLowerCase() || "";
    if (fnLower.includes("display")) IconComponent = Smartphone;
    if (fnLower.includes("camera")) IconComponent = Aperture;
    if (fnLower.includes("better") || fnLower.includes("battery"))
      IconComponent = BatteryCharging;
    if (fnLower.includes("storage")) IconComponent = MemoryStick;

    const allSubfeatureNames = new Set<string>();
    products.forEach((p: any) => {
      const pFeature = p.featureData?.find(
        (f: any) => f.featureName === feature.featureName,
      );
      pFeature?.subfeatures?.forEach((sf: any) =>
        allSubfeatureNames.add(sf.name),
      );
    });

    const specs = Array.from(allSubfeatureNames).map((sfName) => {
      const row: any = { title: sfName };
      products.forEach((p: any, pIdx: number) => {
        const pFeature = p.featureData?.find(
          (f: any) => f.featureName === feature.featureName,
        );
        const sf = pFeature?.subfeatures?.find((s: any) => s.name === sfName);
        row[`param${pIdx + 1}`] = sf ? sf.details || sf.unit || "-" : "-";
      });
      return row;
    });

    return {
      id: feature.featureName.toLowerCase().replace(/\s+/g, "-"),
      title: feature.featureName,
      icon: IconComponent,
      score: feature.scoreValue || 0,
      specs: specs,
    };
  });

  // Scroll and Score Color functions
  const scrollToSection = (id: string) => {
    setActiveSidebarTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -220;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "#24B200";
    if (score >= 4) return "#F29A1F";
    return "#EF4444";
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = detailedSpecs.map((cat: any) =>
        document.getElementById(cat.id),
      );
      let currentActive = activeSidebarTab;

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 350 && rect.bottom >= 350) {
            currentActive = section.id;
            break;
          }
        }
      }

      if (currentActive !== activeSidebarTab) {
        setActiveSidebarTab(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSidebarTab, detailedSpecs]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#eaeff4] flex items-center justify-center">
        <p className="text-gray-500 font-bold text-xl animate-pulse">
          Loading Comparison...
        </p>
      </div>
    );
  }

  // Agar data fetch ke baad array khali aaye
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#eaeff4] flex items-center justify-center">
        <p className="text-gray-500 font-bold text-xl">
          No products found for comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeff4] flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-5 lg:px-8 max-w-[1400px] mx-auto w-full relative">
        {/* ================= FIXED TOP HEADER ================= */}
        <div className="sticky top-[64px] md:top-[72px] z-40 bg-[#e6e7ee] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-[#d1d9e6] shadow-[6px_6px_12px_#b8c4d2,-6px_-6px_12px_#ffffff] mb-6 flex justify-between items-start">
          <div className="w-full">
            <div className="text-[10px] md:text-[12px] font-medium text-gray-500 mb-2 md:mb-3 flex items-center gap-1 md:gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#F98A1A] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link
                href={`/categories/${products[0]?.subCategoryId?.uniqueName || "smartphone"
                  }`}
                className="hover:text-[#F98A1A] transition-colors"
              >
                {products[0]?.subCategoryId?.name || "Smartphone"}
              </Link>
              <span>&gt;</span>
              <span className="text-gray-700 font-bold truncate">
                {products.map((p: any) => p.title).join(" vs ")}
              </span>
            </div>

            <h1 className="text-xl md:text-3xl font-black text-[#2d3748] tracking-tight truncate w-[90%]">
              {products.map((p: any) => p.title).join(" vs ")}
            </h1>

            <div className="flex overflow-x-auto gap-2 mt-3 md:mt-4 pb-1 [&::-webkit-scrollbar]:hidden">
              {["OVERVIEW", "PRICES", "SPECS"].map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-wider transition-all border border-[#d1d9e6] ${idx === 0
                    ? "bg-[#eaeff4] shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] text-gray-800"
                    : "bg-[#eaeff4] shadow-[3px_3px_6px_#b8c4d2,-3px_-3px_6px_#ffffff] text-gray-500 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button className="h-8 w-8 md:h-9 md:w-9 shrink-0 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,-3px_-3px_6px_#ffffff] flex items-center justify-center text-gray-600 hover:text-black hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all">
            <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        {/* ================= HERO GRID ================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full mb-16 md:mb-20">
          {[0, 1, 2, 3].map((index) => {
            const prod = products[index];
            if (index > 0 && !prod && index >= products.length) return null;

            return (
              <React.Fragment key={index}>
                {index > 0 && prod && (
                  <div className="flex lg:flex-col items-center justify-center w-full lg:w-auto my-4 lg:my-0 z-10">
                    <div className="h-[2px] w-full lg:w-[2px] lg:h-10 bg-gradient-to-r lg:bg-gradient-to-b from-transparent to-gray-300"></div>
                    <div className="mx-3 lg:mx-0 lg:my-3 w-12 h-12 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center font-black text-gray-500 text-sm shrink-0">
                      VS
                    </div>
                    <div className="h-[2px] w-full lg:w-[2px] lg:h-10 bg-gradient-to-l lg:bg-gradient-to-t from-transparent to-gray-300"></div>
                  </div>
                )}

                {prod && (
                  <div
                    className="w-full bg-[#eaeff4] p-6 md:p-8 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] flex flex-col items-center relative"
                    style={{ width: `${100 / products.length - 2}%` }} // Dynamic width adjustment
                  >
                    <h2 className="text-xl font-black text-[#2d3748] mb-6 text-center line-clamp-2">
                      {prod.title}
                    </h2>

                    <div className="relative w-full max-w-[240px] aspect-[3/4] bg-white rounded-[24px] border border-gray-100 shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#f9f9f9] p-6 flex items-center justify-center mb-8">
                      <Image
                        src={getImageUrl(prod.thumbnail || prod.image?.[0])}
                        alt={prod.title}
                        fill
                        className="object-contain p-4 drop-shadow-md"
                      />
                      {/* SCORE BADGE - CategoriesPage style */}
                      <div className="absolute -top-4 -right-4 z-10">
                        <div className="w-14 h-14 bg-[#e6e7ee] rounded-full border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex flex-col items-center justify-center relative">
                          <svg height="56" width="56" className="absolute">
                            <circle
                              stroke="#d1d9e6"
                              fill="transparent"
                              strokeWidth={4}
                              r={22}
                              cx={28}
                              cy={28}
                            />
                            <circle
                              stroke="#F98A1A"
                              fill="transparent"
                              strokeWidth={4}
                              strokeLinecap="round"
                              r={22}
                              cx={28}
                              cy={28}
                              strokeDasharray={2 * Math.PI * 22}
                              strokeDashoffset={
                                2 * Math.PI * 22 -
                                Math.min((prod.scoreValue || 0) / 100, 1) *
                                2 *
                                Math.PI *
                                22
                              }
                              transform="rotate(-90 28 28)"
                            />
                          </svg>
                          <span className="text-xs font-black text-[#F98A1A] leading-none z-10">
                            {prod.scoreValue || 0}
                          </span>
                          <span className="text-[7px] font-bold uppercase text-gray-500 mt-0.5 z-10">
                            Points
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-2.5 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700">
                      {prod.currency} {prod.price?.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ================= 200 FACTS & RADAR SECTION ================= */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.2em] mb-3">
            200 Facts In Comparison
          </p>
          <h3 className="text-3xl font-black text-[#2d3748]">
            {products.map((p: any, i: number) => (
              <React.Fragment key={p._id}>
                {p.title}
                {i < products.length - 1 && (
                  <span className="underline decoration-[3px] underline-offset-8 decoration-gray-400 mx-2">
                    vs
                  </span>
                )}
              </React.Fragment>
            ))}
          </h3>
        </div>

        <div className="bg-[#eaeff4] p-6 md:p-8 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] mb-12">
          {/* Section Tabs */}
          <div className="flex gap-4 border-b border-[#d1d9e6] pb-4 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {products.map((prod: any) => (
              <button
                key={prod._id}
                onClick={() => setActiveSpecTab(prod._id)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border border-[#d1d9e6] whitespace-nowrap ${activeSpecTab === prod._id
                  ? "bg-[#eaeff4] shadow-[inset_3px_3px_6px_#b8c4d2,inset_-3px_-3px_6px_#ffffff] text-[#F98A1A]"
                  : "bg-[#eaeff4] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] text-gray-500 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff]"
                  }`}
              >
                {prod.title}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Radar Mock */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-between">
              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mb-8">
                <div className="absolute inset-4 rounded-full border border-gray-300"></div>
                <div className="absolute inset-12 rounded-full border border-gray-300"></div>
                <div className="absolute inset-20 rounded-full border border-gray-300"></div>
                <div className="absolute inset-28 rounded-full border border-gray-300"></div>
                <div className="w-3 h-3 bg-white border-2 border-gray-500 rounded-full z-10"></div>
                <div className="absolute w-full h-[1px] bg-gray-300"></div>
                <div className="absolute h-full w-[1px] bg-gray-300"></div>
                <span className="absolute top-0 text-[10px] text-gray-500 font-bold bg-[#eaeff4] px-1">
                  Performance
                </span>
                <span className="absolute right-0 text-[10px] text-gray-500 font-bold bg-[#eaeff4] px-1">
                  Display
                </span>
                <span className="absolute bottom-0 text-[10px] text-gray-500 font-bold bg-[#eaeff4] px-1">
                  Cameras
                </span>
                <span className="absolute bottom-4 left-6 text-[10px] text-gray-500 font-bold bg-[#eaeff4] px-1">
                  Battery
                </span>
                <span className="absolute left-0 text-[10px] text-gray-500 font-bold bg-[#eaeff4] px-1">
                  Storage
                </span>
              </div>
              <div className="w-full bg-[#eaeff4] rounded-2xl p-4 border border-[#d1d9e6] shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#ffffff]">
                <div className="flex justify-center gap-4 md:gap-8 mb-4">
                  {[
                    Settings,
                    Smartphone,
                    Aperture,
                    BatteryCharging,
                    MemoryStick,
                  ].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all text-gray-700"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <div className="text-center border-t border-[#d1d9e6] pt-3">
                  <span className="text-sm font-bold text-gray-600">
                    {activeProduct?.scoreValue || 0} points
                  </span>
                </div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <h3 className="text-lg font-black text-gray-700 mb-6">
                Key Specs
              </h3>
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                  {/* SAFE .map() implementation */}
                  {(activeProduct?.featureData || [])
                    .slice(0, 6)
                    .map((feat: any, i: number) => {
                      let IconComponent = Settings;
                      const fnLower = feat?.featureName?.toLowerCase() || "";
                      if (fnLower.includes("display"))
                        IconComponent = Smartphone;
                      if (fnLower.includes("camera")) IconComponent = Aperture;
                      if (
                        fnLower.includes("better") ||
                        fnLower.includes("battery")
                      )
                        IconComponent = BatteryCharging;
                      if (fnLower.includes("storage"))
                        IconComponent = MemoryStick;

                      return (
                        <div
                          key={i}
                          className="bg-[#eaeff4] p-3 rounded-2xl border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#eaeff4] shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] flex flex-shrink-0 items-center justify-center text-gray-700">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="w-full overflow-hidden">
                            <p className="text-xs text-gray-500 font-semibold leading-tight truncate">
                              {feat.featureName || "Feature"}
                            </p>
                            <p className="text-sm text-gray-800 font-bold leading-tight truncate">
                              {feat.unit || "-"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-[#d1d9e6] pt-6">
                <div>
                  <p className="text-[11px] text-gray-500 font-bold mb-1">
                    Market status
                  </p>
                  <p className="text-sm text-gray-800 font-black">-</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-bold mb-1">
                    Released date
                  </p>
                  <p className="text-sm text-gray-800 font-black">-</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-bold mb-1">
                    Official website
                  </p>
                  <Link
                    href={activeProduct?.affiliateLink || "#"}
                    target="_blank"
                    className="text-sm text-gray-800 font-black hover:text-[#F98A1A]"
                  >
                    Visit website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= POPULAR COMPARISONS ================= */}
        <div className="bg-[#eaeff4] p-4 md:p-6 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] mb-12">
          <div className="flex items-center justify-between border-b border-[#d1d9e6] pb-4 mb-6 relative">
            <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute left-0">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <h3 className="text-xs md:text-sm font-black text-gray-700 uppercase tracking-widest text-center w-full">
              Which are the most popular comparisons?
            </h3>

            <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute right-0">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden snap-x">
            {popularComparisons.map((comp: any, i: number) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-[300px] bg-[#eaeff4] p-4 rounded-3xl shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] border border-[#d1d9e6] flex flex-col items-center shrink-0 snap-start cursor-pointer hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 group"
              >
                <div className="w-full flex items-center justify-between relative mb-5">
                  <div className="w-[42%] bg-white p-3 rounded-2xl border border-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] relative">
                    <div className="aspect-[1/2] relative flex items-center justify-center">
                      <Image
                        src={getImageUrl(comp?.left?.thumbnail)}
                        alt={comp?.left?.title || "Product"}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center px-2">
                    <div className="w-[2px] h-8 bg-gradient-to-b from-transparent to-gray-300"></div>
                    <div className="my-2 bg-[#eaeff4] rounded-full w-8 h-8 flex items-center justify-center shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] border border-[#d1d9e6] text-[10px] font-black text-gray-500 shrink-0">
                      VS
                    </div>
                    <div className="w-[2px] h-8 bg-gradient-to-t from-transparent to-gray-300"></div>
                  </div>

                  <div className="w-[42%] bg-white p-3 rounded-2xl border border-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] relative">
                    <div className="aspect-[1/2] relative flex items-center justify-center">
                      <Image
                        src={getImageUrl(comp?.right?.thumbnail)}
                        alt={comp?.right?.title || "Product"}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-800 w-full truncate px-2 group-hover:text-[#F98A1A] transition-colors">
                    {comp?.left?.title || "-"}
                  </p>

                  <div className="flex items-center justify-center w-full gap-3 my-2 opacity-50">
                    <div className="h-[1px] bg-gray-400 flex-1"></div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      vs
                    </span>
                    <div className="h-[1px] bg-gray-400 flex-1"></div>
                  </div>

                  <p className="text-xs font-bold text-gray-600 w-full truncate px-2">
                    {comp?.right?.title || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DETAILED FEATURE SECTION ================= */}
        <div className="relative flex gap-4 md:gap-8 mt-12 pb-10">
          <div className="hidden sm:block w-[60px] lg:w-[200px] shrink-0">
            <div className="sticky top-[180px] flex flex-col gap-3">
              {detailedSpecs.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-3 rounded-xl transition-all duration-300 border border-[#d1d9e6] overflow-hidden whitespace-nowrap ${activeSidebarTab === cat.id
                    ? "bg-[#424242] text-white shadow-md px-4 py-3 min-w-max w-full"
                    : "bg-[#eaeff4] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] w-12 h-12 justify-center"
                    }`}
                >
                  <cat.icon className="w-5 h-5 shrink-0" />
                  {activeSidebarTab === cat.id && (
                    <span className="font-bold text-sm tracking-wide px-1 whitespace-nowrap">
                      {cat.title}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8 md:gap-10">
            {detailedSpecs.map((cat: any) => {
              const scoreColor = getScoreColor(cat.score);
              const percent = (cat.score / 10) * 100;

              return (
                <div key={cat.id} id={cat.id} className="w-full scroll-mt-40">
                  <div className="border-[#d1d9e6] border-2 rounded-xl bg-[#E6E7EE] overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center px-4 py-3 border-b-2 border-[#d1d9e6]">
                      <div className="flex gap-3 items-center">
                        <cat.icon
                          className="w-5 h-5 md:w-6 md:h-6 text-[#434343]"
                          strokeWidth={2.5}
                        />
                        <span className="font-bold text-base md:text-lg text-[#434343]">
                          {cat.title}
                        </span>
                      </div>

                      <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `conic-gradient(${scoreColor} ${percent || 0
                              }%, #d1d9e6 ${percent || 0}%)`,
                          }}
                        />
                        <div className="absolute inset-[3px] rounded-full bg-[#E6E7EE] flex items-center justify-center shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
                          <span
                            className="text-[10px] md:text-xs font-bold"
                            style={{ color: scoreColor }}
                          >
                            {cat.score}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <div className="divide-y divide-[#d1d9e6]">
                        {(cat.specs || []).map((item: any, index: number) => (
                          <div
                            key={index}
                            className="grid text-xs sm:text-sm text-[#222222]"
                            style={{
                              gridTemplateColumns: `1fr repeat(${products.length}, 1fr)`,
                            }}
                          >
                            <div className="px-4 py-3 border-r border-[#d1d9e6] text-[#434343] font-medium flex items-center">
                              {item.title}
                            </div>

                            {products.map((_: any, pIdx: number) => (
                              <div
                                key={pIdx}
                                className={`px-4 py-3 text-[#333333] text-center bg-[#f0f1f6] flex items-center justify-center shadow-[inset_2px_2px_4px_#d1d9e6] ${pIdx < products.length - 1
                                  ? "border-r border-[#d1d9e6]"
                                  : ""
                                  }`}
                              >
                                {item[`param${pIdx + 1}`]}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BEST SMARTPHONES SECTION ================= */}
        <div className="bg-[#eaeff4] p-4 md:p-6 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] mb-12 mt-16">
          <div className="flex items-center justify-between border-b border-[#d1d9e6] pb-4 mb-6 relative">
            <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute left-0">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <h3 className="text-xs md:text-sm font-black text-gray-700 uppercase tracking-widest text-center w-full">
              WHICH ARE THE BEST SMARTPHONES?
            </h3>

            <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute right-0">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden snap-x">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="min-w-[160px] md:min-w-[200px] bg-[#eaeff4] p-5 rounded-3xl shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] border border-[#d1d9e6] flex flex-col items-center shrink-0 snap-start cursor-pointer hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
              >
                <div className="w-full bg-white p-4 rounded-2xl shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#f9f9f9] border border-gray-100 flex items-center justify-center relative mb-4">
                  <div className="w-24 h-32 relative flex items-center justify-center">
                    <Image
                      src="/iphone.png"
                      alt="Phone"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs font-black text-gray-800 text-center line-clamp-2">
                  Apple iPhone 17 Pro Max
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
