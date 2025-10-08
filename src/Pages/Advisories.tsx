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
  googleMapsUrl:
    "https://maps.google.com/?q=10.373901718957983,123.95882888273896",
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
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Important Advisory
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Get the latest announcement from ASPAC Bank regarding our branch
          operations.
        </p>

        {/* --- Advisory Card (Same Design as New Branch Location) --- */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-gray-200 mb-8"
        >
          <div className="flex items-center mb-4">
            <Icon className="text-2xl mr-3 text-green-700" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Temporary Closure of Bogo City Branch
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">Effective Immediately</p>

          <div className="text-gray-700 text-base leading-relaxed space-y-4">
            <p>
              <strong>
                To our Valued Clients of ASPAC BANK - Bogo City Branch,
              </strong>
            </p>
            <p>
              Please be advised that our Bogo City Branch is temporarily closed
              for much-needed renovations. The closure is effective immediately
              and is indefinite as of this time. We will issue a public
              announcement once the branch reopens.
            </p>
            <p>
              During this period, all transactions and account service needs
              including deposits, withdrawals, and over-the-counter payments can
              be accommodated at any of our other ASPAC Bank branches.
            </p>

            <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-700 mb-2">
                For your convenience, please visit our nearby branches:
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    ASPAC BANK - Danao Branch
                  </p>
                  <p>Address: Pio Dei Pilar St., Danao City, Cebu</p>
                  <p>Contact: 0917-108-6575</p>
                  <p>Hours: 9:00 AM - 3:00 PM (Mon–Fri)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    ASPAC BANK - Bantayan Branch
                  </p>
                  <p>Address: TigaO, Poblacion Bantayan, Cebu</p>
                  <p>Contact: 0917-128-4422</p>
                  <p>Hours: 9:00 AM - 3:00 PM (Mon–Fri)</p>
                </div>
              </div>
            </div>

            <p>
              We appreciate your understanding as we work to improve our banking
              services. For any questions or concerns, please do not hesitate to
              contact our customer service hotline at{" "}
              <strong>0898-272-2724</strong> or visit our website at{" "}
              <a
                href="https://www.aspacbank.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-semibold underline"
              >
                www.aspacbank.com
              </a>
              .
            </p>

            <p className="font-semibold">Thank you for your continued trust.</p>
            <p className="font-semibold">
              Sincerely,
              <br />
              ASPAC BANK Management
            </p>
          </div>
        </motion.div>
        {/* --- End Advisory Card --- */}
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
