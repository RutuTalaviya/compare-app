"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticles } from "../services/articleService";
import { imageUrl } from "../config";

// Utility to split blog array into N columns
const splitIntoColumns = (array: any[], columns: number) => {
  const cols: any[][] = Array.from({ length: columns }, () => []);
  array.forEach((item, index) => {
    cols[index % columns].push(item);
  });
  return cols;
};

const useResponsiveColumns = () => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const getColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 4; // xl
      if (width >= 1024) return 3; // lg
      if (width >= 768) return 2; // md
      return 1; // mobile
    };

    const updateColumns = () => setColumns(getColumns());

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
};

export default function BlogPage({ showBreadcrumb, isInline, limit }: { showBreadcrumb?: boolean; isInline?: boolean; limit?: number }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const columns = useResponsiveColumns();

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

  const slicedPosts = limit ? posts.slice(0, limit) : posts;
  const blogColumns = splitIntoColumns(slicedPosts, columns);

  const skeletonColumns = Array.from({ length: columns });

  const blogContent = loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {skeletonColumns.map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 lg:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-[#e6e7ee] rounded-2xl p-4 shadow-[0_12px_30px_rgba(49,56,66,0.1)] h-[300px] flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-gray-300 rounded-xl mb-4" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 ml-1" />
              <div className="h-4 bg-gray-300 rounded w-1/2 ml-1" />
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : posts.length === 0 ? (
    <div className="text-center py-10 text-[#313842] font-semibold">
      No articles found.
    </div>
  ) : (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {blogColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 lg:gap-6">
            {column.map((post) => (
              <Link
                href={`/blog/${post.uniqueTitle}`}
                key={post._id}
                className="group block cursor-pointer rounded-2xl bg-[#e6e7ee] shadow-[0_12px_30px_rgba(49,56,66,0.1)] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(49,56,66,0.18)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full rounded-xl overflow-hidden mb-4 bg-transparent">
                  <img
                    src={getPostImageUrl(post.thumbnail)}
                    alt={post.title}
                    className="w-full h-auto max-w-full rounded-xl transition-transform duration-500 group-hover:scale-102"
                  />
                </div>

                {/* Post Title */}
                <h3 className="text-[15px] sm:text-[16px] font-semibold leading-snug px-1 pb-1 text-[#313842] transition-colors duration-300 group-hover:text-[#F98A1A]">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {/* Bottom fade mask */}
      <div className="Masonry__fadeToWhiteMask___rTGCf"></div>
    </div>
  );

  if (isInline) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="w-full">{blogContent}</div>

        {!loading && limit && posts.length > limit && (
          <Link
            href="/blog"
            className="mt-10 px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-[#F98A1A] text-white shadow-[0_8px_20px_rgba(249,138,26,0.25)] hover:bg-[#e0740d] hover:shadow-[0_12px_28px_rgba(249,138,26,0.35)] active:shadow-[0_4px_10px_rgba(249,138,26,0.2)] cursor-pointer"
          >
            See All Blogs
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6e7ee] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-5 md:px-8 w-full max-w-[1400px] mx-auto">
        {/* Breadcrumb Navigation */}
        {showBreadcrumb && (
          <div className="flex items-center gap-2 text-sm mb-10 tracking-widest uppercase font-medium">
            <Link
              href="/"
              className="text-[#313842] hover:text-[#F98A1A] transition-colors"
            >
              Home
            </Link>

            <span className="text-gray-400">/</span>

            <span className="text-[#313842]/80">Blogs</span>
          </div>
        )}

        {blogContent}
      </main>

      <Footer />
    </div>
  );
}