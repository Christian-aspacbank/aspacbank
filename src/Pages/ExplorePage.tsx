import React from "react";
import Seo from "../components/Seo"; // ← update path to your Seo.tsx

const ExplorePage: React.FC = () => {
  return (
    <>
      {/* ✅ SEO for /explore */}
      <Seo
        title="Explore | Simply Safe Banking | ASPAC Bank"
        description="Discover ASPAC Bank’s Simply Safe Banking — our commitment to secure, reliable, and caring in-branch service. Learn safety practices, hours, and support."
        canonical="https://www.aspacbank.com/explore"
        ogType="website"
        ogImage="https://www.aspacbank.com/Safebanking.jpg" // use your hosted hero image URL
        ogImageAlt="ASPAC Bank — Simply Safe Banking"
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
          name: "Explore — Simply Safe Banking",
          description:
            "ASPAC Bank’s commitment to Simply Safe Banking: internal controls, secure transactions, and dependable customer support.",
          url: "https://www.aspacbank.com/explore",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "ItemList",
            name: "Simply Safe Banking Information",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Why Simply Safe?" },
              { "@type": "ListItem", position: 2, name: "Safety Practices" },
              { "@type": "ListItem", position: 3, name: "Banking Hours" },
              { "@type": "ListItem", position: 4, name: "Customer Support" },
            ],
          },
        }}
      />

      <div className="p-8 lg:p-16 text-gray-800 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">
            Simply Safe Banking
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-gray-700">
            At ASPAC Bank, your security is our top priority. “Simply Safe”
            isn’t just a tagline — it's our promise to protect your finances
            with integrity, trust, and care.
          </p>
          <img
            src="/Safebanking.jpg"
            alt="Simply Safe Banking"
            className="mx-auto mb-8 rounded-lg shadow-lg w-full max-w-3xl"
          />
          <div className="text-left space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-green-600">
                Why Simply Safe?
              </h2>
              <p>
                We focus on keeping your money and information secure at every
                step. With reliable in-branch transactions, trusted staff, and a
                commitment to your peace of mind, we make banking safe and
                simple.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600">
                Safety Practices
              </h2>
              <ul className="list-disc list-inside ml-4">
                <li>Strict internal controls</li>
                <li>Secure handling of all financial transactions</li>
                <li>Carefully monitored account activities</li>
                <li>Confidential and responsible data management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600">
                Banking Hours
              </h2>
              <p>
                Visit any of our branches during operating hours:{" "}
                <strong>Monday to Friday, 9:00 AM to 3:00 PM</strong>. We are
                always ready to serve you with a smile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600">
                Customer Support
              </h2>
              <p>
                Our team is dedicated to helping you with your banking needs.
                Reach out to us through phone or in person at your nearest
                branch — we're here for you.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
