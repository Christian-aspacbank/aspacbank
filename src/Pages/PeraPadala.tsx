import React from "react";
import { motion } from "framer-motion";
import { FaArrowCircleRight  } from "react-icons/fa";

// Correctly cast the icon for TypeScript
const Icon = FaArrowCircleRight as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const PeraPadala: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Background section with overlay for better text contrast */}
        <div
          className="flex flex-col items-center mb-12 py-20 px-6 bg-cover bg-center rounded-3xl text-white shadow-lg"
          style={{ backgroundImage: "url('/Perapadala.jpg')" }}
        >
          {/* Overlay to improve text readability */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center max-w-2xl mx-auto">
  <Icon className="text-yellow-400 text-6xl mb-4 hover:text-yellow-300 transition-all duration-300" aria-hidden="true" />
  <h1 className="text-4xl font-bold text-white mb-3 hover:text-yellow-300 transition-all duration-300">
    Pera Padala
  </h1>
  <p className="text-lg text-white mt-3 max-w-2xl mx-auto leading-relaxed">
    Send and receive money with ease through ASPAC Bank’s Pera Padala powered by Cebuana Lhuillier.
    Fast, secure, and nationwide — your loved ones are just a transaction away.
  </p>
</div>

        </div>

        {/* Section explaining the benefits */}
        <div className="bg-gray-50 rounded-3xl shadow-xl p-8 md:p-12 text-left">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Pera Padala?</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-4">
            <li className="hover:text-green-600 transition-all duration-300">
              Nationwide network with Cebuana Lhuillier’s extensive reach.
            </li>
            <li className="hover:text-green-600 transition-all duration-300">
              Fast and reliable money transfer for your loved ones.
            </li>
            <li className="hover:text-green-600 transition-all duration-300">
              Affordable fees and real-time processing.
            </li>
            <li className="hover:text-green-600 transition-all duration-300">
              Convenient transactions through ASPAC Bank branches.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PeraPadala;
