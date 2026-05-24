"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getGroupedArticles,
  searchArticles,
} from "../services/articleService";

interface Article {
  _id: string;
  title: string;
  uniqueTitle?: string;
}

interface GroupedArticles {
  [key: string]: Article[];
}

export default function GlossaryPage() {

  const router = useRouter();

  // Grouped articles state
  const [groupedArticles, setGroupedArticles] =
    useState<GroupedArticles>({});

  // Loading state
  const [loading, setLoading] =
    useState<boolean>(true);

  // Redirect loading state
  const [redirectLoading, setRedirectLoading] =
    useState<string | null>(null);

  /**
   * Fetch grouped glossary articles
   */
  const fetchGroupedArticles = async () => {

    try {

      setLoading(true);

      const response =
        await getGroupedArticles();

      if (response?.status) {

        setGroupedArticles(
          response.data || {}
        );

      }

    } catch (error) {

      console.log(
        "Glossary fetch error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // Initial API call
  useEffect(() => {

    fetchGroupedArticles();

  }, []);

  /**
   * Alphabet navigation
   */
  const alphabetNav = useMemo(() => {

    return [
      "0-9",
      ...Array.from(
        { length: 26 },
        (_, i) =>
          String.fromCharCode(65 + i)
      ),
    ];

  }, []);

  /**
   * Scroll to section
   */
  const handleScroll = (
    letter: string
  ) => {

    const section =
      document.getElementById(letter);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };

  /**
   * Handle article click
   * Step 1 -> Call searchArticles API
   * Step 2 -> Get uniqueTitle
   * Step 3 -> Redirect to article details page
   */
  const handleArticleClick = async (
    title: string
  ) => {

    try {

      setRedirectLoading(title);

      const response =
        await searchArticles(title);

      if (
        response?.status &&
        response?.data?.length > 0
      ) {

        const article =
          response.data[0];

        if (article?.uniqueTitle) {

          router.push(
            `/article/${article.uniqueTitle}`
          );

        }

      }

    } catch (error) {

      console.log(
        "Article redirect error:",
        error
      );

    } finally {

      setRedirectLoading(null);

    }

  };

  return (
    <div className="min-h-screen bg-[#eaeff4] flex flex-col">

      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 pt-24 md:pt-28 pb-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-5 tracking-widest uppercase font-medium flex-wrap">

          <Link
            href="/"
            className="text-gray-400 hover:text-black transition-colors"
          >
            Home
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <span className="text-gray-700">
            Glossary
          </span>

        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0a192f] leading-tight mb-8 md:mb-10">

          Glossary

        </h1>

        {/* Sticky Alphabet Navigation */}
        <div className="sticky top-[72px] md:top-[80px] z-30 mb-8 md:mb-10">

          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 py-3 px-3 sm:px-4">

            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-3">

              {alphabetNav.map((char) => {

                const hasData =
                  groupedArticles?.[char]?.length > 0;

                return (
                  <button
                    key={char}
                    onClick={() =>
                      handleScroll(char)
                    }
                    disabled={!hasData}
                    className={`min-w-[28px] text-xs sm:text-sm font-bold transition-all duration-200 ${
                      hasData
                        ? "text-gray-800 hover:text-[#f97316] hover:scale-110"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >

                    {char}

                  </button>
                );
              })}

            </div>

          </div>

        </div>

        {/* Glossary Container */}
        <div className="bg-[#eef2f6] rounded-xl p-4 sm:p-5 md:p-8 shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] border border-white/60">

          {/* Loading State */}
          {loading && (

            <div className="space-y-6">

              {Array.from({
                length: 4,
              }).map((_, index) => (

                <div
                  key={index}
                  className="h-[120px] rounded-2xl bg-gray-200 animate-pulse"
                />

              ))}

            </div>

          )}

          {/* Dynamic Glossary */}
          {!loading &&
            Object.entries(
              groupedArticles
            ).map(
              ([letter, articles]) => (

                <div
                  id={letter}
                  key={letter}
                  className="bg-[#f4f7fa] rounded-xl p-4 sm:p-5 md:p-6 mb-5 md:mb-6 shadow-[inset_0px_3px_6px_rgba(0,0,0,0.06)] border border-gray-200/60 last:mb-0 scroll-mt-40"
                >

                  {/* Letter Heading */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-4">

                    {letter}

                  </h2>

                  {/* Articles */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">

                    {articles.map(
                      (
                        article,
                        index
                      ) => (

                        <div
                          key={article._id}
                          className="flex items-center gap-2 flex-wrap"
                        >

                          <button
                            type="button"
                            onClick={() =>
                              handleArticleClick(
                                article.title
                              )
                            }
                            disabled={
                              redirectLoading ===
                              article.title
                            }
                            className="text-left text-[#2563eb] hover:text-blue-800 font-semibold text-sm sm:text-[15px] leading-relaxed transition-colors break-words"
                          >

                            {redirectLoading ===
                            article.title
                              ? "Loading..."
                              : article.title}

                          </button>

                          {index !==
                            articles.length - 1 && (
                            <span className="text-[#2563eb] font-semibold text-sm sm:text-[15px]">
                              |
                            </span>
                          )}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          {/* Empty State */}
          {!loading &&
            Object.keys(
              groupedArticles
            ).length === 0 && (

              <div className="text-center py-20 text-gray-500">

                No glossary articles found

              </div>

            )}

        </div>

      </main>

      <Footer />

    </div>
  );
}