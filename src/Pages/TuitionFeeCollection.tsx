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
        description="Pay school tuition safely and conveniently at ASPAC Bank partner schools. Fast over-the-counter processing, official receipts, and trusted partner institutions."
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

      <main className="bg-gradient-to-b from-white to-primary/5 min-h-screen">
        {/* 🟢 HERO: images slide, text stays fixed and readable */}
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          {/* Swiper = background images only */}
          <div className="absolute inset-0">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              modules={[Pagination, Autoplay, Navigation]}
              className="h-full"
            >
              {[
                {
                  src: "/PAYTUTION.jpg",
                  alt: "Parent paying tuition at ASPAC partner school counter",
                },
                {
                  src: "/PAYTUTION1.jpg",
                  alt: "Teller processing tuition payment securely",
                },
                {
                  src: "/PAYTUTION2.jpg",
                  alt: "Students and parents at a convenient payment area",
                },
              ].map(({ src, alt }) => (
                <SwiperSlide key={src}>
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Strong dark overlay on top of images */}
          <div className="absolute inset-0 bg-black/50 md:bg-black/60" />

          {/* Fixed text overlay inside a dark card */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 w-full">
              <div className="max-w-xl bg-black/70 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-aspac-yellow mb-3">
                  Tuition Fee Collection
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
                  Pay tuition safely at ASPAC Bank partner schools.
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6">
                  Make tuition payments reliable and stress-free with
                  over-the-counter assistance, clear receipts, and a trusted
                  banking partner.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#partner-schools"
                    className="bg-aspac-yellow text-black font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-aspac-yellow/90 transition duration-300 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-aspac-yellow/60"
                  >
                    View Partner Schools
                  </a>
                  <a
                    href="#how-it-works"
                    className="border border-white/80 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white hover:text-aspac-green transition duration-300 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-white/40"
                  >
                    See How It Works
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🟢 INTRO: What this service is */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-wide">
            Tuition Fee Collection Service
          </h2>
          <p className="text-gray-700 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
            ASPAC Bank makes it easier for students, parents, and schools to
            manage tuition payments. With our over-the-counter collection
            service, you can pay at our branches or designated payment centers
            and receive official proof of payment every time.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3 text-left">
            <div className="bg-white rounded-2xl shadow-md border border-primary/10 p-5">
              <p className="text-xs font-semibold text-aspac-yellow uppercase tracking-[0.18em] mb-2">
                For Whom
              </p>
              <h3 className="text-base font-semibold text-primary mb-2">
                Students & Parents
              </h3>
              <p className="text-sm text-gray-700">
                Settle tuition and other school-related fees in a secure
                environment, assisted by ASPAC Bank staff.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-primary/10 p-5">
              <p className="text-xs font-semibold text-aspac-yellow uppercase tracking-[0.18em] mb-2">
                For
              </p>
              <h3 className="text-base font-semibold text-primary mb-2">
                Schools & Universities
              </h3>
              <p className="text-sm text-gray-700">
                Partner with ASPAC Bank to streamline collections, reduce cash
                handling, and receive consolidated reports.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-primary/10 p-5">
              <p className="text-xs font-semibold text-aspac-yellow uppercase tracking-[0.18em] mb-2">
                Benefit
              </p>
              <h3 className="text-base font-semibold text-primary mb-2">
                Clear & Organized Payments
              </h3>
              <p className="text-sm text-gray-700">
                Payments are processed under a trusted banking system, with
                documentation that’s easy to track and reconcile.
              </p>
            </div>
          </div>
        </section>

        {/* 🟢 HOW IT WORKS */}
        <section
          id="how-it-works"
          className="bg-aspac-green text-white py-14 md:py-18"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How the tuition payment process works
              </h2>
              <p className="text-sm md:text-base text-white/90">
                Paying tuition through ASPAC Bank is straightforward. Here’s
                what to expect on your next visit.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Visit ASPAC or designated payment site",
                  desc: "Go to an ASPAC Bank branch or official payment area assigned for your school.",
                },
                {
                  step: 2,
                  title: "Provide your school details",
                  desc: "Share your student information and reference details so our staff can post your payment correctly.",
                },
                {
                  step: 3,
                  title: "Pay & receive official proof",
                  desc: "Pay over the counter and receive an official receipt or proof of payment recognized by your school.",
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-white/10 border border-white/25 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-aspac-yellow text-black flex items-center justify-center text-sm font-bold">
                      {step}
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/80">
                      Step {step}
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-white/90">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🟢 BENEFITS FOR PARENTS/STUDENTS VS SCHOOLS */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-14 md:py-18">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Designed for both families and institutions
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              ASPAC Bank works closely with partner schools so tuition payments
              are handled smoothly on both sides of the counter.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-md border border-primary/10 p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                For students & parents
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Clear instructions from on-site ASPAC staff</li>
                <li>• Official proof of payment for your records</li>
                <li>• Less time lining up at school payment counters</li>
                <li>
                  • Peace of mind knowing payments are handled by a regulated
                  bank
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-primary/10 p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                For schools & universities
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Streamlined collection process through ASPAC Bank</li>
                <li>• Reduced on-campus cash handling and congestion</li>
                <li>• Reconciliation support and reporting</li>
                <li>
                  • A dependable partner focused on long-term collaboration
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🟢 PARTNER SCHOOLS GRID */}
        <section id="partner-schools" className="bg-white py-14 md:py-18">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-3 tracking-tight">
              Our Partner Schools
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-10 max-w-3xl mx-auto">
              ASPAC Bank is proud to serve these institutions and their
              students. Look for ASPAC payment counters or confirm with your
              school for exact payment locations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto max-w-screen-xl">
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
                <h3 className="text-xl font-bold text-primary mb-4 tracking-wide">
                  University of Cebu
                </h3>
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
                <h3 className="text-xl font-bold text-primary mb-4 tracking-wide">
                  University of San Carlos
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  {["Main Campus", "Talamban Campus"].map((campus) => (
                    <li
                      key={`usc-${campus}`}
                      className="flex items-start gap-2"
                    >
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
                <h3 className="text-xl font-bold text-primary mb-2 tracking-wide">
                  College of Technological Sciences
                </h3>
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
                <h3 className="text-xl font-bold text-primary mb-2 tracking-wide">
                  University of San Jose–Recoletos
                </h3>
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
                <h3 className="text-xl font-bold text-primary mb-2 tracking-wide">
                  Cebu Doctors University
                </h3>
                <p className="text-gray-700 text-sm">CDU</p>
              </article>
            </div>

            {/* Footer note */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 italic">
                For more information about payment schedules and exact payment
                locations, please coordinate with your school or visit your
                nearest ASPAC Bank branch.
              </p>
            </div>
          </div>
        </section>

        {/* 🟢 FINAL CTA */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Want to include your school in ASPAC’s collection network?
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-6 max-w-3xl mx-auto">
              If you’re part of a school administration and would like to learn
              more about ASPAC Bank’s tuition fee collection services, our team
              can walk you through the partnership process.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default TuitionFeeCollection;
