import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import Testimonials from "../components/Testimonials";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface FeatureItem {
  title: string;
  image: string;
  description: string;
}

const firstSwiperData: FeatureItem[] = [
  {
    title: "Fast Loan Processing",
    image: "/Fastloanprocessing.jpg",
    description:
      "Get your loan approved within 24 hours with our streamlined and customer-friendly process.",
  },
  {
    title: "Secure Transactions",
    image: "/secure-transactions.jpg",
    description:
      "With our in-branch systems and rigorous verification steps, your transactions are safe and reliable.",
  },
  {
    title: "Customer Support",
    image: "/customer-support.jpg",
    description:
      "Our dedicated team is ready to assist you through call, text, or branch visits from Monday to Friday.",
  },
];

const secondSwiperData: FeatureItem[] = [
  {
    title: "Personalized Banking Experience",
    image: "", // to be provided
    description:
      "We understand your needs. Our staff provides tailored financial solutions to meet your goals.",
  },
  {
    title: "Community-Focused Services",
    image: "", // to be provided
    description:
      "We prioritize local development, supporting small businesses and educational initiatives through specialized loans.",
  },
  {
    title: "Accessible Branch Network",
    image: "", // to be provided
    description:
      "Strategically located branches across the region to bring banking closer to you.",
  },
];

const Features: React.FC = () => {
  const swiperOptions = {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    effect: "fade",
    navigation: {
      nextEl: ".custom-swiper-next",
      prevEl: ".custom-swiper-prev",
    },
    pagination: { clickable: true },
    autoplay: { delay: 5000 },
    spaceBetween: 30,
    slidesPerView: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gray-100 overflow-x-hidden pt-0"
    >
      {/* Header Section */}
      <div className="relative min-h-[400px] flex items-center justify-center px-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/features3.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50" />
        <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-xl">
          Our Features
        </h1>
      </div>

      {/* First Swiper */}
      <div className="w-full px-6 py-16 flex justify-end">
        <div className="w-full md:w-[75%] relative">
          <Swiper {...swiperOptions}>
            {firstSwiperData.map((feature: FeatureItem, index: number) => (
              <SwiperSlide key={index}>
                <motion.div className="relative rounded-2xl overflow-hidden h-[550px] shadow-lg border border-green-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <div className="relative z-20 p-10 h-full flex flex-col justify-end text-white">
                    <h2 className="text-3xl font-bold mb-2 text-yellow-400 drop-shadow-md">
                      {feature.title}
                    </h2>
                    <p className="text-lg drop-shadow-sm">{feature.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="custom-swiper-next text-green-600 hover:text-yellow-500 text-3xl cursor-pointer absolute top-1/2 right-0 z-30 px-4" />
            <div className="custom-swiper-prev text-green-600 hover:text-yellow-500 text-3xl cursor-pointer absolute top-1/2 left-0 z-30 px-4" />
          </Swiper>
        </div>
      </div>

      {/* Second Swiper */}
      <div className="w-full px-6 pb-16 flex justify-start">
        <div className="w-full md:w-[75%] relative">
          <Swiper {...swiperOptions}>
            {secondSwiperData.map((feature: FeatureItem, index: number) => (
              <SwiperSlide key={index}>
                <motion.div className="relative rounded-2xl overflow-hidden h-[550px] shadow-lg border border-green-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <div className="relative z-20 p-10 h-full flex flex-col justify-end text-white">
                    <h2 className="text-3xl font-bold mb-2 text-yellow-400 drop-shadow-md">
                      {feature.title}
                    </h2>
                    <p className="text-lg drop-shadow-sm">{feature.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="custom-swiper-next text-green-600 hover:text-yellow-500 text-3xl cursor-pointer absolute top-1/2 right-0 z-30 px-4" />
            <div className="custom-swiper-prev text-green-600 hover:text-yellow-500 text-3xl cursor-pointer absolute top-1/2 left-0 z-30 px-4" />
          </Swiper>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <Testimonials />
      </div>
      <br></br>
    </motion.div>
  );
};

export default Features;
