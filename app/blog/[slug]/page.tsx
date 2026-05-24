"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar"; // Ensure this path points to your Navbar component
import { Globe, Send, User } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-[#e8edf2] font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Main Content Area - Increased width to 1400px */}
      <main className="flex-grow pt-28 px-5 md:px-8 w-full max-w-[1400px] mx-auto pb-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 tracking-widest uppercase font-medium">
          <Link
            href="/"
            className="text-gray-400 hover:text-black transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/blog"
            className="text-gray-400 hover:text-black transition-colors"
          >
            Blogs
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">
            What-Is-Community-Tourism-Anyway
          </span>
        </div>

        {/* Main Neumorphic Card Container */}
        <article className="bg-[#e8edf2] rounded-3xl p-6 md:p-10 shadow-[8px_8px_16px_#cfd6e0,-8px_-8px_16px_#ffffff] border border-white/60">
          {/* Blog Title */}
          <h1 className="text-3xl md:text-[42px] font-extrabold text-[#0a192f] leading-tight mb-8">
            What is Community Tourism Anyway?
          </h1>

          {/* Author & Action Buttons Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">        

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#e8edf2] rounded-full shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700">
                <GoogleIcon className="w-4 h-4 text-[#DB4437]" />
                Google preferred
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#e8edf2] rounded-full shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Join WhatsApp channel
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#e8edf2] rounded-full shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all border border-white/40 text-xs sm:text-sm font-semibold text-gray-700">
                <Send className="w-4 h-4 text-[#0088cc]" />
                Join Telegram channel
              </button>
            </div>
          </div>

          {/* Hero Image Container - Inset Shadow Wrapper */}
          <div className="w-full rounded-2xl bg-[#e8edf2] shadow-[inset_4px_4px_8px_#cfd6e0,inset_-4px_-4px_8px_#ffffff] p-2 md:p-3 mb-10">
            <img
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80"
              alt="Community Tourism"
              className="w-full h-auto max-h-[600px] object-cover rounded-xl"
            />
          </div>

          {/* Blog Content */}
          <div className="space-y-6 text-[15px] sm:text-base text-gray-800 leading-relaxed font-medium">
            <p>
              In my early days of travelling, circa 2011, I serendipitously
              landed up in a remote, rural, agricultural village in North
              Kerala, surrounded by rice fields, bamboo forests and mist-clad
              hills. There I learnt that local families took turns to host
              travellers like me in their homes, and local guides took turns to
              lead walks and other activities.
            </p>
            <p>
              The majority of the money I paid went to the host families and
              guides, but a small percentage was channeled into a 'village
              development fund.' The entire village voted to decide how that
              money was to be used — from setting up eco-friendly infrastructure
              to upgrading the school to ensuring water security for
              agriculture. This way, tourism in the village — facilitated by
              Kabani — not just benefitted one or two enterprising individuals,
              but the entire community.
            </p>
            <p className="italic border-l-4 border-gray-400 pl-4 my-8 text-gray-600">
              I didn't know it then, but this is what is known in the tourism
              industry as community tourism or CBT, short for community based
              tourism.
            </p>
            <p>
              In the years since, I have actively sought out community tourism
              initiatives around the world. From Thailand to Peru, this has
              allowed me to spend time with local communities and experience
              their way of life, while also ensuring that the money I spend as a
              traveller can be spread out to have a positive impact on the
              people and places I visit.
            </p>
          </div>
        </article>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="text-sm font-semibold text-gray-600 mr-2">
            Share:
          </span>

          <button className="w-10 h-10 rounded-full bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#25D366]">
            <WhatsAppIcon className="w-5 h-5" />
          </button>

          <button className="w-10 h-10 rounded-full bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#0088cc]">
            <Send className="w-4 h-4" />
          </button>

          <button className="w-10 h-10 rounded-full bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#1877F2]">
            <FacebookIcon className="w-4 h-4" />
          </button>

          <button className="w-10 h-10 rounded-full bg-[#e8edf2] shadow-[4px_4px_8px_#cfd6e0,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cfd6e0,inset_-2px_-2px_4px_#ffffff] transition-all flex items-center justify-center border border-white/50 text-[#1DA1F2]">
            <TwitterIcon className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Dark Footer Section */}
      <footer className="bg-[#2d2f33] pt-16 pb-12 px-8 w-full mt-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
              Resources
            </h4>
            <Link
              href="/blog"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/glossary"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Glossary
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
              Get in touch
            </h4>
            <Link
              href="/suggest"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Suggest a product
            </Link>
            <Link
              href="/partnerships"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Partnerships
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/guidelines"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Editorial guidelines
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
              Legal
            </h4>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/licensing"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Licensing
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">
              Download
            </h4>
            <Link
              href="/ios"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              iOS
            </Link>
            <Link
              href="/android"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Android
            </Link>
            <Link
              href="/windows"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              Windows
            </Link>
            <Link
              href="/macos"
              className="text-gray-400 hover:text-white text-[15px] transition-colors"
            >
              MacOS
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
