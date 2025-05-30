import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaPiggyBank,
  FaUniversity,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
} from "react-icons/fa";

interface Service {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

const services: Service[] = [
  {
    title: "Deposit Account",
    Icon: FaPiggyBank as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/deposit-account",
  },
  {
    title: "Tuition Fee Collection",
    Icon: FaUniversity as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/tuition-fee-collection",
  },
  {
    title: "Bills Payment",
    Icon: FaMoneyCheckAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/bills-payment",
  },
  {
    title: "Loans",
    Icon: FaHandHoldingUsd as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    link: "/loans",
  },
];

const OurServices: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Banner Section */}
     {/* Banner Section */}
<div
  className="relative min-h-[60vh] w-full flex flex-col justify-center bg-cover bg-center px-4 sm:px-8 md:px-12 pb-40 md:pb-36"
  style={{
    backgroundImage: `url('/Services5.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "45% center",
    backgroundRepeat: "no-repeat",
  }}
>
  <motion.div className="bg-black bg-opacity-20 p-4 sm:p-6 md:p-8 rounded-md max-w-xl text-white z-10">
    <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">Our Services</h1>
    <p className="text-sm sm:text-base">
      Explore the diverse range of services we offer to help you manage your finances effortlessly.
    </p>
  </motion.div>
</div>

{/* Responsive Cards */}
<div className="relative md:absolute md:bottom-[0200px] md:left-1/2 md:transform md:-translate-x-1/2 bg-white shadow-xl rounded-2xl p-6 md:p-8 w-[90%] max-w-4xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 z-20 mx-auto mt-[-3.5rem] md:mt-0">
  {services.map(({ title, Icon, link }, index) => (
    <Link
      key={index}
      to={link}
      className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
    >
      <Icon className="text-green-600 text-4xl sm:text-5xl md:text-6xl mb-3" />
      <p className="text-sm sm:text-base font-medium text-gray-700">{title}</p>
    </Link>
  ))}
</div>

      {/* Why Choose Section */}
      <div className="pt-28 sm:pt-32 md:pt-40 pb-20 bg-gray-50 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Why Choose ASPAC Bank?</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-10">
            At ASPAC Bank, we prioritize your financial security and convenience. Our services are tailored
            to help you reach your financial goals with ease and confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">Customer Support</h3>
              <p className="text-gray-600">Our bank is available Monday to Friday, 9 AM to 3 PM.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">Security</h3>
              <p className="text-gray-600">State-of-the-art security measures to protect your assets.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">Convenience</h3>
              <p className="text-gray-600">Easy online banking services from the comfort of your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">Expert Advice</h3>
              <p className="text-gray-600">Get personalized financial advice from our experts.</p>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us Modal */}
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
                For inquiries or assistance, reach out to us via the following numbers:
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
    </motion.div>
  );
};

export default OurServices;
