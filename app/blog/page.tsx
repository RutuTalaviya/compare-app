"use client";

import Link from "next/link";
import Navbar from "../components/Navbar"; // Ensure this path correctly points to your Navbar

// Mock data based on your screenshot
const blogPosts = [
  {
    id: 1,
    title: "What is Community Tourism Anyway?",
    // Placeholder image. In your real app, replace these with actual image paths from your public folder or database.
    imageUrl:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80",
    link: "/blog/what-is-community-tourism-anyway",
  },
  {
    id: 2,
    title: "A Boston and Cambridge Travel Guide for First Timers.",
    imageUrl:
      "https://images.unsplash.com/photo-1506501139174-099022df5260?w=600&q=80",
    link: "/blog/boston-cambridge-travel-guide",
  },
  {
    id: 3,
    title: "The Role of Printers and Scanners in Today's Business Environment",
    imageUrl:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80",
    link: "/blog/role-of-printers-and-scanners",
  },
  {
    id: 4,
    title:
      "HUAWEI nova 13 series with 120Hz OLED display, 60MP front camera go global",
    imageUrl:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&q=80",
    link: "/blog/huawei-nova-13-series",
  },
  {
    id: 5,
    title:
      "iPhone 15 review: Why I recommend this model even to 'Pro' users in 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    link: "/blog/iphone-15-review",
  },
  {
    id: 6,
    title:
      "iPhone 16 Pro vs. iPhone 13 Pro: Should you upgrade to Apple's latest model?",
    imageUrl:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80",
    link: "/blog/iphone-16-vs-13-pro",
  },
  {
    id: 7,
    title: "Fujifilm Unveils New ACUITY TR Powered by AQUAFUZE Ink",
    imageUrl:
      "https://images.unsplash.com/photo-1544425660-2da62df8fc2e?w=600&q=80",
    link: "/blog/fujifilm-acuity-tr",
  },
  {
    id: 8,
    title: "Nothing Phone 4a Pro Review: A Big Leap",
    imageUrl:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80",
    link: "/blog/nothing-phone-4a-pro-review",
  },
];

export default function BlogPage({ showBreadcrumb = true }) {
  return (
    <div className="min-h-screen bg-[#e8edf2] font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-5 md:px-8 w-full max-w-[1400px] mx-auto">
        {/* Breadcrumb Navigation */}
        {showBreadcrumb && (
          <div className="flex items-center gap-2 text-sm mb-10 tracking-widest uppercase font-medium">
            <Link
              href="/"
              className="text-gray-400 hover:text-black transition-colors"
            >
              Home
            </Link>

            <span className="text-gray-400">/</span>

            <span className="text-gray-700">Blogs</span>
          </div>
        )}

        {/* Blog Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <Link href={post.link} key={post.id} className="group block">
              {/* Neumorphic Card */}
              <div className="bg-[#e8edf2] rounded-3xl p-4 shadow-[8px_8px_16px_#cfd6e0,-8px_-8px_16px_#ffffff] border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_20px_#cfd6e0,-12px_-12px_20px_#ffffff] h-full flex flex-col">
                {/* Image Container with Inner Shadow styling */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-white shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
                  {/* Note: Using standard <img> tag for easy drop-in without next.config.js domain issues. You can convert to next/image later */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Post Title - Now turns orange only on hover */}
                <h3 className="text-[15px] sm:text-[16px] font-semibold leading-snug px-1 pb-2 transition-colors duration-300 text-gray-800 group-hover:text-[#f97316]">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
