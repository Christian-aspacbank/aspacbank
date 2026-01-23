import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPhone,
  FaClock,
  FaCalendarAlt,
  FaInfoCircle,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";
import Seo from "../components/Seo";
import BspSecurityTipsNewYearAdvisory from "../components/advisories/BspSecurityTipsNewYearAdvisory";

type AdvisoryKind =
  | "Holiday"
  | "Closure"
  | "Relocation"
  | "Compliance"
  | "Service"
  | "General";

type Advisory = {
  id: string;
  kind: AdvisoryKind;
  title: string;
  effective: string; // ISO or friendly
  summary?: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  icon?: React.ReactNode;
  accent?: string; // tailwind color class for left border / pill
  /** NEW: optional custom JSX appended to the advisory body */
  extra?: React.ReactNode;
};

const ADVISORIES: Advisory[] = [
  /** NEW: Bogo Branch Reopening Advisory (from poster image) **/
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
    icon: <FaInfoCircle className="text-white" />,
    accent: "border-primary",
    extra: (
      <BspSecurityTipsNewYearAdvisory
        className="mt-4"
        title="BSP Security Tips – New Year"
        caption=""
      />
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
    icon: <FaCalendarAlt className="text-black" />,
    accent: "border-primary",
    extra: (
      <figure className="mt-4">
        <img
          src="/bogo_reopens.jpg"
          alt="ASPAC Bank Bogo Branch reopening advisory – Reopening on December 15, 2025"
          className="w-full rounded-2xl shadow-md border border-gray-100"
          loading="lazy"
        />
        <figcaption className="mt-2 text-xs text-gray-500">
          Official reopening advisory for ASPAC Bank Bogo Branch.
        </figcaption>
      </figure>
    ),
  },
  /** NEW: Operations Notice from the provided image **/
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
    icon: <FaCalendarAlt className="text-black" />,
    accent: "border-aspac-yellow",
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
    icon: <FaExclamationTriangle className="text-black" />,
    accent: "border-aspac-yellow",
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
    icon: <FaMapMarkerAlt className="text-white" />,
    accent: "border-primary",
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
    icon: <FaInfoCircle className="text-white" />,
    accent: "border-primary",
  },
];

const KIND_BADGE: Record<AdvisoryKind, { bg: string; text: string }> = {
  Closure: { bg: "bg-aspac-yellow", text: "text-black" },
  Relocation: { bg: "bg-primary", text: "text-white" },
  Compliance: { bg: "bg-aspac-green-aa", text: "text-white" },
  Service: { bg: "bg-aspac-green-tint", text: "text-primary" },
  General: { bg: "bg-gray-200", text: "text-gray-800" },
  Holiday: { bg: "bg-gray-200", text: "text-gray-800" },
};

