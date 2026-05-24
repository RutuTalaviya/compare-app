"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  FaWhatsapp,
  FaTelegram,
  FaFacebookF,
  FaTwitter,
  FaCalendarAlt,
  FaFolderOpen,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { getArticleDetails } from "../../services/articleService";

import { imageUrl } from "@/app/config";

export default function ArticleDetailsPage() {
  const params = useParams();

  const uniqueTitle = params?.uniqueTitle as string;

  // Article state
  const [article, setArticle] = useState<any>(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  /**
   * Fetch article details
   */
  const fetchArticleDetails = async () => {
    try {
      setLoading(true);

      const response =
        await getArticleDetails(uniqueTitle);

      if (response?.status) {
        setArticle(response.data);
      }
    } catch (error) {
      console.log(
        "Article details error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial API call
  useEffect(() => {
    if (uniqueTitle) {
      fetchArticleDetails();
    }
  }, [uniqueTitle]);

  /**
   * Format date
   */
  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // Share URLs
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const shareText =
    article?.title || "";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${shareText} ${currentUrl}`
  )}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    currentUrl
  )}&text=${encodeURIComponent(
    shareText
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}&text=${encodeURIComponent(
    shareText
  )}`;

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf2f7]">
        <Navbar />

        <div className="pt-32 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="animate-pulse">

            <div className="h-[50px] bg-gray-200 rounded-2xl mb-6" />

            <div className="h-[500px] bg-gray-200 rounded-[35px] mb-8" />

            <div className="h-[300px] bg-gray-200 rounded-[35px]" />

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf2f7] flex flex-col overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[3px] text-gray-500 mb-8 flex-wrap">

          <Link
            href="/"
            className="hover:text-black transition-colors"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/glossary"
            className="hover:text-black transition-colors"
          >
            Glossary
          </Link>

          <span>/</span>

          <span className="text-gray-700 truncate max-w-[220px] sm:max-w-full">
            {article?.title}
          </span>

        </div>

        {/* Main Card */}
        <div className="relative rounded-[35px] overflow-hidden border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#eef4ff] to-[#f6f8fb]" />

          <div className="absolute top-[-100px] right-[-80px] w-[250px] h-[250px] rounded-full bg-[#3b82f6]/10 blur-3xl" />

          <div className="absolute bottom-[-100px] left-[-80px] w-[250px] h-[250px] rounded-full bg-[#f97316]/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-5 sm:p-8 md:p-12">

            {/* Category + Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">

              {/* Category */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">

                <FaFolderOpen className="text-[#f97316]" />

                <span className="text-sm font-bold text-gray-700">
                  {article?.articleCategoryId
                    ?.name || "Article"}
                </span>

              </div>

              {/* Date */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">

                <FaCalendarAlt className="text-[#2563eb]" />

                <span className="text-sm font-semibold text-gray-600">
                  {formatDate(
                    article?.createdAt
                  )}
                </span>

              </div>

            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.15] text-[#0a192f] max-w-[950px] mb-8">

              {article?.title}

            </h1>

            {/* Top Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">

              {/* Google */}
              <button className="group">

                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

                  <FcGoogle className="text-xl" />

                  <span className="text-sm font-bold text-gray-700">
                    Google Preferred
                  </span>

                </div>

              </button>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >

                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

                  <FaWhatsapp className="text-[#25D366] text-xl" />

                  <span className="text-sm font-bold text-gray-700">
                    Share WhatsApp
                  </span>

                </div>

              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >

                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

                  <FaTelegram className="text-[#229ED9] text-xl" />

                  <span className="text-sm font-bold text-gray-700">
                    Share Telegram
                  </span>

                </div>

              </a>

            </div>

            {/* Hero Image */}
            {article?.thumbnail && (

              <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[550px] rounded-[30px] overflow-hidden border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.12)] mb-10">

                <Image
                  src={`${imageUrl}${article.thumbnail}`}
                  alt={article?.title}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />

              </div>

            )}

            {/* Article Content Card */}
            <div className="bg-white rounded-[35px] border border-white/60 shadow-[0_15px_50px_rgba(15,23,42,0.08)] overflow-hidden">

              <div className="p-5 sm:p-8 md:p-12">

                <div
                  className="
                    prose
                    prose-sm
                    sm:prose-base
                    lg:prose-lg
                    max-w-none

                    prose-headings:text-[#0a192f]
                    prose-headings:font-black

                    prose-p:text-gray-700
                    prose-p:leading-[2]
                    prose-p:text-[16px]

                    prose-img:rounded-2xl
                    prose-img:shadow-lg

                    prose-a:text-[#2563eb]

                    prose-strong:text-black

                    prose-blockquote:border-l-[#f97316]
                    prose-blockquote:text-gray-700
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      article?.content || "",
                  }}
                />

              </div>

            </div>

            {/* Share Section */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">

              <span className="text-sm font-semibold text-gray-600 mr-2">
                Share Article:
              </span>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                <FaWhatsapp className="text-[#25D366] text-xl" />

              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                <FaTelegram className="text-[#229ED9] text-xl" />

              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                <FaFacebookF className="text-[#1877F2] text-lg" />

              </a>

              {/* Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                <FaTwitter className="text-[#1DA1F2] text-lg" />

              </a>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}