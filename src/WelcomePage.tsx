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

  const handleExploreClick = () => {
    navigate('/cebuana-services'); 
  };

    const handleKnowClick = () => {
    navigate('/explore'); 
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
        onClick={handleKnowClick} // ✅ Use the function here
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
      >
        Know More
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
          Email: <a href="mailto:aspacbank@aspacbank.com" className="text-green-700 hover:underline">aspacbank@aspacbank.com</a>
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

 <div className="w-full px-6 py-10 bg-gray-100">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-green-800 mb-6 tracking-tight">
      Your Trusted Financial Partner
    </h2>
    <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
      ASPAC Bank is committed to making your financial journey simple and secure. Whether you're saving for a goal, growing your business, or planning ahead—we are with you every step of the way.
    </p>

    {/* Core Features Section */}
    <div className="grid lg:grid-cols-3 gap-10">
      {/* Secure Banking */}
      <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <img
          src="/homesecure.jpg"
          alt="Secure Banking"
          className="w-full h-60 object-cover rounded-2xl mb-6"
        />
        <h4 className="text-2xl font-semibold text-green-800 mb-3">Secure Banking</h4>
        <p className="text-gray-600">
          We use industry-standard encryption to keep your information safe and your transactions secure.
        </p>
      </div>

      {/* Personalized Service */}
      <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <img
          src="/homepersonalized.jpg"
          alt="Personalized Service"
          className="w-full h-60 object-cover rounded-2xl mb-6"
        />
        <h4 className="text-2xl font-semibold text-green-800 mb-3">Personalized Service</h4>
        <p className="text-gray-600">
          Our dedicated staff is ready to help you—whether you’re applying for a loan or opening an account, we make the process personal and easy.
        </p>
      </div>

      {/* Community First */}
      <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <img
          src="/homecommunityfirst.jpg"
          alt="Community First"
          className="w-full h-60 object-cover rounded-2xl mb-6"
        />
        <h4 className="text-2xl font-semibold text-green-800 mb-3">Community-First</h4>
        <p className="text-gray-600">
          We support and grow with the communities we serve, building a better financial future for all.
        </p>
      </div>
    </div>

    {/* CTA Button */}
    <div className="mt-12">
      <a
        href="/our-services"
        className="inline-block px-8 py-3 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all tracking-wide"
      >
        Explore Our Services
      </a>
    </div>
  </div>
</div>

{/* Features Section */}
<section className="max-w-6xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Why Choose ASPAC Bank?</h2>
  <div className="grid md:grid-cols-3 gap-10 text-center">
    {[
      {
        title: "Flexible Loan Options",
        text: "Whether you’re a teacher or entrepreneur, we have loans tailored to your needs with competitive rates.",
      },
      {
        title: "Easy Account Management",
        text: "Access your accounts anytime with our secure online and mobile banking platforms.",
      },
      {
        title: "Dedicated Support",
        text: "Our friendly customer service team is always ready to help you with any questions or concerns.",
      },
    ].map(({ title, text }, idx) => (
      <div key={idx} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold mb-4 text-green-800">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    ))}
  </div>
</section>

{/* Latest News Section */}
<section className="bg-green-50 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Latest News & Updates</h2>
    <div className="space-y-8">
      <article className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold text-green-800 mb-2">New Branch Opening in Consolacion</h3>
        <p className="text-gray-600 text-sm">
          We are excited to announce the opening of our newest branch in Consolacion. Visit us for exclusive promotions.
        </p>
      </article>
      <article className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Upgrade Your Savings Account Today</h3>
        <p className="text-gray-600 text-sm">
          Take advantage of our improved interest rates and benefits by upgrading your savings account this May.
        </p>
      </article>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="max-w-6xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">What Our Clients Say</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        quote: "ASPAC Bank’s loan process was so smooth and easy. I got the funds I needed to start my small business quickly.",
        name: "Maria Lopez",
        role: "Small Business Owner",
      },
      {
        quote: "The staff are very helpful and the online banking app makes managing my accounts hassle-free.",
        name: "John Santos",
        role: "Teacher",
      },
      {
        quote: "I love the security and peace of mind that comes with banking at ASPAC. Highly recommended!",
        name: "Anna Reyes",
        role: "Freelancer",
      },
    ].map(({ quote, name, role }, idx) => (
      <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-700 italic mb-4">“{quote}”</p>
        <h4 className="font-semibold text-green-800">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    ))}
  </div>
</section>


    
    </motion.div>
  );
};

export default WelcomePage;