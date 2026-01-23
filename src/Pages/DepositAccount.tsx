import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo";

const DepositAccount = () => {
  const [showModal, setShowModal] = useState(false);

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
      image: "/Power Checking Account.jpg",
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
      image: "/Time Deposit.jpg",
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
      image: "/Special Savings.jpg",
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
        themeColor="#459243" // matches manifest.json
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

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section
          className="relative text-white py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url(/DepositAccount.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <div className="text-sm text-white/80 mb-4">
              <span className="opacity-80">Home</span>{" "}
              <span className="mx-2">›</span>
              <span className="font-semibold">Deposit Accounts</span>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold mb-4 text-[#ebd839] drop-shadow-md">
                  Deposit Accounts
                </h1>
                <p className="text-base sm:text-lg text-white/90 mb-6 max-w-xl">
                  Secure, flexible, and designed for your goals. From everyday
                  savings to time deposits, ASPAC Bank makes it Simply Safe to
                  grow and manage your money.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#ebd839] text-green-900 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
                  >
                    Talk to a Banking Officer
                  </button>
                  <a
                    href="/branches"
                    className="border border-white/80 text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-green-700 transition-all duration-300"
                  >
                    Find a Branch
                  </a>
                </div>

                <div className="mt-6 text-xs sm:text-sm text-white/80"></div>
              </div>

              <motion.div
                className="hidden md:block bg-white/90 rounded-2xl p-6 text-gray-900 shadow-2xl"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-lg font-semibold text-green-700 mb-3">
                  Choose the account that fits you
                </h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                    <span>
                      <strong>Power Savings Account</strong> – for everyday
                      saving and salary crediting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                    <span>
                      <strong>Power Checking Account</strong> – for active
                      payments, checks, and transactions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                    <span>
                      <strong>Time Deposit</strong> – for higher returns on
                      fixed terms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                    <span>
                      <strong>Special Savings</strong> – for structured saving
                      towards your goals.
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why & How Section */}
        <section className="container mx-auto px-6 py-16 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Why Choose Section */}
            <motion.div
              className="bg-white shadow-lg rounded-2xl p-8 border border-green-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
                Why choose an ASPAC Deposit Account?
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Our accounts are built around your needs as a Filipino saver,
                worker, educator, or business owner:
              </p>
              <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm sm:text-base">
                <li>Competitive interest rates to help grow your savings.</li>
                <li>Simple requirements and fast account opening.</li>
                <li>
                  Free or low account maintenance, depending on the product.
                </li>
                <li>Accessible branches and friendly banking officers.</li>
                <li>
                  Simply Safe banking with a community-focused rural bank.
                </li>
              </ul>
            </motion.div>

            {/* How to Open Section */}
            <motion.div
              className="bg-white shadow-lg rounded-2xl p-8 border border-green-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
                How to open a Deposit Account
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Opening an account with ASPAC Bank is easy:
              </p>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700 text-sm sm:text-base">
                <li>Visit your nearest ASPAC Bank branch.</li>
                <li>
                  Bring valid government-issued IDs and proof of address (if
                  required).
                </li>
                <li>
                  Choose the deposit product that fits your needs with help from
                  our banking officer.
                </li>
                <li>
                  Deposit the initial amount and receive your account details.
                </li>
              </ol>
              <div className="mt-6 text-xs text-gray-500">
                Requirements may vary depending on the account type and
                regulatory guidelines.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Cards Section */}
        <section className="bg-white border-y border-gray-100">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-green-700 mb-3">
                Our Deposit Products
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                Whether you are saving for everyday needs, building funds for
                the future, or running a business, ASPAC Bank has an account
                that fits you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-green-200 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {product.image && (
                    <div className="mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <span className="text-xs uppercase tracking-wide text-green-600 mb-1">
                    {product.type}
                  </span>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-700 mb-4 flex-1">
                    {product.tagline}
                  </p>

                  <p className="text-xs text-gray-600 mb-4">
                    <span className="font-semibold">Best for: </span>
                    {product.bestFor}
                  </p>

                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-auto text-xs font-semibold bg-white text-green-700 border border-green-600 rounded-full py-2 px-4 hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    Inquire about this account
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs & Contact CTA */}
        <section className="bg-green-50 border-t border-green-100">
          <div className="container mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
            {/* FAQ */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                Have questions about our deposit products? Here are some quick
                answers.
              </p>

              <div className="space-y-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="bg-white rounded-xl p-4 shadow-sm border border-green-100"
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-green-800 marker:text-green-700">
                      {item.q}
                    </summary>
                    <p className="mt-2 text-xs text-gray-700">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-3">
                  Ready to open your ASPAC Deposit Account?
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Our banking officers are ready to guide you in choosing the
                  best account for your needs.
                </p>
                <p className="text-xs text-gray-600 mb-6">
                  You may visit a branch directly or contact us first for any
                  questions about requirements, product features, or ongoing
                  promos.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 hover:scale-[1.02] transition-all duration-300"
                >
                  Contact Us to Get Started
                </button>
                <a
                  href="/branches"
                  className="block w-full text-center border border-green-600 text-green-700 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 text-sm"
                >
                  View Branches &amp; Schedules
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-green-700 mb-3 text-center">
                  Contact Us
                </h2>
                <p className="text-sm text-gray-700 mb-4 text-center">
                  For deposit account inquiries or assistance, you may reach us
                  through:
                </p>

                <div className="text-center text-sm text-gray-900 font-medium space-y-1">
                  <p>
                    Hotline: <span className="font-semibold">501-2724</span>,
                  </p>
                  <p>
                    Mobile: <span className="font-semibold">0898-272-2724</span>
                  </p>
                </div>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  For branch-specific numbers and office hours, please visit our
                  Branches page.
                </p>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition duration-300"
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
