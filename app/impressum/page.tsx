"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HiLightningBolt } from "react-icons/hi";
import Link from "next/link";

const sections = [
    {
        id: "name-sitz",
        title: "Name und Sitz der Gesellschaft",
        content: (
            <>
                <p>URGE IO GmbH</p>
                <p>Urbanstraße 71</p>
                <p>10967 Berlin</p>
            </>
        ),
    },
    {
        id: "kontakt",
        title: "Kontakt",
        content: (
            <p>
                E-Mail:{" "}
                <Link
                    href="mailto:office@urge.io"
                    className="text-[#F98A1A] hover:underline font-medium"
                >
                    office@urge.io
                </Link>
            </p>
        ),
    },
    {
        id: "geschaeftsfuehrer",
        title: "Geschäftsführer",
        content: (
            <>
                <p>Jürgen von Schwerin</p>
                <p>Stefan Dickmann</p>
            </>
        ),
    },
    {
        id: "handelsregistereintrag",
        title: "Handelsregistereintrag",
        content: (
            <>
                <p>Handelsregister des Amtsgerichts Charlottenburg</p>
                <p>Registernummer: HRB 131418 B</p>
            </>
        ),
    },
    {
        id: "umsatzsteuer",
        title: "Umsatzsteuer-Identifikationsnummer",
        content: <p>DE275459315</p>,
    },
    {
        id: "redaktionsanschrift",
        title: "Redaktionsanschrift (V.i.S.d.P.)",
        content: (
            <>
                <p>URGE IO GmbH</p>
                <p>Urbanstraße 71</p>
                <p>10967 Berlin</p>
            </>
        ),
    },
    {
        id: "haftungsausschluss",
        title: "Haftungsausschluss",
        content: (
            <div className="flex flex-col gap-6">
                <section>
                    <strong className="block text-[#313842] mb-1 font-bold">1. Inhalt des Onlineangebotes</strong>
                    <p>
                        Der Autor übernimmt keinerlei Gewähr für die Aktualität, Richtigkeit und Vollständigkeit der bereitgestellten Informationen auf unserer Website. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                    </p>
                </section>

                <section>
                    <strong className="block text-[#313842] mb-1 font-bold">2. Verweise und Links</strong>
                    <p>
                        Bei direkten oder indirekten Verweisen auf fremde Webseiten (“Hyperlinks”), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen, Linkverzeichnissen, Mailinglisten und in allen anderen Formen von Datenbanken, auf deren Inhalt externe Schreibzugriffe möglich sind. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
                    </p>
                </section>

                <section>
                    <strong className="block text-[#313842] mb-1 font-bold">3. Urheber- und Kennzeichenrecht</strong>
                    <p>
                        Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.
                    </p>
                </section>

                <section>
                    <strong className="block text-[#313842] mb-1 font-bold">4. Rechtswirksamkeit dieses Haftungsausschlusses</strong>
                    <p>
                        Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
                    </p>
                </section>
            </div>
        ),
    },
];

export default function ImpressumPage() {
    return (
        <div className="min-h-screen bg-[#e6e7ee] flex flex-col font-sans">
            <Navbar />

            {/* Set pt-20 for consistent top spacing across pages */}
            <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">
                <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">

                    {/* HEADER */}
                    <div className="text-center mb-10">
                        <span className="text-lg uppercase font-extrabold tracking-widest text-[#F98A1A] mb-1 flex items-center justify-center gap-1">
                            <HiLightningBolt className="w-5 h-5" /> Legal
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-4 leading-tight">
                            Impressum
                        </h1>

                        {/* Darker Divider with tight spacing */}
                        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#8895a7] to-transparent mb-5" />

                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Transparency matters to us. All details about the company, contact, and those responsible are clearly summarized here.
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
                                        Inhalt
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