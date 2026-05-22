"use client";

import { useParams, useRouter } from "next/navigation";
import { PRODUCTS, CATEGORIES, Product, Category, SpecMetadata } from "../../data/products";
import Navbar from "../../components/Navbar";
import CircularScore from "../../components/CircularScore";
import { ArrowLeft, Check, AlertCircle, HelpCircle, Sparkles, Award } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "";

  // Split slug by "-vs-" to get compared product titles
  const productTitles = slug.split("-vs-");

  // Fetch product objects
  const comparedProducts: Product[] = productTitles
    .map((title) => PRODUCTS.find((p) => p.uniqueTitle === title))
    .filter((p): p is Product => p !== undefined);

  if (comparedProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-20">
        <Navbar />
        <div className="max-w-[800px] mx-auto px-6 text-center mt-20">
          <div className="p-8 rounded-2xl bg-[#e6e7ee] shadow-soft border border-[#d1d9e6] flex flex-col items-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-black text-[#313842]">Products Not Found</h2>
            <p className="text-sm text-gray-500 mt-2">
              We couldn't find any products matching those names in our database.
            </p>
            <Link href="/" className="mt-6 px-6 py-2.5 btn-neomorphic text-sm font-bold uppercase tracking-wider">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Get the category metadata (all compared products must belong to the same category)
  const categoryName = comparedProducts[0]?.category;
  const categoryMeta = CATEGORIES.find((c) => c.uniqueName === categoryName);

  // Helper to determine the winner of a specific numerical specification
  const getWinnerInfo = (spec: SpecMetadata, products: Product[]) => {
    let winningValue = spec.higherIsBetter ? -Infinity : Infinity;
    let winnerIds: string[] = [];

    // Find the extreme value
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
    <main className="min-h-screen bg-[#e6e7ee] pt-[90px] pb-20 select-none">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        
        {/* Navigation back and header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider btn-neomorphic"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-[#313842]" /> Back to Dashboard
          </button>
          <span className="text-xs uppercase font-extrabold text-[#F98A1A] tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {categoryMeta?.name || "Comparison"}
          </span>
        </div>

        {/* Head-to-Head Header Section */}
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6 mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#313842] text-center mb-8 leading-tight">
            {comparedProducts.map((p) => p.title).join(" vs ")}
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
            {comparedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-1 rounded-2xl border border-[#d1d9e6] bg-[#e6e7ee] p-5 shadow-inset relative flex flex-col justify-between"
              >
                <div>
                  {/* Rating circular widget */}
                  <div className="absolute top-4 left-4">
                    <CircularScore value={product.scoreValue} />
                  </div>

                  {/* Brand & Thumbnail */}
                  <div className="flex flex-col items-center mt-6">
                    <div className="h-20 w-20 text-5xl flex items-center justify-center bg-[#e6e7ee] rounded-2xl shadow-soft border border-[#d1d9e6] mb-3">
                      {product.thumbnail}
                    </div>
                    <span className="text-[10px] bg-[#F98A1A]/10 text-[#F98A1A] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-[#F98A1A]/20">
                      {product.brand}
                    </span>
                    <h3 className="text-lg font-black text-[#313842] mt-2 text-center leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed max-w-[280px]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pros List */}
                <div className="mt-6 pt-5 border-t border-[#d1d9e6]">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 justify-center">
                    <Award className="h-4 w-4 text-[#F98A1A]" /> Top Strengths
                  </h4>
                  <ul className="space-y-2">
                    {product.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed text-left">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Spec Breakdown Section */}
        {categoryMeta && (
          <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6">
            <h2 className="text-lg sm:text-xl font-black text-[#313842] border-b border-gray-300 pb-3 mb-6 flex items-center gap-2">
              📊 Technical Specifications
            </h2>

            <div className="space-y-8">
              {categoryMeta.specs.map((spec) => {
                const { winnerIds } = getWinnerInfo(spec, comparedProducts);
                const maxVal = getMaxSpecValue(spec.key, comparedProducts);

                return (
                  <div
                    key={spec.key}
                    className="p-5 rounded-2xl bg-[#e6e7ee] shadow-inset border border-[#d1d9e6] flex flex-col gap-4"
                  >
                    {/* Spec Label */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider border-b border-gray-300 pb-2">
                      <span>{spec.label}</span>
                      <span className="text-[10px] text-gray-400 lowercase font-medium">({spec.unit.trim() || "unit"})</span>
                    </div>

                    {/* Products Grid comparing values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {comparedProducts.map((product) => {
                        const val = product.specs[spec.key];
                        const isWinner = winnerIds.includes(product.id);
                        
                        // Calculate percentage of progress bar
                        const percent = typeof val === "number" ? Math.min(100, (val / maxVal) * 100) : 0;

                        return (
                          <div key={product.id} className="flex flex-col justify-between">
                            <div className="flex justify-between items-end mb-1">
                              <span className="text-xs font-black text-[#313842] truncate max-w-[140px]">
                                {product.title}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-sm sm:text-base font-black ${isWinner ? "text-[#F98A1A]" : "text-gray-500"}`}>
                                  {val}
                                  {spec.unit}
                                </span>
                                {isWinner && typeof val === "number" && (
                                  <span className="text-[9px] bg-orange-500/10 text-[#F98A1A] font-extrabold px-1.5 py-0.5 rounded border border-[#F98A1A]/20 uppercase">
                                    Win
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Spec horizontal Bar Gauge */}
                            {typeof val === "number" ? (
                              <div className="w-full h-3 rounded-full bg-[#e6e7ee] shadow-[inset_1px_1px_2px_#b8c4d2,_inset_-1px_-1px_2px_#ffffff] p-[1.5px] border border-[#d1d9e6]">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isWinner
                                      ? "bg-[#F98A1A] shadow-[0px_0px_6px_rgba(249,138,26,0.3)]"
                                      : "bg-gray-400"
                                  }`}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 font-bold bg-[#e6e7ee] p-2 rounded-lg border border-[#d1d9e6] shadow-[inset_1.5px_1.5px_3px_#b8c4d2,_inset_-1.5px_-1.5px_3px_#ffffff] text-center">
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
        )}

      </div>
    </main>
  );
}
