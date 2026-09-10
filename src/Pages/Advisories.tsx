import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPhone,
  FaClock,
  FaCalendarAlt,
  FaInfoCircle,
  FaMobileAlt,
  FaEnvelope,
  FaSearch,
  FaBullhorn,
  FaExchangeAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Seo from "../components/Seo";

import {
  Advisory,
  AdvisoryKind,
  KIND_BADGE,
  NEARBY_BRANCHES,
} from "../data/advisories";

const getAdvisoryIcon = (kind: AdvisoryKind) => {
  switch (kind) {
    case "Holiday":
      return <FaCalendarAlt className="text-xl" />;
    case "Closure":
      return <FaExclamationTriangle className="text-xl" />;
    case "Relocation":
      return <FaExchangeAlt className="text-xl" />;
    case "Compliance":
      return <FaShieldAlt className="text-xl" />;
    case "Service":
      return <FaBullhorn className="text-xl" />;
    default:
      return <FaInfoCircle className="text-xl" />;
  }
};

const LoansAdvisories: Advisory[] = [
  {
    id: "bsp-security-tips-newyear",
    kind: "General",
    title: "BSP Security Tips – New Year",
    effective: "Posted: January 2026",
    summary:
      "Reminder to stay safe online and protect your accounts this New Year.",
    paragraphs: [
      "Please review the BSP security tips below and stay vigilant against scams and phishing.",
    ],
    extra: (
      // <BspSecurityTipsNewYearAdvisory
      //   className="mt-4"
      //   title="BSP Security Tips – New Year"
      //   caption=""
      // />
      <figure className="mt-4">
        <img
          src="/bspsecuritips_newyear.webp"
          alt="BSP Security Tips – New Year advisory"
          loading="lazy"
          className="w-max justify-self-center md:h-96 rounded-2xl shadow-sm ring-1 ring-gray-100 select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* <figcaption className="mt-2 text-xs text-gray-400 italic">
          Official reopening advisory for ASPAC Bank Bogo Branch.
        </figcaption> */}
      </figure>
    ),
  },

  {
    id: "bogo-reopen-2025-12-15",
    kind: "Service",
    title: "Bogo Branch Reopening – ASPAC Bank Bogo City",
    effective: "Reopening on December 15, 2025",
    summary:
      "Your ASPAC Bank Bogo Branch will soon be ready to serve again. Full banking services resume starting December 15, 2025.",
    paragraphs: [
      "We are reopening on December 15, 2025! Thank you for your patience and understanding.",
      "We stand firm on our commitment to provide safe, secure & dependable banking in the communities we serve.",
      "See you soon at the Bogo Branch located along P. Rodriguez Street, Cogon, Bogo City!",
      "Happy Holidays!",
    ],
    cta: {
      label: "Follow us on Facebook for updates",
      href: "https://www.facebook.com/aspacbank0620",
    },
    extra: (
      <figure className="mt-4">
        <img
          src="/bogo_reopens.jpg"
          alt="ASPAC Bank Bogo Branch reopening advisory"
          className="w-full rounded-2xl shadow-sm border border-gray-100"
          loading="lazy"
        />
        <figcaption className="mt-2 text-xs text-gray-400 italic">
          Official reopening advisory for ASPAC Bank Bogo Branch.
        </figcaption>
      </figure>
    ),
  },
  {
    id: "holiday-advisory-2025-12",
    kind: "Holiday",
    title: "Holiday Advisory – December 2025 to January 2026",
    effective: "Dec 8, 24–25, 30–31, 2025 & Jan 1, 2026",
    paragraphs: [
      "ASPAC Bank will observe the following holidays. Please plan your transactions in advance:",
      "• Monday, December 8, 2025 – Feast of the Immaculate Conception",
      "• Wednesday, December 24, 2025 – Christmas Eve",
      "• Thursday, December 25, 2025 – Christmas Day",
      "• Tuesday, December 30, 2025 – Rizal Day",
      "• Wednesday, December 31, 2025 – New Year’s Eve",
      "• Thursday, January 1, 2026 – New Year’s Day",
      "For questions or concerns, contact our customer service hotline at (898) 272-2724.",
    ],
    cta: {
      label: "Visit our Facebook Page",
      href: "https://www.facebook.com/aspacbank0620",
    },
  },
  {
    id: "ops-notice-2025-11-05",
    kind: "General",
    title: "Service Advisory – Operations Notice (Nov 5, 2025)",
    effective: "November 5, 2025 · 10:00 AM – 3:00 PM",
    paragraphs: [
      "Dear Valued Customers,",
      "Please be informed that our Banilad, Carcar, Talisay, Lapu-Lapu branches and our Head Office in Mandaue will be open for operations from 10:00 AM to 3:00 PM.",
      "The rest of our branches will remain closed for the day, November 5, 2025.",
      "We apologize for any inconvenience. Our priority is the safety and well-being of our employees and customers. Thank you for your understanding.",
    ],
    cta: {
      label: "Visit our Facebook Page",
      href: "https://www.facebook.com/aspacbank0620",
    },
  },
  {
    id: "oslob-grand-opening-2026",
    kind: "New Branch",
    title: "Grand Opening – ASPAC Bank Oslob Branch Lite",
    effective: "September 7, 2026",
    summary:
      "We are pleased to announce the grand opening of ASPAC Bank Oslob Branch Lite, bringing banking services closer to the Oslob community.",
    paragraphs: [
      "Address: Purok Bombil, Lagunde, Oslob, Cebu.",
    ],
    cta: {
      label: "View on Google Maps",
      href: "https://www.google.com/maps/search/?api=1&query=Purok+Bombil%2C+Lagunde%2C+Oslob%2C+Cebu",
    },
  },
  {
    id: "consolacion-relocate-2025",
    kind: "Relocation",
    title: "New Branch Location – ASPAC Bank Consolacion",
    effective: "Effective Immediately",
    summary:
      "We are now operating at our new location in Sta. Lucia Town Center, Poblacion Oriental, Consolacion, Cebu.",
    paragraphs: [
      "Address: ASPAC Bldg., Sta. Lucia Town Center, Poblacion Oriental, Consolacion, Cebu.",
      "Landmark: Across the parking area of CityMall Consolacion.",
      "Coordinates: 10.3739017, 123.9588289.",
    ],
    cta: {
      label: "View on Google Maps",
      href: "https://www.google.com/maps/place/ASPAC+Rural+Savings+Bank/@10.373832,123.958717,18z",
    },
  },
  {
    id: "bsp-c1218-2025",
    kind: "Compliance",
    title: "Additional Requirements for Large Cash Withdrawals",
    effective: "October 3, 2025",
    summary:
      "Per BSP Circular No. 1218 (2025), withdrawals above ₱500,000 require supporting documents to verify the legitimate purpose.",
    paragraphs: [
      "In line with BSP Circular No. 1218 series of 2025, customers making cash withdrawals exceeding ₱500,000 will be required to present additional documents to verify the legitimate purpose of the transaction.",
    ],
  },
];

