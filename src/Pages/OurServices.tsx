import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaPiggyBank,
  FaUniversity,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
} from "react-icons/fa";
import Seo from "../components/Seo"; // ← update path if needed

interface Service {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

const services: Service[] = [
  { title: "Deposit Account", Icon: FaPiggyBank, link: "/deposit-account" },
  {
    title: "Tuition Fee Collection",
    Icon: FaUniversity,
    link: "/tuition-fee-collection",
  },
  { title: "Bills Payment", Icon: FaMoneyCheckAlt, link: "/bills-payment" },
  { title: "Loans", Icon: FaHandHoldingUsd, link: "/loans" },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OurServices: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ SEO for /our-services */}
      <Seo
        title="Our Services | ASPAC Bank"
        description="Explore ASPAC Bank’s services — deposit accounts, tuition fee collection, bills payment, and loan products delivered with secure, friendly in-branch support."
        canonical="https://www.aspacbank.com/our-services"
        ogType="website"
        ogImage="https://www.aspacbank.com/Services5.jpg"
        ogImageAlt="ASPAC Bank — Our Services"
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
          name: "Our Services",
          description:
            "Overview of ASPAC Bank’s core services for customers across the Philippines.",
          url: "https://www.aspacbank.com/our-services",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "ItemList",
            name: "ASPAC Bank Services",
            itemListElement: services.map((svc, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: svc.title,
              url: `https://www.aspacbank.com${svc.link}`,
            })),
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Banner Section (img + overlay for a11y/SEO) */}
        <section className="relative min-h-[60vh] w-full flex items-end pb-24 md:pb-28">
          <img
            src="/Services5.jpg"
            alt="ASPAC Bank services collage"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 px-4 sm:px-8 md:px-12 w-full">
            <div className="bg-black/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl max-w-xl text-white">
              <h1 className="text-2xl sm:text-3xl font-bold text-aspac-yellow mb-3">
                Our Services
              </h1>
              <p className="text-sm sm:text-base text-white/95">
                Explore the diverse range of services we offer to help you
                manage your finances effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Cards */}
        <section className="relative z-20 -mt-16 sm:-mt-20 md:-mt-24 mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 w-[90%] max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map(({ title, Icon, link }) => (
            <Link
              key={title}
              to={link}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded-2xl p-2"
            >
              <Icon className="text-primary text-4xl sm:text-5xl md:text-6xl mb-3" />
              <p className="text-sm sm:text-base font-medium text-gray-800">
                {title}
              </p>
            </Link>
          ))}
        </section>

        {/* Why Choose ASPAC Bank */}
        <section className="pt-28 sm:pt-32 md:pt-40 pb-20 bg-gray-50 px-4 sm:px-6 md:px-10 space-y-16">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Why Choose ASPAC Bank?
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              We prioritize your financial security and convenience. Our
              services are tailored to help you reach your goals with ease and
              confidence.
            </p>
          </motion.div>

          {/* Block 1 */}
          <motion.div
            className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/customer-support1.jpg"
              alt="Customer support in-branch"
              className="w-full lg:w-1/2 rounded-xl shadow-md"
              loading="lazy"
            />
            <div className="lg:w-1/2">
              <h3 className="text-sm text-primary font-semibold mb-2">
                Customer Support
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                We’re here when you need us
              </h2>
              <p className="text-gray-700 mb-4">
                Open Monday to Friday, 9:00 AM–3:00 PM — always ready to assist
                you.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                Contact Us
              </button>
            </div>
          </motion.div>

          {/* Block 2 */}
          <motion.div
            className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 bg-white p-6 rounded-xl shadow"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/security.jpg"
              alt="Secure banking systems"
              className="w-full lg:w-1/2 rounded-xl shadow-md"
              loading="lazy"
            />
            <div className="lg:w-1/2">
              <h3 className="text-sm text-primary font-semibold mb-2">
                Security
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                Bank with peace of mind
              </h2>
              <p className="text-gray-700 mb-4">
                We use state-of-the-art systems to safeguard your money and
                information.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Block 3 */}
          <motion.div
            className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/online-banking.jpg"
              alt="Convenient over-the-counter services"
              className="w-full lg:w-1/2 rounded-xl shadow-md"
              loading="lazy"
            />
            <div className="lg:w-1/2">
              <h3 className="text-sm text-primary font-semibold mb-2">
                Convenience
              </h3>
              <h2 className="text-2xl font-bold mb-4">Banking made easier</h2>
              <p className="text-gray-700 mb-4">
                Enjoy hassle-free transactions through our accessible branch
                network, friendly staff, and fast over-the-counter services.
              </p>
              <Link
                to="/branches"
                className="inline-flex items-center justify-center bg-aspac-yellow text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition focus:outline-none focus:ring-4 focus:ring-aspac-yellow/50"
              >
                Find a Branch
              </Link>
            </div>
          </motion.div>

          {/* Block 4 */}
          <motion.div
            className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 bg-white p-6 rounded-xl shadow"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/financial-advice.jpg"
              alt="Advisors providing financial guidance"
              className="w-full lg:w-1/2 rounded-xl shadow-md"
              loading="lazy"
            />
            <div className="lg:w-1/2">
              <h3 className="text-sm text-primary font-semibold mb-2">
                Expert Advice
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                Guidance you can trust
              </h2>
              <p className="text-gray-700 mb-4">
                Our advisors help you make smart choices with confidence and
                clarity.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                Talk to Us
              </button>
            </div>
          </motion.div>
        </section>

        {/* Contact Us Modal */}
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
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4 text-center">
                  For inquiries or assistance, reach out to us via the following
                  numbers:
                </p>
                <p className="text-gray-900 text-center font-medium">
                  Landline: 345-0929, 345-0930
                  <br />
                  Mobile: 0917-127-7796
                </p>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-medium transition focus:outline-none focus:ring-4 focus:ring-primary/30"
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

export default OurServices;
