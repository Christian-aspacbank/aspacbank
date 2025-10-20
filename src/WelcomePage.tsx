// src/WelcomePage.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Seo from "./components/Seo";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import AspacChatbot from "./components/AspacChatbot";
import { motion, AnimatePresence } from "framer-motion";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleKnowClick = () => {
    navigate("/explore");
  };

  type NewsItem = {
    title: string;
    content: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconColor: string;
    to?: string;
  };
  const news: NewsItem[] = [
    {
      title: "ASPAC Bank Consolacion Moves to a New Building",
      content:
        "We are pleased to announce that ASPAC Bank Consolacion is now operating in its new building at Sta. Lucia Town Center, Poblacion Oriental. Visit our upgraded location for better accessibility and improved customer experience.",
      label: "Branch Update",
      Icon: FaMapMarkerAlt as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
      iconColor: "text-green-600",
      to: "/advisories",
    },
  ];

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
      <Seo
        title="ASPAC Bank"
        description="Empowering educators with ASPAC Bank’s Teacher Salary Loan (APDS). Enjoy reliable banking services, fast approval, and low-interest salary loans for teachers. Open savings and deposit accounts with secure digital banking today."
        canonical="https://www.aspacbank.com/"
        ogImage="https://www.aspacbank.com/APDS3.jpg" // Replace with a real banner image later
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ASPAC Bank",
          url: "https://www.aspacbank.com",
          logo: "https://www.aspacbank.com/favicon.ico",
          sameAs: [
            "https://www.facebook.com/aspacbank0620/", // optional, add if you have social pages
          ],
          department: {
            "@type": "FinancialService",
            name: "Teacher Salary Loan (APDS)",
            url: "https://www.aspacbank.com/teachers-loan",
            serviceType: "Salary Loan for Teachers",
            areaServed: "PH",
            provider: {
              "@type": "BankOrCreditUnion",
              name: "ASPAC Bank",
            },
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              Hotline: "(032) 272-2724",
              MobileNumber: "08982722724",
              contactType: "customer service",
              areaServed: "PH",
            },
          ],
        }}
      />

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
              style={{ backgroundImage: "url(APDS3.jpg)" }}
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
                  style={{ backgroundColor: "#27ae60" }}
                  onClick={() => (window.location.href = "/teachers-loan")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1e8449")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#27ae60")
                  }
                >
                  Explore Our Services
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="slide h-screen w-full relative bg-cover bg-center"
              style={{ backgroundImage: "url(Growyoursavings.jpg)" }}
            >
              <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
                <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
                  Grow Your Savings with Us
                </h1>
                <p className="text-white text-base sm:text-lg mt-2">
                  Secure your future with our high-interest savings accounts and
                  investment options.
                </p>
                <button
                  className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: "#27ae60" }}
                  onClick={() => setShowModal(true)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1e8449")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#27ae60")
                  }
                >
                  Open an Account
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="slide h-screen w-full relative bg-cover bg-center"
              style={{ backgroundImage: "url(Simplysafe.jpg)" }}
            >
              <div className="bg-black bg-opacity-15 p-4 rounded-md absolute left-4 top-[60%] transform -translate-y-1/2 w-full sm:left-16 sm:top-[70%] sm:w-auto">
                <h1 className="text-yellow-400 text-2xl sm:text-4xl font-bold leading-tight sm:leading-normal">
                  Simply Safe Banking
                </h1>
                <p className="text-white text-base sm:text-lg mt-2">
                  Your security is our priority. Bank with confidence and peace
                  of mind.
                </p>
                <button
                  className="mt-4 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: "#27ae60" }}
                  onClick={handleKnowClick}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1e8449")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#27ae60")
                  }
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
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                Contact Us
              </h2>

              <p className="text-gray-700 mb-4 text-center">
                For inquiries or assistance, reach out to us via the following
                numbers:
              </p>
              <p className="text-gray-800 text-center font-medium">
                Landline: 345-0929, 345-0930
                <br />
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

      <div className="w-full px-6 py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-green-800 mb-6 tracking-tight">
            Your Trusted Financial Partner
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            ASPAC Bank is committed to making your financial journey simple and
            secure. Whether you're saving for a goal, growing your business, or
            planning ahead—we are with you every step of the way.
          </p>

          {/* Core Features Section */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Secure Banking */}
            <div className="bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img
                src="/homesecure.jpg"
                alt="Secure Banking"
                className="w-full h-60 object-cover rounded-2xl mb-6"
              />
              <h4 className="text-2xl font-semibold text-green-800 mb-3">
                Secure Banking
              </h4>
              <p className="text-gray-600">
                We use industry-standard encryption to keep your information
                safe and your transactions secure.
              </p>
            </div>

            {/* Personalized Service */}
            <div className="bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img
                src="/homepersonalized.jpg"
                alt="Personalized Service"
                className="w-full h-60 object-cover rounded-2xl mb-6"
              />
              <h4 className="text-2xl font-semibold text-green-800 mb-3">
                Personalized Service
              </h4>
              <p className="text-gray-600">
                Our dedicated staff is ready to help you—whether you’re applying
                for a loan or opening an account, we make the process personal
                and easy.
              </p>
            </div>

            {/* Community First */}
            <div className="bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img
                src="/homecommunityfirst.jpg"
                alt="Community First"
                className="w-full h-60 object-cover rounded-2xl mb-6"
              />
              <h4 className="text-2xl font-semibold text-green-800 mb-3">
                Community-First
              </h4>
              <p className="text-gray-600">
                We support and grow with the communities we serve, building a
                better financial future for all.
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
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          Why Choose ASPAC Bank?
        </h2>
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
            <div
              key={idx}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                {title}
              </h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/latestupdates.webp')",
        }}
      >
        <div className="bg-transparent max-w-6xl mx-auto px-6 py-12 rounded-xl">
          <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">
            Latest News & Updates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {news.map(
              ({ title, content, label, Icon, iconColor, to }, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group flex flex-col md:flex-row gap-6 min-h-[24rem]"
                >
                  {/* Left: Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`text-xl ${iconColor}`} />
                      <span className="text-sm font-medium text-gray-500">
                        {label}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-green-900 mb-3 group-hover:underline">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {content}
                    </p>
                    {to && (
                      <button
                        onClick={() => navigate(to)}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded-md shadow transition w-auto"
                      >
                        View Full Advisory
                      </button>
                    )}
                  </div>

                  {/* Right: Image */}
                  <div className="w-full md:w-1/2 h-64 md:h-full">
                    <video
                      src="/assets/vid/cnsvid3.webm"
                      className="w-full h-full object-cover rounded-xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                </motion.article>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "ASPAC Bank’s loan process was so smooth and easy. I got the funds I needed to start my small business quickly.",
              name: "Maria Lopez",
              role: "Small Business Owner",
            },
            {
              quote:
                "The staff are very helpful and the online banking app makes managing my accounts hassle-free.",
              name: "John Santos",
              role: "Teacher",
            },
            {
              quote:
                "I love the security and peace of mind that comes with banking at ASPAC. Highly recommended!",
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

      {/* 👇 Mount the chatbot only on WelcomePage */}
      <AspacChatbot />
    </motion.div>
  );
};

export default WelcomePage;
