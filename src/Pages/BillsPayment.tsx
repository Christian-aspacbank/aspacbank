import React from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo"; // change to "@/components/Seo" if you use baseUrl alias

const BillsPayment: React.FC = () => {
  return (
    <>
      {/* SEO for /bills-payment */}
      <Seo
        title="Bills Payment | ASPAC Bank"
        description="Pay your MECO bills safely and conveniently at ASPAC Bank. Fast posting, reliable service, and friendly branch assistance."
        canonical="https://www.aspacbank.com/bills-payment"
        ogType="website"
        ogImage="https://www.aspacbank.com/Billspayment.png"
        ogImageAlt="ASPAC Bank Bills Payment"
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
          name: "Bills Payment",
          description:
            "Settle MECO bills quickly and securely at ASPAC Bank branches.",
          url: "https://www.aspacbank.com/bills-payment",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "Service",
            name: "Bills Payment (MECO)",
            serviceType: "Over-the-counter bills payment",
            areaServed: "PH",
            provider: {
              "@type": "BankOrCreditUnion",
              name: "ASPAC Bank",
              url: "https://www.aspacbank.com",
              telephone: "+63-32-272-2724",
            },
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://www.aspacbank.com/bills-payment",
              servicePhone: "+63-917-127-7796",
              servicePostalAddress: {
                "@type": "PostalAddress",
                addressCountry: "PH",
              },
            },
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-white"
      >
        {/* Header Section (image + overlay, a11y-friendly) */}
        <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
          <img
            src="/Billspayment.png"
            alt="Customer paying utility bills at ASPAC Bank counter"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="bg-black/40 backdrop-blur-sm px-6 py-6 rounded-2xl text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-aspac-yellow drop-shadow">
                Bills Payment
              </h1>
              <p className="mt-2 text-white/95">
                Settle your MECO bills with ease and convenience at ASPAC Bank.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Pay Your MECO Bills Quickly and Securely
          </h2>
          <p className="mb-4 leading-relaxed">
            ASPAC Bank provides a convenient way for customers to pay their MECO
            bills. Visit any participating branch, present your account details,
            and our tellers will process your payment securely and efficiently.
          </p>

          <div className="mt-10 rounded-lg bg-primary/10 border-l-4 border-primary p-4">
            <p className="text-base font-medium">
              For inquiries, contact us at{" "}
              <strong className="text-primary">0917-127-7796</strong> or call{" "}
              <strong className="text-primary">345-0929 / 345-0930</strong>.
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default BillsPayment;
