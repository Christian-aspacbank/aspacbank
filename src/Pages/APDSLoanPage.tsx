import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import emailjs from "@emailjs/browser";

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

// ✅ Contact Modal
const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white p-12 rounded-lg w-96 max-w-sm shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              Contact us
            </h2>
            <p className="text-gray-700 text-center">
              For inquiries or assistance, call:
            </p>
            <div className="mt-3 flex justify-center">
              <ul className="space-y-1 text-left">
                <li className="text-gray-900 font-medium">
                  Landline: 345-0929, 345-0930
                </li>
                <li className="text-gray-900 font-medium">
                  Hotline: (032)-272-2724
                </li>
                <li className="text-gray-900 font-medium">
                  Mobile Number: 0898-272-2724
                </li>
                <li className="text-gray-900 font-medium">
                  Mobile: 0917-127-7796
                </li>
              </ul>
            </div>
            <br />
            <div className="flex justify-center">
              <button
                className="bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform duration-300 ease-in-out hover:bg-gray-200 "
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

type ApplyFormState = {
  fullName: string;
  mobileNumber: string;
  email: string;
  schoolOrOffice: string;
  stationOrCity: string;
  loanAmount: string;
  desiredTermMonths: string;
  remarks: string;
};

const DEFAULT_FORM: ApplyFormState = {
  fullName: "",
  mobileNumber: "",
  email: "",
  schoolOrOffice: "",
  stationOrCity: "",
  loanAmount: "",
  desiredTermMonths: "",
  remarks: "",
};

// ✅ Helpers (place these ABOVE ApplyNowModal, e.g. after DEFAULT_FORM)

const generateReferenceNo = () => {
  const now = new Date();

  const datePart = now
    .toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }) // YYYY-MM-DD
    .replace(/-/g, "");

  const timePart = now
    .toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour12: false }) // HH:MM:SS
    .replace(/:/g, ""); // HHMMSS

  const randPart = Math.random().toString(36).slice(2, 5).toUpperCase();

  return `APDS-${datePart}-${timePart}-${randPart}`;
};

const formatMoney = (value: string) => {
  const cleaned = String(value).replace(/,/g, "").trim();
  const n = Number(cleaned);
  if (!cleaned) return "";
  if (Number.isNaN(n)) return value; // keep as-is if non-numeric
  return n.toLocaleString("en-PH");
};

