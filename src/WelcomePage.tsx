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
    navigate('/cebuana-services'); // ✅ Fix the destination here
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
  <div
    className="slide h-screen w-full relative bg-cover bg-center"
    style={{ backgroundImage: 'url(APDS3.jpg)' }}
  >
    <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
      <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
        Fuel your passion for teaching with the APDS Loan
      </h1>
      <p className="text-white text-base sm:text-lg mt-2">
        Empowering educators to create brighter futures.
      </p>
      <button
        className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: '#27ae60' }}
        onClick={() => (window.location.href = '/apds-loan')}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
      >
        Explore Our Services
      </button>
    </div>
  </div>
</SwiperSlide>


<SwiperSlide>
  <div
    className="slide h-screen w-full relative bg-cover bg-center"
    style={{ backgroundImage: 'url(Cebuana.jpg)' }}
  >
    <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
      <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
        Cebuana Lhuillier Authorized Agent
      </h1>
      <p className="text-white text-base sm:text-lg mt-2">
        Convenient financial services available through our Cebuana Lhuillier partnership.
      </p>
      <button
        className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: '#27ae60' }}
        onClick={handleExploreClick} // ✅ Use the function here
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
      >
        Explore More
      </button>
    </div>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div
    className="slide h-screen w-full relative bg-cover bg-center"
    style={{ backgroundImage: 'url(Growyoursavings.jpg)' }}
  >
    <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
      <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
        Grow Your Savings with Us
      </h1>
      <p className="text-white text-base sm:text-lg mt-2">
        Secure your future with our high-interest savings accounts and investment options.
      </p>
      <button
        className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: '#27ae60' }}
        onClick={() => setShowModal(true)}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
      >
        Open an Account
      </button>
    </div>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div
    className="slide h-screen w-full relative bg-cover bg-center"
    style={{ backgroundImage: 'url(Simplysafe.jpg)' }}
  >
    <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
      <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
        Simply Safe Banking
      </h1>
      <p className="text-white text-base sm:text-lg mt-2">
        Your security is our priority. Bank with confidence and peace of mind.
      </p>
      <button
        className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: '#27ae60' }}
        onClick={handleExploreClick} // ✅ Use the function here
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
      >
        Explore More
      </button>
    </div>
  </div>
</SwiperSlide>

     
        </Swiper>
      </div>

{/* Modal */}
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
        className="bg-white rounded-xl p-8 max-w-md w-full relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Contact Us</h2>

        <p className="text-gray-700 mb-4 text-center">
          For inquiries or assistance, reach out to us via the following numbers:
        </p>
        <p className="text-gray-800 text-center font-medium">
          Landline: 345-0929, 345-0930<br />
          Mobile: 0917-127-7796
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowModal(false)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
          >
            Close
          </button>
        </div>
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