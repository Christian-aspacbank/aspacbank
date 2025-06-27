import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

type Advisory = {
  title: string;
  date: string;
  content: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  googleMapsUrl?: string;
};

const advisory: Advisory = {
  title: "New Branch Location – ASPAC Bank Consolacion",
  date: "Effective Immediately",
  content: [
    "We are pleased to inform you that ASPAC Bank Consolacion is now operating at its new location:",
    "📍 Address: ASPAC Bldg., Sta. Lucia Town Center, Poblacion Oriental, Consolacion, Cebu.",
    "📌 Landmark: Located across the parking area of CityMall Consolacion.",
    "🧭 Coordinates: 10.3739017, 123.9588289",
    "We look forward to serving you better at our new location.",
  ],
  Icon: FaMapMarkerAlt as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  iconColor: "text-red-600",
  googleMapsUrl: "https://maps.google.com/?q=10.373901718957983,123.95882888273896",
};

const Advisories: React.FC = () => {
  const { title, date, content, Icon, iconColor, googleMapsUrl } = advisory;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Important Advisory</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get the latest announcement from ASPAC Bank regarding our branch operations.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border"
      >
        <div className="flex items-center mb-4">
          <Icon className={`text-2xl mr-3 ${iconColor}`} />
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{date}</p>

        <div className="text-gray-700 text-base leading-relaxed space-y-3">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {googleMapsUrl && (
          <div className="mt-6">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Advisories;
