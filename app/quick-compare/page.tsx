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
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getCategories,
  getSubCategoryWiseProducts,
} from "../services/categoryService";

// ---------------- TYPES ----------------

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
  scoreValue: number;
  image: string[];
  thumbnail: string;
  featureData: FeatureData[];
  price: number;
  currency: string;
}

// ---------------- COMPONENT ----------------

export default function QuickCompare() {
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

  const handleAddToCompare = (product: Product) => {
    const alreadyExists = compareList.find((item) => item._id === product._id);

    if (alreadyExists) return;

    setCompareList((prev) => [...prev, product]);
  };

  const handleRemoveFromCompare = (id: string) => {
    const updatedList = compareList.filter((item) => item._id !== id);

    setCompareList(updatedList);
  };
  // ---------------- FETCH CATEGORY ----------------

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      console.log("CATEGORY RESPONSE :", response);

      // axios response
      const categoryData = response?.data || [];

      setCategories(categoryData);

      // FIRST CATEGORY SELECT
      if (categoryData.length > 0) {
        const firstCategory = categoryData[0];

        setSelectedCategory(firstCategory);

        // FIRST SUBCATEGORY SELECT
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

  // ---------------- FETCH PRODUCTS ----------------

  const fetchProducts = async (uniqueName: string) => {
    try {
      setLoading(true);

      const response = await getSubCategoryWiseProducts(uniqueName);

      console.log("PRODUCT RESPONSE :", response);

      // IMPORTANT FIX
      setProducts(response || []);
      console.log("PRODUCT RESPONSE :", response);
      console.log("PRODUCT RESPONSE DATA :", response.data);
    } catch (error) {
      console.log("PRODUCT ERROR :", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item._id !== id));
  };
  // ---------------- CATEGORY CLICK ----------------

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);

    setProducts([]);

    // AUTO SELECT FIRST SUB CATEGORY
    if (category.subCategory?.length > 0) {
      const firstSubCategory = category.subCategory[0];

      setSelectedSubCategory(firstSubCategory);

      fetchProducts(firstSubCategory.uniqueName);
    } else {
      setSelectedSubCategory(null);
    }
  };

  // ---------------- SUB CATEGORY CLICK ----------------

  const handleSubCategoryClick = (sub: SubCategory) => {
    setSelectedSubCategory(sub);

    fetchProducts(sub.uniqueName);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#eef0f5] pt-[85px] sm:pt-[95px] lg:pt-[105px] pb-32">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* MAIN WRAPPER */}
          <div className="border border-[#d5d9e3] bg-[#eef0f5] shadow-sm overflow-hidden">
            {/* BREADCRUMB */}
            <div className="h-auto min-h-[65px] border-b border-[#d5d9e3] flex flex-wrap items-center gap-3 px-4 sm:px-7">
              <div className="flex items-center gap-3 text-[15px]">
                <Home size={15} className="text-[#7b8190]" />

                <span className="text-[#7b8190] font-medium">Home</span>

                <span className="text-[#9ea5b3]">/</span>

                <span className="font-semibold text-black">Quick Compare</span>
              </div>
            </div>

            {/* CATEGORY */}
            <div className="border-b border-[#d5d9e3] px-4 sm:px-5 py-3 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    px-6 py-2.5 rounded-full text-[15px]
                    transition-all duration-300
                    border border-[#e7e9ef]
                    ${
                      selectedCategory?._id === category._id
                        ? "bg-white text-black shadow-[4px_4px_10px_#cfd3dc,-4px_-4px_10px_#ffffff]"
                        : "bg-[#eef0f5] text-[#535b6b] shadow-[4px_4px_10px_#cfd3dc,-4px_-4px_10px_#ffffff]"
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* SUB CATEGORY */}
            <div className="border-b border-[#d5d9e3] px-4 sm:px-5 py-3 flex flex-wrap gap-3">
              {selectedCategory?.subCategory?.length ? (
                selectedCategory.subCategory.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() => handleSubCategoryClick(sub)}
                    className={`
                      px-6 py-2.5 rounded-full text-[15px]
                      transition-all duration-300
                      border border-[#e7e9ef]
                      ${
                        selectedSubCategory?._id === sub._id
                          ? "bg-white text-black shadow-[4px_4px_10px_#cfd3dc,-4px_-4px_10px_#ffffff]"
                          : "bg-[#eef0f5] text-[#535b6b] shadow-[4px_4px_10px_#cfd3dc,-4px_-4px_10px_#ffffff]"
                      }
                    `}
                  >
                    {sub.name}
                  </button>
                ))
              ) : (
                <p className="text-[#7b8190] text-sm">
                  No sub categories found
                </p>
              )}
            </div>

            {/* PRODUCTS */}
            <div className="p-4 sm:p-5 lg:p-7">
              {loading ? (
                <div className="text-center py-20 text-lg font-semibold">
                  Loading...
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {products.map((product) => {
                    const features = product.featureData || [];

                    return (
                      <div
                        key={product._id}
                        className="
                          relative
                          rounded-[18px]
                          border border-[#d9dde7]
                          bg-[#eef0f5]
                          p-4
                          shadow-[6px_6px_15px_#cfd3dc,-6px_-6px_15px_#ffffff]
                        "
                      >
                        {/* POINTS */}
                        <div className="absolute top-3 left-3 z-20">
                          <div className="relative w-[72px] h-[72px] rounded-full bg-white flex flex-col items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[5px] border-[#f7901d]" />

                            <span className="text-[18px] font-black leading-none">
                              {product.scoreValue}
                            </span>

                            <span className="text-[11px] font-bold text-black">
                              Points
                            </span>
                          </div>
                        </div>

                        {/* PLUS */}
                        <button
                          onClick={() =>
                            compareList.some((p) => p._id === product._id)
                              ? handleRemoveCompare(product._id)
                              : handleAddCompare(product)
                          }
                          className="
                          absolute
                          top-4
                          right-4
                          w-12
                          h-12
                          rounded-full
                          bg-[#eef0f5]
                          shadow-[4px_4px_10px_#cfd3dc,-4px_-4px_10px_#ffffff]
                          flex
                          items-center
                          justify-center
                          transition-all
                        "
                        >
                          {compareList.some((p) => p._id === product._id) ? (
                            <X size={24} className="text-red-500" />
                          ) : (
                            <Plus size={28} strokeWidth={2.4} />
                          )}
                        </button>
                        {/* IMAGE */}
                        <div
                          className="
                            mt-5
                            bg-white
                            rounded-md
                            h-[260px]
                            sm:h-[300px]
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                          "
                        >
                          <Image
                            src={
                              product.image?.[0]?.startsWith("http")
                                ? product.image[0]
                                : `https://admin.compareuniverse.com/${product.thumbnail}`
                            }
                            alt={product.title}
                            width={300}
                            height={300}
                            className="object-contain h-full w-auto"
                          />
                        </div>

                        {/* TITLE */}
                        <h2
                          className="
                            text-[20px]
                            sm:text-[21px]
                            font-semibold
                            text-black
                            mt-5
                            leading-[1.35]
                            min-h-[60px]
                          "
                        >
                          {product.title}
                        </h2>

                        {/* LINE */}
                        <div className="w-full h-[1px] bg-[#d8dde8] my-4" />

                        {/* SPECS */}
                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                          <div className="flex items-center gap-2 text-[#50596b]">
                            <Smartphone size={19} strokeWidth={2} />

                            <span className="text-[15px]">
                              {features[0]?.featureId?.unit || "-"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[#50596b]">
                            <Camera size={19} strokeWidth={2} />

                            <span className="text-[15px]">
                              {features[1]?.featureId?.unit || "-"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[#50596b]">
                            <BatteryCharging size={19} strokeWidth={2} />

                            <span className="text-[15px]">
                              {features[2]?.featureId?.unit || "-"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[#50596b]">
                            <Cpu size={19} strokeWidth={2} />

                            <span className="text-[15px]">
                              {features[3]?.featureId?.unit || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 text-[#7b8190] text-lg">
                  No Products Found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STICKY BAR */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <div
              onClick={() => setShowCompare(true)}
              className="w-[80%] mx-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-2xl px-4 py-3 flex items-center justify-between cursor-pointer rounded-t-2xl"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="bg-white text-orange-500 font-black w-9 h-9 flex items-center justify-center rounded-full shadow-md">
                  VS
                </div>

                <div>
                  <p className="font-bold text-sm md:text-base">
                    Comparison List
                  </p>

                  <p className="text-xs text-white/90">
                    {compareList.length} products added
                  </p>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="hidden md:flex items-center gap-2">
                {compareList.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="w-10 h-10 bg-white rounded-lg p-1 shadow-md"
                  >
                    <Image
                      src={
                        item.image?.[0]?.startsWith("http")
                          ? item.image[0]
                          : `https://admin.compareuniverse.com/${item.thumbnail}`
                      }
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full"
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
            <div className="w-full md:w-[700px] bg-[#eef0f5] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
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
                        src={
                          item.image?.[0]?.startsWith("http")
                            ? item.image[0]
                            : `https://admin.compareuniverse.com/${item.thumbnail}`
                        }
                        alt={item.title}
                        width={45}
                        height={45}
                        className="rounded-lg"
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

              {/* FOOTER */}
              <div className="p-4 bg-[#eef0f5]">
                <button className="w-full bg-white rounded-full py-3 font-bold text-orange-500 shadow-inner hover:scale-[1.01] transition">
                  Compare ({compareList.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
