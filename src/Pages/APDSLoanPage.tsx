import React, { useState } from "react";
import Seo from "../components/Seo";
import ApplyNowModal from "../components/ApplyNowModal";

import { AnimatePresence, motion } from "framer-motion";
import {
  FaPiggyBank as PiggyBankIcon,
  FaClipboardCheck as ClipboardIcon,
  FaClock as ClockIcon,
  FaMoneyCheckAlt as MoneyIcon,
  FaChevronRight,
  FaPhoneAlt,
} from "react-icons/fa";

const FaPiggyBank = PiggyBankIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FaClipboardCheck = ClipboardIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FaClock = ClockIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaMoneyCheckAlt = MoneyIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-emerald-800 p-6 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#16a34a,transparent)] opacity-40" />
              <div className="mx-auto bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                <FaPhoneAlt className="text-xl text-emerald-300" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-emerald-100/80 text-sm mt-1">
                We are here to assist with your inquiries
              </p>
            </div>

            <div className="p-8 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 transition hover:bg-slate-100/70">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Hotline
                </p>
                <p className="text-lg font-bold text-slate-800">
                  (032) 501-2724
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 transition hover:bg-slate-100/70">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Mobile Number
                </p>
                <p className="text-lg font-bold text-slate-800">
                  0898-272-2724
                </p>
              </div>

              <button
                className="w-full mt-2 bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-700/10 hover:bg-emerald-800 transition duration-200 active:scale-[0.99]"
                onClick={onClose}
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const APDSLoanPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isApplyNowOpen, setIsApplyNowOpen] = useState(false);

  return (
    <>
      <Seo
        title="Teacher Salary Loan (APDS) | ASPAC Bank"
        description="Apply for ASPAC Bank’s Teacher Salary Loan (APDS) with low interest, quick approval, and flexible terms up to 60 months. Enjoy convenient automatic payroll deduction—ideal for teachers and school personnel in Cebu and nearby areas."
        canonical="https://www.aspacbank.com/teachers-loan"
        ogType="service"
        ogImage="https://www.aspacbank.com/aspac-teachers-salary-loan-apds.png"
        ogImageAlt="ASPAC Bank Teacher Salary Loan (APDS) with payroll deduction and flexible terms"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#065f46"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "ASPAC Bank Teacher Salary Loan (APDS)",
          description:
            "Teacher Salary Loan (APDS) by ASPAC Bank with low interest, quick approval, flexible terms up to 60 months, and automatic payroll deduction for teachers and school personnel.",
          url: "https://www.aspacbank.com/teachers-loan",
          provider: {
            "@type": "BankOrCreditUnion",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Cebu, Philippines",
          },
        }}
      />

      <div className="w-full bg-slate-50 min-h-screen text-slate-800 antialiased font-sans">
        {/* Dynamic Image-free Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 overflow-hidden py-20 sm:py-28 px-4 sm:px-8 border-b border-emerald-700/30">
          {/* Ambient light flares */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />

          {/* Subtle grid mesh overlay */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 backdrop-blur-md mb-6 tracking-wide uppercase">
              Exclusive Financial Solutions
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
              APDS Loan for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                Educators
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-emerald-100/80 font-normal leading-relaxed mb-10">
              The Automatic Payroll Deduction Scheme (APDS) is engineered
              tailored to the needs of hardworking educators and school system
              personnel. Accelerate your milestones easily.
            </p>

            {/* Strategic Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href="/files/ASPAC_Salary_loan_form.pdf"
                download="ASPAC_Salary_loan_form.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-emerald-900 font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-950/20 hover:bg-emerald-50 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                aria-label="Download Salary Loan Form (PDF)"
              >
                Download Form
              </a>

              <button
                className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-600 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-950/20 hover:bg-emerald-500 border border-emerald-500/30 transition-all duration-200 active:scale-[0.98]"
                onClick={() => setIsApplyNowOpen(true)}
                aria-label="Apply for APDS Loan"
              >
                Inquire Now
                <FaChevronRight className="ml-2 text-xs opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid Architecture */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: FaPiggyBank,
                title: "Competitive Interest",
                description:
                  "Maximize your financial freedom with market-leading preferred rates.",
              },
              {
                Icon: FaClipboardCheck,
                title: "Streamlined Approval",
                description:
                  "Experience an elegant application flow built to save you physical time.",
              },
              {
                Icon: FaClock,
                title: "Flexible Milestones",
                description:
                  "Structured payment channels distributed comfortably up to 60 months.",
              },
              {
                Icon: FaMoneyCheckAlt,
                title: "Seamless Deductions",
                description:
                  "Worry-free processing routed straight via automatic monthly channels.",
              },
            ].map(({ Icon, title, description }, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Icon className="text-2xl text-emerald-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-emerald-900 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Value Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-sm border border-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute  right-0  w-[400px]  h-[300px] bg-primary/10 rounded-full blur-3xl" />

            <h2 className="text-3xl font-bold text-primary text-center mb-12 tracking-tight">
              Why Professionals Choose the APDS Loan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Optimized interest baselines tailored around government institutional employees.",
                "Amortization horizons running securely over a structured 5-year maximum window.",
                "Zero administrative hassle—no manual transfers or complex payment slip verification steps.",
                "Pre-vetted structures allowing immediate processing pipelines once your packet matches layout norms.",
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs mt-1">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm font-medium text-center sm:text-left">
                Have specific structural questions regarding payroll limits?
                Let’s talk.
              </p>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-emerald-700 font-bold hover:text-emerald-800 transition duration-150 underline decoration-2 underline-offset-4 decoration-emerald-600/30 hover:decoration-emerald-700"
              >
                Speak with our Loan Experts
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <ApplyNowModal
          isOpen={isApplyNowOpen}
          onClose={() => setIsApplyNowOpen(false)}
        />
      </div>
    </>
  );
};

export default APDSLoanPage;
