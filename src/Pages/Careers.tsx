import React, { useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo"; // switch to "@/components/Seo" if using baseUrl alias

const jobOpenings = [
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

const Careers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs =
    selectedCategory === "All"
      ? jobOpenings
      : jobOpenings.filter((job) => job.category === selectedCategory);

  // JSON-LD JobPosting list
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

  const jobsCount = jobOpenings.length;

  return (
    <>
      {/* SEO for /careers */}
      <Seo
        title={`Careers (${jobsCount}) | ASPAC Bank`}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gray-50"
      >
        {/* Banner */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <img
            src="/Careers.jpg"
            alt="ASPAC Bank team working together"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-aspac-yellow bg-black/20 px-4 py-2 rounded-md">
              Build Your Career with Us
            </h2>
          </div>
        </section>

        {/* Job Category Filter */}
        <section className="container mx-auto mt-12 px-4">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Job Openings
          </h1>
          <div
            className="flex flex-wrap justify-center gap-3 mb-8"
            role="tablist"
            aria-label="Job categories"
          >
            {uniqueCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  role="tab"
                  aria-selected={active}
                  className={`px-4 py-2 rounded-full border transition ${
                    active
                      ? "bg-primary text-white border-primary shadow"
                      : "bg-white text-primary border-primary hover:bg-primary/5"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pb-16">
            {filteredJobs.map((job) => (
              <article
                key={job.title}
                className="bg-white rounded-xl shadow-sm p-6 text-left ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition"
              >
                <h2 className="text-xl font-semibold text-primary mb-1">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Location: {job.location}
                </p>

                <h3 className="font-medium text-gray-800 mt-3">
                  Qualifications:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
                  {job.qualifications.map((item) => (
                    <li key={`${job.title}-q-${item}`}>{item}</li>
                  ))}
                </ul>

                <h3 className="font-medium text-gray-800">Responsibilities:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {job.responsibilities.map((item) => (
                    <li key={`${job.title}-r-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Careers;
