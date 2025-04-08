import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "RyanBitoon",
    feedback: "ASPAC Bank helped me secure my loan in just 24 hours! Highly recommended!",
  },
  {
    name: "Rosendo Martinez",
    feedback: "The customer support is excellent. They assisted me throughout the process.",
  },
  {
    name: "Robel Caya",
    feedback: "I feel safe knowing my transactions are secure with ASPAC Bank.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4">What Our Clients Say</h2>
      
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <p className="text-gray-700 italic text-lg">"{testimonial.feedback}"</p>
              <h3 className="mt-4 text-xl font-semibold text-green-600">- {testimonial.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
