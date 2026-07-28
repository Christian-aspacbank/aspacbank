import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";
import Seo from "./components/Seo";
import ApplyNowModal from "./components/ApplyNowModal";
// import BspSecurityTipsNewYearAdvisory from "./components/advisories/BspSecurityTipsNewYearAdvisory";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./WelcomePage.css";
import { heroSlides } from "./data/hero";
import { MasonryGrid } from "./module/MasonryGrid";
import { reviews } from "./data/reviews";
import { ReviewCard } from "./module/ReviewCardMasonry";
import { news } from "./data/news";
import ParallaxHero from "./module/Parallax";
import CoreTiles from "./components/CoreTiles";
import LatestNewsSection from "./components/LatestNewsSection";

/**
 * WelcomePage – ASPAC brand integration
 * - Uses Tailwind tokens: bg-primary / text-primary / bg-aspac-yellow
 * - Black text on yellow for accessibility
 * - Stable keys in maps
 */

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  // Toggle this if your Layout already renders a global header

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
        ogImage="https://www.aspacbank.com/aspac-teachers-salary-loan-apds.png"
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

      {/* Single accessible/crawlable page heading — the hero carousel below uses h2 per slide */}
      <h1 className="sr-only">
        ASPAC Bank — Simply Safe Banking, Loans, and Deposit Accounts
      </h1>

      {/* HERO Swiper (FADE) */}
      <ParallaxHero
        slides={heroSlides}
        onNavigate={navigate}
        onApply={() => setShowApplyModal(true)}
        onContact={() => setShowContactModal(true)}
        onExplore={() => navigate("/explore")}
      />

      {/* Advisory ticker */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
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

      <CoreTiles />
      <LatestNewsSection news={news} />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-[11px] md:text-xs text-primary/80 font-semibold">
            Customer Stories
          </p>
          <h2 className="text-3xl font-bold text-primary">
            What our clients say
          </h2>
        </div>
        <MasonryGrid
          items={reviews}
          renderItem={(review) => <ReviewCard review={review} />}
        />
      </section>

      {/* Contact modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 w-[92%] max-w-md relative"
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
              <div className="mt-3 flex justify-center">
                <ul className="space-y-1 text-left">
                  <li className="text-gray-900 font-medium">
                    Hotline: (032)-501-2724
                  </li>
                  <li className="text-gray-900 font-medium">
                    Mobile Number: 0898-272-2724
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-gray-200 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chatbot mounts only on WelcomePage */}
      {/* <AspacChatbot /> */}

      <ApplyNowModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />

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
