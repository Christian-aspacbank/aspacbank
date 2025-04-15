import React from 'react';
import { Link } from 'react-router-dom';

const APDSLoanPage: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-12 px-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            APDS Loan for Educators
          </h2>
          <p className="text-lg sm:text-xl opacity-80 mb-8">
            The Automatic Payroll Deduction Scheme (APDS) Loan is designed specifically for hardworking teachers and school personnel. Fuel your educational mission with our flexible loan options.
          </p>

          {/* Apply Button */}
          <Link
            to="/apply-apds-loan"
            className="bg-yellow-500 text-green-900 font-semibold py-3 px-8 rounded-full shadow-md transform transition duration-300 hover:scale-105 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400"
          >
            Apply Now
          </Link>
        </div>

        {/* Loan Details Section */}
        <div className="px-6 py-8 sm:py-12">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            Why Choose APDS Loan?
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 sm:text-xl">
            <li>🔹 Low interest rates exclusive to educators</li>
            <li>🔹 Flexible payment terms up to 36 months</li>
            <li>🔹 Quick and hassle-free loan approval process</li>
            <li>🔹 Automatic salary deduction for easy payments</li>
          </ul>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-200 py-6 text-center text-gray-600 text-sm sm:text-base">
          <p>&copy; 2025 ASPAC Bank. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default APDSLoanPage;
