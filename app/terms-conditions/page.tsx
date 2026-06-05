"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HiLightningBolt } from "react-icons/hi";
import Link from "next/link";

const sections = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <div className="space-y-4">
                <p>
                    versus.com is not a shop but a product comparison platform – it is not possible to order any product directly from the website.
                </p>
                <p>
                    You may only use versus.com (hereafter also referred to as “Site”) after agreeing to the following terms and conditions, which are effective immediately.
                </p>
                <p>
                    Our site is operated by URGE IO GmbH, Urbanstraße 71, 10967 Berlin, Germany (hereafter referred to as “Versus”).
                </p>
            </div>
        ),
    },
    {
        id: "introduction",
        title: "Introduction",
        content: (
            <div className="space-y-4">
                <p>
                    These terms & conditions, along with the Privacy Policy, are legal agreements between you and Versus. By using, accessing or registering at versus.com, you agree to all the terms and conditions of this agreement. If you do not agree with these, then please do not access or use the Site.
                </p>
                <p>
                    Versus has the right to modify, add, or remove items in this agreement at any time by posting the amended terms on its Site.
                </p>
            </div>
        ),
    },
    {
        id: "abuse",
        title: "Abuse on the site",
        content: (
            <div className="space-y-4">
                <p>
                    Versus and its users make sure the site, and all other services, are working properly, and other users are safe. In case of any problems, whether it be offensive content, or policy violations, please report these to us. Versus may:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>limit, suspend, or terminate services and user accounts;</li>
                    <li>prohibit access to the site and its content;</li>
                    <li>delay or remove hosted content;</li>
                    <li>take technical and legal steps if users are creating problems, whether this has to do with the intellectual property rights of third parties, or with not respecting the guidelines listed in this document.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "merchants",
        title: "Third-party merchants",
        content: (
            <div className="space-y-4">
                <p>
                    Versus.com provides a number of different services to help you purchase products. We provide you with information and links to third-party merchants that are selling products listed on our site. Versus is paid by merchants or other third parties to list their products. You acknowledge that Versus.com does not sell, resell or license any products listed on their site, nor is it acting as an agent of sale.
                </p>
                <p>
                    Information provided by Versus or other users of the site is purely informative. We are not responsible or liable for: the availability or price accuracy of such third party websites; and the content, products or services on or available from such websites or resources. You take full responsibility for and assume all risk that comes from you using websites listed on versus.com. When using third party vendors you have to read their user agreement and Privacy Policy.
                </p>
                <p>
                    You also agree that, to the extent allowable by law, Versus holds no responsibility for or liability related to such products. You agree that any questions, complaints or claims about merchants (for example, about their products, conditions, warranties, customer service or delivery) will be directed to the appropriate merchant.
                </p>
                <p>
                    If you have a dispute with any users or merchants on the site, you release the site and the Versus employees from any costs or claims of any nature related to such a dispute, to the extent permitted by applicable law.
                </p>
            </div>
        ),
    },
    {
        id: "content",
        title: "Content",
        content: (
            <p className="space-y-4">
                All content appearing on versus.com is the exclusive property of Versus and its licensors. You may not copy, reproduce, modify or create derivative works from, distribute, sell, transfer, publicly display, publicly perform, transmit or otherwise use the content appearing on the site without the prior express written permission of Versus or the appropriate third party, as applicable.
            </p>
        ),
    },
    {
        id: "content-submission",
        title: "Content Submission",
        content: (
            <div className="space-y-4">
                <p>
                    When you submit or contribute to any content on versus.com, you warrant that you are the author and owner of the intellectual property rights or own the rights owned by a third party. You grant Versus a worldwide, perpetual (as permitted by law), irrevocable, royalty-free, sublicensable (through multiple tiers) and transferable right and license to use, copy, modify, delete in its entirety, adapt, publish, translate, create derivative works from, sell and distribute, or incorporate such materials into any form, medium or technology, and exercise any and all copyright, trademark, publicity, and database rights you have in the content, in any media known now or in the future, without compensation to you and for the complete duration of such rights. You acknowledge and agree that, without notice to you, we can reproduce, publish and distribute your content online and offline and permit others to do the same. None of the materials or information submitted by you shall be subject to any obligation of confidence on the part of Versus, its agents, subsidiaries, affiliates, co-brand partners or other partners and their respective directors, officers and employees.
                </p>
                <p>You agree that you shall not post any information:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>that is false, inaccurate, or misleading;</li>
                    <li>that infringes any third party’s copyright, patent, trademark, trade secret or other proprietary rights or rights of publicity or privacy;</li>
                    <li>that violates any law, statute, ordinance or regulation;</li>
                    <li>that is or may reasonably be considered to be defamatory, to any individual, partnership or corporation;</li>
                    <li>for which you were compensated in any way by a third party;</li>
                    <li>that includes addresses, email addresses, contact information, phone numbers or websites outside of Versus; or</li>
                    <li>that contains any computer viruses, or other potentially damaging computer programs;</li>
                </ul>
                <p>
                    Versus reserves the right to change or delete any content on the site that violates its content guidelines.
                </p>
            </div>
        ),
    },
    {
        id: "copyright",
        title: "Copyright",
        content: (
            <p className="space-y-4">
                All content available on the site, including design, text, graphics, interfaces and the selection of arrangements is owned by Versus, or third parties protected by intellectual property rights.
            </p>
        ),
    },
    {
        id: "disclaimer",
        title: "Disclaimer of Warranties; Limitation of Liability",
        content: (
            <div className="space-y-4">
                <p>
                    You acknowledge that URGE IO Gmbh, the Site, Versus cannot guarantee the continuous operation of or access to our sites, services such as embeddable iframes, applications, or tools, as a result of technical issues or numerous factors outside of our control. You agree that you are making use of our sites, and any other services at your own risk, on an "AS IS” and "AS AVAILABLE” basis. The Site and all service such as embeddable iframes can be revoked and changed at any time. Accordingly, to the extent permitted by applicable law, we exclude all express or implied warranties, terms and conditions including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                    Versus does not warrant that product descriptions, pricing, editorial commentary or any other content on its site or embeddable iframes, regardless of its source, are accurate, complete, reliable, current, accessible or error-free. Versus provides content for informational purposes only, and does not endorse any product, service, or merchant. Versus takes no liability for inaccuracy or incompleteness in its search results, editorial content, user comments, embeddable iframes or other content on Versus.
                </p>
                <p>
                    Versus does not warrant and takes no liability that embeddable iframes from versus.com will be accessible; embeddable iframes from versus.com can be changed and revoked at any time.
                </p>
            </div>
        ),
    },
    {
        id: "applicable-law",
        title: "Applicable Law",
        content: (
            <p className="space-y-4">
                The use of the websites and these General Terms and Conditions are governed by the laws of the Federal Republic of Germany, whereby the UN Convention on Contracts for the International Sale of Goods (CISG) does not apply.
            </p>
        ),
    },
];

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-[#e6e7ee] flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">
                <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">

                    {/* HEADER - Updated layout and tightened spacing */}
                    <div className="text-center mb-10">
                        <span className="text-lg uppercase font-extrabold tracking-widest text-[#F98A1A] mb-1 flex items-center justify-center gap-1">
                            <HiLightningBolt className="w-5 h-5" /> Legal
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-4 leading-tight">
                            Terms & Conditions
                        </h1>

                        {/* Divider moved up, removed mt-8, and added mb-5 for tight spacing */}
                        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#8895a7] to-transparent mb-5" />

                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Please read these terms and conditions carefully before using our platform. They contain important information about your rights and obligations.
                        </p>
                    </div>

                    {/* LAYOUT: Content + Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* MAIN CONTENT */}
                        <div className="flex-1 space-y-6">
                            {sections.map((item) => (
                                <div
                                    key={item.id}
                                    id={item.id}
                                    className="scroll-mt-32 bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] p-6 sm:p-8 transition-all duration-300 hover:shadow-[8px_8px_18px_#b8c4d2,_-8px_-8px_18px_#ffffff]"
                                >
                                    {/* Title row */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-8 rounded-full bg-[#F98A1A] shadow-[2px_2px_4px_#b8c4d2,_-2px_-2px_4px_#ffffff]" />
                                        <h2 className="text-xl sm:text-2xl font-black text-[#313842]">
                                            {item.title}
                                        </h2>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5cdd9] to-transparent mb-5" />

                                    {/* Content */}
                                    <div className="text-sm sm:text-base text-gray-500 leading-relaxed space-y-1">
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SIDEBAR TOC */}
                        <aside className="w-full lg:w-72 lg:sticky lg:top-28">
                            <div className="bg-[#e6e7ee] border border-[#d1d9e6] rounded-2xl shadow-[6px_6px_14px_#b8c4d2,_-6px_-6px_14px_#ffffff] p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-2 h-6 rounded-full bg-[#F98A1A]" />
                                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#313842]">
                                        Content
                                    </span>
                                </div>
                                <nav className="flex flex-col gap-2">
                                    {sections.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-[#313842] transition-all duration-200
                                                hover:shadow-[inset_3px_3px_6px_#b8c4d2,_inset_-3px_-3px_6px_#ffffff]
                                                hover:text-[#F98A1A]"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5cdd9] group-hover:bg-[#F98A1A] transition-colors duration-200 flex-shrink-0" />
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}