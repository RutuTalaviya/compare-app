"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  // Store the array of input strings. Initialize with one empty input.
  const [inputs, setInputs] = useState<string[]>([""]);
  
  // Maximum items allowed for comparison
  const MAX_ITEMS = 4;

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;

    // If user is typing in the last input box, it is not empty, and we haven't reached the limit:
    // Add a new empty input box dynamically.
    if (index === newInputs.length - 1 && value.trim() !== "" && newInputs.length < MAX_ITEMS) {
      newInputs.push("");
    }

    setInputs(newInputs);
  };

  const handleRemove = (indexToRemove: number) => {
    let newInputs = inputs.filter((_, index) => index !== indexToRemove);
    
    // Ensure there is always at least one input field on the screen
    if (newInputs.length === 0) {
      newInputs = [""];
    } 
    // If we removed an item, check if the new last item has text. 
    // If it does and we are below the limit, spawn a new empty box for the user.
    else if (newInputs[newInputs.length - 1].trim() !== "" && newInputs.length < MAX_ITEMS) {
      newInputs.push("");
    }
    
    setInputs(newInputs);
  };

  // Check how many inputs actually have text in them
  const validItems = inputs.filter((val) => val.trim() !== "");
  
  // Disable the compare button if there are less than 2 valid items
  const isCompareDisabled = validItems.length < 2;

  const handleCompare = () => {
    if (isCompareDisabled) return;
    // Implement your comparison routing logic here
    console.log("Comparing the following items:", validItems);
  };

  return (
    <div
      className={`fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#1a1a1a]/95 backdrop-blur-sm z-40 overflow-y-auto pb-24 transition-all duration-400 ease-in-out ${
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"
      }`}
    >
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-16 flex flex-col">
        
        {/* Container for the inputs with left padding to make room for the 'vs' line */}
        <div className="relative flex flex-col gap-5 pl-8 md:pl-12">
          
          {inputs.map((val, index) => {
            const isLastBox = index === inputs.length - 1;
            const isMaxReached = inputs.length === MAX_ITEMS && isLastBox;
            
            // The compare button always stays on the last rendered row
            const showCompareBtn = isLastBox;

            return (
              <div key={index} className="relative flex items-center w-full gap-2 md:gap-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
                
                {/* Vertical Orange Line & VS Badge (Only render for the 2nd item onwards) */}
                {index > 0 && (
                  <div className="absolute -left-6 md:-left-9 top-[-10px] flex items-center justify-center w-px h-px">
                    {/* Orange connector line spanning between the two inputs */}
                    <div className="absolute w-px h-[68px] bg-[#f97316]"></div>
                    {/* White 'vs' Badge */}
                    <div className="relative bg-white rounded-full p-[3px] border-[3px] border-[#1a1a1a] flex items-center justify-center z-10">
                      <span className="text-[#f97316] text-[9px] font-extrabold uppercase tracking-widest leading-none">vs</span>
                    </div>
                  </div>
                )}

                {/* Search Input Box */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Type here to compare"
                    value={val}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-full bg-[#eef2f6] text-black placeholder-gray-500 text-sm md:text-base px-4 py-3 md:py-3.5 rounded-lg focus:outline-none shadow-md pr-10"
                  />
                  
                  {/* Remove 'X' Button inside the input */}
                  {/* Show if it's a completed input OR if it's the 4th box and has text in it */}
                  {(index < inputs.length - 1 || (isMaxReached && val.trim() !== "")) && (
                    <button
                      onClick={() => handleRemove(index)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}
                </div>

                {/* Compare Button */}
                {showCompareBtn && (
                  <button
                    onClick={handleCompare}
                    disabled={isCompareDisabled}
                    className={`shrink-0 font-semibold text-sm md:text-base px-4 md:px-6 py-3 md:py-3.5 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 ${
                      isCompareDisabled
                        ? "bg-[#3a3a3a] text-gray-500 cursor-not-allowed border border-zinc-700"
                        : "bg-[#f97316] hover:bg-[#ea580c] text-white"
                    }`}
                  >
                    Compare <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Optional Message: Let the user know they hit the limit */}
          {inputs.length === MAX_ITEMS && inputs[MAX_ITEMS - 1].trim() !== "" && (
            <div className="text-gray-400 text-sm text-center mt-2 animate-in fade-in duration-300">
              Maximum of {MAX_ITEMS} items can be compared at once.
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;