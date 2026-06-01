"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { Centerwarning } from "../utils/toast";
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Shield, 
  FileText, 
  Cookie,
  Loader2,
  Sparkles
} from "lucide-react";

interface AccordionItem {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const accordionItems: AccordionItem[] = [
  {
    title: "Privacy Policy",
    icon: <Shield className="h-5 w-5 text-[#F98A1A]" />,
    content:
      "We value your privacy. Your data is stored securely and is never shared with third parties without your consent. Learn more about how we protect your information in our Privacy Policy.",
  },
  {
    title: "Terms of Service",
    icon: <FileText className="h-5 w-5 text-[#F98A1A]" />,
    content:
      "By using this site, you agree to our terms of service. Please read them carefully to understand your rights and responsibilities while using our platform.",
  },
  {
    title: "Cookies Policy",
    icon: <Cookie className="h-5 w-5 text-[#F98A1A]" />,
    content:
      "We use cookies to enhance your experience. Cookies help us remember your preferences and improve site functionality. You can manage your cookie settings at any time.",
  },
];

const DefaultPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true);
        const response: any = await getCategories();
        if (response?.status) {
          setCategories(response.data || []);
        } else {
          setCategories(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories for intro page:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesData();
  }, []);

  const handleToggleCategory = (name: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(name)) {
        return prev.filter((cat) => cat !== name);
      }

      if (prev.length >= 3) {
        Centerwarning("You can select a maximum of 3 categories only.");
        return prev;
      }

      return [...prev, name];
    });
  };

  const handleProceed = () => {
    if (selectedCategories.length !== 3) {
      Centerwarning("Select any 3 category then you will be proceed");
      return;
    }

    try {
      localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));
      localStorage.setItem("hasVisitedHomePage", "true");
      // Use standard window reload to trigger re-render on the client
      window.location.reload();
    } catch (e) {
      console.error("Local storage error:", e);
    }
  };

  const toggleAccordion = (idx: number) => {
    setOpenAccordionIdx(openAccordionIdx === idx ? null : idx);
  };

  // Determine if minimum categories recommendation (e.g. 3) is met
  const minCategoriesSelected = selectedCategories.length >= 3;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-5 lg:px-8 mb-20 mt-6 select-none flex justify-center">
      <div className="w-full flex flex-col gap-8">
        
        {/* Main Category Selection Card */}
        <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft p-6 md:p-10 flex flex-col items-center">
          
          <div className="text-center mb-8 border-b border-gray-300/80 pb-5 w-full">
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#F98A1A] mb-2 bg-[#eaeff4] px-3 py-1 rounded-full border border-[#d1d9e6] shadow-inset">
              <Sparkles className="h-3 w-3 fill-[#F98A1A] text-[#F98A1A]" /> Personalize Your Hub
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#313842] leading-tight">
              Choose some favorite categories <br /> you might compare
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Select exactly 3 topics to tailor your side-by-side comparison experience.
            </p>
          </div>

          {/* Loading / Category Pills */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 text-[#F98A1A] animate-spin" />
              <span className="text-sm font-bold text-gray-500">Loading categories...</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 my-6 w-full">
              {categories.map((item, index) => {
                const isSelected = selectedCategories.includes(item.name);
                return (
                  <button
                    key={item._id || index}
                    onClick={() => handleToggleCategory(item.name)}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#F98A1A] text-white border border-[#F98A1A] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] scale-[0.98]"
                        : "bg-[#e6e7ee] text-[#313842] border border-[#d1d9e6] shadow-soft hover:text-[#F98A1A] hover:shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8c4d2]"
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4 stroke-[3px]" />}
                    {item.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Proceed Button */}
          <div className="flex flex-col items-center justify-center mt-8 w-full">
            <button
              onClick={handleProceed}
              className={`px-12 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                selectedCategories.length === 3
                  ? "bg-[#F98A1A] text-white shadow-soft hover:bg-[#e0740d] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]"
                  : "bg-gray-300 text-gray-400 border border-gray-400/20 shadow-none cursor-not-allowed opacity-50"
              }`}
            >
              Proceed
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wider">
              {selectedCategories.length === 3 
                ? "3 of 3 selected. You are ready to proceed!" 
                : `Please select 3 categories (currently ${selectedCategories.length} selected).`}
            </p>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="flex flex-col gap-4">
          {accordionItems.map((item, idx) => {
            const isOpen = openAccordionIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-soft overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100/10 active:bg-gray-100/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 font-bold text-sm sm:text-base text-[#313842]">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px] border-t border-[#d1d9e6]/50" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default DefaultPage;
