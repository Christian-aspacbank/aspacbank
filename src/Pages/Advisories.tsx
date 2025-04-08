import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Advisories: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with 0 opacity
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 1 }} // 1 second duration for fade-in effect
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }} // Title starts off-screen (above)
        animate={{ y: 0, opacity: 1 }} // Animate the title to its final position
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-green-600 mb-4"
      >
        Advisories
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }} // Fade in after a slight delay
        className="text-black mb-4"
      >
        Welcome to the Advisories page! Here, you will find important updates,
        notifications, and advisories from ASPAC Bank.
      </motion.p>

      {/* Section for Latest Updates with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }} // Delay the appearance of this section
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-2">Latest Update</h2>
        <p>
          Please be advised that the bank will be closed on the following dates
          for the holidays. Check back here for any further updates.
        </p>
      </motion.div>

      {/* Additional advisory content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }} // Staggered appearance
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-2">Scheduled Maintenance</h2>
        <p>
          Our online banking system will undergo scheduled maintenance from
          12:00 AM to 4:00 AM. During this time, online banking services may be
          temporarily unavailable. We apologize for any inconvenience caused.
        </p>
      </motion.div>

      {/* Another advisory section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-2">Security Update</h2>
        <p>
          Please ensure that you update your login credentials regularly for
          enhanced security. Our team is always working to safeguard your
          accounts and personal information.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Advisories;
