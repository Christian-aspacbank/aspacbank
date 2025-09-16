import React from "react";

const AnnualReport: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <h1 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6">
        ASPAC Bank Annual Report
      </h1>

      <p className="text-lg text-gray-700 mb-4">
        You may view the annual reports by clicking the links below:
      </p>

      <div className="space-y-4">
        {/* 2024 Annual Report */}
        <div>
          <h2 className="text-green-800 font-medium mb-1">2024 Annual Report</h2>
          <a
            href="https://drive.google.com/file/d/1xuqc56kmOF59mC1uEaREu44RSm_pLJ7B/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            📎 View 2024 Annual Report 
          </a>
        </div>

        {/* 2023 Annual Report (example) */}
        <div>
          <h2 className="text-green-800 font-medium mb-1">2024 Annual Report</h2>
          <a
            href="https://drive.google.com/file/d/1395xZqKYDdE1bvSonBJK23U3BHR-HMXm//preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            📎 View 2024 Annual Report 
          </a>
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-6">
        * These documents open in new tabs. Downloading and printing are hidden by default via Google Drive preview.
      </p>
    </div>
  );
};

export default AnnualReport;
