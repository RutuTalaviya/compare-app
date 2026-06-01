"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HiLightningBolt } from "react-icons/hi";
import { getSetting } from "@/app/services/settingService";

interface PartnershipItem {
    _id: string;
    title: string;
    content: string;
}

export default function PartnershipPage() {
    const [data, setData] = useState<PartnershipItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: any = await getSetting();
                setData(response?.data?.partnerships || []);
            } catch (error) {
                console.log("Partnership fetch error:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#e6e7ee] flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">
                <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">

                    {/* HEADER */}
                    <div className="text-center mb-12">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-[#F98A1A] mb-3 flex items-center justify-center gap-1">
                            <HiLightningBolt className="w-3.5 h-3.5" /> Collaborate
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-5 leading-tight">
                            Partnership
                        </h1>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            We believe in the power of collaboration. Explore our partnership
                            opportunities and join us in building the most trusted product
                            comparison platform.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-7 w-48 bg-[#d1d9e6] rounded-xl mb-4" />
                                    <div className="h-[1px] w-full bg-[#d1d9e6] mb-4" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-[#d1d9e6] rounded-lg" />
                                        <div className="h-4 w-[90%] bg-[#d1d9e6] rounded-lg" />
                                        <div className="h-4 w-[75%] bg-[#d1d9e6] rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CONTENT */}
                    {!loading && data.length > 0 && (
                        <div className="space-y-8">
                            {data.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] p-6 sm:p-8 transition-all duration-300 hover:shadow-[8px_8px_18px_#b8c4d2,_-8px_-8px_18px_#ffffff]"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-8 rounded-full bg-[#F98A1A] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff]" />
                                        <h2 className="text-xl sm:text-2xl font-black text-[#313842]">
                                            {item.title}
                                        </h2>
                                    </div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5cdd9] to-transparent mb-5" />
                                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* EMPTY STATE */}
                    {!loading && data.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#e6e7ee] border border-[#d1d9e6] shadow-[4px_4px_8px_#b8c4d2,_-4px_-4px_8px_#ffffff] flex items-center justify-center mb-4">
                                <HiLightningBolt className="w-7 h-7 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-semibold">No partnership data found.</p>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}