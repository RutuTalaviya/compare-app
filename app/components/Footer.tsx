"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0f0f] via-[#2d2d2d] to-[#4a4a4a] text-white pt-8">
      <div className="max-w-[1650px] mx-auto px-10">
        {/* Top Footer */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-zinc-700 pb-7">
          
          {/* Resources */}
          <div className="md:border-r border-zinc-700">
            <h3 className="text-white font-bold uppercase text-lg mb-8">
              Resources
            </h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm md:text-base">
              <Link href="/" className="hover:text-white transition">
                Blog
              </Link>

              <Link href="/" className="hover:text-white transition">
                Glossary
              </Link>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="md:border-r border-zinc-700 md:px-10">
            <h3 className="text-white font-bold uppercase text-lg mb-4">
              Get In Touch
            </h3>

            <div className="flex flex-col gap-6 text-gray-400 text-[18px]">
              <Link href="/" className="hover:text-white transition">
                Suggest a product
              </Link>

              <Link href="/" className="hover:text-white transition">
                Partnerships
              </Link>

              <Link href="/" className="hover:text-white transition">
                About Us
              </Link>

              <Link href="/" className="hover:text-white transition">
                Contact Us
              </Link>

              <Link href="/" className="hover:text-white transition">
                Editorial guidelines
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="md:border-r border-zinc-700 md:px-10">
            <h3 className="text-white font-bold uppercase text-lg mb-8">
              Legal
            </h3>

            <div className="flex flex-col gap-6 text-gray-400 text-[18px]">
              <Link href="/" className="hover:text-white transition">
                Privacy Policy
              </Link>

              <Link href="/" className="hover:text-white transition">
                Licensing
              </Link>

              <Link href="/" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Download */}
          <div className="md:px-10">
            <h3 className="text-white font-bold uppercase text-lg mb-8">
              Download
            </h3>

            <div className="flex flex-col gap-6 text-gray-400 text-[18px]">
              <Link href="/" className="hover:text-white transition">
                iOS
              </Link>

              <Link href="/" className="hover:text-white transition">
                Android
              </Link>

              <Link href="/" className="hover:text-white transition">
                Windows
              </Link>

              <Link href="/" className="hover:text-white transition">
                MacOS
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between py-5">
          <p className="text-gray-300 text-lg">
            © 2025 Compare™. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 mt-6 md:mt-0 text-2xl text-white">
            <Link href="/">
              <FaFacebookF className="hover:scale-110 transition" />
            </Link>

            <Link href="/">
              <FaDiscord className="hover:scale-110 transition" />
            </Link>

            <Link href="/">
              <FaTwitter className="hover:scale-110 transition" />
            </Link>

            <Link href="/">
              <FaGithub className="hover:scale-110 transition" />
            </Link>

            <Link href="/">
              <FaDribbble className="hover:scale-110 transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;