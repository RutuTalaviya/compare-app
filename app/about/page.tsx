"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HiEye, HiTag, HiCog, HiUserGroup, HiGlobeAlt, HiLightningBolt } from "react-icons/hi";
import { FaFacebook, FaTwitter, FaDribbble } from "react-icons/fa";
import Image from "next/image";

function AnimatedCounter({ end, duration = 2000, icon: Icon, label }: { end: number; duration?: number; icon: any; label: string }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, end, duration]);

    return (
        <div ref={ref} className="bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-5">
                <Icon className="w-10 h-10 text-[#F98A1A]" />
            </div>
            <span className="text-4xl font-black text-[#313842] mb-2">{count}+</span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        </div>
    );
}

const teamMembers = [
    { name: "Neil Sims", role: "Co-Founder", initial: "N", facebook: "#", twitter: "#", dribbble: "#" },
    { name: "Bonnie Green", role: "Marketing Specialist", initial: "B", facebook: "#", twitter: "#", dribbble: "#" },
    { name: "Christopher Wood", role: "Web Designer", initial: "C", facebook: "#", twitter: "#", dribbble: "#" },
];

const features = [
    { icon: HiEye, title: "Audience", desc: "We understand your audience and create designs that resonate with them, ensuring your brand connects meaningfully with your target market." },
    { icon: HiTag, title: "Branding", desc: "We craft compelling brand identities that tell your story and differentiate you in the marketplace, building lasting connections with your customers." },
    { icon: HiCog, title: "Production", desc: "We bring your vision to life with high-quality production services, ensuring every detail is executed flawlessly from concept to completion." },
];

const socialLinkClass = "w-9 h-9 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[3px_3px_6px_#b8c4d2,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-gray-500 hover:text-[#F98A1A] transition-all duration-200";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#e6e7ee]">
            <Navbar />
            <main className="max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">

                {/* HERO */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#F98A1A] mb-3 flex items-center justify-center gap-1">
                        <HiLightningBolt className="w-3.5 h-3.5" /> About Us
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-5 leading-tight">
                        We are Themesberg
                    </h1>
                    <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                        Themesberg is an independent branding & experience design company working at the intersection of culture, design, and technology.  </p>
                    <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#e6e7ee] border border-[#d1d9e6] rounded-xl shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff] text-[#313842] font-bold transition-all duration-300">
                        <HiLightningBolt className="w-4 h-4 text-[#F98A1A]" />
                        Our works
                    </button>
                </div>

                {/* FEATURES */}
                <div className="bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[inset_6px_6px_12px_#b8c4d2,_inset_-6px_-6px_12px_#ffffff] p-8 md:p-12 mb-16 md:mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                        {features.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[6px_6px_12px_#b8c4d2,_-6px_-6px_12px_#ffffff] flex items-center justify-center mb-6">
                                    <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#F98A1A]" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-[#313842] mb-3">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DESIGN WITH US */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-16 md:mb-20 items-center">
                    <div className="order-2 lg:order-1">
                        <div
                            className="w-full max-w-[460px] aspect-square mx-auto border border-[#d1d9e6] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] overflow-hidden"
                            style={{ borderRadius: "63% 37% 70% 30% / 50% 45% 50% 55%" }}
                        >
                            <Image
                                src="/about-us-1.jpg"
                                alt="About Us"
                                width={600}
                                height={460}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: "63% 37% 70% 30% / 50% 45% 50% 55%" }}
                            />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#313842] mb-6 leading-tight">
                            Design with us, Develop Anything.
                        </h2>
                        <div className="space-y-4 text-sm sm:text-base text-gray-500 leading-relaxed mb-8">
                            <p>Themesberg is an experienced and passionate group of designers, developers, project managers, writers and artists. Every client we work with becomes a part of the team. Together we face the challenges and celebrate the victories.</p>
                            <p>Our small team is active in the creative community, endlessly interested in what next, and generally pleasant to be around.</p>
                        </div>
                        <div className="mt-6">
                            <Image
                                src="/signature.svg"
                                alt="Compare Universe Signature"
                                width={200}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                    <AnimatedCounter end={245} duration={2000} icon={HiUserGroup} label="Team Members" />
                    <AnimatedCounter end={816} duration={2000} icon={HiEye} label="Products Compared" />
                    <AnimatedCounter end={80} duration={2000} icon={HiGlobeAlt} label="Countries" />
                </div>



            </main>
            <Footer />
        </div>
    );
}
