import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "../components/Testimonials";
import Seo from "../components/Seo";

interface FeatureItem {
  title: string;
  image: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    title: "Fast Loan Processing",
    image: "/Fastloanprocessing.jpg",
    description:
      "Get your loan approved within 24 hours with our streamlined and customer-friendly process.",
  },
  {
    title: "Secure Transactions",
    image: "/secure-transactions.jpg",
    description:
      "With our in-branch systems and rigorous verification steps, your transactions are safe and reliable.",
  },
  {
    title: "Customer Support",
    image: "/customer-support.jpg",
    description:
      "Our dedicated team is ready to assist you through call, text, or branch visits from Monday to Friday.",
  },
  {
    title: "Personalized Banking Experience",
    image: "/personalized.jpg",
    description:
      "We understand your needs. Our staff provides tailored financial solutions to meet your goals.",
  },
  {
    title: "Community-Focused Services",
    image: "/community.jpg",
    description:
      "We prioritize local development, supporting small businesses and education through loans.",
  },
  {
    title: "Accessible Branch ",
    image: "/branch-network.jpg",
    description:
      "Strategically located branches across cebu bring's banking closer to you.",
  },
];

const whyUs = [
  {
    title: "Community-rooted",
    description:
      "A bank that understands the realities of local businesses, farmers, and families.",
  },
  {
    title: "Human-first service",
    description:
      "Real people you can talk to in-branch or over the phone—no confusing processes.",
  },
  {
    title: "Simple, clear products",
    description:
      "Straightforward loan and deposit options, explained in plain language.",
  },
];

const steps = [
  {
    label: "Step 1",
    title: "Talk to us",
    description:
      "Visit any ASPAC branch or give us a call so we can understand what you need.",
  },
  {
    label: "Step 2",
    title: "Submit requirements",
    description:
      "Our team will guide you through the documents needed for your chosen product.",
  },
  {
    label: "Step 3",
    title: "Get approved & enjoy",
    description:
      "Once approved, you can access your funds or start using your account.",
  },
];

const faqs = [
  {
    question: "Who can apply for a loan with ASPAC Bank?",
    answer:
      "We serve salaried individuals, self-employed borrowers, and small business owners, subject to standard credit evaluation.",
  },
  {
    question: "Do I need to visit a branch to apply?",
    answer:
      "You may start your inquiry by phone, but final application and signing of documents are typically done in-branch.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Basic requirements often include valid IDs, proof of income, and, for businesses, relevant business documents. Our branch staff can share the exact list based on your chosen product.",
  },
];

const FeatureCard: React.FC<FeatureItem> = ({ title, image, description }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.2 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-[0_0_15px_#EBD839] transition-shadow duration-300 flex flex-col"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover"
      loading="lazy"
    />
    <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  </motion.article>
);

const Features: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ SEO for /features */}
      <Seo
        title="Banking Features | ASPAC Bank"
        description="Explore ASPAC Bank’s key features — fast loan processing, secure in-branch transactions, dedicated customer support, and community-focused banking across Cebu and nearby areas."
        canonical="https://www.aspacbank.com/features"
        ogType="website"
        ogImage="https://www.aspacbank.com/features3.jpg"
        ogImageAlt="ASPAC Bank fast loan processing, secure transactions, and community-focused banking features"
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
          name: "ASPAC Bank Features",
          description:
            "ASPAC Bank’s Simply Safe banking features include fast loan approvals, secure transactions, accessible branches, and community-focused service for Filipinos.",
          url: "https://www.aspacbank.com/features",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gray-50"
      >
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-aspac-green text-white">
          <img
            src="/features3.jpg"
            alt="Highlights of ASPAC Bank services and community"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-aspac-green/10" />
          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-aspac-yellow mb-3">
                ASPAC BANK FEATURES
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Banking made simple, secure, and closer to home.
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-xl mb-8">
                From fast loan approvals to community-focused banking, ASPAC
                Bank is here to support your plans—whether for your family, your
                farm, or your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-aspac-yellow text-black font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-aspac-yellow/90 transition duration-300 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  Apply for a Loan
                </button>
                <a
                  href="/branches"
                  className="border border-white/80 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-aspac-green transition duration-300 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  Find a Branch
                </a>
              </div>
            </div>

            {/* At a Glance Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white text-gray-900 rounded-2xl shadow-xl p-6 md:p-7"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">
                At a glance
              </h2>
              <ul className="space-y-3 text-sm md:text-base text-gray-700">
                <li>• Fast loan processing with guided in-branch assistance</li>
                <li>
                  • Secure, documented transactions for your peace of mind
                </li>
                <li>• Personalized assessment based on your real situation</li>
                <li>
                  • Strong focus on local communities and small businesses
                </li>
              </ul>
              <p className="mt-6 text-xs text-gray-500">
                Visit your nearest ASPAC Bank branch to learn which product fits
                your needs best.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY ASPAC SECTION */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
                  Why bank with ASPAC?
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  We combine the reliability of a regulated bank with the
                  familiarity of a hometown partner.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                {whyUs.map((item) => (
                  <div
                    key={item.title}
                    className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-100"
                  >
                    <h3 className="font-semibold text-primary mb-1 text-sm md:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              What we offer
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Explore some of the core features that make banking with ASPAC
              simple, reliable, and aligned with your goals.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* CTA under feature cards */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-aspac-yellow text-black font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-aspac-yellow/90 transition duration-300 text-lg focus:outline-none focus:ring-4 focus:ring-aspac-yellow/60"
            >
              Start Your Application
            </button>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-aspac-green">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                How to get started
              </h2>
              <p className="text-white/90 text-sm md:text-base">
                Getting a loan or opening an account with ASPAC Bank is simple.
                Here’s what to expect when you visit us.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/10 border border-white/30 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-aspac-yellow text-black flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/80">
                      {step.label}
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/90">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-18">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                Frequently asked questions
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Here are some of the common questions we receive about our
                services. For anything else, our branches are always ready to
                help.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group bg-gray-50 rounded-2xl border border-primary/20 px-5 py-4"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium text-primary text-sm md:text-base">
                      {item.question}
                    </span>
                    <span className="ml-4 text-xl text-primary group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs md:text-sm text-gray-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-gray-50 py-10 md:py-14">
          <Testimonials />
        </section>

        {/* CONTACT / APPLY MODAL */}
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
                className="bg-white rounded-2xl p-8 max-w-md w-[92%] relative"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Contact ASPAC Bank"
              >
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4 text-center text-sm">
                  Ready to apply or need more information? Get in touch with our
                  team:
                </p>
                <p className="text-gray-900 text-center font-medium text-sm mb-2">
                  Landline: 345-0929, 345-0930
                </p>
                <p className="text-gray-900 text-center font-medium text-sm">
                  Mobile: 0917-127-7796
                </p>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Our staff will gladly walk you through the requirements and
                  next steps for your chosen product.
                </p>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-medium transition duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Features;
