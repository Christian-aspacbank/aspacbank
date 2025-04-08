import React from "react";
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";

const Features: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Fade in effect with 1 second duration
      className="min-h-screen bg-gray-100 overflow-x-hidden pt-0"
    >
      {/* New Div with "Our Features" on the Left */}
      <div className="relative min-h-[400px] flex items-center px-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/features3.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 95%), linear-gradient(to left, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 95%), linear-gradient(to left, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 95%)",
          }}
        />
        <h1 className="relative text-4xl font-bold text-green-700">
          Our Features
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Feature 1 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Fast Loan Processing</h2>
          <p className="text-gray-700 mt-2">
            Get your loan approved within 24 hours with our streamlined process.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">Secure Transactions</h2>
          <p className="text-gray-700 mt-2">
            Our bank uses top-level security to ensure your money is safe.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-green-600">24/7 Customer Support</h2>
          <p className="text-gray-700 mt-2">
            Our dedicated team is always ready to assist you, anytime, anywhere.
          </p>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <Testimonials />
      </div>
    </motion.div>
  );
};

export default Features;
