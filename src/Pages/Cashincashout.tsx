import React from "react";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";

// Correctly cast the icon for TypeScript
const Icon = FaUniversity as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const CashInCashOut: React.FC = () => {
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
          style={{ backgroundImage: "url('/Cashincashout.jpg')" }}
        >
          {/* Overlay to improve text readability */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center max-w-3xl">
            <Icon className="text-yellow-400 text-7xl hover:text-yellow-300 transition-all duration-300 mb-6" aria-hidden="true" />
            <h1 className="text-5xl font-bold text-white mb-4 hover:text-yellow-300 transition-all duration-300">
              Cash In / Cash Out
            </h1>
            <p className="text-lg text-white mt-2 max-w-2xl mx-auto leading-relaxed">
              Quickly and securely transfer funds to and from your bank account with our Cash In / Cash Out services powered by Cebuana Lhuillier. Simple, fast, and nationwide coverage at your convenience.
            </p>
          </div>
        </div>

        {/* Section explaining the benefits */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-6 md:p-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Use Cash In / Cash Out?</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-3">
            <li className="hover:text-green-600 transition-all duration-300">Access to a nationwide network of partner agents and locations.</li>
            <li className="hover:text-green-600 transition-all duration-300">Quick, easy, and secure transactions for personal or business purposes.</li>
            <li className="hover:text-green-600 transition-all duration-300">Convenient for sending and receiving cash at ASPAC Bank branches or Cebuana Lhuillier locations.</li>
            <li className="hover:text-green-600 transition-all duration-300">Affordable transaction fees, with no hidden costs.</li>
            <li className="hover:text-green-600 transition-all duration-300">Available for both local and international transactions.</li>
          </ul>
        </div>

        {/* Section showing how it works */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">How Does Cash In / Cash Out Work?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Cash In</h3>
              <p className="text-gray-600">
                Deposit funds into your account with ease! Visit any Cebuana Lhuillier branch or ASPAC Bank partner location and deposit cash directly to your account.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Cash Out</h3>
              <p className="text-gray-600">
                Withdraw cash conveniently from your account. Simply go to any Cebuana Lhuillier branch or ASPAC Bank partner location and pick up your funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CashInCashOut;  // Correct export name
