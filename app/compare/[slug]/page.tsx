"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { compareProducts } from "@/app/services/categoryService";

// RECHARTS IMPORTS FOR DYNAMIC GRAPH
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Helper function for mapping Image URLs properly
const getImageUrl = (path: string) => {
  if (!path) return "/iphone.png";
  if (path.startsWith("http")) return path;
  return `https://admin.compareuniverse.com/${path}`;
};

// Graph Colors for different products
const GRAPH_COLORS = ["#6366f1", "#ef4444", "#10b981", "#f59e0b"];

export default function ComparePage() {
  const params = useParams();
  const uniqueTitles = params?.slug as string;

  // API Data aur Loading State
  const [compareData, setCompareData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Tabs states
  const [activeTopTab, setActiveTopTab] = useState<string>("OVERVIEW");
  const [activeSpecTab, setActiveSpecTab] = useState<string>("");
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("");

  // API Fetch Effect
  useEffect(() => {
    const fetchComparisonData = async () => {
      if (!uniqueTitles) return;

      try {
        setIsLoading(true);
        const response: any = await compareProducts(uniqueTitles);
        setCompareData(response);

        if (response?.data?.comparedProducts?.length > 0) {
          setActiveSpecTab(response.data.comparedProducts[0]._id);

          if (response.data.comparedProducts[0].featureData?.length > 0) {
            const firstFeatureName =
              response.data.comparedProducts[0].featureData[0].featureName;
            setActiveSidebarTab(
              firstFeatureName.toLowerCase().replace(/\s+/g, "-")
            );
          }
        }
      } catch (error) {
        console.error("Failed to load comparison data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparisonData();
  }, [uniqueTitles]);

  const products = compareData?.comparedProducts || [];
  const popularComparisons = compareData?.popularComparison || [];
  const activeProduct =
    products.find((p: any) => p._id === activeSpecTab) || products[0] || {};

  // DYNAMIC GRAPH DATA EXTRACTOR
  const radarData = useMemo(() => {
    if (!products || products.length === 0) return [];

    const featureMap = new Map();

    products.forEach((product: any) => {
      (product.featureData || []).forEach((feat: any) => {
        const fname = feat.featureName || "Unknown";
        if (!featureMap.has(fname)) {
          featureMap.set(fname, { feature: fname });
        }

        let score = feat.scoreValue || 0;
        if (score === 0 && feat.subfeatures?.length > 0) {
          score = feat.subfeatures.reduce(
            (sum: number, sf: any) => sum + (sf.scoreValue || 0),
            0
          );
        }

        featureMap.get(fname)[product.title] = score;
      });
    });

    return Array.from(featureMap.values());
  }, [products]);

  // Extract unique trending products from Popular Comparisons
  const trendingProducts = useMemo(() => {
    const map = new Map();
    popularComparisons.forEach((comp: any) => {
      if (comp?.left) map.set(comp.left._id, comp.left);
      if (comp?.right) map.set(comp.right._id, comp.right);
    });
    return Array.from(map.values());
  }, [popularComparisons]);

  // Dynamic detailed specs extraction (Now using API Icons)
  const detailedSpecs = (products[0]?.featureData || []).map((feature: any) => {
    const allSubfeatureNames = new Set<string>();

    products.forEach((p: any) => {
      const pFeature = p.featureData?.find(
        (f: any) => f.featureName === feature.featureName
      );
      pFeature?.subfeatures?.forEach((sf: any) =>
        allSubfeatureNames.add(sf.name)
      );
    });

    const specs = Array.from(allSubfeatureNames).map((sfName) => {
      const row: any = { title: sfName };
      products.forEach((p: any, pIdx: number) => {
        const pFeature = p.featureData?.find(
          (f: any) => f.featureName === feature.featureName
        );
        const sf = pFeature?.subfeatures?.find((s: any) => s.name === sfName);
        row[`param${pIdx + 1}`] = sf ? sf.details || sf.unit || "-" : "-";
      });
      return row;
    });

    return {
      id: feature.featureName.toLowerCase().replace(/\s+/g, "-"),
      title: feature.featureName,
      iconUrl: feature.icon, // API Icon
      score: feature.scoreValue || 0,
      specs: specs,
    };
  });

  // Topbar scroll logic
  const scrollToTopSection = (tabName: string) => {
    setActiveTopTab(tabName);
    let targetId = "";

    if (tabName === "OVERVIEW") targetId = "overview-section";
    if (tabName === "PRICES") targetId = "graph-section";
    if (tabName === "SPECS") targetId = "specs-section";

    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -200;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Specs Sidebar Scroll
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
        document.getElementById(cat.id)
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

      if (currentActive !== activeSidebarTab && currentActive) {
        setActiveSidebarTab(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSidebarTab, detailedSpecs]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#eaeff4] flex items-center justify-center">
        <p className="text-gray-500 font-bold text-xl animate-pulse">
          Loading Comparison...
        </p>
      </div>
    );
  }

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
        <div className="sticky top-[64px] md:top-[72px] z-40 bg-[#e6e7ee] p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-[#d1d9e6] shadow-[6px_6px_12px_#b8c4d2,-6px_-6px_12px_#ffffff] mb-4 flex justify-between items-start">
          <div className="w-full">
            <div className="text-[10px] md:text-[12px] font-medium text-gray-500 mb-1 md:mb-2 flex items-center gap-1 md:gap-2 flex-wrap">
              <Link href="/" className="hover:text-[#F98A1A] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link
                href={`/categories/${products[0]?.subCategoryId?.uniqueName || ""
                  }`}
                className="hover:text-[#F98A1A] transition-colors"
              >
                {products[0]?.subCategoryId?.name || ""}
              </Link>
              <span>&gt;</span>
              <span className="text-gray-700 font-bold truncate">
                {products.map((p: any) => p.title).join(" vs ")}
              </span>
            </div>

            <h1 className="text-lg md:text-2xl font-black text-[#2d3748] tracking-tight truncate w-[90%]">
              {products.map((p: any) => p.title).join(" vs ")}
            </h1>

            <div className="flex overflow-x-auto gap-2 mt-2 md:mt-3 pb-1 [&::-webkit-scrollbar]:hidden">
              {["OVERVIEW", "PRICES", "SPECS"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToTopSection(tab)}
                  className={`px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-wider transition-all border border-[#d1d9e6] cursor-pointer ${activeTopTab === tab
                    ? "bg-[#eaeff4] shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] text-[#F98A1A]"
                    : "bg-[#eaeff4] shadow-[3px_3px_6px_#b8c4d2,-3px_-3px_6px_#ffffff] text-gray-500 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,-3px_-3px_6px_#ffffff] flex items-center justify-center text-gray-600 hover:text-black hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all">
            <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        {/* HERO GRID (OVERVIEW) */}
        <div
          id="overview-section"
          className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full mb-16 md:mb-20 pt-4"
        >
          {products.map((prod: any, index: number) => {
            return (
              <React.Fragment key={prod._id}>
                {index > 0 && (
                  <div className="flex lg:flex-col items-center justify-center w-full lg:w-auto my-4 lg:my-0 z-10">
                    <div className="h-[2px] w-full lg:w-[2px] lg:h-10 bg-gradient-to-r lg:bg-gradient-to-b from-transparent to-gray-300"></div>
                    <div className="mx-3 lg:mx-0 lg:my-3 w-12 h-12 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center font-black text-gray-500 text-sm shrink-0">
                      VS
                    </div>
                    <div className="h-[2px] w-full lg:w-[2px] lg:h-10 bg-gradient-to-l lg:bg-gradient-to-t from-transparent to-gray-300"></div>
                  </div>
                )}

                <div
                  className="w-full bg-[#eaeff4] p-4 md:p-5 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] flex flex-col items-center relative"
                  style={{ width: `${100 / products.length - 2}%` }}
                >
                  <h2 className="text-xl font-black text-[#2d3748] mb-4 text-center line-clamp-2">
                    {prod.title}
                  </h2>

                  <div className="relative w-full max-w-[240px] aspect-[3/4] bg-white rounded-[24px] border border-gray-100 shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#f9f9f9] p-3 flex items-center justify-center mb-4">
                    <Image
                      src={getImageUrl(prod.thumbnail || prod.image?.[0])}
                      alt={prod.title}
                      fill
                      className="object-contain p-1 drop-shadow-md"
                    />
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
              </React.Fragment>
            );
          })}
        </div>

        {/* 200 FACTS & RADAR SECTION (PRICES / GRAPH) */}
        <div id="graph-section" className="pt-4">
          <div className="text-center mb-6">
            <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.2em] mb-2">
              200 Facts In Comparison
            </p>
            <h3 className="text-2xl font-black text-[#2d3748]">
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

          <div className="bg-[#eaeff4] p-4 md:p-6 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] mb-8">
            {/* TABS WITH DYNAMIC COLORS */}
            <div className="flex gap-3 border-b border-[#d1d9e6] pb-3 mb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {products.map((prod: any, idx: number) => {
                const isActive = activeSpecTab === prod._id;
                const prodColor = GRAPH_COLORS[idx % GRAPH_COLORS.length];

                return (
                  <button
                    key={prod._id}
                    onClick={() => setActiveSpecTab(prod._id)}
                    className={`px-5 py-1.5 rounded-xl text-sm font-bold transition-all border whitespace-nowrap cursor-pointer ${isActive
                      ? "bg-[#eaeff4] shadow-[inset_3px_3px_6px_#b8c4d2,inset_-3px_-3px_6px_#ffffff]"
                      : "bg-[#eaeff4] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] border-[#d1d9e6] text-gray-500 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    style={{
                      borderColor: isActive ? prodColor : "",
                      color: isActive ? prodColor : "",
                    }}
                  >
                    {prod.title}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* DYNAMIC RADAR CHART USING RECHARTS */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-between">
                <div className="relative w-full max-w-[260px] md:max-w-[320px] aspect-square flex items-center justify-center mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      data={radarData}
                    >
                      <PolarGrid stroke="#b8c4d2" />
                      <PolarAngleAxis
                        dataKey="feature"
                        tick={{
                          fill: "#6b7280",
                          fontSize: 11,
                          fontWeight: "bold",
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, "auto"]}
                        tick={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #d1d9e6",
                          backgroundColor: "#eaeff4",
                          boxShadow:
                            "4px 4px 10px #b8c4d2, -4px -4px 10px #ffffff",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          paddingTop: "8px",
                        }}
                      />

                      {products
                        .map((p: any, idx: number) => ({ p, idx }))
                        .sort((a: any, b: any) => {
                          if (a.p._id === activeSpecTab) return 1;
                          if (b.p._id === activeSpecTab) return -1;
                          return a.idx - b.idx;
                        })
                        .map(({ p, idx }: { p: any; idx: number }) => {
                          const isActive = activeSpecTab === p._id;
                          return (
                            <Radar
                              key={p._id}
                              name={p.title}
                              dataKey={p.title}
                              stroke={GRAPH_COLORS[idx % GRAPH_COLORS.length]}
                              fill={GRAPH_COLORS[idx % GRAPH_COLORS.length]}
                              fillOpacity={isActive ? 0.8 : 0.4}
                              strokeWidth={isActive ? 3 : 2}
                            />
                          );
                        })}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* DYNAMIC ICONS UNDER RADAR */}
                <div className="w-full bg-[#eaeff4] rounded-2xl p-3 border border-[#d1d9e6] shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#ffffff]">
                  <div className="flex justify-center flex-wrap gap-3 md:gap-5 mb-2">
                    {(products[0]?.featureData || []).map(
                      (feat: any, i: number) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center justify-center hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all"
                          title={feat.featureName}
                        >
                          <img
                            src={getImageUrl(feat.icon)}
                            alt={feat.featureName}
                            className="w-4 h-4 opacity-70"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="text-center border-t border-[#d1d9e6] pt-2">
                    <span className="text-sm font-bold text-gray-600">
                      {activeProduct?.scoreValue || 0} points
                    </span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC KEY SPECS */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h3 className="text-lg font-black text-gray-700 mb-3">
                  Key Specs
                </h3>
                <div className="flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-4">
                    {(activeProduct?.featureData || [])
                      .slice(0, 6)
                      .map((feat: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#eaeff4] p-2 rounded-2xl border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] flex items-center gap-2"
                          >
                            <div className="w-8 h-8 rounded-xl bg-[#eaeff4] shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] flex flex-shrink-0 items-center justify-center text-gray-700">
                              <img
                                src={getImageUrl(feat.icon)}
                                alt={feat.featureName}
                                className="w-4 h-4 opacity-70"
                              />
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

                {/* BOTTOM KEY INFO (Company, Review, Link) */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#d1d9e6] pt-3">
                  <div>
                    <p className="text-[11px] text-gray-500 font-bold mb-1">
                      Brand
                    </p>
                    <p className="text-sm text-gray-800 font-black truncate">
                      {activeProduct?.productCompany || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-bold mb-1">
                      Review Status
                    </p>
                    <p className="text-sm text-gray-800 font-black truncate max-w-[100px]">
                      {activeProduct?.productReviewTitle || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-bold mb-1">
                      Official website
                    </p>
                    <Link
                      href={activeProduct?.affiliateLink || "#"}
                      target="_blank"
                      className="text-sm text-[#F98A1A] font-black hover:underline truncate block"
                    >
                      Visit website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR COMPARISONS */}
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

        {/* DETAILED FEATURE SECTION (SPECS) */}
        <div
          id="specs-section"
          className="relative flex gap-4 md:gap-8 mt-12 pb-10 pt-4"
        >
          <div className="hidden sm:block w-[60px] lg:w-[200px] shrink-0">
            <div className="sticky top-[180px] flex flex-col gap-3">
              {detailedSpecs.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-3 rounded-xl transition-all duration-300 border border-[#d1d9e6] overflow-hidden whitespace-nowrap cursor-pointer ${activeSidebarTab === cat.id
                    ? "bg-[#424242] text-white shadow-md px-4 py-3 min-w-max w-full"
                    : "bg-[#eaeff4] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] w-12 h-12 justify-center"
                    }`}
                >
                  <img
                    src={getImageUrl(cat.iconUrl)}
                    alt={cat.title}
                    className={`w-5 h-5 shrink-0 ${activeSidebarTab === cat.id ? "brightness-0 invert" : ""
                      }`}
                  />
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
                        <img
                          src={getImageUrl(cat.iconUrl)}
                          alt={cat.title}
                          className="w-5 h-5 md:w-6 md:h-6 opacity-70"
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

        {/* TRENDING SMARTPHONES SECTION (DYNAMIC) */}
        {trendingProducts.length > 0 && (
          <div className="bg-[#eaeff4] p-4 md:p-6 rounded-[2rem] border border-[#d1d9e6] shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] mb-12 mt-16">
            <div className="flex items-center justify-between border-b border-[#d1d9e6] pb-4 mb-6 relative">
              <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute left-0">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <h3 className="text-xs md:text-sm font-black text-gray-700 uppercase tracking-widest text-center w-full">
                TRENDING SMARTPHONES
              </h3>

              <button className="w-8 h-8 rounded-full bg-[#eaeff4] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-600 hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all absolute right-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden snap-x">
              {trendingProducts.map((item: any, i: number) => (
                <div
                  key={i}
                  className="min-w-[160px] md:min-w-[200px] bg-[#eaeff4] p-5 rounded-3xl shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] border border-[#d1d9e6] flex flex-col items-center shrink-0 snap-start cursor-pointer hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
                >
                  <div className="w-full bg-white p-4 rounded-2xl shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#f9f9f9] border border-gray-100 flex items-center justify-center relative mb-4">
                    <div className="w-24 h-32 relative flex items-center justify-center">
                      <Image
                        src={getImageUrl(item.thumbnail)}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-xs font-black text-gray-800 text-center line-clamp-2">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}