const Hero: React.FC = () => (
  <section className="relative w-full h-[22rem] sm:h-[26rem] overflow-hidden bg-gray-900">
    <div
      className="absolute inset-0 bg-center bg-cover scale-105 transform brightness-75 transition duration-700"
      style={{ backgroundImage: "url('/general_advisories1.webp')" }}
      role="img"
      aria-label="ASPAC Bank Advisories banner"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-950/40 to-black/50" />
    <div className="absolute inset-0 flex items-center max-w-6xl mx-auto px-6 w-full">
      <div className="max-w-2xl text-white">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#fbbf24] text-black mb-4 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
          Live Announcements
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Advisories & <span className="text-[#459243]">Updates</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl">
          Stay securely informed with corporate operational changes, holiday
          adjustments, security alerts, and system notifications designed to
          protect your banking integrity.
        </p>
      </div>
    </div>
  </section>
);

const AdvisoryCard: React.FC<{ a: Advisory; idx: number }> = ({ a, idx }) => {
  const badgeConfig = KIND_BADGE[a.kind];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
    >
      <div className="p-6 sm:p-8 text-start">
        {/* Card Header Structure */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex gap-4 items-center">
            <div
              className={`p-3 rounded-xl border ${badgeConfig.bg} text-gray-800 transition-transform duration-300 group-hover:rotate-3`}
            >
              {getAdvisoryIcon(a.kind)}
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${badgeConfig.bg}`}
              >
                {a.kind}
              </span>
              <p className="text-xs text-gray-400 font-medium mt-1">
                {a.effective}
              </p>
            </div>
          </div>
        </div>

        {/* Card Heading Content */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#459243] transition-colors duration-200 mb-3">
          {a.title}
        </h3>

        {a.summary && (
          <p className="text-sm text-gray-800 font-semibold bg-gray-50/70 p-3.5 border-l-4 border-emerald-600 rounded-r-xl mb-4 leading-relaxed">
            {a.summary}
          </p>
        )}

        <div className="text-sm text-gray-600 space-y-3 leading-relaxed font-normal">
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {a.extra && <div className="mt-5">{a.extra}</div>}
      </div>

      {/* Card Action footer layout */}
      {a.cta && (
        <div className="px-6 py-5 sm:px-8 bg-gray-50/50 border-t border-gray-100 mt-auto flex items-center justify-end">
          <a
            href={a.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-800 hover:bg-[#459243] hover:text-white border border-gray-200 hover:border-[#459243] px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition duration-200"
          >
            <FaMapMarkerAlt className="text-xs opacity-70" />
            {a.cta.label}
          </a>
        </div>
      )}
    </motion.article>
  );
};

export const RightRail: React.FC = () => (
  <aside className=" lg:top-6 space-y-6">
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 relative overflow-hidden group">
      <div className="absolute top-0 left-0 rotate-180 w-[60%] h-full bg-gradient-to-bl from-[#459243]/10 to-transparent rounded-bl-full pointer-events-none" />
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#459243]" />
        Direct Support Channels
      </h2>
      <div className="space-x-3 flex w-full overflow-x-auto items-center  scrollbar-none  border-r-2 border-primary md:border-none md:border-r-0 p-2 ">
        
        <a
          href="mailto:aspacbank@aspacbank.com"
          className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-gray-50/30 p-3.5 hover:bg-emerald-50/50 hover:border-[#459243]/20 transition-all duration-200 group/link shrink-0 w-[260px]  md:w-max"
        >
          <div className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-lg text-[#459243] group-hover/link:bg-[#459243] group-hover/link:text-white transition-colors duration-200">
            <FaEnvelope />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Email Helpdesk
            </p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              aspacbank@aspacbank.com
            </p>
          </div>
        </a>

        <a
          href="tel:+638982722724"
          className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-gray-50/30 p-3.5 hover:bg-emerald-50/50 hover:border-[#459243]/20 transition-all duration-200 group/link shrink-0 w-[260px] md:w-max"
        >
          <div className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-lg text-[#459243] group-hover/link:bg-[#459243] group-hover/link:text-white transition-colors duration-200">
            <FaMobileAlt />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Mobile Hotline
            </p>
            <p className="text-sm font-semibold text-gray-800">0898 272 2724</p>
          </div>
        </a>

        <a
          href="tel:+63325012724"
          className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-gray-50/30 p-3.5 hover:bg-emerald-50/50 hover:border-[#459243]/20 transition-all duration-200 group/link shrink-0 w-[260px] md:w-max"
        >
          <div className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-lg text-[#459243] group-hover/link:bg-[#459243] group-hover/link:text-white transition-colors duration-200">
            <FaPhone />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Mandaue Landline
            </p>
            <p className="text-sm font-semibold text-gray-800">
              (032) 501 2724
            </p>
          </div>
        </a>
      </div>
    </div>
  </aside>
);

const AdvisoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState<AdvisoryKind | "All">("All");

  const categories: ("All" | AdvisoryKind)[] = [
    "All",
    "Holiday",
    "Closure",
    "Relocation",
    "Compliance",
    "Service",
    "General",
  ];
  
  const filteredAdvisories = useMemo(() => {
    return LoansAdvisories.filter((a) => {
      const matchesKind = selectedKind === "All" || a.kind === selectedKind;
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.paragraphs.some((p) =>
          p.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        (a.summary &&
          a.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesKind && matchesSearch;
    });
  }, [searchQuery, selectedKind]);

  return (
    <>
      <Seo
        title="Advisories & Service Updates | ASPAC Bank"
        description="Stay informed with ASPAC Bank advisories — branch schedules, service changes, compliance notices, and important updates for clients and stakeholders across Cebu."
        canonical="https://www.aspacbank.com/advisories"
        ogType="website"
        ogImage="https://www.aspacbank.com/general_advisories1.webp"
        ogImageAlt="ASPAC Bank advisories, service updates, and branch notices"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "ASPAC Bank Advisories & Service Updates",
          description:
            "Stay informed with ASPAC Bank advisories — branch schedules, service changes, compliance notices, and important updates for clients and stakeholders across Cebu.",
          url: "https://www.aspacbank.com/advisories",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
        }}
      />

      <div className="min-h-screen bg-gray-50/50">
        <Hero />
      

        <section className="max-w-6xl mx-auto px-6 mt-8 space-y-5">
            <RightRail />
        
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Real-time search query container input */}
            <div className="relative w-full md:max-w-xs">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#459243] focus:ring-4 focus:ring-[#459243]/10 transition-all duration-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>

          
            <div className="w-full overflow-x-auto flex items-center gap-2 pb-1 md:pb-0 scrollbar-none justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedKind(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border tracking-wide uppercase ${
                    selectedKind === cat
                      ? "bg-[#459243] text-white border-[#459243] shadow-md shadow-emerald-700/10"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Core Main content interface section layout assembly */}
        <div className="container mx-auto px-6 py-8 max-w-6xl grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Main Advisories stream left block column */}
       
          <div className="lg:col-span-8 space-y-6">
            <h2 className="sr-only">Latest Advisories</h2>
            <AnimatePresence mode="popLayout">
              {filteredAdvisories.length > 0 ? (
                filteredAdvisories.map((a, i) => (
                  <AdvisoryCard key={a.id} a={a} idx={i} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center"
                >
                  <FaInfoCircle className="mx-auto text-3xl text-gray-300 mb-3" />
                  <p className="text-gray-900 font-bold text-lg mb-1">
                    No matches found
                  </p>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    We couldn't find any announcements matching your current
                    filter combination or query parameters.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Standalone Nearby Branch Network Section */}
            <section
              id="nearby-branches"
              className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#459243]" aria-hidden />
                Alternative Nearby Branch Network
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {NEARBY_BRANCHES.map((branch, bIdx) => (
                  <div
                    key={bIdx}
                    className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-gray-900 text-base mb-3 pb-2 border-b border-gray-200/60">
                        {branch.name}
                      </p>
                      <ul className="space-y-2.5 text-sm font-normal text-gray-600">
                        <li className="flex items-start gap-2.5">
                          <FaMapMarkerAlt className="text-[#459243] mt-1 shrink-0 text-xs" />
                          <span>{branch.address}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <FaPhone className="text-[#459243] shrink-0 text-xs" />
                          <span>{branch.phone}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <FaClock className="text-[#459243] shrink-0 text-xs" />
                          <span>{branch.hours}</span>
                        </li>
                        {branch.saturdayHours && (
                          <li className="flex items-center gap-2.5">
                            <FaClock className="text-[#459243] shrink-0 text-xs" />
                            <span>Saturday: {branch.saturdayHours}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

       
        </div>
      </div>
    </>
  );
};

export default AdvisoriesPage;
