import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPhone,
  FaClock,
  FaMapPin,
} from "react-icons/fa";

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
  googleMapsUrl:
    "https://maps.google.com/?q=10.373901718957983,123.95882888273896",
};

const Advisories: React.FC = () => {
  const { title, date, content, Icon, googleMapsUrl } = advisory;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12 max-w-5xl"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Important Updates
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bank <span className="text-green-600">Advisories</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with the latest announcements and updates from ASPAC
            Bank
          </p>
        </motion.div>

        {/* Hero Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <img
              src="/advisory_on_large_cash_withdrawal.jpg"
              alt="Advisory on Large Cash Withdrawal"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Bogo City Closure Advisory */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <FaExclamationTriangle className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Temporary Closure Notice</h2>
                <p className="text-amber-50 text-sm mt-1">
                  Effective Immediately
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-gray-700 space-y-4 leading-relaxed">
              <p className="text-xl font-semibold text-gray-900">
                To our Valued Clients of ASPAC BANK - Bogo City Branch,
              </p>

              <p className="text-base">
                Please be advised that our <strong>Bogo City Branch</strong> is
                temporarily closed for much-needed renovations. The closure is
                effective immediately and is indefinite as of this time. We will
                issue a public announcement once the branch reopens.
              </p>

              <p className="text-base">
                During this period, all transactions and account service needs
                including deposits, withdrawals, and over-the-counter payments
                can be accommodated at any of our other ASPAC Bank branches.
              </p>

              {/* Alternative Branches */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-600 rounded-xl p-6 mt-6">
                <p className="font-bold text-green-800 text-lg mb-6 flex items-center gap-2">
                  <FaMapPin className="text-green-600" />
                  Visit Our Nearby Branches
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Danao Branch */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                    <p className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200">
                      ASPAC BANK - Danao Branch
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">
                          Pio Del Pilar St., Danao City, Cebu
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-green-600 flex-shrink-0" />
                        <p className="text-gray-700">0917-108-6575</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-600 flex-shrink-0" />
                        <p className="text-gray-700">
                          9:00 AM - 3:00 PM (Mon–Fri)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bantayan Branch */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
                    <p className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200">
                      ASPAC BANK - Bantayan Branch
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">
                          Ticad, Poblacion Bantayan, Cebu
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-green-600 flex-shrink-0" />
                        <p className="text-gray-700">0917-128-4422</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-600 flex-shrink-0" />
                        <p className="text-gray-700">
                          9:00 AM - 3:00 PM (Mon–Fri)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-5 mt-6">
                <p className="text-base text-gray-700">
                  We appreciate your understanding as we work to improve our
                  banking services. For any questions or concerns, please
                  contact us:
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="tel:0898-272-2724"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-sm"
                  >
                    <FaPhone />
                    0898-272-2724
                  </a>
                  <a
                    href="https://www.aspacbank.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-5 py-2.5 rounded-lg font-semibold transition shadow-sm"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <p className="font-semibold text-gray-900">
                  Thank you for your continued trust.
                </p>
                <p className="font-semibold text-gray-700 mt-2">
                  Sincerely,
                  <br />
                  <span className="text-green-700">ASPAC Bank Management</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consolacion New Location Advisory */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Icon className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-green-50 text-sm mt-1">{date}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-gray-700 space-y-4 leading-relaxed">
              {content.map((paragraph, index) => (
                <p key={index} className="text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {googleMapsUrl && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
                >
                  <FaMapMarkerAlt />
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Advisories;