const Hero: React.FC = () => (
  <section className="relative isolate">
    {/* 1200x630 cover works well; center-crops on small screens */}
    <div
      className="h-56 sm:h-64 md:h-72 lg:h-80 w-full bg-center bg-cover"
      style={{
        // Save the provided image to your public folder as
        // /public/advisory-ops-notice-2025-11-05.png
        backgroundImage: "url('/general_advisories1.png')",
      }}
      role="img"
      aria-label="ASPAC Bank Service Advisory – Operations Notice (Nov 5, 2025)"
    />
    {/* soft gradient overlay for contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
  </section>
);

const AdvisoryCard: React.FC<{ a: Advisory; idx: number }> = ({ a, idx }) => {
  const badge = KIND_BADGE[a.kind];
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: idx * 0.06 }}
      className={`bg-white rounded-3xl shadow-brand overflow-hidden border border-gray-100`}
    >
      {/* Header */}
      <div className="relative">
        <div className="bg-gradient-to-r from-primary to-aspac-green px-6 py-6 sm:px-8">
          <div className="flex items-start sm:items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm text-white">
              {a.icon ?? <FaInfoCircle className="text-xl" />}
            </div>
            <div className="min-w-0">
              <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="text-white/80 text-sm mt-1">{a.effective}</p>
            </div>
            <span
              className={`ml-auto hidden sm:inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}
            >
              {a.kind}
            </span>
          </div>
        </div>
        <div
          className={`absolute left-0 top-full h-1 w-full ${
            a.accent ?? "bg-primary"
          }`}
        />
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        {a.summary && (
          <p className="text-gray-800 mb-4 text-[15px] sm:text-base">
            {a.summary}
          </p>
        )}
        <div className="text-gray-700 space-y-4 leading-relaxed">
          {a.paragraphs.map((p, i) => (
            <p key={i} className="text-base">
              {p}
            </p>
          ))}
        </div>

        {/* Render any custom embedded section */}
        {a.extra && <div className="mt-6">{a.extra}</div>}

        {a.cta && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href={a.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-aspac-green-aa text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <FaMapMarkerAlt aria-hidden />
              {a.cta.label}
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
};

const RightRail: React.FC = () => (
  <aside className="md:sticky md:top-6 space-y-4">
    {/* Contacts */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-gray-900 font-semibold mb-3">Need help?</p>
      <div className="grid grid-cols-1 gap-3">
        <a
          href="mailto:customerservice@aspacbank.com"
          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50"
        >
          <FaEnvelope className="text-primary mt-0.5" aria-hidden />
          <span className="text-sm font-medium text-gray-900 break-all">
            customerservice@aspacbank.com
          </span>
        </a>
        <a
          href="tel:+638982722724"
          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50"
        >
          <FaMobileAlt className="text-primary mt-0.5" aria-hidden />
          <span className="text-sm font-medium text-gray-900">
            898 272 2724
          </span>
        </a>
        <a
          href="tel:+63322722724"
          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50"
        >
          <FaPhone className="text-primary mt-0.5" aria-hidden />
          <span className="text-sm font-medium text-gray-900">
            (032) 501 2724
          </span>
        </a>
      </div>
    </div>

    {/* Service status example */}
  </aside>
);

const AdvisoriesPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Advisories & Service Updates | ASPAC Bank"
        description="Stay informed with ASPAC Bank advisories — branch schedules, service changes, compliance notices, and important updates for clients and stakeholders across Cebu and nearby areas."
        canonical="https://www.aspacbank.com/advisories"
        ogType="website"
        ogImage="https://www.aspacbank.com/general_advisories1.png"
        ogImageAlt="ASPAC Bank advisories, service updates, and branch notices"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        /* Match brand & manifest theme color */
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "ASPAC Bank Advisories & Service Updates",
          description:
            "Latest advisories from ASPAC Bank, including branch schedules, service changes, compliance notices, and important updates for clients and stakeholders.",
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

      <div className="min-h-screen bg-gradient-to-br from-aspac-green/5 via-white to-aspac-green/10">
        <Hero />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-10 max-w-6xl grid md:grid-cols-12 gap-6"
        >
          {/* Left: Advisories */}
          <div className="md:col-span-8 space-y-8">
            {/* Page header */}
            <div className="text-left">
              <div className="inline-block bg-aspac-yellow text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Important Updates
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                Bank <span className="text-primary">Advisories</span>
              </h1>
              <p className="text-gray-600">
                Latest announcements and service notices from ASPAC Bank.
              </p>
            </div>

            {ADVISORIES.map((a, i) => (
              <AdvisoryCard key={a.id} a={a} idx={i} />
            ))}

            {/* Standalone Nearby branches block (optional; can keep or remove since Bogo has embedded) */}
            <section
              id="nearby-branches"
              className="bg-white rounded-3xl border border-gray-100 shadow-brand p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" aria-hidden />
                Visit Our Nearby Branches
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-primary/10">
                  <p className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200">
                    ASPAC BANK – Danao Branch
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-primary mt-1" />
                      <span>Pio Del Pilar St., Danao City, Cebu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaPhone className="text-primary" />
                      <span>0917-108-6575</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaClock className="text-primary" />
                      <span>9:00 AM – 3:00 PM (Mon–Fri)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-primary/10">
                  <p className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200">
                    ASPAC BANK – Bantayan Branch
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-primary mt-1" />
                      <span>Ticad, Poblacion Bantayan, Cebu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaPhone className="text-primary" />
                      <span>0917-128-4422</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaClock className="text-primary" />
                      <span>9:00 AM – 3:00 PM (Mon–Fri)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right rail */}
          <div className="md:col-span-4">
            <RightRail />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdvisoriesPage;
