import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Seo from "./components/Seo";
import AspacChatbot from "./components/AspacChatbot";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./WelcomePage.css";

/**
 * WelcomePage – ASPAC brand integration
 * - Uses Tailwind tokens: bg-primary / text-primary / bg-aspac-yellow
 * - Black text on yellow for accessibility
 * - Stable keys in maps
 */

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // Toggle this if your Layout already renders a global header
  const SHOW_LOCAL_HEADER = false;

  // --- Advisory data (keep short, factual) --- //
  type NewsItem = {
    title: string;
    content: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconColor: string;
    to?: string;
  };

  const news: NewsItem[] = [
    {
      title: "ASPAC Bank Consolacion Moves to a New Building",
      content:
        "We are pleased to announce that ASPAC Bank Consolacion is now operating in its new building at Sta. Lucia Town Center, Poblacion Oriental.",
      label: "Branch Update",
      Icon: FaMapMarkerAlt as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
      iconColor: "text-primary",
      to: "https://www.google.com/maps/place/ASPAC+Rural+Savings+Bank/@10.373832,123.958717,18z", // ✅ open Google Maps
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white text-gray-900"
    >
      {/* SEO */}
      <Seo
        title="ASPAC Bank"
        description="ASPAC Bank empowers teachers and Filipino families with secure banking, fast loan approvals, and low-interest APDS Teacher Salary Loans. Experience Simply Safe banking with reliable savings, deposits, and community-focused financial services."
        canonical="https://www.aspacbank.com/"
        ogType="website"
        ogImage="https://www.aspacbank.com/APDS3.jpg"
        ogImageAlt="ASPAC Bank – Teacher Salary Loan and Secure Banking Services"
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
          "@type": "WebPage",
          name: "ASPAC Bank",
          description:
            "ASPAC Bank empowers teachers and Filipino families with secure banking, fast loan approvals, and low-interest APDS Teacher Salary Loans. Experience Simply Safe banking with reliable savings, deposits, and community-focused financial services.",
          url: "https://www.aspacbank.com/",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
        }}
      />

      {/* Top announcement bar */}
      <div
        className="w-full bg-primary text-white text-sm md:text-[15px] py-2 px-4"
        role="status"
        aria-live="polite"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-6 justify-between">
          <p className="flex items-center gap-2">
            <span
              className="inline-flex h-2 w-2 rounded-full bg-white"
              aria-hidden
            />
            <span className="font-medium">
              Your trusted Bank - serving communities across Cebu and beyond.
            </span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="tel:+63322722724"
              className="inline-flex items-center gap-2 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
            >
              <FaPhoneAlt aria-hidden /> <span>(032) 272-2724</span>
            </a>

            <a
              href="https://www.facebook.com/aspacbank0620/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="ASPAC Bank on Facebook"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <FaFacebookF aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Simple header (hidden when SHOW_LOCAL_HEADER is false to avoid duplication with global header) */}
      {SHOW_LOCAL_HEADER && (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/favicon.ico"
                alt="ASPAC Bank logo"
                className="h-7 w-7 rounded"
                loading="eager"
              />
              <span className="font-semibold tracking-wide group-hover:text-primary">
                ASPAC Bank
              </span>
            </Link>
            <nav aria-label="Primary">
              <ul className="hidden md:flex items-center gap-6 text-sm">
                <li>
                  <Link className="hover:text-primary" to="/teachers-loan">
                    APDS
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" to="/savings">
                    Savings
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" to="/msme-loans">
                    MSME Loans
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" to="/branches">
                    Branches
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" to="/advisories">
                    Advisories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      )}

      {/* HERO Swiper (FADE) */}
      <section className="w-full h-[72vh] min-h-[520px] relative overflow-hidden pb-20 md:pb-0">
        <Swiper
          modules={[Pagination, Autoplay, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 12000, disableOnInteraction: false }} // longer pause
          loop
          speed={1100} // smoother, slower fade
          navigation
          className="w-full h-full"
          aria-roledescription="carousel"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="h-full w-full relative bg-cover bg-center"
              style={{ backgroundImage: "url(/APDS3.jpg)" }}
              role="img"
              aria-label="Teacher in a classroom — ASPAC Teachers’ Salary Loan (APDS)"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

              <div className="absolute left-4 md:left-16 bottom-10 md:bottom-16 max-w-xl">
                <div className="animate-[fadeIn_500ms_ease-out] space-y-3">
                  <h1 className="text-[#ebd839] text-3xl md:text-5xl font-extrabold leading-tight drop-shadow">
                    Fuel your passion for teaching with ASPAC Teachers’ Loan
                  </h1>

                  <p className="text-white/90 text-base md:text-lg max-w-prose">
                    Our Teachers’ Salary Loan (APDS) offers flexible terms and
                    convenient salary deduction for public and private school
                    teachers.
                  </p>

                  <p className="text-white/80 text-sm md:text-base">
                    Learn more about our{" "}
                    <Link
                      to="/teachers-loan"
                      className="underline font-semibold hover:text-white"
                    >
                      Teachers’ Loan (APDS)
                    </Link>
                    .
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/teachers-loan"
                    className="px-5 py-3 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Apply for Teachers’ Loan (APDS)
                  </Link>

                  <button
                    onClick={() => navigate("/branches")}
                    className="px-5 py-3 rounded-full bg-white/90 hover:bg-white text-gray-900 font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/30"
                  >
                    Find a Branch
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="h-full w-full relative bg-cover bg-center"
              style={{ backgroundImage: "url(/Growyoursavings.jpg)" }}
              role="img"
              aria-label="Coins and plants symbolizing savings growth"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
              <div className="absolute left-4 md:left-16 bottom-10 md:bottom-16 max-w-xl">
                <div className="animate-[fadeIn_500ms_ease-out]">
                  <h2 className="text-[#ebd839] text-3xl md:text-5xl font-extrabold leading-tight drop-shadow">
                    Grow your savings with us
                  </h2>
                  <p className="text-white/90 text-base md:text-lg mt-3 max-w-prose">
                    Open a savings or time deposit account at your nearest
                    branch.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-5 py-3 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Talk to Us
                  </button>
                  <Link
                    to="/savings"
                    className="px-5 py-3 rounded-full bg-white/90 hover:bg-white text-gray-900 font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/30"
                  >
                    View Savings
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="h-full w-full relative bg-cover bg-center"
              style={{ backgroundImage: "url(/Simplysafe.jpg)" }}
              role="img"
              aria-label="Shield icon over banking imagery — safety"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
              <div className="absolute left-4 md:left-16 bottom-10 md:bottom-16 max-w-xl">
                <div className="animate-[fadeIn_500ms_ease-out]">
                  <h2 className="text-[#ebd839] text-3xl md:text-5xl font-extrabold leading-tight drop-shadow">
                    Simply safe banking
                  </h2>
                  <p className="text-white/90 text-base md:text-lg mt-3 max-w-prose">
                    Straightforward services and community-first support.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/explore")}
                    className="px-5 py-3 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Know More
                  </button>
                  <Link
                    to="/advisories"
                    className="px-5 py-3 rounded-full bg-white/90 hover:bg-white text-gray-900 font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/30"
                  >
                    View Advisories
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Page-level keyframes for caption fade */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Swiper control polish */
        .swiper-button-next, .swiper-button-prev {
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: 700;
        }
        .swiper-pagination-bullet {
          width: 10px; height: 10px; opacity: 1; background: rgba(255,255,255,0.7);
        }
        .swiper-pagination-bullet-active { background: #459243; } /* brand green */
      `}</style>

      {/* Advisory ticker */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10">
            Advisory
          </span>
          <div
            className="overflow-hidden whitespace-nowrap w-full"
            aria-live="polite"
          >
            <div className="animate-[scroll_18s_linear_infinite] inline-block min-w-full">
              {news.map((n) => (
                <button
                  key={n.title}
                  onClick={() => n.to && navigate(n.to)}
                  className="text-sm md:text-[15px] hover:underline mx-6"
                >
                  {n.title} — {n.content}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core tiles */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-aspac-green/10 to-white pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-[11px] md:text-xs text-primary/80 font-semibold">
              Products & Services
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              Your trusted financial partner
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Save, borrow, and grow locally. Visit any ASPAC branch to get
              started.
            </p>
          </div>

          {/* cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* APDS */}
            <article className="group bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-gray-200 transition">
              <div className="relative">
                <img
                  src="/homesecure.jpg"
                  alt="Teacher loan assistance at a branch"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary text-white text-[11px] px-2.5 py-1 shadow">
                  For Teachers
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-primary">
                  Teacher Salary Loan (APDS)
                </h3>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Simple requirements</li>
                  <li>• Convenient salary deduction</li>
                  <li>• Competitive, transparent rates</li>
                </ul>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    to="/teachers-loan"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-medium shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Apply in-branch
                  </Link>
                </div>
              </div>
            </article>

            {/* Savings */}
            <article className="group bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-gray-200 transition">
              <div className="relative">
                <img
                  src="/homepersonalized.jpg"
                  alt="Savings account opening at the counter"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary text-white text-[11px] px-2.5 py-1 shadow">
                  Deposits
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-primary">
                  Savings & Time Deposit
                </h3>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Safe and dependable</li>
                  <li>• Passbook and ATM-free options</li>
                  <li>• Time deposit terms that work for you</li>
                </ul>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    to="/savings"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-medium shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Open at a branch
                  </Link>
                </div>
              </div>
            </article>

            {/* MSME */}
            <article className="group bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-gray-200 transition">
              <div className="relative">
                <img
                  src="/homecommunityfirst.jpg"
                  alt="Small business owner at a store"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary text-white text-[11px] px-2.5 py-1 shadow">
                  Business
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-primary">
                  MSME Loans
                </h3>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Working capital</li>
                  <li>• Expansion financing</li>
                  <li>• Local decisions, quick turnaround</li>
                </ul>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    to="/msme-loans"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-medium shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    Discuss with a loan officer
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* section CTAs */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/branches")}
              className="px-6 py-3 rounded-full bg-primary hover:bg-aspac-green/90 text-white font-semibold shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
            >
              Locate a branch
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 font-semibold shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Latest News & video feature card */}
      <section
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/latestupdates.webp')" }}
      >
        {/* subtle overlay for readability */}
        <div
          className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-[11px] md:text-xs text-primary/80 font-semibold">
              News & Advisories
            </p>
            <h2 className="text-3xl font-bold text-primary">
              Latest news & updates
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Branch movements, service advisories, and community updates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {news.map(({ title, content, label, Icon, iconColor, to }) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition grid md:grid-cols-[1fr_360px] gap-6 overflow-hidden"
              >
                {/* text */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600">
                      <Icon className={`text-base ${iconColor}`} aria-hidden />
                      <span className="uppercase tracking-wide">{label}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-primary leading-snug">
                    {title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed mt-3">
                    {content}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    {to && (
                      <button
                        onClick={() =>
                          /^https?:\/\//i.test(to)
                            ? window.open(to, "_blank", "noopener,noreferrer") // ✅ opens Google Maps externally
                            : navigate(to)
                        }
                        className="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:bg-aspac-green/90 text-white text-sm font-medium shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
                      >
                        View full advisory
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/advisories")}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      See all advisories →
                    </button>
                  </div>
                </div>

                {/* media */}
                <div className="relative h-56 md:h-auto">
                  <video
                    src="/assets/vid/cnsvid3.webm"
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="Branch feature montage"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-[11px] md:text-xs text-primary/80 font-semibold">
            Customer Stories
          </p>
          <h2 className="text-3xl font-bold text-primary">
            What our clients say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "ASPAC Bank’s loan process was easy. I got the funds I needed to start my small business quickly.",
              name: "Maria Lopez",
              role: "Small Business Owner",
            },
            {
              quote:
                "The staff are very helpful and made my account opening straightforward.",
              name: "John Santos",
              role: "Teacher",
            },
            {
              quote: "I appreciate the security and community focus at ASPAC.",
              name: "Anna Reyes",
              role: "Freelancer",
            },
          ].map(({ quote, name, role }) => (
            <figure
              key={name}
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition"
            >
              <div className="flex items-start gap-4">
                {/* minimalist avatar */}
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <blockquote className="text-gray-800 italic leading-relaxed">
                  “{quote}”
                </blockquote>
              </div>
              <figcaption className="mt-4 pl-14">
                <div className="font-semibold text-primary">{name}</div>
                <div className="text-sm text-gray-500">{role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-7 w-[92%] max-w-md relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Contact ASPAC Bank"
            >
              <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                Contact us
              </h2>
              <p className="text-gray-700 text-center">
                For inquiries or assistance, call:
              </p>
              <div className="text-center mt-3 space-y-1">
                <p className="text-gray-900 font-medium">
                  Landline: 345-0929, 345-0930
                </p>
                <p className="text-gray-900 font-medium">
                  Mobile: 0917-127-7796
                </p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href="tel:+63343450929"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-aspac-green/90 text-white font-medium"
                >
                  Call now
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer with trust badges */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" alt="ASPAC Bank" className="h-8 w-8" />
              <span className="text-primary font-semibold">
                ASPAC Bank, Inc.
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3 max-w-md">
              ASPAC Bank is a community-first rural bank offering savings,
              deposits, and loan products in the Philippines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/teachers-loan" className="hover:underline">
                  Teacher Salary Loan (APDS)
                </Link>
              </li>
              <li>
                <Link to="/deposit-account" className="hover:underline">
                  Savings & Time Deposit
                </Link>
              </li>
              <li>
                <Link to="/msme-loans" className="hover:underline">
                  MSME Loans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/branches" className="hover:underline">
                  Branches
                </Link>
              </li>
              <li>
                <Link to="/advisories" className="hover:underline">
                  Advisories
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Chatbot mounts only on WelcomePage */}
      <AspacChatbot />

      {/* Page-level keyframes & Swiper tweaks */}
      <style>
        {`
  @keyframes scroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  /* Make swiper arrows clearer over photos */
  .swiper-button-next, .swiper-button-prev {
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 18px;
    font-weight: 700;
  }
  /* Larger, high-contrast pagination bullets */
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: rgba(255,255,255,0.7);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #459243; /* brand green */
  }
`}
      </style>
    </motion.div>
  );
};

export default WelcomePage;
