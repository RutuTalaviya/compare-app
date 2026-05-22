"use client";

import Link from "next/link";
import Navbar from "../components/Navbar"; // Ensure this path points to your Navbar component
import Footer from "../components/Footer";

// Mock data structured by letter to match your screenshot
const glossaryData = [
  {
    letter: "A",
    items: [
      {
        title: "A Boston and Cambridge Travel Guide for First Timers.",
        link: "#",
      },
    ],
  },
  {
    letter: "F",
    items: [
      {
        title: "Fujifilm Unveils New ACUITY TR Powered by AQUAFUZE Ink",
        link: "#",
      },
    ],
  },
  {
    letter: "H",
    items: [
      {
        title:
          "HUAWEI nova 13 series with 120Hz OLED display, 60MP front camera go global",
        link: "#",
      },
    ],
  },
];

export default function GlossaryPage() {
  // Generate the alphabet array: ["0-9", "A", "B", "C", ... "Z"]
  const alphabetNav = [
    "0-9",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="min-h-screen bg-[#eaeff4] font-sans flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 md:px-8 pt-28 pb-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 tracking-widest uppercase font-medium">
          <Link href="/" className="text-gray-400 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Glossary</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-[42px] font-extrabold text-[#0a192f] leading-tight mb-10">
          Glossary
        </h1>

        {/* Alphanumeric Navigation Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-3 px-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mb-10">
          {alphabetNav.map((char) => (
            <button
              key={char}
              className="text-[14px] font-bold text-gray-800 hover:text-[#f97316] transition-colors"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Glossary Main Container */}
        <div className="bg-[#eef2f6] rounded-xl p-5 md:p-8 shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] border border-white/60">
          {glossaryData.map((group, index) => (
            <div
              key={index}
              className="bg-[#f4f7fa] rounded-xl p-6 mb-6 shadow-[inset_0px_3px_6px_rgba(0,0,0,0.06)] border border-gray-200/60 last:mb-0"
            >
              {/* Large Letter Heading */}
              <h2 className="text-xl md:text-2xl font-black text-black mb-4">
                {group.letter}
              </h2>

              {/* List of Links for this letter */}
              <div className="flex flex-wrap items-center gap-2">
                {group.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <Link
                      href={item.link}
                      className="text-[#2563eb] hover:text-blue-800 font-semibold text-[15px] transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="text-[#2563eb] font-semibold text-[15px] ml-1">
                      |
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}