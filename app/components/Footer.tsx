import Link from "next/link";
import Image from "next/image";
// Using react-icons for all social media logos
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-12 px-6 w-full mt-auto">
      {/* justify-items-center: Tablet aur Mobile par sab kuch center karega
        md:justify-items-start: Tab jab md (tablet) screen size aaye, toh left align kar dega
      */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-center md:text-left justify-items-center md:justify-items-start items-center md:items-start">
        {/* Column 1: Resources */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
            Resources
          </h4>
          <Link
            href="/blog"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/glossary"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Glossary
          </Link>
        </div>

        {/* Column 2: Get in Touch */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
            Get in touch
          </h4>
          <Link
            href="/suggest"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Suggest a product
          </Link>
          <Link
            href="/partnerships"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Partnerships
          </Link>
        </div>

        {/* Column 3: Versus */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
            Versus
          </h4>
          <Link
            href="/about"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About us
          </Link>
          <Link
            href="/guidelines"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Editorial guidelines
          </Link>
        </div>

        {/* Column 4: Legal */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
            Legal
          </h4>
          <Link
            href="/imprint"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Imprint
          </Link>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/cookies"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Cookies
          </Link>
        </div>

        {/* Column 5: Branding & Socials */}
        {/* Column 5: Branding & Socials */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Versus Logo"
              width={100}
              height={30}
              className="w-auto h-8"
            />
          </Link>
          <p className="text-gray-400 text-sm">Compare everything</p>

          <div className="flex items-center gap-4 mt-2">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@versus_com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            {/* TikTok */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/versus_comparisons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            {/* Twitter (X) */}
            <a
              href="https://x.com/versus_com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            {/* WhatsApp (Aap yahan apna WhatsApp link daal sakte hain) */}
            <a
              href="https://wa.me/YOUR_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
