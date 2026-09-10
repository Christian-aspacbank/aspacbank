import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { CoreCardProps, coreCards } from "../data/coretiles";
// import "./WelcomePage.css";

const CoreTiles: React.FC = () => {
  // const navigate = useNavigate();

  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <div>
      {/* Core tiles – Enhanced with animations & icons */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-aspac-green/5 rounded-full blur-3xl -ml-40 -mb-32" />

        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-aspac-green/10 to-white pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="uppercase tracking-widest text-[11px] md:text-xs text-primary-dark font-semibold">
              Products & Services
            </p>
            <h2 className="text-light md:text-2xl font-bold text-primary mt-3">
              Your trusted financial partner
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
              Save, borrow, and grow locally. Visit any ASPAC branch to get
              started.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreCards.map((card, index) => (
              <CoreCard key={card.title} {...card} delay={index * 0.1} />
            ))}
          </div>

          {/* section CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            {/* <motion.button
              onClick={() => {
                navigate("/branches");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-aspac-green hover:shadow-xl text-white font-semibold shadow-lg transition-all duration-300"
            >
              Locate a branch
            </motion.button> */}
            <motion.button
              onClick={() => setShowContactModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-primary to-aspac-green hover:shadow-xl text-white font-semibold shadow-lg transition-all duration-300"
            >
              Contact us
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* Contact modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 w-[92%] max-w-md relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Contact ASPAC Bank"
            >
              <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                Contact us
              </h2>
              <p className="text-gray-700 text-center">
                For inquiries or assistance, call:
              </p>
              <div className="mt-3 flex justify-center">
                <ul className="space-y-1 text-left">
                  <li className="text-gray-900 font-medium">
                    Hotline: (032)-501-2724
                  </li>
                  <li className="text-gray-900 font-medium">
                    Mobile Number: 0898-272-2724
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-gray-200 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const CoreCard: React.FC<CoreCardProps> = ({
  label,
  title,
  description,
  icon: Icon,
  chips,
  buttonText,
  link,
  glow,
  iconGradient,
  delay = 0,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="
  group
  relative
  flex
  h-full
  flex-col
  overflow-hidden
  rounded-[32px]
  bg-white/70
  backdrop-blur-xl
  border border-white/50
  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
  hover:shadow-[0_30px_80px_rgba(69,146,67,0.18)]
  transition-all duration-500
  md:p-8
  p-4
"
    >
      <div
        className={`absolute -top-20 -right-20 h-52 w-52 rounded-full ${glow} blur-3xl`}
      />

      <div className="absolute top-8 right-8">
        <FaArrowRight
          size={window.innerWidth < 768 ? 16 : 20}
          className="text-primary/30 group-hover:text-primary transition-colors duration-300"
        />
      </div>

      <div
        className={`mb-2 md:mb-8 flex h-14 w-14 rounded-lg md:h-20 md:w-20 items-center justify-center md:rounded-3xl bg-gradient-to-br ${iconGradient} text-white shadow-xl`}
      >
        <Icon className="text-2xl md:text-3xl" />
      </div>

      <p className="text-xs uppercase tracking-[0.25em] text-primary-dark font-semibold">
        {label}
      </p>

      <h3 className="md:mt-3 mt-2 text-xl md:text-3xl font-semibold md:font-bold text-primary">
        {title}
      </h3>

      <p className="text-sm md:text-normal mt-2 md:mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 md:pt-8">
        <Link
          to={link}
          aria-label={`${buttonText} — ${title}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-primary
            to-aspac-green
            px-3
            py-3
            md:px-6
           
            text-white
            md:font-semibold
            shadow-lg
            hover:shadow-xl
            transition-all
            text-xs
            md:text-normal
          "
        >
          {buttonText}
          <FaArrowRight size={window.innerWidth < 768 ? 16 : 20} />
        </Link>
      </div>
    </motion.article>
  );
};
export default CoreTiles;
