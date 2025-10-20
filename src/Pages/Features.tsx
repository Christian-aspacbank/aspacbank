import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "../components/Testimonials";
import Seo from "../components/Seo"; // ✅ adjust path if needed

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
    title: "Accessible Branch Network",
    image: "/branch-network.jpg",
    description:
      "Strategically located branches across the region bring banking closer to you.",
  },
];

const FeatureCard: React.FC<FeatureItem> = ({ title, image, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
  >
    <img src={image} alt={title} className="w-full h-64 object-cover" />
    <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  </motion.div>
);

const Features: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ SEO for /features */}
      <Seo
        title="Features | ASPAC Bank"
        description="Explore ASPAC Bank’s key features — fast loan approvals, secure transactions, community-driven banking, and personalized financial service."
        canonical="https://www.aspacbank.com/features"
        ogType="website"
        ogImage="https://www.aspacbank.com/features3.jpg"
        ogImageAlt="ASPAC Bank Features"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#0a3d62"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Features",
          description:
            "ASPAC Bank’s core features and advantages — fast processing, secure banking, and excellent customer support.",
          url: "https://www.aspacbank.com/features",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "ItemList",
            name: "ASPAC Bank Features",
            itemListElement: features.map((feature, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: feature.title,
              description: feature.description,
            })),
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gray-50 pt-0"
      >
        {/* Header */}
        <div className="relative h-[400px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/features3.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-xl text-center">
            Our Features
          </h1>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Single CTA Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 text-green-900 font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-yellow-500 transition duration-300 text-lg"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white py-10">
          <Testimonials />
        </div>

        {/* Contact Us Modal */}
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
      </motion.div>
    </>
  );
};

export default Features;
