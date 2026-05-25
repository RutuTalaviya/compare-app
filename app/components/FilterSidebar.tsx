'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([11209, 224186]);
  const [weightRange, setWeightRange] = useState<[number, number]>([8.2, 696]);
  const [openSections, setOpenSections] = useState<string[]>(['sort', 'price', 'brand', 'design']);
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
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange as [number, number]);
    onFilterChange({ priceRange: newRange, weightRange, selectedBrands, sortBy });
  };

  const handleWeightChange = (index: number, value: number) => {
    const newRange = [...weightRange];
    newRange[index] = value;
    setWeightRange(newRange as [number, number]);
    onFilterChange({ priceRange, weightRange: newRange, selectedBrands, sortBy });
  };

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    onFilterChange({ priceRange, weightRange, selectedBrands: updated, sortBy });
  };

  // Fake histogram data (you can make it dynamic later)
  const histogramData = [45, 65, 80, 75, 55, 40, 35, 25, 20, 15];

  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgb(0,0,0,0.1)] border border-gray-100 overflow-hidden w-full max-w-md">
      
      {/* SORT BY */}
      <div className="p-6 border-b">
        <h3 className="font-semibold mb-3">SORT BY</h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            onFilterChange({ priceRange, weightRange, selectedBrands, sortBy: e.target.value });
          }}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-black"
        >
          <option>Versus score</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Weight: Low to High</option>
        </select>
      </div>

      {/* PRICE SECTION with Histogram */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Price</h3>
          <div className="text-gray-400 cursor-help">ⓘ</div>
        </div>

        {/* Histogram */}
        <div className="flex items-end gap-1 h-20 mb-6">
          {histogramData.map((height, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-t flex-1 transition-all"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="relative mb-4">
          <input
            type="range"
            min="5000"
            max="300000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="absolute w-full accent-blue-600 pointer-events-none z-10"
          />
          <input
            type="range"
            min="5000"
            max="300000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="absolute w-full accent-blue-600"
          />
          <div className="h-1 bg-gray-200 rounded-full mt-6 relative">
            <div
              className="absolute h-1 bg-blue-600 rounded-full"
              style={{
                left: `${((priceRange[0] - 5000) / 295000) * 100}%`,
                right: `${100 - ((priceRange[1] - 5000) / 295000) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm font-medium">
          <div>₹{priceRange[0].toLocaleString('en-IN')}</div>
          <div>₹{priceRange[1].toLocaleString('en-IN')}</div>
        </div>

        <div className="mt-4">
          <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm">
            <option>INR • ₹</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm">Show all variants</span>
          <input
            type="checkbox"
            checked={showAllVariants}
            onChange={(e) => setShowAllVariants(e.target.checked)}
            className="w-5 h-5 accent-black"
          />
        </div>
      </div>

      {/* BRAND SEARCH */}
      <div className="p-6 border-b">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search brand..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
          {brands
            .filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
            .map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-5 h-5 accent-black rounded"
                />
                <span>{brand}</span>
              </label>
            ))}
        </div>
      </div>

      {/* DESIGN SECTION */}
      <div className="p-6">
        <h3 className="font-semibold mb-4">DESIGN</h3>
        
        {/* Weight */}
        <div className="mb-6">
          <div
            className="flex justify-between cursor-pointer mb-4"
            onClick={() => toggleSection('weight')}
          >
            <span className="font-medium">Weight</span>
            {openSections.includes('weight') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {openSections.includes('weight') && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 border rounded-2xl px-4 py-3 text-center font-semibold">
                  {weightRange[0].toFixed(1)} g
                </div>
                <div className="flex-1 bg-gray-50 border rounded-2xl px-4 py-3 text-center font-semibold">
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
                className="w-full accent-black"
              />
            </div>
          )}
        </div>

        {/* Other Design Options */}
        {['Thickness', 'Width', 'Height', 'Water resistance'].map(item => (
          <div key={item} className="py-4 border-t border-gray-100 flex justify-between cursor-pointer">
            <span>{item}</span>
            <ChevronDown size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}