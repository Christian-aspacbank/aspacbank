import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Seo from "../components/Seo";
import "swiper/css/effect-fade";

const branches = [
  {
    name: "ASPAC Bank Mandaue Head Office",
    address:
      "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo Mandaue City Cebu Philippines",
    contact: "0917-127-7796",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/Aspac+Bank/@10.334932,123.939810,18z",

    images: [
      "/assets/branchesimages/man1.webp",
      "/assets/branchesimages/man2.webp",
      "/assets/branchesimages/man3.webp",
    ],
  },

  {
    name: "ASPAC Bank Banilad",
    address: "UC Building, Banilad, Cebu City ",
    contact: "0917-129-7936",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/Aspac+Rural+Bank,+Inc./@10.338449,123.911692,18z",
    images: [
      "/assets/branchesimages/bnl1.webp",
      "/assets/branchesimages/bnl2.webp",
      "/assets/branchesimages/bnl3.webp",
    ],
  },

  {
    name: "ASPAC Bank Bantayan",
    address: "Ticad, Poblacion Bantayan, Cebu",
    contact: "0917-128-4422",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Rural+Bank/@11.169291,123.724044,18z",
    images: [
      "/assets/branchesimages/ban1.webp",
      "/assets/branchesimages/ban2.webp",
      "/assets/branchesimages/ban3.webp",
    ],
  },

  {
    name: "ASPAC Bank Bogo",
    address:
      "ASPAC BANK Bldg., P. Rodriguez St., Cogon Poblacion Bogo City, Cebu",
    contact: "0917-129-4966",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/Aspac+Bank/@11.046722,124.002806,18z",

    images: [
      "/assets/branchesimages/bog1.webp",
      "/assets/branchesimages/bog2.webp",
      "/assets/branchesimages/bog3.webp",
    ],
  },

  {
    name: "ASPAC Bank Carbon",
    address: "Escaño St., Ermita Poblacion, Cebu City",
    contact: "0917-130-6492",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.292803,123.897243,18z",
    images: [
      "/assets/branchesimages/cbn1.webp",
      "/assets/branchesimages/cbn2.webp",
      "/assets/branchesimages/cbn3.webp",
    ],
  },

  {
    name: "ASPAC Bank Carcar",
    address: "Santa Catalina, Carcar City, Cebu",
    contact: "0917-125-0313",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.104091,123.641842,18z",
    images: [
      "/assets/branchesimages/car1.webp",
      "/assets/branchesimages/car2.webp",
      "/assets/branchesimages/car3.webp",
    ],
  },

  {
    name: "ASPAC Bank Consolacion",
    address:
      "ASPAC Bldg., Sta Lucia Town Center, Poblacion Oriental Consolacion, Cebu",
    contact: "0917-113-8143",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",

    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Rural+Savings+Bank/@10.373832,123.958717,18z",
    images: [
      "/assets/branchesimages/cns1.webp",
      "/assets/branchesimages/cns2.webp",
      "/assets/branchesimages/cns3.webp",
    ],
  },

  {
    name: "ASPAC Bank Danao",
    address: "Pio Del Pilar St., Poblacion Danao City, Cebu",
    contact: "0917-108-6575",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Rural+Bank,+Inc./@10.519936,124.026656,18z",
    images: [
      "/assets/branchesimages/dan1.webp",
      "/assets/branchesimages/dan2.webp",
      "/assets/branchesimages/dan3.webp",
    ],
  },

  {
    name: "ASPAC Bank Lapu-lapu",
    address: "ASPAC BANK Bldg., Pusok Lapu-Lapu City, Cebu",
    contact: "0917-116-5655",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.324447,123.974243,18z",
    images: [
      "/assets/branchesimages/lap1.webp",
      "/assets/branchesimages/lap2.webp",
      "/assets/branchesimages/lap3.webp",
    ],
  },

  {
    name: "ASPAC Bank N.Bacalso",
    address:
      "ASPAC BANK Bldg., Cor. N. Bacalso St., & P. Del Rosario Ext., Sambag 1 Poblacion Cebu City",
    contact: "0917-102-5671",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.298935,123.894919,18z",
    images: [
      "/assets/branchesimages/eml1.webp",
      "/assets/branchesimages/eml2.webp",
      "/assets/branchesimages/eml3.webp",
    ],
  },

  {
    name: "ASPAC Bank Talisay",
    address: "Natalio Bacalso Ave., Tabunoc Talisay, Cebu City",
    contact: "0917-129-7008",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.269829,123.844870,18z",
    images: [
      "/assets/branchesimages/tal1.webp",
      "/assets/branchesimages/tal2.webp",
      "/assets/branchesimages/tal3.webp",
    ],
  },

  {
    name: "ASPAC Bank Toledo",
    address: "Purok Nangka, Sangi  Toledo City, Cebu",
    contact: "0917-129-7896",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.386167,123.652075,18z",
    images: [
      "/assets/branchesimages/tol1.webp",
      "/assets/branchesimages/tol2.webp",
      "/assets/branchesimages/tol3.webp",
    ],
  },
];

