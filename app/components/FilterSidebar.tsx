'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([11209, 224186]);
  const [weightRange, setWeightRange] = useState<[number, number]>([8.2, 696]);
  const [openSections, setOpenSections] = useState<string[]>(['sort', 'price', 'brand', 'design', 'weight']);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Versus score');
  const [showAllVariants, setShowAllVariants] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');

  const brands = ['360 N7', 'Acer', 'AGM', 'Alcatel', 'Allview', 'Amazon', 'Apple', 'Asus', 'BlackBerry', 'BLU'];

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange, weightRange, selectedBrands, sortBy });
  };

  const handleWeightChange = (index: number, value: number) => {
    const newRange = [...weightRange] as [number, number];
    newRange[index] = value;
    setWeightRange(newRange);
    onFilterChange({ priceRange, weightRange: newRange, selectedBrands, sortBy });
  };

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    onFilterChange({ priceRange, weightRange, selectedBrands: updated, sortBy });
  };

  const histogramData = [45, 65, 80, 75, 55, 40, 35, 25, 20, 15];

  const sectionHeader = (label: string, key: string) => (
    <div
      className="flex items-center justify-between cursor-pointer mb-4"
      onClick={() => toggleSection(key)}
    >
      <span className="text-sm font-black uppercase tracking-widest text-[#313842]">
        {label}
      </span>
      <div className="w-7 h-7 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff] flex items-center justify-center">
        {openSections.includes(key)
          ? <ChevronUp size={14} className="text-[#F98A1A]" />
          : <ChevronDown size={14} className="text-gray-500" />
        }
      </div>
    </div>
  );

  return (
    <div className="bg-[#e6e7ee] rounded-2xl border border-[#d1d9e6] shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] overflow-hidden w-full lg:w-80">
      {/* SORT BY */}
      <div className="p-5 border-b border-[#d1d9e6]">
        {sectionHeader('Sort By', 'sort')}
        {openSections.includes('sort') && (
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              onFilterChange({ priceRange, weightRange, selectedBrands, sortBy: e.target.value });
            }}
            className="w-full bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-4 py-3 text-sm font-semibold text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] focus:outline-none cursor-pointer"
          >
            <option>Versus score</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Weight: Low to High</option>
          </select>
        )}
      </div>

      {/* PRICE */}
      <div className="p-5 border-b border-[#d1d9e6]">
        {sectionHeader('Price', 'price')}
        {openSections.includes('price') && (
          <>
            {/* Histogram */}
            <div className="flex items-end gap-1 h-16 mb-5 px-1">
              {histogramData.map((height, i) => (
                <div
                  key={i}
                  className="rounded-t flex-1 bg-[#e6e7ee] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-1px_-1px_3px_#ffffff] transition-all"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            {/* Price Range Sliders */}
            <div className="relative mb-5 h-6">
              <input
                type="range"
                min="5000"
                max="300000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="absolute w-full pointer-events-none z-10"
                style={{ accentColor: '#F98A1A' }}
              />
              <input
                type="range"
                min="5000"
                max="300000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="absolute w-full"
                style={{ accentColor: '#F98A1A' }}
              />
              <div className="h-1.5 bg-[#e6e7ee] shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] rounded-full mt-3 relative border border-[#d1d9e6]">
                <div
                  className="absolute h-1.5 bg-[#F98A1A] rounded-full"
                  style={{
                    left: `${((priceRange[0] - 5000) / 295000) * 100}%`,
                    right: `${100 - ((priceRange[1] - 5000) / 295000) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Price Values */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-3 py-2.5 text-center text-xs font-black text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]">
                ₹{priceRange[0].toLocaleString('en-IN')}
              </div>
              <div className="flex-1 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-3 py-2.5 text-center text-xs font-black text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]">
                ₹{priceRange[1].toLocaleString('en-IN')}
              </div>
            </div>

            {/* Currency Select */}
            <select className="w-full bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] focus:outline-none cursor-pointer mb-4">
              <option>INR • ₹</option>
            </select>

            {/* Show All Variants Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#555f6e]">Show all variants</span>
              <div
                onClick={() => setShowAllVariants(!showAllVariants)}
                className={`w-12 h-6 rounded-full border border-[#d1d9e6] cursor-pointer transition-all duration-300 relative shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] ${showAllVariants ? 'bg-[#F98A1A]' : 'bg-[#e6e7ee]'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff] bg-[#e6e7ee] transition-all duration-300 ${showAllVariants ? 'left-6' : 'left-0.5'}`} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* BRAND */}
      <div className="p-5 border-b border-[#d1d9e6]">
        {sectionHeader('Brand', 'brand')}
        {openSections.includes('brand') && (
          <>
            {/* Brand Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search brand..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl text-sm font-medium text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Brand List */}
            <div className="max-h-52 overflow-y-auto pr-1 space-y-2">
              {brands
                .filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
                .map(brand => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => toggleBrand(brand)}
                    >
                      <div className={`w-5 h-5 rounded-md border border-[#d1d9e6] flex items-center justify-center transition-all duration-200 shrink-0 ${isSelected
                          ? 'bg-[#F98A1A] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)]'
                          : 'bg-[#e6e7ee] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff]'
                        }`}>
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-[#F98A1A]' : 'text-[#555f6e]'}`}>
                        {brand}
                      </span>
                    </label>
                  );
                })}
            </div>
          </>
        )}
      </div>

      {/* DESIGN */}
      <div className="p-5">
        {sectionHeader('Design', 'design')}
        {openSections.includes('design') && (
          <>
            {/* Weight */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer mb-3"
                onClick={() => toggleSection('weight')}
              >
                <span className="text-sm font-bold text-[#313842]">Weight</span>
                <div className="w-6 h-6 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff] flex items-center justify-center">
                  {openSections.includes('weight')
                    ? <ChevronUp size={12} className="text-[#F98A1A]" />
                    : <ChevronDown size={12} className="text-gray-500" />
                  }
                </div>
              </div>

              {openSections.includes('weight') && (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-3 py-2.5 text-center text-xs font-black text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]">
                      {weightRange[0].toFixed(1)} g
                    </div>
                    <div className="flex-1 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl px-3 py-2.5 text-center text-xs font-black text-[#313842] shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]">
                      {weightRange[1]} g
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="0.1"
                    value={weightRange[1]}
                    onChange={(e) => handleWeightChange(1, Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: '#F98A1A' }}
                  />
                </div>
              )}
            </div>

            {/* Other Design Items */}
            {['Thickness', 'Width', 'Height', 'Water resistance'].map((item, idx, arr) => (
              <div
                key={item}
                className={`py-3 flex items-center justify-between cursor-pointer ${idx < arr.length - 1 ? 'border-b border-[#d1d9e6]' : ''}`}
                onClick={() => toggleSection(item)}
              >
                <span className="text-sm font-semibold text-[#555f6e]">{item}</span>
                <div className="w-6 h-6 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff] flex items-center justify-center">
                  {openSections.includes(item)
                    ? <ChevronUp size={12} className="text-[#F98A1A]" />
                    : <ChevronDown size={12} className="text-gray-500" />
                  }
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}