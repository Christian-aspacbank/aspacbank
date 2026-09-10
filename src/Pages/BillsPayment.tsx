import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaCheckCircle,
  FaFileInvoiceDollar,
  FaBuilding,
} from "react-icons/fa";
import Seo from "../components/Seo";

const BillsPayment: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Seo
        title="Bills Payment Services | ASPAC Bank"
        description="Pay your bills quickly and securely with ASPAC Bank. Enjoy convenient over-the-counter payments for utilities, loans, government services, and partner billers across Cebu and nearby areas."
        canonical="https://www.aspacbank.com/bills-payment"
        ogType="service"
        ogImage="https://www.aspacbank.com/Billspayment.webp"
        ogImageAlt="ASPAC Bank Bills Payment services and over-the-counter transactions"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "ASPAC Bank Bills Payment",
          description:
            "Secure and convenient bills payment service by ASPAC Bank, offering over-the-counter payments for utilities, loans, government services, and partner billers.",
          url: "https://www.aspacbank.com/bills-payment",
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

      <main className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-primary/20">
        {/* 🟢 HERO SECTION: Minimalist Typography & Layout (No Images) */}
        <section className="w-full bg-white border-b border-slate-200/60 py-20 md:py-28 relative overflow-hidden">
          {/* Subtle architectural background accents */}
          <div className="absolute inset-1 bg-[linear-gradient(to_right,#f1f5f9_2px,transparent_2px),linear-gradient(to_bottom,#f1f5f9_2px,transparent_2px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
          <div className="absolute  left-32 md:left-[25%] w-[400px] md:w-[800px] h-[500px] bg-primary/10 rounded-full blur-3xl" />

          <div className="w-full max-w-6xl mx-auto px-6 md:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-primary bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg w-fit mb-6"
            >
              <FaFileInvoiceDollar className="text-sm" /> Over-the-Counter
              Remittance
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-slate-900 mb-6"
                >
                  Streamlined <br />
                  <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                    Bills Payment.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8"
                >
                  Settle your MECO bills and essential utility statements with
                  complete convenience at ASPAC Bank. Skip long payment lines
                  with secure, real-time clearing processing.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  <a
                    href="#how-it-works"
                    className="relative inline-block overflow-hidden text-primary hover:text-white border border-slate-300 hover:border-primary px-6 py-3.5 text-sm md:text-base font-semibold rounded-xl transition-colors duration-300 shadow-sm group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Processing Steps
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-xs text-slate-400 group-hover:text-white" />
                    </span>
                    <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  </a>

                  <a
                    href="#contact-panel"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary px-4 py-2 transition-colors duration-200"
                  >
                    <FaPhoneAlt className="text-xs text-slate-400" /> Direct
                    Inquiries
                  </a>
                </motion.div>
              </div>

              {/* Right Column: Clean geometric Info Slate instead of image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 w-full bg-gradient-to-b from-slate-50 to-slate-100/50 border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm relative group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FaBuilding />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Featured Biller
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Mactan Electric Company
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-200/80 pt-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong className="text-primary font-semibold">
                        Immediate Processing:
                      </strong>{" "}
                      Ledger entries are addressed instantly during teller
                      clearing hours.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong className="text-primary font-semibold">
                        Official Validation:
                      </strong>{" "}
                      Walk away with a certified machine-validated receipt for
                      compliance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🟢 CORE DETAILS & HOW IT WORKS */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">
              Pay Your MECO Bills Quickly and Securely
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-emerald-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              ASPAC Bank provides a convenient environment for clients to
              process utility obligations. Visit any active branch, hand over
              your statement metrics, and our tellers handle the rest.
            </p>
          </div>

          {/* Workflow Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "1. Bring Statement",
                description:
                  "Present your current MECO statement or accurate billing details to any authorized ASPAC Bank branch teller.",
              },
              {
                title: "2. Secure Transfer",
                description:
                  "Your transaction data is passed over securely to avoid duplicate processing errors or ledger backlogs.",
              },
              {
                title: "3. Instant Verification",
                description:
                  "Receive your physical validated voucher receipt confirming successful transmission to the utility matrix.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-slate-300 transition-colors duration-200"
              >
                <h3 className="text-base font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 🟢 CONTACT / INQUIRY BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="contact-panel"
            className="mt-16 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 md:p-10 shadow-md relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Need help with your billing setup?
                </h3>
                <p className="text-slate-300 text-sm md:text-base max-w-xl">
                  Connect directly with our support desk channels to verify
                  operational clearing times or specific branch locations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0 text-sm font-mono font-bold">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
                  <FaPhoneAlt className="text-emerald-400 text-xs" />
                  <span>0898-272-2724</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
                  <FaPhoneAlt className="text-emerald-400 text-xs" />
                  <span>501-2724</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default BillsPayment;
