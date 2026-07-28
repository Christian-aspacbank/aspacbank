import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../WelcomePage.css";
import { FaArrowRight } from "react-icons/fa6";

export type HeroSlide = {
  image: string;
  title: string;
  description?: string;
  subtitleLinkText?: string;
  subtitleLinkTo?: string;

  primaryButton?: {
    label: string;
    action: "applyModal" | "contactModal" | "explore";
  };

  secondaryButton?: {
    label: string;
    to: string;
    onClick?: () => void;
  };
};

type Props = {
  slides: HeroSlide[];
  onNavigate?: (path: string) => void;
  onActiveChange?: (index: number) => void;

  onApply?: () => void;
  onContact?: () => void;
  onExplore?: () => void;
};

export default function ParallaxHero({
  slides,
  onNavigate,
  onActiveChange,
  onApply,
  onContact,
  onExplore,
}: Props) {
  // const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const imageY = useTransform(scrollY, [10, 1000], [0, isMobile ? 100 : 160]);
  const textY = useTransform(scrollY, [0, 800], [0, isMobile ? 20 : 60]);
  const handlePrimaryAction = (action?: string) => {
    switch (action) {
      case "applyModal":
        onApply?.();
        break;
      case "contactModal":
        onContact?.();
        break;
      case "explore":
        onExplore?.();
        break;
    }
  };
  return (
    <section className="w-full h-screen min-h-screen relative overflow-hidden  ">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          // setActiveIndex(swiper.realIndex);
          onActiveChange?.(swiper.realIndex);
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full overflow-hidden">
              <motion.div
                className=" absolute inset-0 bg-cover bg-center scale-105 md:scale-110"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  y: imageY,
                }}
              />

              {/* overlays */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

              {/* content */}
              <div className="absolute inset-0 flex flex-col justify-center md:items-center md:justify-center px-6 pb-28 md:pb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  key={slide.title}
                  className="max-w-3xl text-center mx-auto"
                  style={{
                    y: textY,
                  }}
                >
                  <h2 className="text-[#ebd839] text-3xl md:text-5xl font-normal leading-8 hero-text-shadow">
                    {slide.title}
                  </h2>

                  <p className="text-white/90 mt-5 text-base md:text-lg">
                    {slide.description}
                  </p>

                  <p className="mt-5 text-white/80 text-sm md:text-base">
                    Learn more about{"     "}
                    <a
                      href={slide.subtitleLinkTo}
                      className="underline font-semibold hover:text-white"
                    >
                      {slide.subtitleLinkText}
                    </a>
                  </p>
                </motion.div>
              </div>
              {(slide.primaryButton || slide.secondaryButton) && (
                <div className="absolute bottom-40 md:bottom-36  left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 z-20 w-full px-6 sm:w-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    {slide.primaryButton && (
                      <button
                        onClick={() =>
                          handlePrimaryAction(slide.primaryButton?.action)
                        }
                        className="relative inline-block mt-6 overflow-hidden text-white border border-white px-10 md:px-6 py-3 text-sm md:text-base font-light md:font-semibold rounded shadow group"
                      >
                        <span className="relative z-10 ">
                          {slide.primaryButton?.label}{" "}
                        </span>
                        <span className="absolute inset-0 bg-primary  translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    )}

                    {slide.secondaryButton && (
                      <button
                        onClick={() => {
                          slide.secondaryButton?.onClick?.();
                          onNavigate?.(slide.secondaryButton!.to);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="relative inline-block mt-6 overflow-hidden text-white border border-white px-6 md:px-6 py-3 text-sm md:text-base font-light md:font-semibold rounded shadow group"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {slide.secondaryButton.label}{" "}
                          <FaArrowRight className="group-hover:translate-x-3  transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 bg-primary  translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    )}
                  </motion.div>
                  {/* </AnimatePresence> */}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
