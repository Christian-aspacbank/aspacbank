import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";

// Define the type for services
interface CebuanaService {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Proper type with casting
  link: string; // Add the link property here

}

// Services list with icons cast correctly
const services: CebuanaService[] = [
  {
    title: "Pera Padala",
    Icon: FaExchangeAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/pera-padala", // Add the link property for Deposit Account
  },
  {
    title: "International Remittance",
    Icon: FaMoneyBillWave as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/international-remittance",

  },
  {
    title: "Cash In / Cash Out",
    Icon: FaUniversity as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/cash-in-cash-out",
  },
  {
    title: "Bills Payment",
    Icon: FaMoneyBillWave as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/cebuana-bills-payment",
  },
  {
    title: "E-Load",
    Icon: FaMobileAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/e-load",
  },
  {
    title: "Microinsurance",
    Icon: FaShieldAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/microinsurance",
  },
];

const CebuanaServices: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="relative h-[60vh] w-full flex flex-col justify-center bg-cover bg-center pb-16 px-12 overflow-visible"
        style={{
          backgroundImage: `url('/Cebuana.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "45% center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div className="bg-black bg-opacity-15 p-4 rounded-md text-left max-w-lg text-white">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">
            Cebuana Lhuillier Authorized Agent
          </h1>
          <p className="text-lg">
            Convenient financial services available through our Cebuana Lhuillier partnership.
          </p>
        </motion.div>

        <div className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl p-8 w-[95%] max-w-6xl flex flex-wrap justify-center gap-8 items-center z-20">

        {services.map(({ title, Icon, link }, index) => (
  <Link to={link} key={index}>
    <div className="flex flex-col items-center text-center w-[120px] md:w-[140px] group">
  <Icon
   className="text-green-600 text-5xl mb-2 md:text-6xl group-hover:text-yellow-400 transition-all duration-500 ease-in-out transform group-hover:scale-110"

    aria-label={title}
  />
  <p className="text-sm md:text-base font-medium text-gray-700">
    {title}
  </p>
</div>

  </Link>
))}

        </div>
      </div>

      <div className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Fast, Secure & Accessible
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Enjoy a wide range of services at your nearest ASPAC Bank branch powered by Cebuana Lhuillier.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CebuanaServices;
