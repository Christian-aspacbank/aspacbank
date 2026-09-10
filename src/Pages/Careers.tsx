import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaListUl,
  FaBullhorn,
  FaSearchDollar,
  FaCogs,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import Seo from "../components/Seo";

interface JobOpening {
  title: string;
  location: string;
  category: string;
  qualifications: string[];
  responsibilities: string[];
}

const jobOpenings: JobOpening[] = [
  {
    title: "Branch Marketing Associate (BMA)",
    location: "Lapu-Lapu Branch",
    category: "Marketing",
    qualifications: [
      "Sales talent",
      "Graduate of any 4-year college course",
      "License to drive a motorcycle is an advantage",
    ],
    responsibilities: [
      "Acquire loan and deposit accounts",
      "Organize and participate in sales events",
      "Field work, client visits, and conduct presentations",
    ],
  },
  {
    title: "Audit Staff",
    location: "Head Office",
    category: "Audit",
    qualifications: [
      "Bachelor's Degree in Accounting, BS Accountancy or its equivalent",
      "Strong analytical and problem-solving skills",
      "Willing to travel",
    ],
    responsibilities: [
      "Conduct regular audit and spot audit of all branches and auditable units",
      "Prepare comprehensive audit findings report",
      "Analyze financial data to identify discrepancies",
    ],
  },
  {
    title: "Reserve Pool Officer",
    location: "Various Branch Assignments",
    category: "Operations",
    qualifications: [
      "Graduate of any 4-year course",
      "At least 3 years of banking experience, preferably in a supervisory role",
      "Willing to be assigned within the area of assignment",
    ],
    responsibilities: [
      "Oversee the daily operations of the bank",
      "Ensure compliance with banking regulations",
      "Perform a wide range of customer service tasks",
    ],
  },
  {
    title: "North Cluster Bank Marketing Officer",
    location: "Northern Cebu Cluster",
    category: "Marketing",
    qualifications: [
      "Bachelor's Degree in Business Admin major in Marketing, or related course",
      "Knowledgeable in marketing techniques and principles",
      "Team player with a customer-oriented approach",
    ],
    responsibilities: [
      "Support the Branch Head in promoting bank products and services",
      "Engage with potential customers via in-branch promotions",
      "Maintain a strong brand image of the branch",
    ],
  },
];

const uniqueCategories = [
  "All",
  ...Array.from(new Set(jobOpenings.map((j) => j.category))),
];

// Contextual Icon picker helper function
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Marketing":
      return <FaBullhorn className="text-xl" />;
    case "Audit":
      return <FaSearchDollar className="text-xl" />;
    case "Operations":
      return <FaCogs className="text-xl" />;
    default:
      return <FaBriefcase className="text-xl" />;
  }
};

