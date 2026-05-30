"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Ensure this path correctly points to your Navbar
import { getArticles } from "../services/articleService";
import { imageUrl } from "../config";

export default function BlogPage({ showBreadcrumb = true, isInline = false }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getArticles(1, 100);
        if (response?.status && Array.isArray(response.data)) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getPostImageUrl = (thumbnail: string) => {
    if (!thumbnail) {
      return "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80"; // fallback placeholder
    }
    if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
      return thumbnail;
    }
    return `${imageUrl}${thumbnail}`;
  };

  const blogContent = loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-[#e8edf2] rounded-3xl p-4 shadow-[8px_8px_16px_#cfd6e0,-8px_-8px_16px_#ffffff] border border-white/50 h-[300px] flex flex-col"
        >
          <div className="w-full aspect-[4/3] bg-gray-300 rounded-2xl mb-5 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 ml-1" />
          <div className="h-4 bg-gray-300 rounded w-1/2 ml-1" />
        </div>
      ))}
    </div>
  ) : posts.length === 0 ? (
    <div className="text-center py-10 text-gray-600 font-medium">
      No articles found.
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {posts.map((post) => (
        <Link href={`/blog/${post.uniqueTitle}`} key={post._id} className="group block">
          {/* Neumorphic Card */}
          <div className="bg-[#e8edf2] rounded-3xl p-4 shadow-[8px_8px_16px_#cfd6e0,-8px_-8px_16px_#ffffff] border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_20px_#cfd6e0,-12px_-12px_20px_#ffffff] h-full flex flex-col">
            {/* Image Container with Inner Shadow styling */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-white shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
              <img
                src={getPostImageUrl(post.thumbnail)}
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
  );

  if (isInline) {
    return blogContent;
  }

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

        {blogContent}
      </main>
    </div>
  );
}
