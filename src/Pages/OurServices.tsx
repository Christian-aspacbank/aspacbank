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

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OurServices: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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
      <div className="relative z-20 -mt-16 sm:-mt-20 md:-mt-24 mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 w-[90%] max-w-4xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Why Choose ASPAC Bank Section - UnionBank Style */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-20 bg-gray-50 px-4 sm:px-6 md:px-10 space-y-16">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Why Choose ASPAC Bank?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            At ASPAC Bank, we prioritize your financial security and convenience. Our services are tailored
            to help you reach your financial goals with ease and confidence.
          </p>
        </motion.div>

        {/* Block 1 */}
        <motion.div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src="/customer-support1.jpg" alt="Customer Support" className="w-full lg:w-1/2 rounded-xl shadow-md" />
          <div className="lg:w-1/2">
            <h3 className="text-sm text-green-700 font-semibold mb-2">Customer Support</h3>
            <h2 className="text-2xl font-bold mb-4">We’re here when you need us</h2>
            <p className="text-gray-600 mb-4">
              Our bank is available Monday to Friday, 9 AM to 3 PM — always ready to assist you.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
            >
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* Block 2 */}
        <motion.div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 bg-white p-6 rounded-xl shadow"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src="/security.jpg" alt="Security" className="w-full lg:w-1/2 rounded-xl shadow-md" />
          <div className="lg:w-1/2">
            <h3 className="text-sm text-green-700 font-semibold mb-2">Security</h3>
            <h2 className="text-2xl font-bold mb-4">Bank with peace of mind</h2>
            <p className="text-gray-600 mb-4">
              We use state-of-the-art systems to safeguard your money and information.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Block 3 */}
        <motion.div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src="/online-banking.jpg" alt="Convenience" className="w-full lg:w-1/2 rounded-xl shadow-md" />
          <div className="lg:w-1/2">
            <h3 className="text-sm text-green-700 font-semibold mb-2">Convenience</h3>
            <h2 className="text-2xl font-bold mb-4">Banking made easier</h2>
            <p className="text-gray-600 mb-4">
              Enjoy hassle-free transactions through our accessible branch network, friendly staff, and fast over-the-counter services.
            </p>
            <a
              href="/branches"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
            >
              Find a Branch
            </a>
          </div>
        </motion.div>

        {/* Block 4 */}
        <motion.div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 bg-white p-6 rounded-xl shadow"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src="/financial-advice.jpg" alt="Expert Advice" className="w-full lg:w-1/2 rounded-xl shadow-md" />
          <div className="lg:w-1/2">
            <h3 className="text-sm text-green-700 font-semibold mb-2">Expert Advice</h3>
            <h2 className="text-2xl font-bold mb-4">Guidance you can trust</h2>
            <p className="text-gray-600 mb-4">
              Our advisors help you make smart choices with confidence and clarity.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
            >
              Talk to Us
            </button>
          </div>
        </motion.div>
      </section>

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
                Mobile: 0917-127-7796
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
