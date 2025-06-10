import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUserShield,
  FaAward,
  FaGem,
  FaGlobe,
  FaUserTie,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface LoanType {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const loanTypes: LoanType[] = [
  {
    title: "Commercial Loan",
    description: "Support for businesses needing working capital or expansion funds.",
    Icon: FaBriefcase as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Real Estate Loan",
    description: "Flexible financing for property acquisition, renovation, or construction.",
    Icon: FaBuilding as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Pension Loan",
    description: "Fast-access loans tailored for pensioners and retirees.",
    Icon: FaUserShield as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Honorarium Loan",
    description: "Loans for individuals receiving honoraria, such as public servants or consultants.",
    Icon: FaAward as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Chatel Loan",
    description: "Secured loans backed by assets for personal or emergency use.",
    Icon: FaGem as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "OFW Loan",
    description: "Convenient loan solutions for Overseas Filipino Workers and their families.",
    Icon: FaGlobe as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Salary Loan",
    description: "Quick and easy loans for employed individuals with flexible terms.",
    Icon: FaUserTie as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
];

const Loans: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Image Banner */}
     <div
  className="w-full h-64 bg-cover bg-center"
  style={{
    backgroundImage: "url('/loans.jpg')", // Make sure the path is correct
  }}
>
  <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
    <h1 className="text-white text-4xl sm:text-5xl font-bold drop-shadow-lg">
      ASPAC Loan Services
    </h1>
  </div>
</div>


      {/* Content Section */}
      <div className="px-6 py-16 max-w-6xl mx-auto text-center">
        <p className="text-lg sm:text-xl text-gray-700 mb-10">
          Explore our wide range of loan products designed to meet your unique financial needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {loanTypes.map(({ title, description, Icon }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-green-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-center text-green-600 mb-5">
                <Icon className="text-5xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <h2 className="text-2xl font-bold text-green-700 mb-2">Ready to apply?</h2>
        <p className="text-gray-700 mb-6">
          Let our loan officers assist you in finding the best loan option for your needs.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-800 transition"
        >
          Inquire Now
        </button>
      </div>

      {/* Modal */}
     <AnimatePresence>
  {showModal && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowModal(false)}
    >
      <motion.div
        className="bg-white rounded-xl p-8 max-w-md w-full relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Contact Us</h2>

        <p className="text-gray-700 mb-4 text-center">
          For inquiries or assistance, reach out to us via the following:
        </p>
        <p className="text-gray-800 text-center font-medium">
          Landline: 345-0929, 345-0930<br />
          Mobile: 0917-127-7796<br />
        
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowModal(false)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Loans;
