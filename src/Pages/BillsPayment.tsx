import React from "react";
import { motion } from "framer-motion";

const BillsPayment: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-white"
    >
      {/* Header Section without background image */}
      <div 
  className="h-[50vh] flex items-center justify-center" 
  style={{ backgroundImage: "url('Billspayment.png')", backgroundSize: "cover", backgroundPosition: "center" }}
>
  <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white text-center">
    <h1 className="text-4xl font-bold text-yellow-400 mb-2">Bills Payment</h1>
    <p className="text-lg">Settle your MECO bills with ease and convenience at ASPAC Bank.</p>
  </div>
</div>


      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">Pay Your MECO Bills Quickly and Securely</h2>
        <p className="mb-4">
          ASPAC Bank provides a convenient way for customers to pay their MECO bills.
        </p>

        <div className="mt-10 bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <p className="text-md font-medium">
            For inquiries, contact us at <strong>0917-127-7796</strong> or call <strong>345-0929 / 345-0930</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BillsPayment;