const Careers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs =
    selectedCategory === "All"
      ? jobOpenings
      : jobOpenings.filter((job) => job.category === selectedCategory);

  const jobsCount = jobOpenings.length;

  // JSON-LD JobPosting dynamic generation
  const jobPostingsLd = jobOpenings.map((job, idx) => ({
    "@type": "JobPosting",
    title: job.title,
    hiringOrganization: {
      "@type": "Organization",
      name: "ASPAC Bank",
      sameAs: "https://www.aspacbank.com",
      logo: "https://www.aspacbank.com/favicon.ico",
    },
    jobLocation: {
      "@type": "Place",
      name: job.location,
    },
    description: [
      "Qualifications: " + job.qualifications.join("; "),
      "Responsibilities: " + job.responsibilities.join("; "),
    ].join(" | "),
    identifier: {
      "@type": "PropertyValue",
      name: "ASPAC Bank",
      value: `job-${idx + 1}`,
    },
    employmentType: "FULL_TIME",
  }));

  return (
    <>
      <Seo
        title="Careers | ASPAC Bank"
        description="Join the ASPAC Bank team — explore job opportunities, benefits, and a rewarding career path in banking."
        canonical="https://www.aspacbank.com/careers"
        ogType="website"
        ogImage="https://www.aspacbank.com/Careers.jpg"
        ogImageAlt="ASPAC Bank Careers"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Careers",
          description:
            "Explore career opportunities at ASPAC Bank. Check current job openings, benefits, and how to apply.",
          url: "https://www.aspacbank.com/careers",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
          mainEntity: {
            "@type": "ItemList",
            name: "ASPAC Bank Job Openings",
            numberOfItems: jobsCount,
            itemListElement: jobPostingsLd,
          },
        }}
      />

      <div className="min-h-screen bg-slate-50/60 font-sans">
        {/* 🟢 HERO HEADER SECTION */}
        <section className="relative w-full h-[26rem] sm:h-[32rem] overflow-hidden bg-slate-900">
          <img
            src="/Careers.jpg"
            alt="ASPAC Bank professional team collaborating"
            className="absolute inset-0 h-full w-full object-cover object-center transform scale-105 brightness-[0.65]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-950/20 to-transparent" />

          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-slate-900 mb-4 shadow-md">
                We are hiring
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                Build Your Future <br />
                With <span className="text-accent">ASPAC Bank</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
                Grow professionally alongside structural banking experts.
                Explore our roles, find your match, and step into an empowering
                career.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 🟢 CORE JOB MARKET SECTION */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {/* Controls Container Card */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 -mt-16 relative z-20 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-extrabold text-primary tracking-tight">
                  Current Openings
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Showing {filteredJobs.length} position
                  {filteredJobs.length === 1 ? "" : "s"} across multiple
                  departments
                </p>
              </div>

              {/* Category Pills Tablist */}
              <div
                className="flex flex-row  gap-2 w-full md:w-auto justify-start md:justify-end overflow-x-auto items-center  scrollbar-none  border-r-2 border-primary md:border-none md:border-r-0 p-2 "
                role="tablist"
                aria-label="Job category filtering"
              >
                {uniqueCategories.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      role="tab"
                      aria-selected={active}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 border ${
                        active
                          ? "bg-[#459243] text-white border-[#459243] shadow-md shadow-emerald-700/10"
                          : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-slate-100/60"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Grid Layout Display Container */}
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={job.title}
                  className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div>
                    {/* Upper contextual header details row */}
                    <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-5 mb-5">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 bg-slate-50 rounded-2xl text-[#459243] group-hover:bg-[#459243]/10 transition-colors duration-300">
                          {getCategoryIcon(job.category)}
                        </div>
                        <div className="space-y-2 text-start">
                          <h3 className="text-sm md:text-xl font-bold text-slate-900 group-hover:text-[#459243] transition-colors duration-200 leading-snug">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs mt-1">
                            <FaMapMarkerAlt className="text-slate-300 text-[11px]" />
                            <span>{job.location}</span>
                          </div>
                          <span className="block md:hidden text-[8px] w-max font-extrabold tracking-widest bg-slate-50 text-slate-500 uppercase px-2.5 py-1 rounded-md border border-slate-100 shrink-0">
                            {job.category}
                          </span>
                        </div>
                      </div>
                      <span className="hidden md:block text-[10px] font-extrabold tracking-widest bg-slate-50 text-slate-500 uppercase px-2.5 py-1 rounded-md border border-slate-100 shrink-0">
                        {job.category}
                      </span>
                    </div>

                    {/* Qualifications Subsection Layout */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2.5">
                        <FaCheckCircle className="text-[#459243]/80 text-[13px]" />
                        Key Qualifications
                      </h4>
                      <ul className="space-y-2 text-start">
                        {job.qualifications.map((item, idx) => (
                          <li
                            key={`${job.title}-q-${idx}`}
                            className="text-xs md:text-sm text-slate-600 leading-relaxed pl-1"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities Subsection Layout */}
                    <div className="mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2.5">
                        <FaListUl className="text-[#459243]/80 text-[13px]" />
                        Core Responsibilities
                      </h4>
                      <ul className="space-y-2 text-start">
                        {job.responsibilities.map((item, idx) => (
                          <li
                            key={`${job.title}-r-${idx}`}
                            className="text-xs md:text-sm text-slate-600 leading-relaxed pl-1"
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 🟢 HOW TO APPLY SECTION CONTACT FOOTER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-16 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#459243]/20 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-primary">
                Ready to take the next step?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                If you qualify and are driven to match our standard of simple,
                safe banking, send your updated comprehensive resume, transcript
                of records (TOR), and a clean cover letter directly to our
                recruitment channel.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:hr_recruitment@aspacbank.com"
                  className="inline-flex items-center gap-3 bg-[#459243] hover:bg-[#459243]/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm focus:outline-none focus:ring-4 focus:ring-[#459243]/40"
                >
                  <FaEnvelope className="text-sm" />
                  aspacbank@aspacbank.com
                  <FaArrowRight className="text-xs ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Or visit your nearest branch office.
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Careers;
