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
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-700">
          At ASPAC Bank, we're always looking for talented individuals who are passionate about providing excellent customer service and creating innovative financial solutions. Take the next step in your career with us.
        </p>
      </div>

      {/* Available Positions Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Current Openings</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Job 1 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-green-600">Customer Service Representative</h3>
            <p className="text-gray-700 mt-2">
              We are looking for a friendly and professional individual to join our team as a Customer Service Representative. You will assist customers with their banking needs, answer inquiries, and provide exceptional service.
            </p>
            <div className="mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Apply Now
              </button>
            </div>
          </motion.div>

          {/* Job 2 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-green-600">Banking Specialist</h3>
            <p className="text-gray-700 mt-2">
              We're seeking a Banking Specialist with a deep understanding of banking products and services. You will be responsible for assisting clients with loan applications, financial planning, and other banking services.
            </p>
            <div className="mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Apply Now
              </button>
            </div>
          </motion.div>

          {/* Job 3 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-green-600">IT Specialist</h3>
            <p className="text-gray-700 mt-2">
              As an IT Specialist at ASPAC Bank, you will ensure the smooth operation of our banking systems and services. You will provide technical support and work on system improvements to enhance our technology infrastructure.
            </p>
            <div className="mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Apply Now
              </button>
            </div>
          </motion.div>

          {/* Job 4 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-green-600">Marketing Coordinator</h3>
            <p className="text-gray-700 mt-2">
              We're looking for a creative Marketing Coordinator to help us with campaigns and promotional efforts. You will support the marketing team with strategy development, content creation, and public relations.
            </p>
            <div className="mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="container mx-auto text-center mt-12 px-4">
        <p className="text-xl text-gray-700 mb-6">
          If you're interested in joining a team of dedicated professionals, we'd love to hear from you! Our team is driven, passionate, and focused on delivering the best financial solutions to our clients.
        </p>
        <p className="text-lg text-gray-700">
          Apply today and take the next step in your career at ASPAC Bank.
        </p>
      </div>
    </motion.div>
  );
};

export default Careers;
