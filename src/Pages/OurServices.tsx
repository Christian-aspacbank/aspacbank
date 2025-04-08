import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaCar, FaCalculator, FaUsers } from "react-icons/fa";

const OurServices: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}      
    >
      {/* Floating Services Div Wrapper */}
      <div
        className="relative h-[60vh] w-full flex flex-col justify-center bg-cover bg-center pb-16 px-12 overflow-visible"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 1) 60%), url('/servicesbanner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "45% center", // Moves the image further right
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left-Aligned Title & Description */}
        <motion.div className="text-left max-w-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ASPAC Bank Services
          </h1>
          <p className="text-black">
            We offer a range of financial solutions tailored to meet your needs, including loans, savings accounts, and more.
          </p>
        </motion.div>

        {/* Centered Services Section (overlapping with image) */}
        <div
          className="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl p-6 px-10 w-[80%] max-w-4xl flex justify-center gap-10 items-center z-20"
        >
          {[{ icon: <FaHome className="text-green-500 text-3xl transition-transform duration-300 hover:scale-110" />, text: "Foreclosed Properties" },
          { icon: <FaCar className="text-green-500 text-3xl transition-transform duration-300 hover:scale-110" />, text: "Pre-owned Vehicles for Sale" },
          { icon: <FaCalculator className="text-green-500 text-3xl transition-transform duration-300 hover:scale-110" />, text: "Calculator" },
          { icon: <FaUsers className="text-green-500 text-3xl transition-transform duration-300 hover:scale-110" />, text: "Consumer Loans Centers" }].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center w-40">
              <div className="transform transition-transform duration-300 hover:scale-110">
                {item.icon}
              </div>
              <p className="text-black font-medium text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        
      </div>
    </motion.div>
  );
};

export default OurServices;
