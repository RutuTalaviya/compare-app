"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Plus, X, ArrowRight, BookOpen, Sparkles, Loader2 } from "lucide-react";
import Footer from "./components/Footer";
import BlogPage from "./blog/page";
import { getCategories, getSubCategoryWiseProducts } from "./services/categoryService";
import SimpleHeader from "./components/SimpleHeader";
import DefaultPage from "./components/DefaultPage";

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [showDefaultPage, setShowDefaultPage] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  // UPDATED: Changed from 3 slots to 4 slots
  const slots = [1, 2, 3, 4];

  const fetchRandomProductsForOnboarding = async (allCats: any[]) => {
    try {
      setLoadingProducts(true);
      const selectedCatNames = JSON.parse(localStorage.getItem("selectedCategories") || "[]");
      if (selectedCatNames.length === 0) return;

      const matchedCats = allCats.filter(cat => selectedCatNames.includes(cat.name));
      const subCategoryNames: string[] = [];
      matchedCats.forEach(cat => {
        if (cat.subCategory && cat.subCategory.length > 0) {
          cat.subCategory.forEach((sub: any) => {
            subCategoryNames.push(sub.uniqueName);
          });
        }
      });

      let fetchedProducts: any[] = [];

      if (subCategoryNames.length > 0) {
        const fetchPromises = subCategoryNames.map(name => getSubCategoryWiseProducts(name));
        const results = await Promise.all(fetchPromises);
        results.forEach(res => {
          if (Array.isArray(res)) {
            fetchedProducts = [...fetchedProducts, ...res];
          }
        });
      }

      // If we didn't get enough products, fallback to querying other categories/subcategories
      if (fetchedProducts.length < 4) {
        const allSubCats: string[] = [];
        allCats.forEach(cat => {
          if (cat.subCategory) {
            cat.subCategory.forEach((sub: any) => {
              if (!subCategoryNames.includes(sub.uniqueName)) {
                allSubCats.push(sub.uniqueName);
              }
            });
          }
        });

        if (allSubCats.length > 0) {
          const fallbackPromises = allSubCats.map(name => getSubCategoryWiseProducts(name));
          const fallbackResults = await Promise.all(fallbackPromises);
          fallbackResults.forEach(res => {
            if (Array.isArray(res)) {
              fetchedProducts = [...fetchedProducts, ...res];
            }
          });
        }
      }

      if (fetchedProducts.length > 0) {
        const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 1);
        setCompareList(selected);
        localStorage.setItem("quickCompareList", JSON.stringify(selected));
      }
    } catch (error) {
      console.error("Error fetching random products for onboarding:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response: any = await getCategories();

      console.log("Categories:", response);
      const allCats = response?.data || [];
      setCategories(allCats);

      // Check if quickCompareList exists, otherwise load random onboarding products
      const hasVisited = localStorage.getItem("hasVisitedHomePage");
      const storedCompare = localStorage.getItem("quickCompareList");
      if (hasVisited && !storedCompare) {
        await fetchRandomProductsForOnboarding(allCats);
      }
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();

    // Check onboarding visit state in localStorage
    try {
      const hasVisited = localStorage.getItem("hasVisitedHomePage");
      if (!hasVisited) {
        setShowDefaultPage(true);
      } else {
        setShowDefaultPage(false);
      }

      const storedCompare = localStorage.getItem("quickCompareList");
      if (storedCompare) {
        setCompareList(JSON.parse(storedCompare));
      }
    } catch (error) {
      // Fallback to onboarding if localStorage is not accessible
      setShowDefaultPage(true);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return (
      <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-0 select-none flex flex-col justify-between">
        <SimpleHeader />
        <div className="flex flex-col items-center justify-center flex-grow py-20 gap-3">
          <Loader2 className="h-10 w-10 text-[#F98A1A] animate-spin" />
          <span className="text-sm font-bold text-gray-500">Initializing Comparison Hub...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (showDefaultPage) {
    return (
      <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-0 select-none flex flex-col justify-between">
        <SimpleHeader />
        <DefaultPage />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-0 select-none">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Banner advertisement layout */}
        <div className="mb-12 w-full">
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
        <div id="quick-compare" className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft overflow-hidden">
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
                const product = compareList[idx];
                const hasProduct = !!product;

                const getProductImage = (prod: any) => {
                  if (!prod) return "/iphone.png";
                  if (prod.image?.[0]?.startsWith("http")) return prod.image[0];
                  return `https://admin.compareuniverse.com/${prod.thumbnail || prod.image?.[0] || ""}`;
                };

                const handleRemoveSlot = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const updated = [...compareList];
                  updated.splice(idx, 1);
                  setCompareList(updated);
                  localStorage.setItem("quickCompareList", JSON.stringify(updated));
                };

                const radius = 24;
                const circumference = 2 * Math.PI * radius;
                const progress = product ? Math.min((product.scoreValue || 0) / 100, 1) : 0;
                const strokeDashoffset = circumference - progress * circumference;

                return (
                  <div
                    key={idx}
                    className="w-full sm:w-[calc(50%-10px)] xl:w-[24%] max-w-[420px] flex-shrink-0 flex flex-col xl:flex-row items-center justify-center relative"
                  >
                    {/* SLOT CARD */}
                    {hasProduct ? (
                      <div
                        className="w-full min-h-[340px] sm:min-h-[360px] xl:h-[380px] rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] flex flex-col p-4 sm:p-5 relative transition-all duration-300 shadow-soft hover:shadow-[8px_8px_18px_#b8c4d2,_-8px_-8px_18px_#ffffff]"
                      >
                        {/* SCORE BADGE */}
                        <div className="absolute -top-4 -left-4 z-20">
                          <div className="w-14 h-14 bg-[#e6e7ee] rounded-full border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] flex flex-col items-center justify-center relative">
                            <svg height="56" width="56" className="absolute">
                              <circle
                                stroke="#d1d9e6"
                                fill="transparent"
                                strokeWidth={3.5}
                                r={radius}
                                cx={28}
                                cy={28}
                              />
                              <circle
                                stroke="#F98A1A"
                                fill="transparent"
                                strokeWidth={3.5}
                                strokeLinecap="round"
                                r={radius}
                                cx={28}
                                cy={28}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                transform="rotate(-90 28 28)"
                              />
                            </svg>
                            <span className="text-xs font-black text-[#F98A1A] leading-none z-10">
                              {product.scoreValue}
                            </span>
                            <span className="text-[8px] font-bold uppercase text-gray-500 z-10">
                              Points
                            </span>
                          </div>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          onClick={handleRemoveSlot}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full border border-[#d1d9e6] bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300 z-20"
                        >
                          <X size={16} />
                        </button>

                        {/* PRODUCT IMAGE */}
                        <div className="mt-4 bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] h-[150px] sm:h-[160px] xl:h-[170px] flex items-center justify-center overflow-hidden p-2">
                          <img
                            src={getProductImage(product)}
                            alt={product.title}
                            className="object-contain h-full w-auto max-h-full"
                          />
                        </div>

                        {/* TITLE */}
                        <h4 className="text-sm font-black text-[#313842] mt-3 leading-snug min-h-[40px] line-clamp-2">
                          {product.title}
                        </h4>

                        {/* PRICE */}
                        <p className="text-xs font-black text-[#F98A1A] mt-1">
                          {product.currency}{product.price?.toLocaleString("en-IN")}
                        </p>

                        {/* SPECS/FEATURES SUMMARY */}
                        {product.subfeatureData && product.subfeatureData.length > 0 ? (
                          <div className="mt-auto pt-2 grid grid-cols-2 gap-1.5 text-[10px] text-[#555f6e] font-semibold w-full">
                            {product.subfeatureData.slice(0, 4).map((feat: any, fIdx: number) => (
                              <div key={fIdx} className="bg-[#e6e7ee] rounded-lg border border-[#d1d9e6] shadow-[inset_1.5px_1.5px_3px_#b8c4d2,_inset_-1.5px_-1.5px_3px_#ffffff] px-2 py-1 truncate text-center">
                                {feat.unit || feat.details || "-"}
                              </div>
                            ))}
                          </div>
                        ) : product.featureData && product.featureData.length > 0 ? (
                          <div className="mt-auto pt-2 grid grid-cols-2 gap-1.5 text-[10px] text-[#555f6e] font-semibold w-full">
                            {product.featureData.slice(0, 4).map((feat: any, fIdx: number) => (
                              <div key={fIdx} className="bg-[#e6e7ee] rounded-lg border border-[#d1d9e6] shadow-[inset_1.5px_1.5px_3px_#b8c4d2,_inset_-1.5px_-1.5px_3px_#ffffff] px-2 py-1 truncate text-center">
                                {feat.featureId?.unit || "-"}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div
                        onClick={() => router.push("/quick-compare")}
                        className="w-full min-h-[340px] sm:min-h-[360px] xl:h-[380px] rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] flex flex-col items-center justify-center p-4 sm:p-6 relative transition-all duration-300 shadow-inset hover:shadow-soft cursor-pointer group"
                      >
                        {/* EMPTY SLOT */}
                        <div className="h-16 w-16 rounded-full bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] group-hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center border border-[#d1d9e6] transition-shadow duration-300">
                          <Plus className="h-7 w-7 text-[#F98A1A]" />
                        </div>
                        <span className="text-xs text-gray-400 font-bold mt-4 group-hover:text-[#F98A1A] transition-colors">
                          Add Product
                        </span>
                      </div>
                    )}

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
            <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
              {compareList.length >= 2 && (
                <button
                  onClick={() => {
                    const slug = compareList.map((item) => item.uniqueTitle).join(",");
                    router.push(`/compare/${slug}`);
                  }}
                  className="px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 bg-[#F98A1A] text-white shadow-soft hover:bg-[#e0740d] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] cursor-pointer"
                >
                  Compare Now ({compareList.length})
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          {/* Categories Quick Filter Pill Buttons */}
          <div className="my-10 border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-5 px-6">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-5">
              <h3 className="text-base sm:text-lg font-black text-[#313842] flex items-center gap-2">
                📂 Categories
              </h3>

              <button
                onClick={() => router.push("/categories")}
                className="px-4 py-2 text-xs font-black text-[#F98A1A] bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] transition-all duration-300 uppercase tracking-wider cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => router.push(`/categories`)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#313842] bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] transition-all duration-300 cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog / Articles Section */}
          <div className="my-10">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-6">
              <h3 className="text-base sm:text-lg font-black text-[#313842] flex items-center gap-2">
                📰 Blogs & Articles
              </h3>
            </div>
            <BlogPage showBreadcrumb={false} isInline={true} limit={16} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}