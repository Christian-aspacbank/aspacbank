import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import './WelcomePage.css';
import { motion, AnimatePresence } from "framer-motion";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);


  const handleExploreClick = () => {
    navigate('/explore'); // ✅ Fix the destination here
  };
  

  useEffect(() => {
    setTimeout(() => {
      const navButtons = document.querySelectorAll(
        ".swiper-button-next, .swiper-button-prev"
      );
      navButtons.forEach((btn) => btn.classList.remove("hidden"));
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white"
    >
      {/* Swiper Container */}
      <div className="w-full h-[70vh] overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          navigation
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="slide h-screen w-full relative" style={{ backgroundImage: 'url(APDS3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-16 top-[70%] transform -translate-y-1/2">
                <h1 className="text-yellow-400 text-4xl font-bold">Fuel your passion for teaching with the APDS Loan</h1>
                <p className="text-white text-lg">Empowering educators to create brighter futures.</p>
                <button
                  className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: "#27ae60" }}
                  onClick={() => window.location.href = '/apds-loan'}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e8449")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
                >
                  Explore Our Services
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide h-screen w-full relative" style={{ backgroundImage: 'url(Growyoursavings.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-16 top-[70%] transform -translate-y-1/2">
                <h1 className="text-yellow-400 text-4xl font-bold">Grow Your Savings with Us</h1>
                <p className="text-white text-lg">Secure your future with our high-interest savings accounts and investment options.</p>
                <button
                  className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: "#27ae60" }}
                  onClick={() => setShowModal(true)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e8449")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
                >
                  Open an Account
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
          <div className="slide h-screen w-full relative" style={{ backgroundImage: 'url(Simplysafe.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-16 top-[70%] transform -translate-y-1/2">
              <h1 className="text-yellow-400 text-4xl font-bold">Simply Safe Banking.</h1>
              <p className="text-white text-lg">Your security is our priority. Bank with confidence and peace of mind.</p>
              <button
  className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
  style={{ backgroundColor: "#27ae60" }}
  onClick={handleExploreClick} // ✅ Use the function here
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e8449")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
>
  Explore More
</button>

              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

{/* Modal */}
<AnimatePresence>
  {showModal && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowModal(false)}
    >
      <motion.div
        className="bg-white rounded-xl p-8 max-w-xl w-full relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-500"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">Start Your Account Today</h2>
        <p className="text-gray-700 mb-4 text-center">
          Ready to take control of your finances? 
        </p>
        <p className="text-gray-600 mb-6 text-center">
          Visit your nearest ASPAC Bank branch or apply online to begin your journey with us. It's fast, easy, and secure.
        </p>

        {/* Contact Options */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => setShowEmailOptions(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300 text-center"
          >
            Email Us
          </button>

          <a
            href="tel:03450929"
            className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-100 transition duration-300 text-center"
          >
            Call Us
          </a>
        </div>

        {/* Email Form */}
        {showEmailOptions && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-green-700">Send Us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border border-gray-300 p-2 rounded-lg"
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

 {/* Trusted Partner Section */}
<div className="w-full px-6 py-16 bg-gradient-to-br from-green-50 to-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
      Your Trusted Financial Partner
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
      ASPAC Bank is committed to making your financial journey simple and secure. Whether you're saving for a goal, growing your business, or planning ahead—we are with you every step of the way.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <div className="text-green-600 text-4xl mb-4">
          <i className="fas fa-shield-alt"></i>
        </div>
        <h4 className="text-xl font-semibold mb-2">Secure Banking</h4>
        <p className="text-gray-600 text-sm">
          We use industry-standard encryption to keep your information safe and your transactions secure.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <div className="text-green-600 text-4xl mb-4">
          <i className="fas fa-users"></i>
        </div>
        <h4 className="text-xl font-semibold mb-2">Personalized Service</h4>
        <p className="text-gray-600 text-sm">
          Our dedicated staff is ready to help you—whether you’re applying for a loan or opening an account, we make the process personal and easy.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <div className="text-green-600 text-4xl mb-4">
          <i className="fas fa-hand-holding-heart"></i>
        </div>
        <h4 className="text-xl font-semibold mb-2">Community-First</h4>
        <p className="text-gray-600 text-sm">
          We support and grow with the communities we serve, building a better financial future for all.
        </p>
      </div>
    </div>

    <div className="mt-12">
      <a
        href="/our-services"
        className="inline-block px-8 py-3 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-full transition duration-300"
      >
        Explore Our Services
      </a>
    </div>
  </div>
</div>


    
    </motion.div>
  );
};

export default WelcomePage;