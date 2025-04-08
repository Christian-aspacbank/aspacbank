import React from "react";
import { motion } from "framer-motion";

const Branches: React.FC = () => {
  return (
    <div className="px-6 py-12">
      <motion.h1
        className="text-4xl font-semibold text-green-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Our Branches
      </motion.h1>
      <motion.p
        className="text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Visit any of our convenient branches to experience our exceptional
        services. Whether you need financial advice, loan assistance, or simply
        wish to inquire about our offerings, we're here to help.
      </motion.p>

      <div className="space-y-8">
        {/* Branch 1 */}
        <motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Main Branch</h2>
          <p className="text-lg text-gray-700">
            ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte
            Sts. Guizo 6014 Mandaue City Cebu Philippines
          </p>
          <p className="text-lg text-gray-700">Contact: (032) 345-0929/345-0930</p>
          <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
          <a
            href="https://www.google.com/maps/place/10%C2%B020'05.6%22N+123%C2%B056'23.4%22E/@10.334875,123.939833,18z/data=!4m4!3m3!8m2!3d10.3348754!4d123.9398333?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
          >
            View on Google Maps
          </a>
        </motion.div>

        {/* Repeat for other branches... */}
        <motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Lapu-lapu Branch</h2>
          <p className="text-lg text-gray-700">
            ASPAC BANK Bldg. Pusok 6015 Lapu-Lapu City Cebu Philippines
          </p>
          <p className="text-lg text-gray-700">Contact: (0917-116-5655)</p>
          <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
          <a
            href="https://www.google.com/maps/place/10%C2%B019'28.0%22N+123%C2%B058'27.3%22E/@10.324448,123.974253,18z/data=!4m4!3m3!8m2!3d10.3244481!4d123.9742525?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
          >
            View on Google Maps
          </a>
        </motion.div>
        

        <motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          
          <h2 className="text-2xl font-semibold text-green-600">Bogo Branch</h2>
  <p className="text-lg text-gray-700">ASPAC BANK Bldg. P. Rodriguez St. Cogon (Pob.) 6010 City of Bogo Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact: (0917-129-4966)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps?ll=11.046723,124.002811&z=18&t=m&hl=en-US&gl=US&mapclient=embed&q=11%C2%B002%2748.2%22N+124%C2%B000%2710.1%22E+11.046723,+124.002811@11.0467229,124.0028106"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>

        </motion.div>

        <motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Talisay Branch</h2>
  <p className="text-lg text-gray-700">#587 Natalio Bacalso Ave. Tabunoc 6045 City of Talisay Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact: (0917-129-7008)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B016'11.3%22N+123%C2%B050'41.5%22E/@10.269796,123.844864,18z/data=!4m4!3m3!8m2!3d10.2697963!4d123.8448637?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>



</motion.div>
<h2 className="text-2xl font-semibold text-green-600">Carcar Branch</h2>
  <p className="text-lg text-gray-700">Poblacion II 6019 City of Carcar  Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact: (0917-125-0313)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps?ll=10.104102,123.641838&z=18&t=m&hl=en-US&gl=US&mapclient=embed&q=10%C2%B006%2714.8%22N+123%C2%B038%2730.6%22E+10.104102,+123.641838@10.1041019,123.6418375"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Danao  Branch</h2>
  <p className="text-lg text-gray-700">Pio Del Pilar St. Poblacion 6004 Danao City Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact:  (0917-108-6575)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B031'11.8%22N+124%C2%B001'36.0%22E/@10.519946,124.026669,18z/data=!4m4!3m3!8m2!3d10.5199462!4d124.0266688?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>



</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Bantayan  Branch</h2>
  <p className="text-lg text-gray-700">Ticad (Pob.) 6052 Bantayan Cebu Philippines  </p>
  <p className="text-lg text-gray-700">Contact:  (0917-128-4422 )</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/11%C2%B010'10.0%22N+123%C2%B043'26.7%22E/@11.169456,123.72407,18z/data=!4m4!3m3!8m2!3d11.1694561!4d123.7240705?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>
</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >


</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >

<h2 className="text-2xl font-semibold text-green-600">Consolacion  Branch</h2>
  <p className="text-lg text-gray-700">ADM Commercial Bldg. Cansaga 6001 Consolacion Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact:(0917-113-8143)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B022'35.2%22N+123%C2%B057'36.7%22E/@10.376449,123.9602,18z/data=!4m4!3m3!8m2!3d10.3764493!4d123.9601998?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>
</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
 <h2 className="text-2xl font-semibold text-green-600">Toledo Branch</h2>
  <p className="text-lg text-gray-700">Purok Nangka, Sangi  Toledo City Cebu 6038 Philippines</p>
  <p className="text-lg text-gray-700">Contact:(0917-129-7896) </p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B023'10.8%22N+123%C2%B039'07.7%22E/@10.38633,123.65215,18z/data=!4m4!3m3!8m2!3d10.38633!4d123.6521496?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>


</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
<h2 className="text-2xl font-semibold text-green-600">N.Bacalso Branch</h2>
  <p className="text-lg text-gray-700">ASPAC BANK Bldg. Cor. N. Bacalso St. & P. Del Rosario Ext., Sambag 1 (Pob.) 6000 Cebu City (Capital) Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact:(0917-102-5671)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B017'56.9%22N+123%C2%B053'41.7%22E/@10.299143,123.894909,18z/data=!4m4!3m3!8m2!3d10.2991431!4d123.8949087?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>


</motion.div>

<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
<h2 className="text-2xl font-semibold text-green-600">Carbon Branch</h2>
  <p className="text-lg text-gray-700">Escano St.  Ermita (Pob) 6000 Cebu City (Capital) Cebu Philippines </p>
  <p className="text-lg text-gray-700">Contact:(0917-130-6492)</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B017'34.3%22N+123%C2%B053'49.9%22E/@10.29285,123.897206,18z/data=!4m4!3m3!8m2!3d10.2928495!4d123.8972062?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>


</motion.div>



<motion.div
          className="border p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >

<h2 className="text-2xl font-semibold text-green-600">Banilad Branch</h2>
  <p className="text-lg text-gray-700">UC Bldg Banilad 6000 Cebu City (Capital) Cebu  Philippines </p>
  <p className="text-lg text-gray-700">Contact:(0917-129-7936 )</p>
  <p className="text-lg text-gray-700">Open Hours: 9:00 AM - 5:00 PM (Mon-Fri)</p>
  <a
    href="https://www.google.com/maps/place/10%C2%B020'18.7%22N+123%C2%B054'42.0%22E/@10.338526,123.911659,18z/data=!4m4!3m3!8m2!3d10.3385262!4d123.9116589?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    className="text-green-600 underline mt-4 inline-block transform transition-transform duration-300 hover:scale-105"
  >
    View on Google Maps
  </a>

</motion.div>     
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-lg mb-4">Need assistance or have questions?</p>
        <a
          href="tel:(032) 345-0929"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transform transition-transform duration-300 hover:scale-105"
        >
          Call Us Now
        </a>
      </motion.div>
    </div>
  );
};

export default Branches;
