"use client";

import Link from "next/link";
import Image from "next/image";

const SimpleHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2a2a2a] border-b border-zinc-800 shadow-md">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo */}
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
          
          {/* Tagline or minimal content */}
          <div className="hidden sm:block text-zinc-400 text-xs font-semibold tracking-wider uppercase">
            Product Comparisons Made Simple
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
