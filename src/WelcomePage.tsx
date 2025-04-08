import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import './WelcomePage.css';
import { motion } from "framer-motion";

const WelcomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className="relative w-full h-auto sm:h-[70vh] flex items-center justify-between bg-white"
    >
      {/* Swiper Container */}
      <div className="w-full h-full flex items-center justify-center">
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
          <div className="slide h-screen w-full relative" style={{ backgroundImage: 'url(APDS2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-16 top-[70%] transform -translate-y-1/2">

              <h1 className="text-yellow-400 text-4xl font-bold">Fuel your passion for teaching with the APDS Loan</h1>
              <p className="text-white text-lg">Empowering educators to create brighter futures.</p>
              <button className="mt-4 p-2 rounded-md bg-green-600 text-white hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/services'}>
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
              <button className="mt-4 p-2 rounded-md bg-green-600 text-white hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/services'}>
              Open an Account
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide h-screen w-full relative" style={{ backgroundImage: 'url(Simplysafe_2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-16 top-[70%] transform -translate-y-1/2">
              <h1 className="text-yellow-400 text-4xl font-bold"> Simply Safe Banking.</h1>
              <p className="text-white text-lg">Your security is our priority. Bank with confidence and peace of mind.</p>
              <button className="mt-4 p-2 rounded-md bg-green-600 text-white hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/services'}>
              Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>
        </Swiper>
      </div>




      {/* Modal for Loan Application */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] md:w-[50%] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">APDS Loan Application</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">School Name</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WelcomePage;
