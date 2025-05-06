import React from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa";

// Correctly cast the icon for TypeScript
const Icon = FaMoneyBillWave as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const InternationalRemittance: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white py-20 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Background section with overlay for better text contrast */}
        <div
          className="flex flex-col items-center mb-8 py-16 px-4 bg-cover bg-center rounded-xl text-white"
          style={{ backgroundImage: "url('/International.jpg')" }}
        >
          {/* Overlay to improve text readability */}
          <div className="bg-black bg-opacity-60 p-6 rounded-lg text-center max-w-3xl">
            <Icon className="text-yellow-400 text-6xl mb-4 hover:text-yellow-300 transition-all duration-300" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-white mb-3 hover:text-yellow-300 transition-all duration-300">
              International Remittance
            </h1>
            <p className="text-lg text-white mt-3 max-w-2xl mx-auto leading-relaxed">
              Send money across the globe with ease and security through ASPAC Bank’s International Remittance service powered by Cebuana Lhuillier. Fast, reliable, and affordable — helping you support your loved ones anywhere.
            </p>
          </div>
        </div>

        {/* Section explaining the benefits */}
        <div className="bg-gray-50 rounded-xl shadow p-6 md:p-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Why Choose International Remittance?
          </h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2 ">
            <li className="hover:text-green-600 transition-all duration-300">Global reach to send money to family and friends anywhere in the world.</li>
            <li className="hover:text-green-600 transition-all duration-300">Affordable and competitive exchange rates for a better deal.</li>
            <li className="hover:text-green-600 transition-all duration-300">Fast and secure transactions with real-time processing.</li>
            <li className="hover:text-green-600 transition-all duration-300">Convenient transfers at any ASPAC Bank branch.</li>
            <li className="hover:text-green-600 transition-all duration-300">Easy tracking of your remittance for peace of mind.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default InternationalRemittance;
