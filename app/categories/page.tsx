"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import Navbar from "../components/Navbar"; // Ensure this path matches your structure
import { useEffect } from "react";
import { getCategories } from "../services/categoryService";

// Mock data matching your screenshot
const categoryData = [
  {
    title: "Mobile device",
    // Replace the lucide-react icon with your 3D image if you have it in your public folder.
    // Example: icon: "/3d-house.png" 
    hasSubcategories: true,
    subcategories: ["Smartphone"],
  },
  {
    title: "TV",
    hasSubcategories: false,
    subcategories: [],
  },
  {
    title: "Refrigerator",
    hasSubcategories: false,
    subcategories: [],
  },
  {
    title: "Cameras",
    hasSubcategories: false,
    subcategories: [],
  },
];

export default function CategoriesPage() {
    useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      console.log("category",res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#e8edf2] flex flex-col font-sans">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 w-full max-w-[1500px] mx-auto">
        
        {/* Large Neumorphic Inset Container */}
        <div className="bg-[#e8edf2] rounded-xl p-5 md:p-10 shadow-[inset_6px_6px_12px_#cfd6e0,inset_-6px_-6px_12px_#ffffff] border border-white/40">
          
          {/* Breadcrumb Section with Engraved Line underneath */}
          <div className="flex items-center gap-2 text-[15px] mb-10 pb-4 border-b border-[#cfd6e0] shadow-[0_1px_0_#ffffff]">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-black">Categories</span>
          </div>

          {/* Grid for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-8">
            {categoryData.map((category, index) => (
              <div key={index} className="relative pt-8">
                
                {/* Outer Raised Card Frame */}
                <div className="bg-[#e8edf2] rounded-2xl p-2.5 shadow-[6px_6px_12px_#cfd6e0,-6px_-6px_12px_#ffffff] border border-white/60">
                  
                  {/* Top Inset Area (Title) */}
                  <div className="bg-[#e8edf2] h-[110px] rounded-t-xl shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] flex items-center justify-end px-5 mb-2.5">
                    <h3 className="text-[17px] font-medium text-[#1a1a1a]">
                      {category.title}
                    </h3>
                  </div>

                  {/* Bottom Inset Area (Subcategories) */}
                  <div className="bg-[#e8edf2] h-[80px] rounded-b-xl shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] flex items-center px-4">
                    {category.hasSubcategories ? (
                      // Neumorphic Raised Pill for Subcategory
                      <div className="w-full bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] rounded-full px-5 py-2.5 text-sm text-gray-700 border border-white/40 font-medium">
                        {category.subcategories[0]}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-[14px] px-2">
                        No subcategories available
                      </span>
                    )}
                  </div>
                  
                </div>

                {/* Overlapping Raised Icon Circle */}
                <div className="absolute top-0 left-6 w-[75px] h-[75px] rounded-full bg-[#e8edf2] shadow-[6px_6px_12px_#cfd6e0,-6px_-6px_12px_#ffffff] border border-white/70 flex items-center justify-center z-10">
                  {/* Replace this SVG with your <Image src="/path" /> for the 3D house */}
                  <Home className="w-8 h-8 text-[#547980]" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Dark Footer Section */}
      <footer className="bg-[#2d2f33] pt-16 pb-12 px-8 w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Resources</h4>
            <Link href="/blog" className="text-gray-400 hover:text-white text-[15px] transition-colors">Blog</Link>
            <Link href="/glossary" className="text-gray-400 hover:text-white text-[15px] transition-colors">Glossary</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Get in touch</h4>
            <Link href="/suggest" className="text-gray-400 hover:text-white text-[15px] transition-colors">Suggest a product</Link>
            <Link href="/partnerships" className="text-gray-400 hover:text-white text-[15px] transition-colors">Partnerships</Link>
            <Link href="/about" className="text-gray-400 hover:text-white text-[15px] transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-[15px] transition-colors">Contact Us</Link>
            <Link href="/guidelines" className="text-gray-400 hover:text-white text-[15px] transition-colors">Editorial guidelines</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Legal</h4>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-[15px] transition-colors">Privacy Policy</Link>
            <Link href="/licensing" className="text-gray-400 hover:text-white text-[15px] transition-colors">Licensing</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-[15px] transition-colors">Terms & Conditions</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Download</h4>
            <Link href="/ios" className="text-gray-400 hover:text-white text-[15px] transition-colors">iOS</Link>
            <Link href="/android" className="text-gray-400 hover:text-white text-[15px] transition-colors">Android</Link>
            <Link href="/windows" className="text-gray-400 hover:text-white text-[15px] transition-colors">Windows</Link>
            <Link href="/macos" className="text-gray-400 hover:text-white text-[15px] transition-colors">MacOS</Link>
          </div>

        </div>
      </footer>
    </div>
  );
}