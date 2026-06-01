"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { imageUrl } from "../config";
import Footer from "../components/Footer";

interface SubCategory {
  _id: string;
  name: string;
  uniqueName: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  sIcon: string;
  bIcon: string;
  createdAt: string;
  updatedAt: string;
  subCategory: SubCategory[];
}

export default function CategoriesPage() {
  // Category state
  const [categories, setCategories] = useState<Category[]>([]);

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);

  //  Fetch categories

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      if (response?.status) {
        setCategories((response as any).data || []);
      }
    } catch (error) {
      console.log("Category fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial API call
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#e8edf2] flex flex-col font-sans">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 px-5 lg:px-8 w-full max-w-[1400px] mx-auto">
        {/* Main Container */}
        <div className="bg-[#e8edf2] rounded-xl p-5 md:p-10 shadow-[inset_6px_6px_12px_#cfd6e0,inset_-6px_-6px_12px_#ffffff] border border-white/40">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[15px] mb-10 pb-4 border-b border-[#cfd6e0] shadow-[0_1px_0_#ffffff]">
            <Link
              href="/"
              className="text-gray-500 hover:text-black transition-colors"
            >
              Home
            </Link>

            <span className="text-gray-400">/</span>

            <span className="font-semibold text-black">Categories</span>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-8">
            {/* Loading Skeleton */}
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[230px] rounded-2xl animate-pulse bg-[#dfe5eb]"
                />
              ))}

            {/* Dynamic Categories */}
            {!loading &&
              categories.map((category) => (
                <div key={category._id} className="relative pt-8">
                  {/* Outer Card */}
                  <div className="bg-[#e8edf2] rounded-2xl p-2.5 shadow-[6px_6px_12px_#cfd6e0,-6px_-6px_12px_#ffffff] border border-white/60">
                    {/* Top Section */}
                    <div className="bg-[#e8edf2] h-[110px] rounded-t-xl shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] flex items-center justify-end px-5 mb-2.5">
                      <h3 className="text-[17px] font-medium text-[#1a1a1a] text-right">
                        {category.name}
                      </h3>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-[#e8edf2] min-h-[80px] rounded-b-xl shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] flex items-center px-4 py-3">
                      {category.subCategory.length > 0 ? (
                        <div className="flex flex-col gap-2 w-full">
                          {category.subCategory.map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/categories/${sub.uniqueName}`}
                              className="bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] rounded-full px-4 py-2 text-sm text-gray-700 border border-white/40 font-medium hover:bg-gray-200 transition-all text-center"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>) : (
                        <span className="text-gray-400 italic text-[14px] px-2">
                          No subcategories available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Icon */}
                  <div className="absolute top-0 left-6 w-[75px] h-[75px] rounded-full bg-[#e8edf2] shadow-[6px_6px_12px_#cfd6e0,-6px_-6px_12px_#ffffff] border border-white/70 flex items-center justify-center z-10 overflow-hidden">
                    {category?.sIcon ? (
                      <Image
                        src={`${imageUrl}${category.sIcon}`}
                        alt={category.name}
                        width={45}
                        height={45}
                        className="object-contain"
                      />
                    ) : (
                      <Home className="w-8 h-8 text-[#547980]" />
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Empty State */}
          {!loading && categories.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No categories found
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
