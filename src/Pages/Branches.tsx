import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { branches } from "../data/branches";
import Seo from "../components/Seo";

const Branches = () => {
  const swiperRef = useRef<SwiperType | null>(null);

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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
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
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "09:00",
                  closes: "15:00",
                },
              ],
              sameAs: ["https://www.facebook.com/aspacbank0620/"],
            },
          ],
        }}
      />

      <section className="min-h-screen bg-gray-50 py-12 px-4 pt-28 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#459243] mb-12">
            Our Branches
          </h1>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {branches.map((branch, index) => (
              // <motion.div
              //   key={index}
              //   whileHover={{ y: -6 }}
              //   transition={{ duration: 0.3 }}
              //   className="
              //     break-inside-avoid
              //     mb-8
              //   "
              // >
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="break-inside-avoid mb-8 will-change-transform"
                onMouseEnter={() => swiperRef.current?.autoplay.start()}
                onMouseLeave={() => swiperRef.current?.autoplay.stop()}
              >
                <div
                  className={`group relative bg-white/70 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/40
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_30px_100px_rgba(69,146,67,0.18)]
                  transition-all duration-500`}
                >
                  {/* Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />

                  {/* IMAGE SWIPER */}
                  <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      swiper.autoplay.stop();
                    }}
                    pagination={{ clickable: true }}
                    loop
                    speed={600}
                    className="h-72 w-full"
                  >
                    {branch.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={branch.name}
                          loading="lazy"
                          decoding="async"
                          className="
                          w-full h-72 object-cover
                          group-hover:scale-110
                          transition-transform duration-700
                        "
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* TOP LABEL */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="
                    bg-black/40 text-white text-xs
                    px-3 py-1 rounded-full backdrop-blur-md
                  "
                    >
                      Branch Office
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h2 className="text-sm md:text-lg font-bold text-primary">
                      {branch.name}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="text-xs md:text-sm font-semibold text-gray-800">
                          Address:
                        </span>
                        <br />
                        <span className="text-xs md:text-sm">
                          {branch.address}
                        </span>
                      </p>

                      <p>
                        <span className="text-xs md:text-sm font-semibold text-gray-800">
                          Contact:
                        </span>
                        <br />
                        <span className="text-xs md:text-sm">
                          {branch.contact}
                        </span>
                      </p>

                      <p>
                        <span className="text-xs md:text-sm font-semibold text-gray-800">
                          Hours:
                        </span>
                        <br />
                        <span className="text-xs md:text-sm">
                          {branch.hours}
                        </span>
                        {branch.saturdayHours && (
                          <>
                            <br />
                            <span className="text-xs md:text-sm">
                              Saturday: {branch.saturdayHours}
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        Banking Services
                      </span>

                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        Local Branch
                      </span>
                    </div>

                    {/* BUTTON */}
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                      mt-6 inline-flex items-center justify-center
                      w-full
                      bg-gradient-to-r from-primary to-aspac-green
                      text-white font-semibold
                     py-2 md:py-3 rounded-full
                      shadow-md
                      hover:shadow-xl
                      transition-all
                      text-xs md:text-sm
                    "
                    >
                      View on Map
                    </a>
                  </div>
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
