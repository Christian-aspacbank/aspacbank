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
      "https://www.google.com/maps/place/https://www.google.com/maps/@10.3349537,123.9397283,3a,75y,187.2h,93.24t/data=!3m7!1e1!3m5!1sC6JyWB6uLlsBgUy1T_KK5g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.2379567003453076%26panoid%3DC6JyWB6uLlsBgUy1T_KK5g%26yaw%3D187.19753825386937!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
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
      "https://www.google.com/maps/place/Aspac+Rural+Bank,+Inc./@10.3383863,123.9115553,3a,75y,96.6h,87.09t/data=!3m7!1e1!3m5!1sd6gwKAuppd2MvT9ndsMi-Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.908681241094172%26panoid%3Dd6gwKAuppd2MvT9ndsMi-Q%26yaw%3D96.59663475794113!7i16384!8i8192!4m13!1m6!3m5!2zMTDCsDIwJzE4LjciTiAxMjPCsDU0JzQyLjAiRQ!8m2!3d10.3385278!4d123.9116667!10e5!3m5!1s0x33a998e133cfdfe9:0x74f9f8997ace0ae5!8m2!3d10.3383962!4d123.9116638!16s%2Fg%2F1tx12xjj?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
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
      "https://www.google.com/maps/place/ASPAC+Rural+Bank/@11.1691381,123.7240766,3a,75y,351.99h,94.34t/data=!3m7!1e1!3m5!1skshd2xj683RBJ94kCpELEQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.339778975775275%26panoid%3Dkshd2xj683RBJ94kCpELEQ%26yaw%3D351.98621747831186!7i16384!8i8192!4m12!1m5!3m4!2zMTHCsDEwJzEwLjAiTiAxMjPCsDQzJzI2LjciRQ!8m2!3d11.1694444!4d123.7240833!3m5!1s0x33a888a1350be1ef:0x380b347fe120b0d6!8m2!3d11.1692667!4d123.7240491!16s%2Fg%2F1pp2v9x18?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
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
      "https://www.google.com/maps/place/Aspac+Bank/@11.0467605,124.0029316,3a,75y,252.71h,92.16t/data=!3m7!1e1!3m5!1s3TKWel1urJHAUh2XTHKrZQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.1621531679270305%26panoid%3D3TKWel1urJHAUh2XTHKrZQ%26yaw%3D252.71449963898652!7i16384!8i8192!4m12!1m5!3m4!2zMTHCsDAyJzQ4LjIiTiAxMjTCsDAwJzEwLjEiRQ!8m2!3d11.0467229!4d124.0028106!3m5!1s0x33a868c682ea9ee7:0x19e5b62b1cbe93df!8m2!3d11.0467206!4d124.0027871!16s%2Fg%2F11csqvfnts?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+Bank/@10.2927732,123.8973104,3a,75y,281.38h,94.17t/data=!3m7!1e1!3m5!1sNt-fihLNBwLzDwTf7CvzPA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.167477870351817%26panoid%3DNt-fihLNBwLzDwTf7CvzPA%26yaw%3D281.37609069651853!7i16384!8i8192!4m15!1m8!3m7!1s0x33a99be4af69c07d:0x4f979047483fe095!2sEsca%C3%B1o+St,+Cebu+City,+6000+Cebu!3b1!8m2!3d10.2921404!4d123.897386!16s%2Fg%2F1thy_67y!3m5!1s0x33a99be35383e5e5:0x1ce69914b6a71a2a!8m2!3d10.2928009!4d123.897125!16s%2Fg%2F11bwnxwdzr?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/@10.1040785,123.6417657,3a,75y,76.49h,77.37t/data=!3m7!1e1!3m5!1sE_slTxZKHp6LKsmHl_oA-w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D12.630778398288811%26panoid%3DE_slTxZKHp6LKsmHl_oA-w%26yaw%3D76.4850263550181!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+Rural+Savings+Bank/@10.3742422,123.9558572,606m/data=!3m1!1e3!4m10!1m2!2m1!1saspac+consolacion!3m6!1s0x33a9a2a4cd99fce3:0xa5a2571b2b7d38ae!8m2!3d10.3738098!4d123.9587104!15sChFhc3BhYyBjb25zb2xhY2lvbpIBBGJhbmuqATkQATIeEAEiGjEOMPgLsdqQV96Rjn3kYD3CIgctEicEuk0tMhUQAiIRYXNwYWMgY29uc29sYWNpb27gAQA!16s%2Fg%2F1hc5bgxgw?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+RURAL+BANK+INC./@10.5198275,124.0266347,3a,75y,7.81h,93.84t/data=!3m7!1e1!3m5!1sfN4CysVq51MX0KqoOu8hfw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.837951206556184%26panoid%3DfN4CysVq51MX0KqoOu8hfw%26yaw%3D7.81100999969323!7i16384!8i8192!4m12!1m5!3m4!2zMTDCsDMxJzExLjgiTiAxMjTCsDAxJzM2LjAiRQ!8m2!3d10.5199444!4d124.0266667!3m5!1s0x33a9b08428fc900b:0x2f8957a1b60b689c!8m2!3d10.5200079!4d124.0267235!16s%2Fg%2F11c1qb9xnr?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
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
      "https://www.google.com/maps/place/Pusok,+Lapu-Lapu+City,+Cebu/@10.3245227,123.974147,3a,75y,146.99h,96.77t/data=!3m7!1e1!3m5!1sXLA2gPNz0B8biRraGs_VGA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-6.7684270158130175%26panoid%3DXLA2gPNz0B8biRraGs_VGA%26yaw%3D146.9864791596221!7i16384!8i8192!4m6!3m5!1s0x33a999d680997be1:0x888ed11028d84b4d!8m2!3d10.3197437!4d123.9722147!16s%2Fg%2F1tczsgj3?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+Bank/@10.2987528,123.8949856,3a,75y,312.09h,94.53t/data=!3m7!1e1!3m5!1sEmFO--YBIXUcY5aLeOsMjQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.533873856133425%26panoid%3DEmFO--YBIXUcY5aLeOsMjQ%26yaw%3D312.0934680136831!7i16384!8i8192!4m14!1m7!3m6!1s0x33a99957b9cb423b:0xcfe4abdcc58cd3b1!2sASPAC+Bank!8m2!3d10.2989215!4d123.8949195!16s%2Fg%2F11bwncm7rk!3m5!1s0x33a99957b9cb423b:0xcfe4abdcc58cd3b1!8m2!3d10.2989215!4d123.8949195!16s%2Fg%2F11bwncm7rk?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+Bank/@10.2695943,123.8450157,3a,75y,308.28h,92.55t/data=!3m7!1e1!3m5!1snFJIKOtc6OFi7zziDAmhCw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.5465616071729187%26panoid%3DnFJIKOtc6OFi7zziDAmhCw%26yaw%3D308.2766443392345!7i16384!8i8192!4m6!3m5!1s0x33a99c5389bfd793:0xbfff387de691348d!8m2!3d10.2697852!4d123.8448788!16s%2Fg%2F11wtw5q884?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",

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
      "https://www.google.com/maps/place/ASPAC+Bank/@10.3862749,123.6521426,3a,75y,207.03h,90t/data=!3m7!1e1!3m5!1sHENaw1oyvhvad_g2llrRcQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DHENaw1oyvhvad_g2llrRcQ%26yaw%3D207.03105!7i16384!8i8192!4m14!1m7!3m6!1s0x33a972dd24f1c92b:0x750e13319c85b23a!2sASPAC+Bank!8m2!3d10.3861401!4d123.6520745!16s%2Fg%2F11wx4vn5tm!3m5!1s0x33a972dd24f1c92b:0x750e13319c85b23a!8m2!3d10.3861401!4d123.6520745!16s%2Fg%2F11wx4vn5tm?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
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
        title="Branches | ASPAC Bank"
        description="Find ASPAC Bank branch locations across the Philippines. Get contact details, operating hours, and maps for your nearest branch."
        canonical="https://www.aspacbank.com/branches"
        ogType="website"
        ogImage="https://www.aspacbank.com/branches-banner.jpg" // replace with your real banner
        ogImageAlt="ASPAC Bank Branches"
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
          name: "Branches",
          description:
            "List of branch locations, contact details, operating hours, and maps for ASPAC Bank in the Philippines.",
          url: "https://www.aspacbank.com/branches",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "CollectionPage",
            name: "ASPAC Bank Branches",
          },
        }}
      />

      {/* ✅ Main Page Content */}
      <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
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
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
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