// ✅ Apply Now Modal (FORM ONLY for now)
const ApplyNowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState<ApplyFormState>(DEFAULT_FORM);
  const [touched, setTouched] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string>(generateReferenceNo());
  useEffect(() => {
    if (isOpen) {
      setReferenceNo(generateReferenceNo());
      setForm(DEFAULT_FORM);
      setTouched(false);
      setStatusMsg(null);
      setMobileBlurred(false);
      setEmailBlurred(false);
    }
  }, [isOpen]);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const [mobileBlurred, setMobileBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false;

    const mobile = form.mobileNumber.replace(/\D/g, "");
    if (mobile.length !== 11) return false;

    const email = form.email.trim().toLowerCase();
    const isComEmail = /^[^\s@]+@[^\s@]+\.com$/i.test(email);
    if (!isComEmail) return false;

    if (!form.schoolOrOffice.trim()) return false;

    const amount = Number(form.loanAmount.replace(/,/g, "").trim());
    if (!Number.isFinite(amount) || amount <= 0) return false;

    if (!form.desiredTermMonths.trim()) return false;

    return true;
  }, [form]);

  const update = <K extends keyof ApplyFormState>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Cleaned onSubmit (inside ApplyNowModal)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setStatusMsg(null);

    if (!isValid) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatusMsg(
        "EmailJS not configured. Check .env.local REACT_APP_* values."
      );
      return;
    }

    const submittedAt = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
    });

    setIsSending(true);
    try {
      const templateParams = {
        reference_no: referenceNo,

        name: form.fullName.trim(),
        email: form.email.trim(),
        time: submittedAt,

        mobile_number: form.mobileNumber.trim(),
        school_office: form.schoolOrOffice.trim(),
        station_city: (form.stationOrCity || "-").trim(),

        loan_amount: formatMoney(form.loanAmount),
        term_months: form.desiredTermMonths,

        remarks: form.remarks?.trim() ? form.remarks.trim() : "-",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
        limitRate: { throttle: 10000 }, // basic spam throttle
      });

      setStatusMsg("✅ Application sent successfully!");
      setForm(DEFAULT_FORM);
      setTouched(false);
      setMobileBlurred(false);
      setEmailBlurred(false);

      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setStatusMsg(
        err?.text || err?.message || "❌ Failed to send. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 px-4 pt-10 pb-6 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSending && onClose()}
        >
          <motion.div
            className="bg-white mt-10 sm:mt-16 p-4 sm:p-8 rounded-2xl w-full max-w-md sm:max-w-xl shadow-2xl max-h-[85svh] overflow-y-auto"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-900">
                  Apply Now
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Reference No:{" "}
                  <span className="font-semibold font-mono text-gray-800">
                    {referenceNo}
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Fill out the form below to apply for APDS Loan.
                </p>
              </div>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
                onClick={onClose}
                disabled={isSending}
                aria-label="Close Apply Now form"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    required
                    disabled={isSending}
                  />
                  {touched && !form.fullName.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Full name is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    inputMode="numeric"
                    maxLength={11}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.mobileNumber}
                    onChange={(e) => {
                      const digitsOnly = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);
                      update("mobileNumber", digitsOnly);
                    }}
                    onBlur={() => setMobileBlurred(true)}
                    required
                    disabled={isSending}
                  />

                  {mobileBlurred &&
                    form.mobileNumber.replace(/\D/g, "").length !== 11 && (
                      <p className="text-xs text-red-600 mt-1">
                        Mobile number should be 11 digits (e.g., 09XXXXXXXXX).
                      </p>
                    )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    pattern="^[^@\s]+@[^@\s]+\.com$"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => setEmailBlurred(true)}
                    required
                    disabled={isSending}
                  />

                  {emailBlurred && !form.email.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Email is required.
                    </p>
                  )}

                  {emailBlurred &&
                    form.email.trim() &&
                    !/^[^\s@]+@[^\s@]+\.com$/i.test(form.email.trim()) && (
                      <p className="text-xs text-red-600 mt-1">
                        Please enter a valid email ending in .com (e.g.,
                        name@gmail.com).
                      </p>
                    )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    School / Office <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.schoolOrOffice}
                    onChange={(e) => update("schoolOrOffice", e.target.value)}
                    required
                    disabled={isSending}
                  />
                  {touched && !form.schoolOrOffice.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      School/Office is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Station / City
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.stationOrCity}
                    onChange={(e) => update("stationOrCity", e.target.value)}
                    disabled={isSending}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Loan Amount (PHP) <span className="text-red-500">*</span>
                  </label>
                  <input
                    inputMode="numeric"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.loanAmount}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/[^\d]/g, "");
                      update("loanAmount", formatMoney(digitsOnly));
                    }}
                    required
                    disabled={isSending}
                  />

                  {touched && !form.loanAmount.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Loan amount is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Desired Term (Months){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
                    value={form.desiredTermMonths}
                    onChange={(e) =>
                      update("desiredTermMonths", e.target.value)
                    }
                    required
                    disabled={isSending}
                  >
                    <option value="">Select term</option>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                    <option value="60">60</option>
                  </select>
                  {touched && !form.desiredTermMonths.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Term is required.
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 min-h-[70px] sm:min-h-[90px]"
                    value={form.remarks}
                    onChange={(e) => update("remarks", e.target.value)}
                    disabled={isSending}
                  />
                </div>
              </div>

              {statusMsg && (
                <div className="text-sm rounded-lg bg-gray-50 border border-gray-200 p-3">
                  {statusMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSending}
                  className="w-full sm:w-auto bg-gray-100 text-gray-800 font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-sm transition hover:bg-gray-200 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSending || !isValid}
                  className="w-full sm:w-auto bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-lg transition hover:scale-[1.02] hover:bg-green-800 disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const APDSLoanPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <>
      {/* ✅ Page SEO */}
      <Seo
        title="Teacher's Loan | ASPAC Bank"
        description="Apply for ASPAC Bank’s Teacher Salary Loan (APDS): low interest, quick approval, flexible terms, and convenient payroll deduction for educators in the Philippines."
        canonical="https://www.aspacbank.com/teachers-loan"
        ogType="product"
        ogTitle="Teacher Salary Loan (APDS) | ASPAC Bank"
        ogDescription="Fast, flexible, low-interest APDS salary loans for teachers in the Philippines."
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LoanOrCredit",
          name: "Teacher Salary Loan (APDS)",
          alternateName: "Teacher Loan Philippines",
          description:
            "Low-interest, flexible-term salary loans for teachers in the Philippines through ASPAC Bank’s Automatic Payroll Deduction Scheme (APDS).",
          url: "https://www.aspacbank.com/teachers-loan",
          image: "https://www.aspacbank.com/features1.jpg",
          provider: {
            "@type": "BankOrCreditUnion",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            telephone: "+63-32-272-2724",
            areaServed: { "@type": "Country", name: "Philippines" },
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          offers: {
            "@type": "Offer",
            name: "Teacher Salary Loan (APDS)",
            url: "https://www.aspacbank.com/teachers-loan",
            priceCurrency: "PHP",
            eligibleRegion: { "@type": "Country", name: "Philippines" },
            availability: "https://schema.org/InStock",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "(032) 272-2724",
              areaServed: "PH",
              availableLanguage: "en",
            },
            {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "0898 272 2724",
              areaServed: "PH",
              availableLanguage: "en",
            },
          ],
        }}
      />

      {/* ✅ Page Content */}
      <div className="w-full bg-white shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative w-full">
          <img
            src="./features1.jpg"
            alt="Educators Banner"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-wide text-center px-2">
              APDS Loan for Educators
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="w-full text-white text-center px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16"
          style={{ background: "linear-gradient(135deg, #27ae60, #1e8449)" }}
        >
          <p className="mx-auto max-w-[44rem] leading-relaxed opacity-90 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl">
            The Automatic Payroll Deduction Scheme (APDS) Loan is designed
            specifically for hardworking teachers and school personnel. Fuel
            your educational mission with our flexible loan options.
          </p>

          {/* Actions */}
          <div className="mx-auto flex w-full max-w-xl flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="/files/ASPAC_Salary_loan_form.pdf"
              download="ASPAC_Salary_loan_form.pdf"
              className="w-full sm:w-auto inline-flex justify-center bg-white text-green-900 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
              aria-label="Download Salary Loan Form (PDF)"
            >
              Download Form
            </a>

            {/* ✅ NEW Apply Now button */}
            <button
              className="w-full sm:w-auto bg-yellow-400 text-green-900 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-200"
              onClick={() => setIsApplyModalOpen(true)}
              aria-label="Apply Now"
            >
              Apply Now
            </button>

            <button
              className="w-full sm:w-auto bg-white text-green-900 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
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
          ].map(({ Icon, title, description }, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Icon className="text-2xl text-green-700" />
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
            loop={true}
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
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                  <img
                    src={`/avatars/${testimonial.avatar}`}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-green-500 object-cover"
                  />
                  <p className="text-green-700 text-4xl mb-2 leading-none">"</p>
                  <p className="text-lg italic mb-4 text-gray-700">
                    "{testimonial.quote}"
                  </p>
                  <h4 className="font-bold text-green-800">
                    {testimonial.author}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modals */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <ApplyNowModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      </div>
    </>
  );
};

export default APDSLoanPage;
