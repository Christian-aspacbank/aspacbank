import React from "react";

type ReportLink = {
  yearLabel: string;
  title: string;
  href: string;
  buttonText: string;
};

const REPORTS: ReportLink[] = [
  {
    yearLabel: "2024",
    title: "Annual Report 2024",
    href: "https://drive.google.com/file/d/1xuqc56kmOF59mC1uEaREu44RSm_pLJ7B/preview",
    buttonText: "View Annual Report 2024",
  },
  {
    yearLabel: "2024",
    title: "Part II AFS of Aspac Rural Bank 2024",
    href: "https://drive.google.com/file/d/1395xZqKYDdE1bvSonBJK23U3BHR-HMXm/preview",
    buttonText: "View Part II AFS 2024",
  },
];

const AnnualReport: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-20 py-10 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-green-700">
          ASPAC Bank Annual Report
        </h1>
        <p className="text-base md:text-lg text-gray-700 mt-2">
          You may view the annual reports by clicking the links below:
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((r, idx) => (
          <article
            key={`${r.title}-${idx}`}
            className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-green-50 text-green-800">
                    {r.yearLabel}
                  </span>
                </div>

                <h2 className="mt-2 text-green-900 font-semibold text-base md:text-lg">
                  {r.title}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Opens in a new tab via Google Drive preview.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
                           bg-green-600 text-white rounded-xl hover:bg-green-700 transition
                           focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                <span className="text-base">📎</span>
                <span className="text-sm md:text-base font-medium">
                  {r.buttonText}
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6">
        * These documents open in new tabs via Google Drive preview.
      </p>
    </section>
  );
};

export default AnnualReport;
