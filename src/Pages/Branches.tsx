import React from "react";
import { motion } from "framer-motion";

const branches = [
  {
    name: "Main Branch",
    address:
      "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo 6014 Mandaue City Cebu Philippines",
    contact: "0917-127-7796",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/https://www.google.com/maps/@10.3349537,123.9397283,3a,75y,187.2h,93.24t/data=!3m7!1e1!3m5!1sC6JyWB6uLlsBgUy1T_KK5g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.2379567003453076%26panoid%3DC6JyWB6uLlsBgUy1T_KK5g%26yaw%3D187.19753825386937!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Mandaue.jpg",
  },
  {
    name: "Banilad Branch",
    address:
      "ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines",
    contact: "(0917-102-5671)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/Aspac+Rural+Bank,+Inc./@10.3383863,123.9115553,3a,75y,96.6h,87.09t/data=!3m7!1e1!3m5!1sd6gwKAuppd2MvT9ndsMi-Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.908681241094172%26panoid%3Dd6gwKAuppd2MvT9ndsMi-Q%26yaw%3D96.59663475794113!7i16384!8i8192!4m13!1m6!3m5!2zMTDCsDIwJzE4LjciTiAxMjPCsDU0JzQyLjAiRQ!8m2!3d10.3385278!4d123.9116667!10e5!3m5!1s0x33a998e133cfdfe9:0x74f9f8997ace0ae5!8m2!3d10.3383962!4d123.9116638!16s%2Fg%2F1tx12xjj?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Banilad.jpg",
  },

  {
    name: "Bantayan Branch",
    address: "Ticad (Pob.) 6052 Bantayan Cebu Philippines",
    contact: "(0917-128-4422)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Rural+Bank/@11.1691381,123.7240766,3a,75y,351.99h,94.34t/data=!3m7!1e1!3m5!1skshd2xj683RBJ94kCpELEQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.339778975775275%26panoid%3Dkshd2xj683RBJ94kCpELEQ%26yaw%3D351.98621747831186!7i16384!8i8192!4m12!1m5!3m4!2zMTHCsDEwJzEwLjAiTiAxMjPCsDQzJzI2LjciRQ!8m2!3d11.1694444!4d123.7240833!3m5!1s0x33a888a1350be1ef:0x380b347fe120b0d6!8m2!3d11.1692667!4d123.7240491!16s%2Fg%2F1pp2v9x18?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Bantayan.jpg",
  },


  {
    name: "Bogo Branch",
    address:
      "ASPAC BANK Bldg. P. Rodriguez St. Cogon (Pob.) 6010 City of Bogo Cebu Philippines",
    contact: "(0917-129-4966)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/Aspac+Bank/@11.0467605,124.0029316,3a,75y,252.71h,92.16t/data=!3m7!1e1!3m5!1s3TKWel1urJHAUh2XTHKrZQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.1621531679270305%26panoid%3D3TKWel1urJHAUh2XTHKrZQ%26yaw%3D252.71449963898652!7i16384!8i8192!4m12!1m5!3m4!2zMTHCsDAyJzQ4LjIiTiAxMjTCsDAwJzEwLjEiRQ!8m2!3d11.0467229!4d124.0028106!3m5!1s0x33a868c682ea9ee7:0x19e5b62b1cbe93df!8m2!3d11.0467206!4d124.0027871!16s%2Fg%2F11csqvfnts?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Bogo.jpg",
  },
  

  {
    name: "Carbon Branch",
    address:
      "ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines",
    contact: "(0917-102-5671)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B017'34.3%22N+123%C2%B053'49.9%22E/@10.29285,123.897206,18z/data=!4m4!3m3!8m2!3d10.2928495!4d123.8972062?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
    image: "/.jpg",
  },

  {
    name: "Carcar Branch",
    address: "Poblacion II 6019 City of Carcar  Cebu Philippines",
    contact: "(0917-125-0313)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/@10.1040785,123.6417657,3a,75y,76.49h,77.37t/data=!3m7!1e1!3m5!1sE_slTxZKHp6LKsmHl_oA-w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D12.630778398288811%26panoid%3DE_slTxZKHp6LKsmHl_oA-w%26yaw%3D76.4850263550181!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Carcar.jpg",
  },

  {
    name: "Consolacion Branch",
    address:
      "ADM Commercial Bldg. Cansaga 6001 Consolacion Cebu Philippines",
    contact: "(0917-113-8143)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B022'35.2%22N+123%C2%B057'36.7%22E/@10.376449,123.9602,18z",
    image: "/images/branches/consolacion.jpg",
  },

  {
    name: "Danao Branch",
    address: "Pio Del Pilar St. Poblacion 6004 Danao City Cebu Philippines",
    contact: "(0917-108-6575)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+RURAL+BANK+INC./@10.5198275,124.0266347,3a,75y,7.81h,93.84t/data=!3m7!1e1!3m5!1sfN4CysVq51MX0KqoOu8hfw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.837951206556184%26panoid%3DfN4CysVq51MX0KqoOu8hfw%26yaw%3D7.81100999969323!7i16384!8i8192!4m12!1m5!3m4!2zMTDCsDMxJzExLjgiTiAxMjTCsDAxJzM2LjAiRQ!8m2!3d10.5199444!4d124.0266667!3m5!1s0x33a9b08428fc900b:0x2f8957a1b60b689c!8m2!3d10.5200079!4d124.0267235!16s%2Fg%2F11c1qb9xnr?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Danao.jpg",
  },

  {
    name: "Lapu-lapu Branch",
    address: "ASPAC BANK Bldg. Pusok 6015 Lapu-Lapu City Cebu Philippines",
    contact: "(0917-116-5655)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/Pusok,+Lapu-Lapu+City,+Cebu/@10.3245227,123.974147,3a,75y,146.99h,96.77t/data=!3m7!1e1!3m5!1sXLA2gPNz0B8biRraGs_VGA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-6.7684270158130175%26panoid%3DXLA2gPNz0B8biRraGs_VGA%26yaw%3D146.9864791596221!7i16384!8i8192!4m6!3m5!1s0x33a999d680997be1:0x888ed11028d84b4d!8m2!3d10.3197437!4d123.9722147!16s%2Fg%2F1tczsgj3?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Lapu2.jpg",
  },
   
  {
    name: "N.Bacalso Branch",
    address:
      "ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines",
    contact: "(0917-102-5671)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.2987528,123.8949856,3a,75y,312.09h,94.53t/data=!3m7!1e1!3m5!1sEmFO--YBIXUcY5aLeOsMjQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.533873856133425%26panoid%3DEmFO--YBIXUcY5aLeOsMjQ%26yaw%3D312.0934680136831!7i16384!8i8192!4m14!1m7!3m6!1s0x33a99957b9cb423b:0xcfe4abdcc58cd3b1!2sASPAC+Bank!8m2!3d10.2989215!4d123.8949195!16s%2Fg%2F11bwncm7rk!3m5!1s0x33a99957b9cb423b:0xcfe4abdcc58cd3b1!8m2!3d10.2989215!4d123.8949195!16s%2Fg%2F11bwncm7rk?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Nbacalso.jpg",
  },
  
  {
    name: "Talisay Branch",
    address: "#587 Natalio Bacalso Ave. Tabunoc 6045 City of Talisay Cebu Philippines",
    contact: "(0917-129-7008)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.2695943,123.8450157,3a,75y,308.28h,92.55t/data=!3m7!1e1!3m5!1snFJIKOtc6OFi7zziDAmhCw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.5465616071729187%26panoid%3DnFJIKOtc6OFi7zziDAmhCw%26yaw%3D308.2766443392345!7i16384!8i8192!4m6!3m5!1s0x33a99c5389bfd793:0xbfff387de691348d!8m2!3d10.2697852!4d123.8448788!16s%2Fg%2F11wtw5q884?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Talisay.jpg",
  },
   
  {
    name: "Toledo Branch",
    address:
      "Purok Nangka, Sangi  Toledo City Cebu 6038 Philippines",
    contact: "(0917-129-7896)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/ASPAC+Bank/@10.3862749,123.6521426,3a,75y,207.03h,90t/data=!3m7!1e1!3m5!1sHENaw1oyvhvad_g2llrRcQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DHENaw1oyvhvad_g2llrRcQ%26yaw%3D207.03105!7i16384!8i8192!4m14!1m7!3m6!1s0x33a972dd24f1c92b:0x750e13319c85b23a!2sASPAC+Bank!8m2!3d10.3861401!4d123.6520745!16s%2Fg%2F11wx4vn5tm!3m5!1s0x33a972dd24f1c92b:0x750e13319c85b23a!8m2!3d10.3861401!4d123.6520745!16s%2Fg%2F11wx4vn5tm?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/Toledo.jpg",
  },
 
  
];

const Branches: React.FC = () => {
  return (
    <div className="px-6 py-12 bg-gray-50">
      <motion.h1
        className="text-4xl font-semibold text-green-600 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Our Branches
      </motion.h1>

      <motion.p
        className="text-lg mb-6 text-center text-gray-700 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Visit any of our convenient branches to experience our exceptional services.
        Whether you need financial advice, loan assistance, or simply wish to inquire about our offerings,
        we're here to help.
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch, index) => (
          <motion.div
            key={branch.name}
            className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 + index * 0.2 }}
          >
            <img
              src={branch.image}
              alt={`${branch.name} image`}
             className="w-full h-48 object-contain rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 "

            />
            <h2 className="text-2xl font-semibold text-green-600">{branch.name}</h2>
            <p className="text-lg text-gray-700 mt-2">{branch.address}</p>
            <p className="text-lg text-gray-700 mt-1">Contact: {branch.contact}</p>
            <p className="text-lg text-gray-700 mt-1">Open Hours: {branch.hours}</p>
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
            >
              View on Google Maps
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Branches;
