import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const testimonials = [
  {
    name: "Ryan Bitoon",
    feedback:
      "ASPAC Bank helped me secure my loan in just 24 hours! Highly recommended!",
  },
  {
    name: "Rosendo Martinez",
    feedback:
      "The customer support is excellent. They assisted me throughout the process.",
  },
  {
    name: "Robel Caya",
    feedback: "I feel safe knowing my transactions are secure with ASPAC Bank.",
  },
];

const Testimonials: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="max-w-3xl mx-auto text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-primary mb-6"
      >
        What Our Clients Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay, Keyboard, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        autoplay={
          prefersReducedMotion
            ? false
            : { delay: 4000, disableOnInteraction: false }
        }
        className="pb-10"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <blockquote className="p-6">
              <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                “{testimonial.feedback}”
              </p>
              <footer className="text-primary font-semibold text-xl">
                — {testimonial.name}
              </footer>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-6 text-sm text-gray-500 italic">
        Testimonials are based on customer experiences with ASPAC Bank.
      </p>
    </section>
  );
};

export default Testimonials;
