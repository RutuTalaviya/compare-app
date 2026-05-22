"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LayoutGrid, ChevronDown, Search, ChevronRight } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

// Organized into 4 categories to match the grid layout from the image
const categoryData = [
  {
    title: "MOBILE DEVICE",
    links: ["Smartphone", "Tablets", "Smartwatches", "E-Readers"],
  },
  {
    title: "TV",
    links: ["OLED TVs", "QLED TVs", "4K TVs", "Soundbars"],
  },
  {
    title: "REFRIGERATOR",
    links: ["French Door", "Side-by-Side", "Top Freezer", "Mini Fridges"],
  },
  {
    title: "CAMERAS",
    links: ["Mirrorless", "DSLR", "Action Cameras", "Lenses"],
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

            {/* Center Section: Navigation Links (Desktop) */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8 h-full">
              
              {/* Mega Menu Dropdown Wrapper */}
              <div className="relative group h-full flex items-center">
                <Link
                  href="/categories"
                  className="flex items-center gap-2 text-white text-[15px] font-medium transition-colors h-full"
                >
                  <LayoutGrid className="w-[18px] h-[18px] text-gray-300" />
                  Categories
                </Link>

                {/* Mega Menu Overlay (Matches the specific image design) */}
                <div className="fixed top-[64px] left-0 w-full bg-[#eef2f6] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t border-zinc-800 cursor-default">
                  <div className="max-w-[1400px] mx-auto px-8 py-10 relative">
                    
                    {/* 4-Column Grid for Category Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categoryData.map((category, index) => (
                        <div key={index} className="flex flex-col h-full">
                          {/* Card Header (Inset Shadow to mimic the depressed tab look) */}
                          <div className="bg-[#f4f6f9] border border-gray-200 rounded-t-xl shadow-[inset_0px_4px_8px_rgba(0,0,0,0.06)] px-5 py-4">
                            <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-[#0f172a]">
                              {category.title}
                            </h3>
                          </div>
                          
                          {/* Card Body */}
                          <div className="bg-[#f4f6f9] border-x border-b border-gray-200 rounded-b-xl px-5 py-4 min-h-[140px] flex flex-col gap-3">
                            {category.links.map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                href={`/categories/${link.toLowerCase().replace(/ /g, "-")}`}
                                className="text-gray-600 hover:text-[#f97316] text-[14px] transition-colors"
                              >
                                {link}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Right Orange Button */}
                    <div className="w-full flex justify-end mt-10">
                      <Link
                        href="/categories"
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-[15px] px-7 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        See all categories <ChevronRight className="w-[18px] h-[18px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/blog" className="text-gray-200 hover:text-white text-[15px] font-medium transition-colors">
                Blog
              </Link>

              {/* Desktop More Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 text-gray-200 hover:text-white text-[15px] font-medium transition-colors">
                  More
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* UPDATED: White background dropdown for "More" */}
                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden py-1">
                  <Link href="/privacy-policy" className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium">
                    Terms & Conditions
                  </Link>
                  <Link href="/cookies-policy" className="px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors font-medium">
                    Cookies Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section: Search Toggle Button */}
            <div className="flex flex-shrink-0 justify-end items-center gap-4">
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

              {/* Mobile Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              {/* Mobile Menu Hamburger */}
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

      {/* Integrate the animated search overlay below the navbar */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* --- MOBILE DRAWER COMPONENTS BELOW --- */}

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-[#1f1f1f] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-zinc-800">
          <span className="text-white font-medium text-lg">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col p-6 gap-6">
          
          {/* Mobile Categories Accordion */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
              className="flex items-center justify-between text-gray-200 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-gray-400" />
                <span>Categories</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  isMobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`flex flex-col gap-5 pl-[32px] mt-2 border-l border-zinc-700 overflow-hidden transition-all duration-300 ${
                isMobileCategoriesOpen ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
              }`}
            >
              {categoryData.map((category, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">{category.title}</span>
                  {category.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={`/categories/${link.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f97316] hover:text-[#ea580c] text-sm font-semibold mt-2 flex items-center gap-1"
              >
                See all categories <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-200 hover:text-white text-base font-medium transition-colors">
            <span className="w-5 h-5 flex items-center justify-center text-gray-400">📝</span>
            Blog
          </Link>

          {/* Mobile More Accordion */}
          <div className="flex flex-col gap-2 border-t border-zinc-800 pt-6 mt-2">
            <button
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              className="flex items-center justify-between text-gray-200 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              <span>More</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  isMobileMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`flex flex-col gap-3 pl-4 mt-2 border-l border-zinc-700 overflow-hidden transition-all duration-300 ${
                isMobileMoreOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Link href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white text-sm py-1 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white text-sm py-1 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cookies-policy" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white text-sm py-1 transition-colors">
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