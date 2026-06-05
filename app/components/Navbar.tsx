"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  LayoutGrid,
  ChevronDown,
  Search,
  ChevronRight,
} from "lucide-react";

import SearchOverlay from "./SearchOverlay";
import { getCategories } from "../services/categoryService";

// ---------------- TYPES ----------------

interface SubCategory {
  _id: string;
  name: string;
  uniqueName: string;
  categoryId: string;
}

interface Category {
  _id: string;
  name: string;
  sIcon: string;
  bIcon: string;
  subCategory: SubCategory[];
}

// ---------------- COMPONENT ----------------

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
    useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dynamic Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH CATEGORIES ----------------

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response: any = await getCategories();

      console.log("Full Response:", response);

      if (response?.status) {
        setCategories(response.data);

        console.log("Categories:", response.data);
      }
    } catch (error) {
      console.log("Category Fetch Error :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#2a2a2a] border-b border-zinc-800 shadow-md">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">
            {/* Left Section: Logo */}
            <div className="flex flex-shrink-0 justify-start">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/logo.svg"
                  alt="Compare Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8 h-full">
              {/* Categories Mega Menu */}
              <div className="relative group h-full flex items-center">
                <Link
                  href="/categories"
                  className="flex items-center gap-2 text-white text-[15px] font-medium transition-colors h-full"
                >
                  <LayoutGrid className="w-[18px] h-[18px] text-gray-300" />
                  Categories
                </Link>

                {/* Mega Menu */}
                <div className="fixed top-[64px] left-0 w-full bg-[#eef2f6] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t border-zinc-800 cursor-default">
                  <div className="max-w-[1400px] mx-auto px-8 py-10 relative">
                    {/* Loading */}
                    {loading ? (
                      <div className="text-center py-10 text-gray-600">
                        Loading Categories...
                      </div>
                    ) : (
                      <>
                        {/* Dynamic Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {categories?.map((category) => (
                            <div
                              key={category._id}
                              className="flex flex-col h-full"
                            >
                              {/* Header */}
                              <div className="bg-[#f4f6f9] border border-gray-200 rounded-t-xl shadow-[inset_0px_4px_8px_rgba(0,0,0,0.06)] px-5 py-4">
                                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-[#0f172a]">
                                  {category.name}
                                </h3>
                              </div>

                              {/* Body */}
                              <div className="bg-[#f4f6f9] border-x border-b border-gray-200 rounded-b-xl px-5 py-4 min-h-[140px] flex flex-col gap-3">
                                {category?.subCategory?.length > 0 ? (
                                  category.subCategory.map((sub) => (
                                    <Link
                                      key={sub._id}
                                      href={`/categories/${sub.uniqueName}`}
                                      className="text-gray-600 hover:text-[#f97316] text-[14px] transition-colors"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))
                                ) : (
                                  <p className="text-gray-400 text-sm">
                                    No Sub Categories
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Button */}
                        <div className="w-full flex justify-end mt-10">
                          <Link
                            href="/categories"
                            className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-[15px] px-7 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-md"
                          >
                            See all categories
                            <ChevronRight className="w-[18px] h-[18px]" />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog */}
              <Link
                href="/blog"
                className="text-gray-200 hover:text-white text-[15px] font-medium transition-colors"
              >
                Blog
              </Link>

              {/* More Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 text-gray-200 hover:text-white text-[15px] font-medium transition-colors">
                  More
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden py-1">
                  <Link
                    href="/privacy-policy"
                    className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms-conditions"
                    className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium"
                  >
                    Terms & Conditions
                  </Link>

                  <Link
                    href="/cookies-policy"
                    className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium"
                  >
                    Cookies Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-shrink-0 justify-end items-center gap-4">
              {/* Desktop Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex items-center gap-2 bg-[#424242] hover:bg-[#525252] border border-zinc-600 text-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                {isSearchOpen ? (
                  <>
                    <X className="h-4 w-4" />
                    <span className="text-[14px]">Close</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span className="text-[14px]">Search</span>
                  </>
                )}
              </button>

              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              {/* Mobile Menu */}
              {!isSearchOpen && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden text-gray-300 hover:text-white ml-2"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-[#1f1f1f] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-zinc-800">
          <span className="text-white font-medium text-lg">Menu</span>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col p-6 gap-6">
          {/* Categories Accordion */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
              }
              className="flex items-center justify-between text-gray-200 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-gray-400" />
                <span>Categories</span>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isMobileCategoriesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* MOBILE ONLY SEE ALL */}
            <div
              className={`overflow-hidden transition-all duration-300 ${isMobileCategoriesOpen
                  ? "max-h-[200px] opacity-100 mt-3"
                  : "max-h-0 opacity-0"
                }`}
            >
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between bg-[#2c2c2c] border border-zinc-700 rounded-xl px-4 py-3 text-[#f97316] hover:bg-[#333333] transition-all"
              >
                <span className="font-medium">See all categories</span>

                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 text-gray-200 hover:text-white text-base font-medium transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center text-gray-400">
              📝
            </span>
            Blog
          </Link>

          {/* More */}
          <div className="flex flex-col gap-2 border-t border-zinc-800 pt-6 mt-2">
            <button
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              className="flex items-center justify-between text-gray-200 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              <span>More</span>

              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isMobileMoreOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`flex flex-col gap-3 pl-4 mt-2 border-l border-zinc-700 overflow-hidden transition-all duration-300 ${isMobileMoreOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <Link
                href="/privacy-policy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white text-sm py-1 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white text-sm py-1 transition-colors"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies-policy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white text-sm py-1 transition-colors"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;