import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaPiggyBank, FaUniversity, FaMoneyCheckAlt, FaHandHoldingUsd } from "react-icons/fa";

// Define the type for services, adding the `link` property
interface Service {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Correct type for react-icons components
  link: string; // Add the link property here
}

const services: Service[] = [
  {
    title: "Deposit Account",
    Icon: FaPiggyBank as React.ComponentType<React.SVGProps<SVGSVGElement>>, // Cast explicitly
    link: "/deposit-account", // Add the link property for Deposit Account
  },
  {
    title: "Tuition Fee Collection",
    Icon: FaUniversity as React.ComponentType<React.SVGProps<SVGSVGElement>>, // Cast explicitly
    link: "/tuition-fee-collection", // Example link for Tuition Fee Collection
  },
  {
    title: "Bills Payment",
    Icon: FaMoneyCheckAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>, // Cast explicitly
    link: "/bills-payment", // Example link for Bills Payment
  },
  {
    title: "Loans",
    Icon: FaHandHoldingUsd as React.ComponentType<React.SVGProps<SVGSVGElement>>, // Cast explicitly
    link: "/loans", // Example link for Loans
  },
];

const OurServices: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="relative h-[60vh] w-full flex flex-col justify-center bg-cover bg-center pb-16 px-12 overflow-visible"
        style={{
          backgroundImage: `url('/Services5.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "45% center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div className="bg-black bg-opacity-15 p-4 rounded-md text-left max-w-lg text-white">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">Our Services</h1>
          <p className="text-lg">
            Explore the diverse range of services we offer to help you manage your finances effortlessly.
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl p-8 w-[80%] max-w-4xl flex justify-center gap-16 items-center z-20 h-[180px]">
          {services.map(({ title, Icon, link }, index) => (
            <Link key={index} to={link} className="flex flex-col items-center text-center">
              <Icon className="text-green-600 text-6xl mb-3 transition-transform transform hover:scale-110 duration-300" />
              <p className="text-xl font-medium text-gray-700">{title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* More content sections */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose ASPAC Bank?</h2>
          <p className="text-lg text-gray-600 mb-10">
            At ASPAC Bank, we prioritize your financial security and convenience. Our services are tailored
            to help you reach your financial goals with ease and confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-green-600 mb-3">Customer Support</h3>
    <p className="text-gray-600">
      Our bank is available Monday to Friday, 9 AM to 3 PM.
    </p>
  </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Security</h3>
              <p className="text-gray-600">State-of-the-art security measures to protect your assets.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Convenience</h3>
              <p className="text-gray-600">Easy online banking services from the comfort of your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Expert Advice</h3>
              <p className="text-gray-600">Get personalized financial advice from our experts.</p>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default OurServices;
