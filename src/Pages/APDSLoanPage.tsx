import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Seo from "../components/Seo";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { AnimatePresence, motion } from "framer-motion";
import {
  FaPiggyBank as PiggyBankIcon,
  FaClipboardCheck as ClipboardIcon,
  FaClock as ClockIcon,
  FaMoneyCheckAlt as MoneyIcon,
} from "react-icons/fa";

const FaPiggyBank = PiggyBankIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FaClipboardCheck = ClipboardIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const FaClock = ClockIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaMoneyCheckAlt = MoneyIcon as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

// Contact Modal
const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white p-8 sm:p-10 rounded-2xl w-[92%] max-w-md shadow-2xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Contact ASPAC Bank"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-primary mb-4">
              Contact ASPAC Bank
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              For inquiries or assistance, reach out to us via the following:
            </p>
            <div className="text-center mb-6 space-y-2">
              <p className="text-lg text-primary font-semibold">
                <span className="font-medium">Landline:</span> 345-0929,
                345-0930
              </p>
              <p className="text-lg text-primary font-semibold">
                <span className="font-medium">Mobile:</span> 0917-127-7796
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 px-6 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const APDSLoanPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      {/* Page SEO */}
      <Seo
        title="Teacher Salary Loan (APDS) | ASPAC Bank"
        description="Apply for a Teacher Salary Loan (APDS) with ASPAC Bank — fast approval, flexible repayment, and dedicated support for teachers across Cebu and the Philippines."
        canonical="https://www.aspacbank.com/loans"
        ogImage="https://www.aspacbank.com/APDS3.jpg"
        title="Teacher's Loan | ASPAC Bank"
        description="Apply for ASPAC Bank’s Teacher Salary Loan (APDS): low interest, quick approval, flexible terms, and convenient payroll deduction for educators in the Philippines."
        description="Apply for ASPAC Bank’s Teacher Salary Loan (APDS): convenient payroll deduction for educators in the Philippines."
        canonical="https://www.aspacbank.com/teachers-loan"
        ogType="product"
        ogImage="https://www.aspacbank.com/features1.jpg"
        ogImageAlt="ASPAC Bank Teacher Salary Loan (APDS)"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        includeTwitter
        twitterCard="summary_large_image"
        twitterSite="@aspacbank"
        organization={{
          type: "BankOrCreditUnion",
          name: "ASPAC Bank",
          url: "https://www.aspacbank.com/",
          logo: "https://www.aspacbank.com/favicon.ico",
          telephone: "+63-32-272-2724",
          sameAs: ["https://www.facebook.com/aspacbank0620/"],
          address: {
            streetAddress:
              "ASPAC RURAL BANK Bldg. Cor. M.C. Briones Highway & Gen. Ricarte Sts. Guizo Mandaue City Cebu Philippines",
            addressLocality: "Mandaue City",
            addressRegion: "Cebu",
            postalCode: "6014",
            addressCountry: "PH",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: "(032) 272-2724",
              areaServed: "PH",
            },
            {
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: "0898 272 2724",
              areaServed: "PH",
            },
          ],
        }}
        services={[
          {
            name: "Teacher Salary Loan (APDS)",
            url: "https://www.aspacbank.com/teachers-loan",
            serviceType: "Salary Loan for Teachers",
            areaServed: "PH",
          },
          {
            name: "MSME Loan",
            url: "https://www.aspacbank.com/loans",
            serviceType: "MSME Financing",
            areaServed: "PH",
          },
        ]}
        breadcrumbs={[
          { name: "Home", url: "https://www.aspacbank.com/" },
          { name: "Loans", url: "https://www.aspacbank.com/loans" },
        ]}
      />

      {/* Page Content */}
      <div className="w-full bg-white shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative w-full">
          <img
            src="/features1.jpg"
            alt="Educators Banner"
            className="w-full h-64 sm:h-80 object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-wide text-center px-2 drop-shadow">
              APDS Loan for Educators
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="w-full text-white text-center px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16"
          style={{ background: "linear-gradient(135deg, #459243, #2e6f33)" }} // from primary to darker green
        >
          <p className="mx-auto max-w-[44rem] leading-relaxed/loose opacity-95 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl">
            The Automatic Payroll Deduction Scheme (APDS) Loan is designed
            specifically for hardworking teachers and school personnel. Fuel
            your educational mission with our flexible loan options.
          </p>

          {/* Actions */}
          <div className="mx-auto flex w-full max-w-xl flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="/files/ASPAC_Salary_loan_form.pdf"
              download="ASPAC_Salary_loan_form.pdf"
              className="w-full sm:w-auto inline-flex justify-center bg-white text-gray-900 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              aria-label="Download Salary Loan Form (PDF)"
            >
              Download Form
            </a>

            <button
              className="w-full sm:w-auto bg-aspac-yellow text-black font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-aspac-yellow/40"
              onClick={() => setIsContactModalOpen(true)}
              aria-label="Call ASPAC now"
            >
              Call Now
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 bg-white">
          {[
            {
              Icon: FaPiggyBank,
              title: "Low Interest",
              description: "Exclusive rates for educators",
            },
            {
              Icon: FaClipboardCheck,
              title: "Easy Approval",
              description: "Hassle-free application",
            },
            {
              Icon: FaClock,
              title: "Flexible Terms",
              description: "Up to 60 months payment",
            },
            {
              Icon: FaMoneyCheckAlt,
              title: "Salary Deduction",
              description: "Automatic monthly payments",
            },
          ].map(({ Icon, title, description }) => (
            <div
              key={title}
              className="text-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Icon className="text-2xl text-primary" />
              </div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose */}
        <div className="px-6 py-12 bg-gray-50">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">
            Why Choose APDS Loan?
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 sm:text-xl max-w-3xl mx-auto list-disc list-inside">
            <li>Low interest rates exclusive to educators</li>
            <li>Flexible payment terms up to 60 months</li>
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
            loop
            className="max-w-3xl mx-auto"
          >
            {[
              {
                quote:
                  "ASPAC Bank made the loan process smooth and stress-free. Highly recommended!",
                author: "Maria L., Public School Teacher",
                avatar: "woman1.png",
              },
              {
                quote:
                  "Flexible payment terms helped me manage my budget easily.",
                author: "Jose R., High School Principal",
                avatar: "man1.png",
              },
              {
                quote:
                  "Quick approval and great customer service from ASPAC Bank!",
                author: "Anna D., Elementary Teacher",
                avatar: "woman2.png",
              },
            ].map((t) => (
              <SwiperSlide key={t.author}>
                <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                  <img
                    src={`/avatars/${t.avatar}`}
                    alt={t.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
                    loading="lazy"
                  />
                  <p className="text-primary text-4xl mb-2 leading-none">"</p>
                  <p className="text-lg italic mb-4 text-gray-700">
                    "{t.quote}"
                  </p>
                  <h4 className="font-bold text-primary">{t.author}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </>
  );
};

export default APDSLoanPage;
