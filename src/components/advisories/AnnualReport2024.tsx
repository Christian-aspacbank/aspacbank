import React, { useEffect, useMemo, useState } from "react";
import ReadonlyPdfViewer from "../ReadonlyPdfViewer";

type Year = 2024 | 2025;
type ReportId = "annual-2024" | "part2-afs-2024" | "annual-2025";

type ReportConfig = {
  id: ReportId;
  year: Year;
  title: string;
  pdfPath: string; // one file
};

export default function AnnualReport2024() {
  const REPORTS: ReportConfig[] = useMemo(
    () => [
      {
        id: "annual-2024",
        year: 2024,
        title: "Annual Report 2024",
        pdfPath: "/annual-report/2024/AnnualReport2024.pdf",
      },
      {
        id: "part2-afs-2024",
        year: 2024,
        title: "Part II AFS of Aspac Rural Bank 2024",
        pdfPath: "/annual-report/2024/part-ii-afs/Part2AFS2024.pdf",
      },

      {
        id: "annual-2025",
        year: 2025,
        title: "Annual Report 2025",
        pdfPath: "", // add later
      },
    ],
    [],
  );

  const YEARS: Year[] = useMemo(() => [2024, 2025], []);
  const [activeYear, setActiveYear] = useState<Year>(2024);

  const reportsForYear = useMemo(
    () => REPORTS.filter((r) => r.year === activeYear),
    [REPORTS, activeYear],
  );

  const defaultReportIdByYear: Record<Year, ReportId> = useMemo(
    () => ({
      2024: "annual-2024",
      2025: "annual-2025",
    }),
    [],
  );

  const [activeReportId, setActiveReportId] = useState<ReportId>(
    defaultReportIdByYear[2024],
  );

  useEffect(() => {
    setActiveReportId(defaultReportIdByYear[activeYear]);
  }, [activeYear, defaultReportIdByYear]);

  const current = useMemo(() => {
    return (
      REPORTS.find((r) => r.id === activeReportId) ??
      reportsForYear[0] ??
      REPORTS[0]
    );
  }, [REPORTS, activeReportId, reportsForYear]);

  const hasPdf = Boolean(current.pdfPath);

  // Block right-click globally while mounted (extra deterrent)
  useEffect(() => {
    const block = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", block, { capture: true });
    return () =>
      document.removeEventListener("contextmenu", block, { capture: true });
  }, []);

  return (
    <section className="w-full px-2 md:px-6 py-6">
      <header className="mb-4">
        {/* Year buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {YEARS.map((y) => {
            const isActive = y === activeYear;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setActiveYear(y)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-medium border",
                  isActive
                    ? "bg-[#459243] text-white border-[#459243]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                {y}
              </button>
            );
          })}
        </div>

        {/* Dropdown only for 2024 */}
        {activeYear === 2024 && (
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">Select report:</span>
            <select
              value={activeReportId}
              onChange={(e) => setActiveReportId(e.target.value as ReportId)}
              className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#459243]"
            >
              {reportsForYear.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <h1 className="text-lg md:text-xl font-semibold">{current.title}</h1>
      </header>

      {!hasPdf ? (
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700">
          ( No PDF yet for {current.year}. )
        </div>
      ) : (
        <ReadonlyPdfViewer
          pdfUrl={current.pdfPath}
          containerHeight={1050} // scroll area height
          maxPageWidth={900} // page width (centered look)
          scale={1.5} // adjust if too small/large
        />
      )}
    </section>
  );
}
