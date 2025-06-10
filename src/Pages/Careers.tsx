import React from "react";
import { motion } from "framer-motion";

const Careers: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full min-h-screen bg-gray-100 py-16"
    >
      {/* Banner Section with Image */}
      <div
 className="w-full py-24 text-center flex items-center justify-start px-16 h-[400px]"
 // Increased padding
  style={{
    backgroundImage: "url('Careers.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <h2 className="text-3xl font-semibold bg-black bg-opacity-15 p-4 rounded-md absolute leading-tight text-yellow-400">
    Build Your Career with Us
  </h2>
</div>


<br />

    

      {/* Additional Information Section */}
      <div className="container mx-auto text-center mt-12 px-4">
        <h1 className="text-xl text-gray-700 mb-6">
          In prgogress.
        </h1>
        
      </div>
    </motion.div>
  );
};

export default Careers;
