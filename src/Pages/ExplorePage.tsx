import React from "react";
import Seo from "../components/Seo"; // ← update path if you use aliases

const ExplorePage: React.FC = () => {
  return (
    <>
      {/* SEO for /explore */}
      <Seo
        title="Explore | Simply Safe Banking | ASPAC Bank"
        description="Discover ASPAC Bank’s Simply Safe Banking — our commitment to secure, reliable, and caring in-branch service. Learn safety practices, hours, and support."
        canonical="https://www.aspacbank.com/explore"
        ogType="website"
        ogImage="https://www.aspacbank.com/Safebanking.jpg"
        ogImageAlt="ASPAC Bank — Simply Safe Banking"
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

      <main className="p-8 lg:p-16 text-gray-800 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Simply Safe Banking
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-gray-700">
            At ASPAC Bank, your security is our top priority. “Simply Safe”
            isn’t just a tagline — it's our promise to protect your finances
            with integrity, trust, and care.
          </p>

          {/* Hero image with proper alt and constrained width */}
          <figure className="mx-auto mb-8 max-w-3xl">
            <img
              src="/Safebanking.jpg"
              alt="Teller assisting a client—Simply Safe in-branch service"
              className="w-full rounded-lg shadow-lg"
              loading="eager"
            />
          </figure>

          <div className="text-left space-y-8">
            <section aria-labelledby="why-safe">
              <h2 id="why-safe" className="text-2xl font-semibold text-primary">
                Why Simply Safe?
              </h2>
              <p className="mt-2 leading-relaxed">
                We focus on keeping your money and information secure at every
                step. With reliable in-branch transactions, trusted staff, and a
                commitment to your peace of mind, we make banking safe and
                simple.
              </p>
            </section>

            <section aria-labelledby="safety-practices">
              <h2
                id="safety-practices"
                className="text-2xl font-semibold text-primary"
              >
                Safety Practices
              </h2>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-700">
                <li>Strict internal controls</li>
                <li>Secure handling of all financial transactions</li>
                <li>Carefully monitored account activities</li>
                <li>Confidential and responsible data management</li>
              </ul>
            </section>

            <section aria-labelledby="banking-hours">
              <h2
                id="banking-hours"
                className="text-2xl font-semibold text-primary"
              >
                Banking Hours
              </h2>
              <p className="mt-2">
                Visit any of our branches during operating hours:{" "}
                <strong>Monday to Friday, 9:00 AM to 3:00 PM</strong>. We are
                always ready to serve you with a smile.
              </p>
            </section>

            <section aria-labelledby="customer-support">
              <h2
                id="customer-support"
                className="text-2xl font-semibold text-primary"
              >
                Customer Support
              </h2>
              <p className="mt-2">
                Our team is dedicated to helping you with your banking needs.
                Reach out to us through phone or in person at your nearest
                branch — we're here for you.
              </p>
              {/* Optional accent badge for visual branding */}
              <div className="inline-flex mt-4 rounded-full bg-aspac-yellow px-3 py-1 text-sm font-semibold text-black">
                Simply Safe • ASPAC Bank
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExplorePage;
