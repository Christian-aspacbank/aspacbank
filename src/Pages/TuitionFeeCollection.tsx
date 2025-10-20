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
        themeColor="#0a3d62"
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

      <div className="bg-gradient-to-b from-white to-green-50 min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section with Image Swiper under Intro */}
          <div className="relative w-full mb-12">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              modules={[Pagination, Autoplay, Navigation]}
              className="rounded-xl"
            >
              <SwiperSlide>
                <div
                  className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat rounded-xl"
                  style={{ backgroundImage: "url('/PAYTUTION.jpg')" }}
                >
                  <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h2 className="text-2xl text-white font-semibold">
                      Pay Tuition Fees Effortlessly
                    </h2>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat rounded-xl"
                  style={{ backgroundImage: "url('/PAYTUTION1.jpg')" }}
                >
                  <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h2 className="text-2xl text-white font-semibold">
                      Fast and Secure Payments
                    </h2>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat rounded-xl"
                  style={{ backgroundImage: "url('/PAYTUTION2.jpg')" }}
                >
                  <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h2 className="text-2xl text-white font-semibold">
                      Convenient for All Students
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Section: Title and Description */}
          <h1 className="text-4xl font-bold text-green-800 mb-4 tracking-wide">
            Tuition Fee Collection Service
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            ASPAC Bank makes it easy for students and parents to settle tuition
            payments with our trusted partner schools. Enjoy secure, fast, and
            convenient transactions that give you peace of mind.
          </p>

          {/* School Cards Section */}
          <h3 className="text-3xl font-extrabold text-green-800 mb-12 text-center tracking-tight">
            Our Partner Schools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            {/* University of Cebu Card */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/UC.jpg"
                  alt="University of Cebu"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-bold text-green-700 mb-4 tracking-wide">
                University of Cebu
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>Main Campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>Banilad Campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>METC Campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>UCLM Campus</span>
                </li>
              </ul>
            </div>

            {/* University of San Carlos Card */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/USC.jpg"
                  alt="University of San Carlos"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-bold text-green-700 mb-4 tracking-wide">
                University of San Carlos
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>Main Campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-600"></span>
                  <span>Talamban Campus</span>
                </li>
              </ul>
            </div>

            {/* College of Technological Sciences Card */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/CTSC.jpg"
                  alt="College of Technological Sciences"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-bold text-green-700 mb-4 tracking-wide">
                College of Technological Sciences
              </h2>
              <p className="text-gray-700 text-sm">CTS - Cebu</p>
            </div>

            {/* University of San Jose Recoletos Card */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/USJR.jpg"
                  alt="University of San Jose Recoletos"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-bold text-green-700 mb-4 tracking-wide">
                University of San Jose Recoletos
              </h2>
              <p className="text-gray-700 text-sm">USJR</p>
            </div>

            {/* Cebu Doctors University Card */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-md z-10">
                Partner
              </span>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="assets/tuitionpaymentphotos/CDU.jpg"
                  alt="Cebu Doctors University"
                  className="w-full h-48 object-cover transform transition-all duration-500 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-bold text-green-700 mb-4 tracking-wide">
                Cebu Doctors University
              </h2>
              <p className="text-gray-700 text-sm">CDU</p>
            </div>
          </div>

          {/* Footer Section with Information */}
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
