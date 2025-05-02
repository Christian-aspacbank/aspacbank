import React from "react";
import { motion } from "framer-motion";

const branches = [
  {
    name: "Main Branch",
    address:
      "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo 6014 Mandaue City Cebu Philippines",
    contact: "(032) 345-0929/345-0930",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B020'05.6%22N+123%C2%B056'23.4%22E/@10.334875,123.939833,18z/data=!4m4!3m3!8m2!3d10.3348754!4d123.9398333?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
    image: "/Mandaue.jpg",
  },
  {
    name: "Banilad Branch",
    address:
      "ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines",
    contact: "(0917-102-5671)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B020'18.7%22N+123%C2%B054'42.0%22E/@10.3385492,123.911637,3a,75y,140.89h,90t/data=!3m7!1e1!3m5!1sXmNZr6TyAw_ZeLc-zYzrCA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DXmNZr6TyAw_ZeLc-zYzrCA%26yaw%3D140.89452!7i16384!8i8192!4m4!3m3!8m2!3d10.3385262!4d123.9116589?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
    image: "/Banilad.jpg",
  },

  {
    name: "Bantayan Branch",
    address: "Ticad (Pob.) 6052 Bantayan Cebu Philippines",
    contact: "(0917-128-4422)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/11%C2%B010'10.0%22N+123%C2%B043'26.7%22E/@11.169456,123.72407,18z",
    image: "/Bantayan.jpg",
  },


  {
    name: "Bogo Branch",
    address:
      "ASPAC BANK Bldg. P. Rodriguez St. Cogon (Pob.) 6010 City of Bogo Cebu Philippines",
    contact: "(0917-129-4966)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps?ll=11.046723,124.002811&z=18&t=m&hl=en-US&gl=US&mapclient=embed&q=11%C2%B002%2748.2%22N+124%C2%B000%2710.1%22E+11.046723,+124.002811@11.0467229,124.0028106",
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
      "https://www.google.com/maps?ll=10.104102,123.641838&z=18",
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
      "https://www.google.com/maps/place/10%C2%B031'11.8%22N+124%C2%B001'36.0%22E/@10.519946,124.026669,18z",
    image: "/Danao.jpg",
  },

  {
    name: "Lapu-lapu Branch",
    address: "ASPAC BANK Bldg. Pusok 6015 Lapu-Lapu City Cebu Philippines",
    contact: "(0917-116-5655)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B019'28.0%22N+123%C2%B058'27.3%22E/@10.324448,123.974253,18z/data=!4m4!3m3!8m2!3d10.3244481!4d123.9742525?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
    image: "/Lapu2.jpg",
  },
   
  {
    name: "N.Bacalso Branch",
    address:
      "ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines",
    contact: "(0917-102-5671)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B017'00.3%22N+123%C2%B053'05.0%22E/@10.283409,123.884722,18z",
    image: "/Nbacalso.jpg",
  },
  
  {
    name: "Talisay Branch",
    address: "#587 Natalio Bacalso Ave. Tabunoc 6045 City of Talisay Cebu Philippines",
    contact: "(0917-129-7008)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B016'11.3%22N+123%C2%B050'41.5%22E/@10.269796,123.844864,18z",
    image: "/Talisay.jpg",
  },
   
  {
    name: "Toledo Branch",
    address:
      "Purok Nangka, Sangi  Toledo City Cebu 6038 Philippines",
    contact: "(0917-129-7896)",
    hours: "9:00 AM - 3:00 PM (Mon-Fri)",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B023'10.8%22N+123%C2%B039'07.7%22E/@10.38633,123.65215,18z",
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
              className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
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
