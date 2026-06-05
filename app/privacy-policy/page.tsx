"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { HiLightningBolt } from "react-icons/hi";
import Link from "next/link";

const sections = [
    {
        id: "praeambel",
        title: "Präambel",
        content: (
            <div className="space-y-4">
                <p>
                    In den folgenden Absätzen zeigen wir auf, welche Daten wann und zu welchem Zweck und auf welcher Rechtsgrundlage verarbeitet werden. Dabei soll Ihnen erläutert werden, wie unsere angebotenen Dienste arbeiten und wie dabei der Schutz Ihrer personenbezogenen Daten gewährleistet wird.
                </p>
                <p>Alle Definitionen beziehen sich auf die Datenschutzgrundverordnung (DSGVO).</p>
                <p>
                    Personenbezogene Daten sind gemäß Art. 4 Ziff. 1 DSGVO alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt identifiziert werden kann.
                </p>
                <p>
                    Diese Datenschutzerklärung kann jederzeit unter <a href="https://versus.com/privacy-policy" className="text-[#F98A1A] hover:underline">https://versus.com/privacy-policy</a> abgerufen, abgespeichert und ausgedruckt werden.
                </p>
                <p>
                    Soweit wir als Rechtmäßigkeitsgrundlage für die Verarbeitung personenbezogener Daten unser berechtigtes Interesse oder ein berechtigtes Interesse eines Dritten (Art. 6 Abs. 1 lit. f) DSGVO) anführen, steht Ihnen ein Widerspruchsrecht gemäß Art. 21 DSGVO zu:
                </p>
                <p><strong>Gemäß Art. 21 DSGVO haben Sie das Recht jederzeit gegen die Verarbeitung personenbezogener Daten Widerspruch einzulegen.</strong> Wir verarbeiten die personenbezogenen Daten dann nicht mehr zu Zwecken des Direktmarketings oder einem damit in Verbindung stehenden Profilings.</p>
                <p>
                    Auch zu anderen Zwecken verarbeiten wir Ihre personenbezogenen Daten nach einem Widerspruch nicht, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen; oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (vgl. etwa Art. 21 Abs. 1 DSGVO, sog. „eingeschränktes Widerspruchsrecht“). In diesem Fall müssen Sie für den Widerspruch Gründe darlegen, die sich aus Ihrer besonderen Situation ergeben.
                </p>
                <p>
                    Sie können auch Widerspruch gegen eine Verarbeitung Ihrer personenbezogenen Daten aus Gründen, die sich aus Ihrer besonderen Situation ergeben, einlegen, die zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gemäß Art. 89 Abs. 1 DSGVO erfolgt, es sei denn, die Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden Aufgabe erforderlich (vgl. Art. 21 Abs. 6 DSGVO).
                </p>
                <p>
                    Um in dieser Datenschutzerklärung eine vollständige Übersicht über die Datenverarbeitung abzubilden, wird an verschiedenen Stellen durch Links auf Informationen und Datenschutzhinwiese, die sich auf externen Webseiten (vgl. auch Abschnitt „Soziale Netzwerke & Externe Links“ in dieser Datenschutzerklärung) befinden, verwiesen. Wir sind bemüht die Verlinkungen, die in dieser Datenschutzerklärung aufgeführt werden auch aktuell zu halten. Dennoch ist aufgrund der stetigen Aktualisierung der Webseiten nicht ausgeschlossen, dass Verlinkungen nicht korrekt funktionieren. Sollte Ihnen eine solche Verlinkung auffallen, würden wir uns freuen, wenn Sie uns dies mitteilen, damit wir den aktuellen Link einpflegen können.
                </p>
            </div>
        ),
    },
    {
        id: "verantwortlicher",
        title: "Verantwortlicher",
        content: (
            <div className="space-y-2">
                <p>Verantwortlicher im Sinne des Art. 4 Ziff. 7 DSGVO für die Verarbeitung personenbezogener Daten ist:</p>
                <p>
                    <strong>URGE IO GmbH</strong><br />
                    Urbanstraße 71<br />
                    10967 Berlin<br />
                    <a href="mailto:datenschutz@versus.com" className="text-[#F98A1A] hover:underline">datenschutz@versus.com</a>
                    <span className="text-xs text-gray-400 ml-2">(Hinweis: E-Mail rückwärts gelesen im Originaltext)</span>
                </p>
            </div>
        ),
    },
    {
        id: "betroffenenrechte",
        title: "Betroffenenrechte",
        content: (
            <div className="space-y-4">
                <p>Sie haben grundsätzlich folgende Rechte:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Auskunftsrecht (Art. 15 DSGVO)</li>
                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18f. DSGVO)</li>
                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                </ul>
                <p>
                    Für Anfragen dieser Art kontaktieren Sie bitte hier: <a href="mailto:datenschutz@versus.com" className="text-[#F98A1A] hover:underline">datenschutz@versus.com</a>. Bitte beachten Sie, dass bei derartigen Anfragen sichergestellt werden muss, dass es sich tatsächlich um die betroffene Person handelt.
                </p>
                <p>Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.</p>
                <p>Automatisierte Entscheidungsfindung findet auf unserer Webseite nicht statt.</p>
            </div>
        ),
    },
    {
        id: "datensicherheit",
        title: "Datensicherheit",
        content: (
            <p>
                Unsere Webseite und sonstigen Systeme werden durch technische und organisatorische Maßnahmen gegen Verlust, Zerstörung, Zugriff, Veränderung oder Verbreitung Ihrer Daten durch unbefugte Personen, gesichert. Trotz regelmäßiger Kontrollen ist ein vollständiger Schutz gegen alle Gefahren jedoch nicht möglich.
            </p>
        ),
    },
    {
        id: "log-files",
        title: "Allgemeine Informationen (Log-Files)",
        content: (
            <div className="space-y-4">
                <p>
                    Bei jedem Aufruf unserer Webseite durch Sie werden automatisiert Daten und Informationen vom System Ihres Geräts erfasst, diese werden in sog. Server-Log-Files gespeichert. Bei diesen Daten handelt es sich um Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (hier: Webseitenbesucher) beziehen. Die Daten werden automatisch durch Ihren jeweiligen Browser bei einem Aufruf unserer Webseite übertragen. Hiervon sind folgende Angaben erfasst:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Die Uhrzeit des Aufrufs unserer Webseite (Anfrage an den Server des Hostproviders)</li>
                    <li>URL der Webseite, von welcher aus Sie unsere Webseite aufgerufen haben</li>
                    <li>Das Betriebssystem, welches Sie verwenden</li>
                    <li>Typ und Version des von Ihnen verwendeten Browsers</li>
                    <li>IP-Adresse Ihres Computers</li>
                </ul>
                <p>
                    Zweck dieser Verarbeitung ist die Abrufbarkeit unserer Webseite von Ihrem Gerät und das Ermöglichen einer korrekten Darstellung unserer Webseite auf Ihrem Gerät bzw. in Ihrem Browser. Weiterhin dienen die Daten zur Optimierung unserer Webseite und zur Sicherstellung der Sicherheit unserer Systeme. Eine Auswertung dieser Daten zum Zwecke des Marketings findet nicht statt.
                </p>
                <p>
                    Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f) DSGVO. Es besteht ein berechtigtes Interesse daran, Ihnen eine für Ihren Browser optimierte Webseite zu präsentieren und Ihnen eine Kommunikation zwischen unserem Server und Ihrem Endgerät zu ermöglichen. Für letzteres ist insbesondere die Verarbeitung Ihrer IP-Adresse erforderlich.
                </p>
                <p>Die verarbeiteten Informationen werden nur so lange gespeichert, wie dies für den vorgesehenen Zweck notwendig oder gesetzlich vorgeschrieben ist.</p>
                <p>Empfänger der Daten ist unser Server-Host, der im Rahmen einer Auftragsdatenvereinbarung für uns tätig ist.</p>
                <p>
                    Die Bereitstellung der personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben und auch nicht für einen Vertragsabschluss erforderlich. Sie sind auch nicht verpflichtet, die personenbezogenen Daten bereitzustellen. Die Nichtbereitstellung hätte jedoch zur Folge, dass Sie unsere Webseite nicht bzw. nicht vollumfänglich nutzen können.
                </p>
            </div>
        ),
    },
    {
        id: "cookies",
        title: "Cookies",
        content: (
            <div className="space-y-4">
                <p>
                    Unsere Webseite verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die auf Ihrem Gerät gespeichert werden, um die Nutzung einer Webseite komfortabler zu machen. In Cookies können Eingaben und Einstellungen auf einer Webseite gespeichert werden, so dass Sie diese nicht bei jedem neuen Besuch einer Webseite erneut an- bzw. eingeben müssen. Cookies enthalten eine sogenannte Cookie-ID, wodurch eine Zuordnung des Gerätes möglich ist, in dem das Cookie gespeichert wurde. Im Einzelnen verwenden wir dabei folgende Cookies:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Cookies, welche eine zufällig generierte, konkrete Identifikationsnummer enthalten, welche Sie bzw. Ihr Gerät während Ihres Besuches auf unserer Webseite identifizierbar macht. Diese Cookies werden am Ende Ihres Besuches automatisch gelöscht.</li>
                    <li>Cookies, welche eine zufällig generierte, konkrete Identifikationsnummer enthalten, welche Sie bzw. Ihr Gerät auf unserer Webseite identifizierbar macht. Anhand dieser Cookies, ermitteln wir, ob Sie sich zuvor auf unserer Webseite eingeloggt haben und loggen Sie automatisch ein, sobald sie unsere Webseite erneut besuchen. Diese Cookies werden automatisch nach 13 Monaten gelöscht.</li>
                </ul>
                <p>Zweck dieser Verarbeitung ist es, Ihnen die Nutzung unserer Webseite komfortabel zu gestalten und die Möglichkeit zu bieten, Einstellungen zu speichern.</p>
                <p>Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f) DSGVO. Es besteht ein berechtigtes Interesse daran, Ihnen eine Webseite zu präsentieren, die Ihre persönlichen Einstellungen speichert und Ihnen den Besuch auf unserer Webseite erleichtert.</p>
                <p><strong>Widerspruchsrecht</strong><br />Ihnen steht ein Widerspruchsrecht zu. In Ihren Browsereinstellungen können Sie das Setzen von Cookies einschränken oder gänzlich verhindern. Sie können auch die automatische Löschung von Cookies bei der Schließung des Browserfensters veranlassen.</p>
                <p>Die Bereitstellung der personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben und auch nicht für einen Vertragsabschluss erforderlich. Die Nichtbereitstellung hätte jedoch unter Umständen zur Folge, dass Sie unsere Webseite nicht bzw. nicht vollumfänglich nutzen können.</p>
            </div>
        ),
    },
    {
        id: "google-dienste",
        title: "Informationen zu Google-Diensten",
        content: (
            <div className="space-y-4">
                <p>
                    Auf unserer Webseite werden verschiedene Dienste der Google Inc. ('Google'), 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA verwendet.
                </p>
                <p>
                    Durch die Einbindung der Google Dienste erhebt Google unter Umständen Informationen (auch personenbezogene Daten) und verarbeitet diese. Dabei kann nicht ausgeschlossen werden, dass Google die Informationen auch an einen Server in einem Drittland übermittelt.
                </p>
                <p>
                    Google gibt an, dass grundsätzlich unter anderen folgende Informationen verarbeitet werden können: Protokolldaten (insbesondere die IP-Adresse), Standortbezogene Informationen, Eindeutige Applikationsnummern, Cookies und ähnliche Technologien.
                </p>
                <p>
                    <strong>Google Analytics:</strong> Wir nutzen auf unserer Webseite Google Analytics. Google Analytics verwendet sogenannte „Cookies“. Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung unserer Webseite werden an einen Server von Google übertragen und dort gespeichert. Google Analytics wird nur mit aktivierter IP-Anonymisierung („anonymize IP“) eingesetzt.
                </p>
                <p>
                    <strong>Google Adsense, AdWords & Doubleclick:</strong> Wir nutzen auf Grundlage unserer berechtigten Interessen die Dienste der Google LLC. Wir setzen Adsense mit personalisierten Anzeigen ein, nutzen das Onlinemarketingverfahren Google 'AdWords' und 'Doubleclick', um Anzeigen im Google-Werbe-Netzwerk zu platzieren.
                </p>
                <p>
                    Sie können der Erfassung durch Google Analytics widersprechen (Opt-Out-Cookie) oder die Personalisierung von Anzeigen in Ihren Google-Kontoeinstellungen deaktivieren.
                </p>
            </div>
        ),
    },
    {
        id: "weitere-dienste",
        title: "YouTube & Einbindung von Diensten Dritter",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>YouTube:</strong> Wir nutzen auf unserer Webseite Videos von YouTube und YouTube Plug-Ins. Die Einbindung von YouTube erfolgt durch das Einbetten des Service auf unserer Webseite mittels eines sog. „iFrames“. Beim Laden dieses iFrames erheben YouTube bzw. Google unter Umständen Informationen. Wir selbst erheben keine Daten, wenn Sie sich ein YouTube-Video bei uns anschauen.
                </p>
                <p>
                    <strong>Einbindung von Diensten und Inhalten Dritter:</strong> Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer berechtigten Interessen Inhalts- oder Serviceangebote von Drittanbietern ein, um deren Inhalte und Services (z.B. Videos oder Schriftarten) einzubinden. Dies setzt voraus, dass die Drittanbieter die IP-Adresse der Nutzer wahrnehmen.
                </p>
            </div>
        ),
    },
    {
        id: "kommentierfunktionen",
        title: "Kommentierfunktionen",
        content: (
            <div className="space-y-4">
                <p>
                    Auf unserer Webseite befinden sich verschiedene Kommentierfunktionen, welche Sie nutzen können, um unsere Angebote zu kommentieren oder mit anderen Nutzern in Kontakt zu treten. Wenn Sie diese Funktion nutzen, werden dabei die in den Eingabefeldern eingegebenen Daten verarbeitet.
                </p>
                <p>Beim Absenden der Nachricht werden zudem folgende Daten verarbeitet: Ihre IP-Adresse, Datum und Uhrzeit des Absendens.</p>
                <p>Zweck der Verarbeitung ist es, Ihnen die Möglichkeit zu bieten, sich mit unserer Community auszutauschen und einen Missbrauch unserer Funktionen zu verhindern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f) DSGVO.</p>
            </div>
        ),
    },
    {
        id: "affiliate-marketing",
        title: "Affiliate Marketing Netzwerke",
        content: (
            <div className="space-y-4">
                <p>Wir nutzen auf unserer Webseite verschiedene Affiliate-Netzwerke zur Finanzierung unseres Angebots. Nach dem Anklicken der hinterlegten Links, die zu den Angeboten auf externe Webseiten führen, wird auf Ihrem System ein Cookie des jeweiligen Anbieters abgelegt, das u.a. eine ID enthält, die eine Zuordnung ermöglicht. Ein Profiling durch uns findet zu keiner Zeit statt.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>ADCELL:</strong> betrieben von der Firstlead GmbH, Berlin.</li>
                    <li><strong>Affilinet:</strong> betrieben von der affilinet GmbH, München.</li>
                    <li><strong>AWIN:</strong> betrieben von der AWIN AG, Berlin.</li>
                    <li><strong>Tradedoubler:</strong> betrieben von der Tradedoubler GmbH, München.</li>
                    <li><strong>Webgains:</strong> betrieben von der ad pepper media GmbH, Nürnberg.</li>
                    <li><strong>eBay Partner Network:</strong> betrieben von der eBay Partner Network Inc., USA.</li>
                    <li><strong>Amazon-Partnerprogramm:</strong> betrieben von Amazon Europe Core S.à.r.l. u.a.</li>
                </ul>
                <p>
                    Ihnen steht ein Widerspruchsrecht zu. Sie können das Setzen von Cookies in Ihren Browsereinstellungen verhindern.
                </p>
            </div>
        ),
    },
    {
        id: "mobile-app",
        title: "Mobile App & Push Nachrichten",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>Mobile App:</strong> Es wird Ihnen die Möglichkeit geboten unsere Webseite auch über unsere App zu nutzen. Beim Herunterladen unserer App werden erforderliche Informationen an den jeweiligen App Store (z.B. Google Play, App Store) übertragen. Bei der Benutzung unsere App verarbeiten wir insbesondere IP-Adresse, Datum und Uhrzeit, Betriebssystem und Gerätekennzeichnungen zur korrekten Darstellung.
                </p>
                <p>
                    <strong>Push Nachrichten:</strong> Unsere App nutzt auch einen Push-Service. Nach der Zustimmung registriert sich Ihr Gerät bei dem entsprechenden Push Notification Service (Google Cloud Messaging oder Apple Push-Notification Service). Es wird eine eindeutige Registrierungs-ID („ID“) oder ein Device-Token („Token“) übertragen. Sie können Push-Nachrichten jederzeit in den Systemeinstellungen deaktivieren.
                </p>
            </div>
        ),
    },
    {
        id: "social-media",
        title: "Soziale Netzwerke & Facebook Connect",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>Facebook Connect:</strong> Sie können sich auf unserer Webseite über Facebook mittels Ihres Facebook Kontos anmelden. Dabei werden Profildaten (Name, Alter, Geschlecht, Freundesliste, Profilbild) an uns übermittelt.
                </p>
                <p>
                    <strong>Soziale Netzwerke & Externe Links:</strong> Wir unterhalten Präsenzen in sozialen Medien (Facebook, Twitter, Instagram). Wenn Sie diese besuchen, werden ggf. personenbezogene Daten an die Anbieter übermittelt.
                </p>
                <p>
                    Innerhalb unseres Onlineangebotes können Funktionen von Vimeo, Twitter und Instagram eingebunden werden.
                </p>
            </div>
        ),
    },
    {
        id: "weiteres",
        title: "Weiteres & Änderung der Datenschutzerklärung",
        content: (
            <div className="space-y-4">
                <p>Die auf dieser Website verwendeten Grafiken und Bilder stammen teilweise von depositphotos.com.</p>
                <p><strong>Änderung der Datenschutzerklärung:</strong> Gesetzesänderungen oder Änderungen unserer unternehmensinternen Prozesse können eine Anpassung dieser Datenschutzerklärung erforderlich machen.</p>
                <p className="text-sm text-gray-400 mt-4">Stand: 26.06.2023</p>
            </div>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#e6e7ee] flex flex-col font-sans">
            <Navbar />

            {/* Set pt-20 for consistent top spacing across pages */}
            <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 lg:px-8 pt-28 pb-20">
                <div className="border border-[#d1d9e6] rounded-2xl bg-[#e6e7ee] shadow-[8px_8px_20px_#b8c4d2,_-8px_-8px_20px_#ffffff] p-6 sm:p-8 md:p-10 lg:p-12">

                    {/* HEADER - Updated layout and tightened spacing */}
                    <div className="text-center mb-10">
                        <span className="text-lg uppercase font-extrabold tracking-widest text-[#F98A1A] mb-1 flex items-center justify-center gap-1">
                            <HiLightningBolt className="w-5 h-5" /> Legal
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#313842] mb-4 leading-tight">
                            Privacy & Policy
                        </h1>

                        {/* Darker Divider with tight spacing */}
                        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#8895a7] to-transparent mb-5" />

                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Your privacy matters to us. Learn how we handle, process, and protect your personal data in accordance with the GDPR (Datenschutzerklärung).
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