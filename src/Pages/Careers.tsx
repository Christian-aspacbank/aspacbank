import React, { useState } from "react";
import { motion } from "framer-motion";

const jobOpenings = [
  {
    title: "Branch Marketing Associate (BMA)",
    location: "Lapu-Lapu Branch",
    category: "Marketing",
    qualifications: [
      "Sales talent",
      "Graduate of any 4-year college course",
      "License to drive a motorcycle is an advantage"
    ],
    responsibilities: [
      "Acquire loan and deposit accounts",
      "Organize and participate in sales events",
      "Field work, client visits, and conduct presentations"
    ]
  },
  {
    title: "Audit Staff",
    location: "Head Office",
    category: "Audit",
    qualifications: [
      "Bachelor's Degree in Accounting, BS Accountancy or its equivalent",
      "Strong analytical and problem-solving skills",
      "Willing to travel"
    ],
    responsibilities: [
      "Conduct regular audit and spot audit of all branches and auditable units",
      "Prepare comprehensive audit findings report",
      "Analyze financial data to identify discrepancies"
    ]
  },
  {
    title: "Reserve Pool Officer",
    location: "Various Branch Assignments",
    category: "Operations",
    qualifications: [
      "Graduate of any 4-year course",
      "At least 3 years of banking experience, preferably in a supervisory role",
      "Willing to be assigned within the area of assignment"
    ],
    responsibilities: [
      "Oversee the daily operations of the bank",
      "Ensure compliance with banking regulations",
      "Perform a wide range of customer service tasks"
    ]
  },
  {
    title: "North Cluster Bank Marketing Officer",
    location: "Northern Cebu Cluster",
    category: "Marketing",
    qualifications: [
      "Bachelor's Degree in Business Admin major in Marketing, or related course",
      "Knowledgeable in marketing techniques and principles",
      "Team player with a customer-oriented approach"
    ],
    responsibilities: [
      "Support the Branch Head in promoting bank products and services",
      "Engage with potential customers via in-branch promotions",
      "Maintain a strong brand image of the branch"
    ]
  }
];

const uniqueCategories = ["All"].concat(Array.from(new Set(jobOpenings.map(job => job.category))));

const Careers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs =
    selectedCategory === "All"
      ? jobOpenings
      : jobOpenings.filter(job => job.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-100"
    >
      {/* Banner Section */}
      <div
        className="w-full py-24 text-center flex items-center justify-start px-16 h-[400px] relative"
        style={{
          backgroundImage: "url('Careers.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-3xl font-semibold bg-black bg-opacity-15 p-4 rounded-md absolute leading-tight text-yellow-400">
          Build Your Career with Us
        </h2>
      </div>

      {/* Job Category Filter */}
      <div className="container mx-auto text-center mt-12 px-4">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Job Openings</h1>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === category
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-700 border-green-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pb-16">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-1">{job.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Location: {job.location}</p>
              <h3 className="font-medium text-gray-700 mt-3">Qualifications:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                {job.qualifications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <h3 className="font-medium text-gray-700">Responsibilities:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Careers;
