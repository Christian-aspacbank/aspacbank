import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUserShield,
  FaAward,
  FaGem,
  FaUserTie,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Seo from "../components/Seo";

interface LoanType {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const loanTypes: LoanType[] = [
  {
    title: "Commercial Loan",
    description:
      "Support for businesses needing working capital or expansion funds.",
    Icon: FaBriefcase as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Real Estate Loan",
    description:
      "Flexible financing for property acquisition, renovation, or construction.",
    Icon: FaBuilding as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Pension Loan",
    description: "Fast-access loans tailored for pensioners and retirees.",
    Icon: FaUserShield as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Honorarium Loan",
    description:
      "Loans for individuals receiving honoraria, such as public servants or consultants.",
    Icon: FaAward as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Chatel Loan",
    description:
      "Secured loans backed by assets for personal or emergency use.",
    Icon: FaGem as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },

  {
    title: "Salary Loan",
    description:
      "Quick and easy loans for employed individuals with flexible terms.",
    Icon: FaUserTie as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
];

const faqs = [
  {
    question: "Do I need to visit a branch to apply?",
    answer:
      "You can start your inquiry by phone, but final application, document submission, and signing are usually done at our branches.",
  },
  {
    question: "How long does loan approval usually take?",
    answer:
      "Processing time varies per product and completeness of documents, but our goal is to keep it as fast and convenient as possible.",
  },
  {
    question: "What documents do I need to prepare?",
    answer:
      "Typical requirements include valid IDs and proof of income. Some loans may require additional business or collateral documents. Our loan officers can provide a detailed checklist.",
  },
];

const steps = [
  {
    label: "Step 1",
    title: "Choose your loan",
    description:
      "Identify whether you need funds for salary, business, real estate, or personal needs.",
  },
  {
    label: "Step 2",
    title: "Talk to our team",
    description:
      "Visit a branch or call us so we can explain the options and requirements based on your situation.",
  },
  {
    label: "Step 3",
    title: "Submit and get approved",
    description:
      "Submit the required documents, complete evaluation, and receive your loan upon approval.",
  },
];

const Loans: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ SEO for /loans */}
      <Seo
        title="Loans | ASPAC Bank"
        description="Explore ASPAC Bank’s loan services including Teacher Salary Loans (APDS) - Enjoy fast approval, low interest, and Simply Safe community banking."
        canonical="https://www.aspacbank.com/loans"
        ogType="website"
        ogImage="https://www.aspacbank.com/loans.jpg"
        ogImageAlt="ASPAC Bank loan services including APDS teacher loans"
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
          name: "ASPAC Bank Loan Services",
          description:
            "ASPAC Bank offers a wide range of loan services including APDS Teacher Loans, — with fast approval, low interest, and Simply Safe banking.",
          url: "https://www.aspacbank.com/loans",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* 🟢 HERO SECTION (commercial bank style) */}
        <section className="relative w-full h-[20rem] sm:h-[22rem] md:h-[24rem] overflow-hidden">
          <img
            src="/loans.jpg"
            alt="Customer signing a loan agreement with a bank officer"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-aspac-yellow mb-3">
                  Loan Products
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Loans for every stage of your life and business.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-xl">
                  From salary and pension loans to commercial and real estate
                  financing, ASPAC Bank offers practical loan solutions guided
                  by real people who understand your needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-aspac-yellow text-black font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-aspac-yellow/90 transition duration-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-aspac-yellow/60"
                  >
                    Apply for a Loan
                  </button>
                  <a
                    href="#loan-products"
                    className="border border-white/80 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white hover:text-aspac-green transition duration-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-white/40"
                  >
                    View Loan Options
                  </a>
                </div>
              </div>

              {/* Highlight Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="hidden md:block bg-white rounded-2xl shadow-xl p-6 text-gray-900"
              >
                <h2 className="text-xl font-semibold text-primary mb-3">
                  Why choose ASPAC loans?
                </h2>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • Practical loan options for individuals and businesses
                  </li>
                  <li>• Clear requirements explained by our loan officers</li>
                  <li>
                    • Branch-based assistance for a more personal approach
                  </li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">
                  Loan approval is subject to credit evaluation and completion
                  of documentary requirements.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🟢 INTRO + CATEGORIES */}
        <section className="px-6 py-14 md:py-16 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Find the loan that fits your needs
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              ASPAC Bank offers a range of loan products—from salary and
              pension-based loans to business and real estate financing—designed
              to support your plans and responsibilities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-4">
            <div className="bg-white rounded-2xl p-5 border border-primary/15 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-aspac-yellow mb-2">
                Individuals
              </p>
              <h3 className="text-base font-semibold text-primary mb-1">
                Salary & Pension Loans
              </h3>
              <p className="text-xs text-gray-600">
                For employees, pensioners, and professionals needing manageable
                monthly payments.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-primary/15 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-aspac-yellow mb-2">
                Businesses
              </p>
              <h3 className="text-base font-semibold text-primary mb-1">
                Commercial & Real Estate Loans
              </h3>
              <p className="text-xs text-gray-600">
                For MSMEs and enterprises needing working capital or property
                acquisition.
              </p>
            </div>
          </div>
        </section>

        {/* 🟢 LOAN PRODUCTS GRID */}
        <section id="loan-products" className="px-6 pb-16 max-w-6xl mx-auto">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Our loan products
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Here are some of the loan types you can inquire about at our
              branches. Our staff can walk you through which one fits your
              situation best.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map(({ title, description, Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-primary/10 shadow-md hover:shadow-[0_0_18px_#EBD839] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-center mb-5">
                  <div className="h-14 w-14 rounded-full bg-aspac-yellow flex items-center justify-center">
                    <Icon className="text-2xl text-aspac-green" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3 text-center">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* CTA under loan grid */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-aspac-yellow text-black font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-aspac-yellow/90 transition duration-300 text-sm md:text-lg focus:outline-none focus:ring-4 focus:ring-aspac-yellow/60"
            >
              Talk to a Loan Officer
            </button>
            <a
              href="#how-it-works"
              className="text-primary font-semibold px-8 py-4 rounded-xl border border-primary/40 hover:bg-primary hover:text-white transition duration-300 text-sm md:text-lg focus:outline-none focus:ring-4 focus:ring-primary/40"
            >
              See How It Works
            </a>
          </div>
        </section>

        {/* 🟢 HOW IT WORKS */}
        <section id="how-it-works" className="bg-aspac-green text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How the loan process works
              </h2>
              <p className="text-sm md:text-base text-white/90">
                Every application is guided by our staff, so you know exactly
                what to prepare and what to expect at each step.
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
                  className="bg-white/10 border border-white/25 rounded-2xl p-6"
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

        {/* 🟢 FAQ SECTION */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-18">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                Loan FAQs
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                Here are some common questions about ASPAC Bank loans. For more
                details, our branches are ready to assist you.
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

        {/* 🟢 FINAL CTA */}
        <section className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Ready to start your loan application?
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base max-w-2xl mx-auto">
              Visit your nearest ASPAC Bank branch or contact our team so we can
              match you with the loan that fits your needs.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-block bg-aspac-yellow text-black px-8 py-4 rounded-xl font-semibold hover:bg-aspac-yellow/90 transition text-sm md:text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-aspac-yellow/60"
            >
              Inquire Now
            </button>
          </div>
        </section>

        {/* 🟢 CONTACT / INQUIRY MODAL */}
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
                aria-label="Contact ASPAC Bank for loans"
              >
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4 text-center text-sm">
                  For loan inquiries or assistance, reach out to us through:
                </p>
                <p className="text-gray-900 text-center font-medium text-sm mb-2">
                  Landline: 345-0929, 345-0930
                </p>
                <p className="text-gray-900 text-center font-medium text-sm">
                  Mobile: 0917-127-7796
                </p>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Our loan officers will guide you through the requirements and
                  next steps for your chosen loan product.
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
      </div>
    </>
  );
};

export default Loans;
