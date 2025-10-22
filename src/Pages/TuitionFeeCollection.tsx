import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Seo from "../components/Seo"; // ← update path to your Seo.tsx

const TuitionFeeCollection: React.FC = () => {
  return (
    <>
      {/* ✅ SEO for /tuition-fee-collection */}
      <Seo
        title="Tuition Fee Collection | ASPAC Bank"
        description="Pay school tuition safely and conveniently at ASPAC Bank partner schools. Fast over-the-counter processing and reliable receipts."
        canonical="https://www.aspacbank.com/tuition-fee-collection"
        ogType="website"
        ogImage="https://www.aspacbank.com/PAYTUTION.jpg"
        ogImageAlt="ASPAC Bank Tuition Fee Collection"
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
          name: "Tuition Fee Collection",
          description:
            "ASPAC Bank’s over-the-counter tuition fee collection for partner schools in Cebu.",
          url: "https://www.aspacbank.com/tuition-fee-collection",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "Service",
            name: "Tuition Fee Collection",
            serviceType: "Over-the-counter payment service",
            areaServed: "PH",
            provider: {
              "@type": "BankOrCreditUnion",
              name: "ASPAC Bank",
              url: "https://www.aspacbank.com",
              telephone: "+63-32-272-2724",
            },
            termsOfService: "https://www.aspacbank.com/terms-and-conditions",
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://www.aspacbank.com/tuition-fee-collection",
              servicePhone: "+63-917-127-7796",
            },
          },
          about: {
            "@type": "ItemList",
            name: "Partner Schools",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "University of Cebu (Main, Banilad, METC, UCLM)",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "University of San Carlos (Main, Talamban)",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "College of Technological Sciences - Cebu (CTS)",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "University of San Jose–Recoletos (USJR)",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Cebu Doctors University (CDU)",
              },
            ],
          },
        }}
      />

      <div className="bg-gradient-to-b from-white to-primary/5 min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Swiper hero */}
          <div
            className="relative w-full mb-12"
            aria-roledescription="carousel"
          >
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              modules={[Pagination, Autoplay, Navigation]}
              className="rounded-xl overflow-hidden"
            >
              {[
                {
                  src: "/PAYTUTION.jpg",
                  alt: "Parent paying tuition at ASPAC partner school counter",
                  caption: "Pay Tuition Fees Effortlessly",
                },
                {
                  src: "/PAYTUTION1.jpg",
                  alt: "Teller processing tuition payment securely",
                  caption: "Fast and Secure Payments",
                },
                {
                  src: "/PAYTUTION2.jpg",
                  alt: "Students and parents at a convenient payment area",
                  caption: "Convenient for All Students",
                },
              ].map(({ src, alt, caption }) => (
                <SwiperSlide key={src}>
                  <figure className="relative w-full h-[60vh]">
                    <img
                      src={src}
                      alt={alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <figcaption className="relative z-10 h-full flex items-center justify-center">
                      <h2 className="text-2xl text-white font-semibold drop-shadow-md">
                        {caption}
                      </h2>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Title and Description */}
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-wide">
            Tuition Fee Collection Service
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
            ASPAC Bank makes it easy for students and parents to settle tuition
            payments with our trusted partner schools. Enjoy secure, fast, and
            convenient transactions that give you peace of mind.
          </p>

          {/* Partner Schools */}
          <h3 className="text-3xl font-extrabold text-primary mb-12 tracking-tight">
            Our Partner Schools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            {/* University of Cebu */}
            <article className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ring-1 ring-gray-100">
              <span className="absolute top-4 right-4 text-xs font-semibold text-black bg-aspac-yellow px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/UC.jpg"
                  alt="University of Cebu"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4 tracking-wide">
                University of Cebu
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  "Main Campus",
                  "Banilad Campus",
                  "METC Campus",
                  "UCLM Campus",
                ].map((campus) => (
                  <li key={`uc-${campus}`} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary" />
                    <span>{campus}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* University of San Carlos */}
            <article className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ring-1 ring-gray-100">
              <span className="absolute top-4 right-4 text-xs font-semibold text-black bg-aspac-yellow px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/USC.jpg"
                  alt="University of San Carlos"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4 tracking-wide">
                University of San Carlos
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                {["Main Campus", "Talamban Campus"].map((campus) => (
                  <li key={`usc-${campus}`} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary" />
                    <span>{campus}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* CTS Cebu */}
            <article className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ring-1 ring-gray-100">
              <span className="absolute top-4 right-4 text-xs font-semibold text-black bg-aspac-yellow px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/CTSC.jpg"
                  alt="College of Technological Sciences - Cebu"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4 tracking-wide">
                College of Technological Sciences
              </h2>
              <p className="text-gray-700 text-sm">CTS - Cebu</p>
            </article>

            {/* USJR */}
            <article className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ring-1 ring-gray-100">
              <span className="absolute top-4 right-4 text-xs font-semibold text-black bg-aspac-yellow px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/USJR.jpg"
                  alt="University of San Jose–Recoletos"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4 tracking-wide">
                University of San Jose–Recoletos
              </h2>
              <p className="text-gray-700 text-sm">USJR</p>
            </article>

            {/* CDU */}
            <article className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ring-1 ring-gray-100">
              <span className="absolute top-4 right-4 text-xs font-semibold text-black bg-aspac-yellow px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/CDU.jpg"
                  alt="Cebu Doctors University"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-4 tracking-wide">
                Cebu Doctors University
              </h2>
              <p className="text-gray-700 text-sm">CDU</p>
            </article>
          </div>

          {/* Footer note */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 italic">
              For more information, please visit your nearest ASPAC Bank branch
              or contact our hotline.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TuitionFeeCollection;