const Branches = () => {
  return (
    <>
      {/* ✅ SEO for /branches */}
      <Seo
        title="ASPAC Bank Branches"
        description="Find ASPAC Bank branches near you. Explore convenient locations across Cebu and nearby areas for banking services, deposits, withdrawals, and account assistance. Visit your nearest ASPAC Rural Bank branch today."
        canonical="https://www.aspacbank.com/branches"
        ogType="website"
        ogImage="https://www.aspacbank.com/favicon.ico"
        ogImageAlt="ASPAC Bank Branch Locations"
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
          name: "ASPAC Bank Branches",
          description:
            "Locate ASPAC Bank branches across Cebu and nearby areas. Get directions, branch hours, and contact details for your nearest ASPAC Rural Bank branch.",
          url: "https://www.aspacbank.com/branches",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          hasPart: [
            // MANDAUE HEAD OFFICE
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#mandaue-head-office",
              name: "ASPAC Bank Mandaue Head Office",
              image: [
                "/assets/branchesimages/man1.webp",
                "/assets/branchesimages/man2.webp",
                "/assets/branchesimages/man3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/Aspac+Bank/@10.334932,123.939810,18z",
              telephone: "+639171277796",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo",
                addressLocality: "Mandaue City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.334932,
                longitude: 123.93981,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // BANILAD
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#banilad",
              name: "ASPAC Bank Banilad",
              image: [
                "/assets/branchesimages/bnl1.webp",
                "/assets/branchesimages/bnl2.webp",
                "/assets/branchesimages/bnl3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/Aspac+Rural+Bank,+Inc./@10.338449,123.911692,18z",
              telephone: "+639171297936",
              address: {
                "@type": "PostalAddress",
                streetAddress: "UC Building, Banilad",
                addressLocality: "Cebu City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.338449,
                longitude: 123.911692,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // BANTAYAN
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#bantayan",
              name: "ASPAC Bank Bantayan",
              image: [
                "/assets/branchesimages/ban1.webp",
                "/assets/branchesimages/ban2.webp",
                "/assets/branchesimages/ban3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Rural+Bank/@11.169291,123.724044,18z",
              telephone: "+639171284422",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ticad, Poblacion",
                addressLocality: "Bantayan",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 11.169291,
                longitude: 123.724044,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // BOGO
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#bogo",
              name: "ASPAC Bank Bogo",
              image: [
                "/assets/branchesimages/bog1.webp",
                "/assets/branchesimages/bog2.webp",
                "/assets/branchesimages/bog3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/Aspac+Bank/@11.046722,124.002806,18z",
              telephone: "+639171294966",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "ASPAC BANK Bldg., P. Rodriguez St., Cogon Poblacion",
                addressLocality: "Bogo City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 11.046722,
                longitude: 124.002806,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // CARBON
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#carbon",
              name: "ASPAC Bank Carbon",
              image: [
                "/assets/branchesimages/cbn1.webp",
                "/assets/branchesimages/cbn2.webp",
                "/assets/branchesimages/cbn3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.292803,123.897243,18z",
              telephone: "+639171306492",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Escaño St., Ermita Poblacion",
                addressLocality: "Cebu City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.292803,
                longitude: 123.897243,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // CARCAR
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#carcar",
              name: "ASPAC Bank Carcar",
              image: [
                "/assets/branchesimages/car1.webp",
                "/assets/branchesimages/car2.webp",
                "/assets/branchesimages/car3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.104091,123.641842,18z",
              telephone: "+639171250313",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Santa Catalina",
                addressLocality: "Carcar City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.104091,
                longitude: 123.641842,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // CONSOLACION
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#consolacion",
              name: "ASPAC Bank Consolacion",
              image: [
                "/assets/branchesimages/cns1.webp",
                "/assets/branchesimages/cns2.webp",
                "/assets/branchesimages/cns3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Rural+Savings+Bank/@10.373832,123.958717,18z",
              telephone: "+639171138143",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "ASPAC Bldg., Sta Lucia Town Center, Poblacion Oriental",
                addressLocality: "Consolacion",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.373832,
                longitude: 123.958717,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // DANAO
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#danao",
              name: "ASPAC Bank Danao",
              image: [
                "/assets/branchesimages/dan1.webp",
                "/assets/branchesimages/dan2.webp",
                "/assets/branchesimages/dan3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Rural+Bank,+Inc./@10.519936,124.026656,18z",
              telephone: "+639171086575",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Pio Del Pilar St., Poblacion",
                addressLocality: "Danao City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.519936,
                longitude: 124.026656,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // LAPU-LAPU
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#lapu-lapu",
              name: "ASPAC Bank Lapu-lapu",
              image: [
                "/assets/branchesimages/lap1.webp",
                "/assets/branchesimages/lap2.webp",
                "/assets/branchesimages/lap3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.324447,123.974243,18z",
              telephone: "+639171165655",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ASPAC BANK Bldg., Pusok",
                addressLocality: "Lapu-Lapu City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.324447,
                longitude: 123.974243,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // N. BACALSO
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#n-bacalso",
              name: "ASPAC Bank N.Bacalso",
              image: [
                "/assets/branchesimages/eml1.webp",
                "/assets/branchesimages/eml2.webp",
                "/assets/branchesimages/eml3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.298935,123.894919,18z",
              telephone: "+639171025671",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Cor. N. Bacalso St., & P. Del Rosario Ext., Sambag 1 Poblacion",
                addressLocality: "Cebu City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.298935,
                longitude: 123.894919,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // TALISAY
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#talisay",
              name: "ASPAC Bank Talisay",
              image: [
                "/assets/branchesimages/tal1.webp",
                "/assets/branchesimages/tal2.webp",
                "/assets/branchesimages/tal3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.269829,123.844870,18z",
              telephone: "+639171297008",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Natalio Bacalso Ave., Tabunoc",
                addressLocality: "Talisay City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.269829,
                longitude: 123.84487,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
            // TOLEDO
            {
              "@type": "BankOrCreditUnion",
              "@id": "https://www.aspacbank.com/branches#toledo",
              name: "ASPAC Bank Toledo",
              image: [
                "/assets/branchesimages/tol1.webp",
                "/assets/branchesimages/tol2.webp",
                "/assets/branchesimages/tol3.webp",
              ],
              url: "https://www.aspacbank.com/branches",
              hasMap:
                "https://www.google.com/maps/place/ASPAC+Bank/@10.386167,123.652075,18z",
              telephone: "+639171297896",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Purok Nangka, Sangi",
                addressLocality: "Toledo City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.386167,
                longitude: 123.652075,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
          ],
        }}
      />

      {/* ✅ Main Page Content */}
      <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#459243] mb-10">
            Our Branches
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                {/* Smooth Swiper */}
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  loop={true}
                  speed={800}
                  className="w-full h-80"
                >
                  {branch.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`${branch.name} ${i + 1}`}
                        className="w-full h-80 object-cover transition-all duration-500"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {branch.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Address:</strong> {branch.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Contact:</strong> {branch.contact}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Hours:</strong> {branch.hours}
                  </p>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#459243] text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    View on Map
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Branches;
