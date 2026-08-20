import React, { useState } from "react";
import { FileText } from "lucide-react";
import ReadonlyPdfViewer from "../components/ReadonlyPdfViewer";
import Seo from "../components/Seo";

type ReportId = "annual-2025" | "annual-2024" | "part2-afs-2024";

type Report = {
  id: ReportId;
  year: 2025 | 2024;
  title: string;
  pdfPath: string;
  description: string;
  type: string;
};

const REPORTS: Report[] = [
  {
    id: "annual-2025",
    year: 2025,
    title: "Annual Report 2025",
    pdfPath: "/annual-report/2025/AnnualReport2025.pdf",
    description: "View ASPAC Bank's official annual report for the year 2025.",
    type: "Annual Report",
  },
  {
    id: "annual-2024",
    year: 2024,
    title: "Annual Report 2024",
    pdfPath: "/annual-report/2024/AnnualReport2024.pdf",
    description: "View ASPAC Bank's official annual report for the year 2024.",
    type: "Annual Report",
  },
  {
    id: "part2-afs-2024",
    year: 2024,
    title: "Part II AFS of Aspac Rural Bank 2024",
    pdfPath: "/annual-report/2024/part-ii-afs/Part2AFS2024.pdf",
    description:
      "View the Part II Audited Financial Statements of ASPAC Rural Bank for 2024.",
    type: "Financial Statement",
  },
];

const AnnualReports: React.FC = () => {
  const [selectedReportId, setSelectedReportId] =
    useState<ReportId>("annual-2025");
  const selectedReport =
    REPORTS.find((report) => report.id === selectedReportId) ?? REPORTS[0];

  return (
    <>
      <Seo
        title="Annual Reports | ASPAC Bank"
        description="Access ASPAC Bank’s published annual reports and audited financial statement documents."
        canonical="https://www.aspacbank.com/annual-reports"
        ogType="website"
        ogImage="https://www.aspacbank.com/Aspac_logo-03A.png"
        ogImageAlt="ASPAC Bank logo"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
      />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-3 py-6 pt-24 sm:px-5 md:px-8 lg:px-10">
        <div className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <header className="mb-6 overflow-hidden rounded-[2rem] border border-green-100 bg-white/85 shadow-xl shadow-green-900/5 backdrop-blur">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-5 sm:p-7 lg:p-9">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Official Bank Reports
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-green-950 sm:text-3xl lg:text-4xl">
                  ASPAC Bank Annual Reports
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                  Access ASPAC Bank’s published annual reports and audited
                  financial statement documents. Select a document below to
                  view its read-only PDF preview.
                </p>
              </div>

              <div className="relative hidden min-h-[240px] overflow-hidden bg-gradient-to-br from-[#229b15] via-[#27b51a] to-[#38cb2c] lg:block">
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="w-full max-w-xs rounded-[2rem] bg-white/20 p-6 text-white shadow-2xl ring-1 ring-white/30 backdrop-blur-md">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/85">
                        PDF Preview
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                        Read only
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 rounded-full bg-white/80" />
                      <div className="h-3 w-full rounded-full bg-white/40" />
                      <div className="h-3 w-5/6 rounded-full bg-white/40" />
                      <div className="h-20 rounded-2xl bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mb-5">
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Published documents
                </h2>
                <p className="text-sm text-gray-500">
                  Choose a document to preview.
                </p>
              </div>
              <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow-sm ring-1 ring-green-100 sm:block">
                {REPORTS.length} documents · {Math.min(...REPORTS.map((r) => r.year))}–
                {Math.max(...REPORTS.map((r) => r.year))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {REPORTS.map((report) => {
                const isSelected = report.id === selectedReport.id;

                return (
                  <button
                    key={report.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedReportId(report.id)}
                    className={[
                      "group relative overflow-hidden rounded-3xl border p-4 text-left transition duration-300 sm:p-5",
                      isSelected
                        ? "border-[#459243] bg-white shadow-xl shadow-green-900/10"
                        : "border-green-100 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:shadow-lg",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "absolute right-0 top-0 h-24 w-24 rounded-bl-full transition",
                        isSelected ? "bg-green-100" : "bg-gray-50",
                      ].join(" ")}
                    />

                    <div className="relative flex gap-4">
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1",
                          isSelected
                            ? "bg-green-50 text-green-700 ring-green-100"
                            : "bg-gray-50 text-gray-500 ring-gray-100",
                        ].join(" ")}
                      >
                        <FileText aria-hidden="true" className="h-6 w-6" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                            {report.type}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600">
                            {report.year}
                          </span>
                          {isSelected && (
                            <span className="rounded-full bg-[#459243] px-2.5 py-1 text-[10px] font-bold text-white">
                              Selected
                            </span>
                          )}
                        </div>

                        <h3
                          className={[
                            "text-sm font-bold sm:text-base",
                            isSelected ? "text-green-900" : "text-gray-900",
                          ].join(" ")}
                        >
                          {report.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 rounded-3xl border border-green-100 bg-white/85 p-4 shadow-sm backdrop-blur sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {selectedReport.year}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {selectedReport.type}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
                  {selectedReport.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  The document is displayed below in read-only preview mode.
                </p>
              </div>
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                PDF available
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-2xl shadow-green-900/10">
            <div className="flex items-center justify-between gap-3 border-b border-green-100 bg-gradient-to-r from-green-50 to-white px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="text-sm font-bold text-green-900">
                  {selectedReport.title}
                </p>
                <p className="text-xs text-gray-500">Read-only PDF preview</p>
              </div>
            </div>

            <div className="bg-slate-100 p-2 sm:p-4">
              <ReadonlyPdfViewer
                key={selectedReport.id}
                pdfUrl={selectedReport.pdfPath}
                title={selectedReport.title}
                containerHeight={1050}
                maxPageWidth={900}
                scale={1.5}
              />
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Documents are provided for viewing purposes only.
          </p>
        </div>
      </section>
    </>
  );
};

export default AnnualReports;
