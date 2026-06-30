"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { getArticleDetails, getArticles } from "../../services/articleService";
import { imageUrl } from "../../config";

const authors = [
  { name: "Rahul Sharma", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Priya Mehta", avatar: "https://i.pravatar.cc/150?img=45" },
  { name: "Arjun Verma", avatar: "https://i.pravatar.cc/150?img=33" },
  { name: "Sneha Patel", avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Vikram Nair", avatar: "https://i.pravatar.cc/150?img=60" },
  { name: "Ananya Joshi", avatar: "https://i.pravatar.cc/150?img=25" },
];

// Custom SVG component for Facebook
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Custom SVG component for Twitter
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Custom SVG component for WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Custom SVG component for Google
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const [randomAuthor] = useState(() => {
    const index = slug
      ? slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      authors.length
      : 0;
    return authors[index];
  });

  const fetchArticleDetails = async () => {
    try {
      setLoading(true);
      const response = await getArticleDetails(slug);
      if (response?.status) {
        setArticle(response.data);
      }
    } catch (error) {
      console.log("Article details error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      setLoadingRelated(true);
      const response = await getArticles(1, 20);
      if (response?.status && Array.isArray(response.data)) {
        const filtered = response.data.filter((item: any) => item.uniqueTitle !== slug);
        setRelatedArticles(filtered);
      }
    } catch (error) {
      console.log("Error fetching related articles:", error);
    } finally {
      setLoadingRelated(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchArticleDetails();
      fetchRelatedArticles();
    }
  }, [slug]);

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getPostImageUrl = (thumbnail: string) => {
    if (!thumbnail) {
      return "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80"; // fallback
    }
    if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
      return thumbnail;
    }
    return `${imageUrl}${thumbnail}`;
  };

  // Share URLs
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = article?.title || "";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e6e7ee] font-sans text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 px-5 md:px-8 w-full max-w-[1400px] mx-auto pb-16">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300/60 rounded w-1/4 mb-8" />
            <div className="bg-[#e6e7ee] rounded-3xl p-6 md:p-10 shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] border border-white/60">
              <div className="h-10 bg-gray-300/60 rounded w-3/4 mb-8" />
              <div className="h-6 bg-gray-300/60 rounded w-1/3 mb-10" />

              {/* Updated Layout Skeleton */}
              <div className="block w-full">
                <div className="w-full md:w-1/2 lg:w-5/12 md:float-left md:mr-8 mb-6 md:mb-4 aspect-[4/3] bg-gray-300/60 rounded-xl" />
                <div className="space-y-4 pt-2">
                  <div className="h-4 bg-gray-300/60 rounded w-full" />
                  <div className="h-4 bg-gray-300/60 rounded w-full" />
                  <div className="h-4 bg-gray-300/60 rounded w-5/6" />
                  <div className="h-4 bg-gray-300/60 rounded w-full" />
                  <div className="h-4 bg-gray-300/60 rounded w-4/5" />
                </div>
                <div className="clear-both"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#e6e7ee] font-sans text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 px-5 md:px-8 w-full max-w-[1400px] mx-auto pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link
              href="/blog"
              className="text-[#F98A1A] font-bold hover:underline"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6e7ee] font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 px-5 md:px-8 w-full max-w-[1400px] mx-auto pb-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 tracking-widest uppercase font-medium">
          <Link
            href="/"
            className="text-gray-400 hover:text-[#F98A1A] transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/blog"
            className="text-gray-400 hover:text-[#F98A1A] transition-colors"
          >
            Blogs
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 truncate max-w-[300px]">
            {article.title}
          </span>
        </div>

        {/* Main Neumorphic Card Container */}
        <article className="bg-[#e6e7ee] rounded-3xl p-6 md:p-10 shadow-[8px_8px_16px_#b8c4d2,-8px_-8px_16px_#ffffff] border border-white/60">
          {/* Blog Title */}
          <h1 className="text-3xl md:text-[42px] font-extrabold text-[#0a192f] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Divider below title */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8" />

          {/* Author & Action Buttons Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3">
              <img
                src={randomAuthor.avatar}
                alt={randomAuthor.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/70 shadow-[3px_3px_6px_#b8c4d2,-3px_-3px_6px_#ffffff]"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0a192f]">
                  {randomAuthor.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(article.createdAt)}
                </span>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#e6e7ee] rounded-full shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700">
                <GoogleIcon className="w-4 h-4 text-[#DB4437]" />
                Google preferred
              </button>

              <a
                href="https://whatsapp.com/channel/..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#e6e7ee] rounded-full shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Join WhatsApp channel
              </a>

              <a
                href="https://t.me/..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#e6e7ee] rounded-full shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700"
              >
                <Send className="w-4 h-4 text-[#0088cc]" />
                Join Telegram channel
              </a>
            </div>
          </div>

          {/* Floated Image and Text Wrapper */}
          <div className="block w-full">
            {article.thumbnail && (
              <div className="w-full md:w-1/2 lg:w-5/12 md:float-left md:mr-8 mb-6 md:mb-4 rounded-2xl bg-[#e6e7ee] shadow-[inset_4px_4px_8px_#b8c4d2,inset_-4px_-4px_8px_#ffffff] p-2 md:p-3">
                <img
                  src={getPostImageUrl(article.thumbnail)}
                  alt={article.title}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            )}

            {/* Blog Content */}
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-[15px] sm:text-base text-gray-800 leading-relaxed font-medium space-y-6
                prose-headings:text-[#0a192f] prose-headings:font-black
                prose-p:text-gray-700 prose-p:leading-[2]
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-a:text-[#2563eb]
                prose-strong:text-black
                prose-blockquote:border-l-[#f97316] prose-blockquote:text-gray-700"
              dangerouslySetInnerHTML={{
                __html: article.content || "",
              }}
            />

            {/* Clear the float so container height calculates correctly */}
            <div className="clear-both"></div>
          </div>
        </article>


        {/* Related Articles Slider */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-[#0a192f] flex items-center gap-2">
                📚 Related Articles
              </h2>
            </div>
            <div className="relative w-full">
              {/* Left Button */}
              <button
                onClick={scrollLeft}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center border border-[#d1d9e6]/50 text-[#313842] hover:text-[#F98A1A] transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Slider Container */}
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-6 pb-6 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {relatedArticles.map((item) => (
                  <Link
                    href={`/blog/${item.uniqueTitle}`}
                    key={item._id}
                    className="w-[280px] sm:w-[320px] shrink-0 snap-start group block cursor-pointer rounded-2xl bg-[#e6e7ee] shadow-[0_12px_30px_rgba(49,56,66,0.1)] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(49,56,66,0.18)] flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-transparent">
                      <img
                        src={getPostImageUrl(item.thumbnail)}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Post Title */}
                    <h3 className="text-[15px] sm:text-[16px] font-semibold leading-snug px-1 pb-1 text-[#313842] transition-colors duration-300 group-hover:text-[#F98A1A] line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={scrollRight}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2] flex items-center justify-center border border-[#d1d9e6]/50 text-[#313842] hover:text-[#F98A1A] transition-all duration-300 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="text-sm font-semibold text-gray-600 mr-2">
            Share:
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#25D366]"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#0088cc]"
          >
            <Send className="w-4 h-4" />
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#1877F2]"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#e6e7ee] shadow-[4px_4px_8px_#b8c4d2,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#1DA1F2]"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
