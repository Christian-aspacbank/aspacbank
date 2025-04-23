import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { Link } from 'react-router-dom';
import {
  FaPiggyBank as PiggyBankIcon,
  FaClipboardCheck as ClipboardIcon,
  FaClock as ClockIcon,
  FaMoneyCheckAlt as MoneyIcon
} from 'react-icons/fa';

const FaPiggyBank = PiggyBankIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaClipboardCheck = ClipboardIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaClock = ClockIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaMoneyCheckAlt = MoneyIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const APDSLoanPage: React.FC = () => {
  return (
    
    <div className="w-full bg-white shadow-2xl  overflow-hidden ">



        {/* Banner */}
        <div className="relative w-full">
          <img 
            src="./features1.jpg" 
            alt="Educators Banner"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide text-center px-2">
              APDS Loan for Educators
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="w-full text-white text-center py-12 px-6"
          style={{ background: "linear-gradient(135deg, #27ae60, #1e8449)" }}
        >
          <p className="text-lg sm:text-xl opacity-90 mb-8 leading-relaxed max-w-3xl mx-auto">
            The Automatic Payroll Deduction Scheme (APDS) Loan is designed specifically for hardworking teachers and school personnel. Fuel your educational mission with our flexible loan options.
          </p>
          <Link
            to="/apply-apds-loan"
            className="bg-yellow-500 text-green-900 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400"
          >
            Apply Now
          </Link>
        </div>

        {/* Features Section */}
        <div className="py-12 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 bg-white">
          {[{
            Icon: FaPiggyBank,
            title: "Low Interest",
            description: "Exclusive rates for educators"
          }, {
            Icon: FaClipboardCheck,
            title: "Easy Approval",
            description: "Hassle-free application"
          }, {
            Icon: FaClock,
            title: "Flexible Terms",
            description: "Up to 36 months payment"
          }, {
            Icon: FaMoneyCheckAlt,
            title: "Salary Deduction",
            description: "Automatic monthly payments"
          }].map(({ Icon, title, description }, index) => (
            <div key={index} className="text-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Icon className="text-2xl text-green-700" />
              </div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="px-6 py-12 bg-gray-50">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">
            Why Choose APDS Loan?
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 sm:text-xl max-w-3xl mx-auto list-disc list-inside">
            <li>Low interest rates exclusive to educators</li>
            <li>Flexible payment terms up to 36 months</li>
            <li>Quick and hassle-free loan approval process</li>
            <li>Automatic salary deduction for easy payments</li>
          </ul>
        </div>

       {/* Testimonials */}
<div className="bg-white py-12 px-6 sm:px-12">
  <h3 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-10">
    What Our Clients Say
  </h3>
  <Swiper
    modules={[Pagination, Autoplay, Navigation]}
    spaceBetween={30}
    slidesPerView={1}
    pagination={{ clickable: true }}
    navigation
    autoplay={{ delay: 4000 }}
    loop={true}
    className="max-w-3xl mx-auto"
  >
    {[
      {
        quote: "ASPAC Bank made the loan process smooth and stress-free. Highly recommended!",
        author: "Maria L., Public School Teacher",
        avatar: "woman1.png"
      },
      {
        quote: "Flexible payment terms helped me manage my budget easily.",
        author: "Jose R., High School Principal",
        avatar: "man1.png"
      },
      {
        quote: "Quick approval and great customer service from ASPAC Bank!",
        author: "Anna D., Elementary Teacher",
        avatar: "woman2.png"
      }
    ].map((testimonial, index) => (
      <SwiperSlide key={index}>
        <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
          <img
            src={`/avatars/${testimonial.avatar}`}
            alt={testimonial.author}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-green-500 object-cover"
          />
          <p className="text-green-700 text-4xl mb-2 leading-none">“</p>
          <p className="text-lg italic mb-4 text-gray-700">"{testimonial.quote}"</p>
          <h4 className="font-bold text-green-800">{testimonial.author}</h4>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


      

      {/* Floating CTA (Mobile Only) */}
      <div className="fixed bottom-5 right-5 z-50 sm:hidden">
        <Link
          to="/apply-apds-loan"
          className="bg-yellow-500 text-green-900 font-semibold py-3 px-5 rounded-full shadow-lg hover:bg-yellow-600 transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default APDSLoanPage;
