import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWallet,
  FaMoneyCheck,
  FaClock,
  FaPiggyBank,
  FaCheckCircle,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaMapMarkedAlt,
  FaChevronDown,
  FaPhoneAlt,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import Seo from "../components/Seo";
import { IoMdOpen } from "react-icons/io";

const DepositAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const products = [
    {
      name: "Power Savings Account",
      type: "Savings",
      image: "/Powersavings.jpg",
      tagline: "Ideal for everyday savings and salary crediting.",
      minInitial: "₱1,000",
      maintaining: "₱1,000",
      interest: "Competitive tiered rate",
      access: "Passbook / ATM (where available)",
      bestFor: "Savers who want flexibility and easy access to funds.",
    },
    {
      name: "Power Checking Account",
      type: "Checking",
      image: "/PCA.jpg",
      tagline: "For active transactions and bill payments.",
      minInitial: "₱5,000",
      maintaining: "₱5,000",
      interest: "Competitive rate",
      access: "Checkbook & over-the-counter",
      bestFor:
        "Business owners, professionals, and clients with frequent payments.",
    },
    {
      name: "Time Deposit",
      type: "Time Deposit",
      image: "/TD.jpg",
      tagline: "Lock in your funds and earn higher interest.",
      minInitial: "₱10,000",
      maintaining: "N/A (fixed term)",
      interest: "Preferential time deposit rates",
      access: "Withdraw at maturity",
      bestFor:
        "Clients with surplus funds who want higher returns over a set period.",
    },
    {
      name: "Special Savings",
      type: "Savings",
      image: "/SS.jpg",
      tagline: "Build savings for specific goals.",
      minInitial: "₱2,000",
      maintaining: "₱2,000",
      interest: "Goal-based preferential rate",
      access: "Passbook / over-the-counter",
      bestFor:
        "Families and individuals with target goals (tuition, travel, etc.)",
    },
  ];

  const faqs = [
    {
      q: "Is ASPAC Bank PDIC insured?",
      a: "Yes. Deposits are insured by the PDIC (Philippine Deposit Insurance Corporation) up to the maximum coverage per depositor.",
    },
    {
      q: "What valid IDs do I need to bring?",
      a: "You may bring at least one (1) government-issued valid ID such as PhilID, Passport, Driver’s License, PRC ID, UMID, or SSS/GSIS ID. Additional documents may be requested based on your chosen account.",
    },
    {
      q: "Can I open an account if I’m based outside Cebu?",
      a: "Yes, you may visit any ASPAC Bank branch. For guidance, please contact us so we can help direct you to the nearest available branch.",
    },
    {
      q: "Do you offer payroll or teacher deposit accounts?",
      a: "ASPAC Bank offers specialized accounts and loan products for teachers and payroll arrangements. You may contact us for details on APDS and salary-crediting options.",
    },
  ];


  const getProductIcon = (type: string) => {
    switch (type) {
      case "Savings":
        return <FaWallet className="text-xl" />;
      case "Checking":
        return <FaMoneyCheck className="text-xl" />;
      case "Time Deposit":
        return <FaClock className="text-xl" />;
      default:
        return <FaPiggyBank className="text-xl" />;
    }
  };

  return (
    <>
      {/* ✅ SEO for /deposit-account */}
      <Seo
        title="Deposit Accounts | ASPAC Bank"
        description="Open a secure and reliable deposit account with ASPAC Bank. Enjoy safe savings, easy withdrawals, competitive interest, and community-focused banking designed for Filipino families and educators."
        canonical="https://www.aspacbank.com/deposit-account"
        ogType="product"
        ogImage="https://www.aspacbank.com/DepositAccount.jpg"
        ogImageAlt="ASPAC Bank secure savings and deposit account services"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BankAccount",
          name: "ASPAC Bank Deposit Account",
          description:
            "ASPAC Bank offers secure and dependable deposit accounts with competitive interest rates, easy access, and Simply Safe banking for Filipino families and educators.",
          url: "https://www.aspacbank.com/deposit-account",
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

      <div className="bg-slate-50/70 min-h-screen font-sans antialiased selection:bg-[#ebd839]/30">
        {/* 🟢 HERO SECTION LAYOUT */}
        <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-emerald-950">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 opacity-40 brightness-[0.4] pointer-events-none transition-transform duration-[8s] ease-out"
            style={{ backgroundImage: "url(/DepositAccount.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Elegant Modern Breadcrumb */}
            <nav className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-wider text-white/90 mb-8 shadow-sm">
              <span className="opacity-60 hover:text-white transition-colors cursor-pointer">
                Home
              </span>
              <span className="text-white/30 text-[10px]">/</span>
              <span className="text-[#ebd839] font-bold">Deposit Accounts</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-[#ebd839] tracking-tight leading-[1.10]">
                  Deposit Accounts
                </h1>
                <p className="text-base sm:text-lg text-slate-200/90 mb-8 max-w-xl leading-relaxed">
                  Secure, flexible, and designed for your goals. From everyday
                  savings to time deposits, ASPAC Bank makes it Simply Safe to
                  grow and manage your money.
                </p>

                {/* Core Buttons Layout (Preserved Logic) */}
                <div className="flex flex-wrap gap-4">
                  {/* <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#ebd839] text-green-900 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
                  >
                    Talk to a Banking Officer
                  </button> */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="relative inline-block mt-6 overflow-hidden text-white border border-white px-6 md:px-6 py-3 text-sm md:text-base font-light md:font-semibold rounded shadow group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Talk to a Banking Officer
                      <IoMdOpen className="group-hover:scale-125   transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-primary  translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                  <a
                    href="/branches"
                    className="relative inline-block md:mt-6 overflow-hidden text-white border border-white px-6 md:px-6 py-3 text-sm md:text-base font-light md:font-semibold rounded shadow group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Find a Branch
                      <FaArrowRight className="group-hover:-translate-y-0.5   relative -top-0.5 -rotate-12  transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-primary  translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </a>
                </div>
              </div>

              {/* Quick Choice Side Deck */}
              <div className="lg:col-span-5 hidden lg:block">
                <motion.div
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-white border border-white/10 shadow-2xl"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#ebd839] mb-4">
                    Choose the account that fits you
                  </h2>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Power Savings Account",
                        desc: "for everyday saving and salary crediting.",
                      },
                      {
                        name: "Power Checking Account",
                        desc: "for active payments, checks, and transactions.",
                      },
                      {
                        name: "Time Deposit",
                        desc: "for higher returns on fixed terms.",
                      },
                      {
                        name: "Special Savings",
                        desc: "for structured saving towards your goals.",
                      },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-slate-100 group"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-[#ebd839] shrink-0 shadow-sm shadow-yellow-500/50" />
                        <span className="leading-relaxed">
                          <strong className="text-white font-bold">
                            {item.name}
                          </strong>{" "}
                          – {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 🟢 WHY & HOW SECTION LAYOUT */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Why Choose Block Wrapper */}
            <motion.div
              className="bg-white shadow-xl shadow-slate-200/60 rounded-3xl p-8 lg:p-10 border border-slate-100 flex flex-col justify-between relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 justify-self-center md:justify-self-start">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-4">
                  Why choose an ASPAC Deposit Account?
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mb-6 leading-relaxed">
                  Our accounts are built around your needs as a Filipino saver,
                  worker, educator, or business owner:
                </p>
                <ul className="space-y-3.5 text-slate-700 text-xs sm:text-sm">
                  {[
                    "Competitive interest rates to help grow your savings.",
                    "Simple requirements and fast account opening.",
                    "Free or low account maintenance, depending on the product.",
                    "Accessible branches and friendly banking officers.",
                    "Simply Safe banking with a community-focused rural bank.",
                  ].map((text, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-emerald-600 text-sm mt-1 shrink-0" />
                      <span className="leading-normal font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* How to Open Block Wrapper */}
            <motion.div
              className="bg-white shadow-xl shadow-slate-200/60 rounded-3xl p-8 lg:p-10 border border-slate-100 flex flex-col justify-between relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-start">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-700 flex items-center justify-center mb-6 justify-self-center md:justify-self-start">
                  <FaFileInvoiceDollar className="text-xl" />
                </div>
                <h2 className="text-2xl sm:text-3xl text-start font-bold text-accent tracking-tight mb-4">
                  How to open a Deposit Account
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mb-6 leading-relaxed">
                  Opening an account with ASPAC Bank is easy:
                </p>
                <ol className="space-y-4 text-slate-700 text-xs sm:text-sm">
                  {[
                    "Visit your nearest ASPAC Bank branch.",
                    "Bring valid government-issued IDs and proof of address (if required).",
                    "Choose the deposit product that fits your needs with help from our banking officer.",
                    "Deposit the initial amount and receive your account details.",
                  ].map((text, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                        {index + 1}
                      </span>
                      <span className="leading-normal font-medium">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Requirements may vary depending on the account type and
                regulatory guidelines.
              </div>
            </motion.div>
          </div>
        </section>

        {/* 🟢 DYNAMIC PRODUCT CARDS SECTION */}
        <section className="bg-white border-y border-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                Financial Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl uppercase text-primary tracking-tight font-bold mt-3 mb-4">
                Our Deposit Products
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Whether you are saving for everyday needs, building funds for
                the future, or running a business, ASPAC Bank has an account
                that fits you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="bg-slate-50/50 rounded-3xl shadow-sm border border-slate-200/60 p-6 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:-translate-y-1.5 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <div>
                    {product.image && (
                      <div className="mb-5 relative rounded-2xl overflow-hidden h-40 w-full bg-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                        {product.type}
                      </span>
                      <div className="text-emerald-700/70 p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                        {getProductIcon(product.type)}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-emerald-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {product.tagline}
                    </p>

                    {/* Meta Specs Block */}
                    <div className="bg-white/80 rounded-2xl p-3.5 border border-slate-100 space-y-2 mb-6">
                      <div className="flex justify-between text-[11px] font-medium border-b border-slate-50 pb-1.5">
                        <span className="text-slate-400">Min. Initial:</span>
                        <span className="text-slate-800 font-bold">
                          {product.minInitial}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] font-medium border-b border-slate-50 pb-1.5">
                        <span className="text-slate-400">Maintaining:</span>
                        <span className="text-slate-800 font-bold">
                          {product.maintaining}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-slate-400">Interest:</span>
                        <span className="text-emerald-700 font-bold truncate max-w-[110px]">
                          {product.interest}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 mb-6">
                      <p className="text-[11px] text-slate-500 leading-normal">
                        <span className="font-bold text-slate-800">
                          Best for:{" "}
                        </span>
                        {product.bestFor}
                      </p>
                    </div>
                  </div>

                  {/* Core Action Button (Preserved logic) */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-auto text-xs font-bold bg-white text-green-700 border border-green-600 rounded-xl py-3 px-4 hover:bg-green-600 hover:text-white hover:shadow-md hover:shadow-emerald-700/10 transition-all duration-300"
                  >
                    Inquire about this account
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🟢 ACCORDION FAQS & CONTACT SUMMARY */}
        <section className="bg-slate-50/50 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 items-start">
            {/* Custom Interactive FAQ Accordion Column */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-xl">
                Have questions about our deposit products? Here are some quick
                answers.
              </p>

              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={item.q}
                      className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-primary hover:text-emerald-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-inset"
                      >
                        <span>{item.q}</span>
                        <FaChevronDown
                          className={`text-slate-400 text-xs shrink-0 ml-4 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-700" : ""}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-5 pt-0 border-t border-slate-50 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/40">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

     
          </div>
        </section>

        {/* 🟢 RE-DESIGNED BRAND MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full relative border border-slate-100 shadow-2xl"
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.45 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modern absolute corner dismiss asset */}
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  <FaTimes className="text-sm" />
                </button>

                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                  <FaPhoneAlt className="text-sm" />
                </div>

                <h2 className="text-2xl font-black text-primary mb-2 text-center tracking-tight">
                  Contact Us
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 text-center leading-relaxed">
                  For deposit account inquiries or assistance, you may reach us
                  through:
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center text-sm text-slate-800 font-semibold space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">
                      Landline:
                    </span>
                    <span className="text-primary font-bold">501-2724</span>
                  </p>
                  <p className="flex items-center justify-center gap-2 border-t border-slate-200/60 pt-2">
                    <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">
                      Mobile:
                    </span>
                    <span className="text-primary font-bold">
                      0898-272-2724
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 items-center justify-center mt-5 bg-yellow-50 border border-yellow-100/70 p-3 rounded-xl">
                  <FaMapMarkedAlt className="text-yellow-700 text-xs shrink-0" />
                  <p className="text-[11px] text-yellow-800 font-medium leading-normal">
                    For branch-specific numbers and office hours, please visit
                    our Branches page.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors text-sm shadow-md"
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

export default DepositAccount;
