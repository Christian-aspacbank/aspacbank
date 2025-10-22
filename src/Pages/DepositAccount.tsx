import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo"; // ← update path to your Seo.tsx

const DepositAccount = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ SEO for /deposit-account */}
      <Seo
        title="Deposit Account – Savings & Time Deposits | ASPAC Bank"
        description="Open a savings or time deposit account with ASPAC Bank. Enjoy secure banking, competitive rates, and community-first service across Cebu."
        canonical="https://www.aspacbank.com/deposit-account"
        ogImage="https://www.aspacbank.com/APDS3.jpg"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        includeTwitter
        twitterCard="summary_large_image"
        twitterSite="@aspacbank"
        organization={{
          type: "BankOrCreditUnion",
          name: "ASPAC Bank",
          url: "https://www.aspacbank.com/",
          logo: "https://www.aspacbank.com/favicon.ico",
          telephone: "+63-32-272-2724",
          sameAs: ["https://www.facebook.com/aspacbank0620/"],
          address: {
            streetAddress:
              "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo Mandaue City Cebu Philippines",
            addressLocality: "Mandaue City",
            addressRegion: "Cebu",
            postalCode: "6014",
            addressCountry: "PH",
          },
        }}
        services={[
          {
            name: "Deposit Account",
            url: "https://www.aspacbank.com/deposit-account",
            serviceType: "Savings and Time Deposit Services",
            areaServed: "PH",
          },
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://www.aspacbank.com/" },
          {
            name: "Deposit Account",
            url: "https://www.aspacbank.com/deposit-account",
          },
        ]}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div
          className="relative text-white py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url(/DepositAccount.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="container mx-auto text-center px-6 relative z-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-green-600 font-semibold mb-4">
              Deposit Account
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mx-auto">
              Secure, flexible, and tailored for your financial needs. Start
              saving today with ASPAC Bank&apos;s Deposit Account.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 py-20 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12">
            {/* Why Choose Section */}
            <div className="bg-white shadow-lg rounded-2xl p-10 border border-green-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">
                Why Choose Our Deposit Account?
              </h2>
              <p className="text-base text-gray-700 mb-4">
                At ASPAC Bank, we provide a range of benefits with our Deposit
                Account to help you achieve your financial goals:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-gray-700 text-base">
                <li>Earn competitive interest rates on your balance.</li>
                <li>Free monthly account maintenance.</li>
                <li>Convenient mobile app for easy access and management.</li>
                <li>No minimum balance requirements.</li>
              </ul>
            </div>

            {/* How to Open Section */}
            <div className="bg-white shadow-lg rounded-2xl p-10 border border-green-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">
                How to Open a Deposit Account
              </h2>
              <p className="text-base text-gray-700 mb-4">
                Opening a Deposit Account with us is easy and hassle-free.
                Here&apos;s how you can get started:
              </p>
              <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-base">
                <li>Visit your nearest ASPAC Bank branch.</li>
                <li>
                  Provide necessary identification documents and proof of
                  address.
                </li>
                <li>
                  Deposit the initial amount and start enjoying the benefits of
                  your new account.
                </li>
              </ol>
            </div>
          </div>

          {/* Features Section */}
          <div className="pt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Exclusive Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Deposit Account comes with these exclusive features designed
                to give you more value:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Power Savings Account",
                  description:
                    "Maximize your savings potential with our Power Savings Account.",
                  image: "/Powersavings.jpg",
                },
                {
                  title: "Power Checking Account",
                  description: "Keep your money accessible and secure.",
                  image: "/Power Checking Account.jpg",
                },
                {
                  title: "Time Deposit",
                  description: "Secure your funds for a fixed term.",
                  image: "/Time Deposit.jpg",
                },
                {
                  title: "Special Savings",
                  description: "Achieve your financial goals.",
                  image: "/Special Savings.jpg",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border border-green-200"
                >
                  {feature.image && (
                    <div className="mb-4">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 py-16 text-center text-white px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Open Your Deposit Account?
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8">
            Start saving today with ASPAC Bank. Enjoy hassle-free banking with
            the best services.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-block bg-white text-green-600 font-semibold py-4 px-10 rounded-full shadow-md hover:bg-green-100 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Contact Us to Get Started
          </button>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="bg-white rounded-xl p-8 max-w-md w-full relative"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                  Contact Us
                </h2>

                <p className="text-gray-700 mb-4 text-center">
                  For inquiries or assistance, reach out to us via the following
                  numbers:
                </p>
                <p className="text-gray-800 text-center font-medium">
                  Landline: 345-0929, 345-0930
                  <br />
                  Mobile: 0917-127-7796
                </p>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
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
