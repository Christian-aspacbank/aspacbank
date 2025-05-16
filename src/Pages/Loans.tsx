import React from "react";
import { FaBriefcase, FaBuilding, FaUserShield, FaAward, FaGem, FaGlobe, FaUserTie } from "react-icons/fa";

interface LoanType {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const loanTypes: LoanType[] = [
  {
    title: "Commercial Loan",
    description: "Support for businesses needing working capital or expansion funds.",
    Icon: FaBriefcase as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Real Estate Loan",
    description: "Flexible financing for property acquisition, renovation, or construction.",
    Icon: FaBuilding as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Pension Loan",
    description: "Fast-access loans tailored for pensioners and retirees.",
    Icon: FaUserShield as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Honorarium Loan",
    description: "Loans for individuals receiving honoraria, such as public servants or consultants.",
    Icon: FaAward as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Chatel Loan",
    description: "Secured loans backed by assets for personal or emergency use.",
    Icon: FaGem as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "OFW Loan",
    description: "Convenient loan solutions for Overseas Filipino Workers and their families.",
    Icon: FaGlobe as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    title: "Salary Loan",
    description: "Quick and easy loans for employed individuals with flexible terms.",
    Icon: FaUserTie as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
];

const Loans: React.FC = () => {
  return (
    <div className="px-6 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-4">ASPAC Loan Services</h1>
        <p className="text-lg text-gray-600">
          Explore our wide range of loan products designed to meet your unique financial needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loanTypes.map(({ title, description, Icon }, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-center text-green-600 mb-4">
              <Icon className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loans;
