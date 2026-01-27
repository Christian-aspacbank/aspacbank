import React, { useEffect, useMemo, useState } from "react";

type Year = 2024 | 2025;

type ReportId = "annual-2024" | "part2-afs-2024" | "annual-2025";

type ReportConfig = {
  id: ReportId;
  year: Year;
  title: string;
  basePath: string;
  totalPages: number;
  fileName: (page: number) => string;
};

type AdvisoryImage = {
  src: string;
  alt: string;
};

export default function AnnualReport2024() {
  const REPORTS: ReportConfig[] = useMemo(
    () => [
      {
        id: "annual-2024",
        year: 2024,
        title: "Annual Report 2024",
        basePath: "/assets/annual_report",
        totalPages: 161,
        fileName: (page) => `Annual Report 2024_${page}.jpg`,
      },
      {
        id: "part2-afs-2024",
        year: 2024,
        title: "Part II AFS of Aspac Rural Bank 2024",
        basePath: "/assets/Part II AFS of Aspac Rural Bank 2024",
        totalPages: 61,
        fileName: (page) =>
          `Part II AFS of Aspac Rural Bank Inc 2024_${page}.jpg`,
      },
      {
        id: "annual-2025",
        year: 2025,
        title: "Annual Report 2025",
        basePath: "/assets/annual_report_2025",
        totalPages: 0,
        fileName: (page) => `Annual Report 2025_${page}.jpg`,
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

  // ✅ Fix ESLint warning: depend on `current`
  const images: AdvisoryImage[] = useMemo(() => {
    const n = current.totalPages;
    if (!n || n <= 0) return [];
    return Array.from({ length: n }, (_, idx) => {
      const page = idx + 1;
      const rawPath = `${current.basePath}/${current.fileName(page)}`;
      return {
        src: encodeURI(rawPath), // handles spaces
        alt: "",
      };
    });
  }, [current]);

  // Blocks right-click globally while this component is mounted
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", block, { capture: true });
    return () =>
      document.removeEventListener("contextmenu", block, {
        capture: true,
      } as any);
  }, []);

  // Optional: block right-click anywhere inside this component
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", block, { capture: true });
    return () =>
      document.removeEventListener("contextmenu", block, {
        capture: true,
      } as any);
  }, []);

  // ✅ keep this only
  const blockInteraction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

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

      {current.totalPages <= 0 ? (
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700">
          ( No files yet for {current.year}. )
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {images.map((img, idx) => (
            <figure
              key={img.src}
              className="rounded-2xl shadow-sm overflow-hidden"
            >
              <div
                className="w-full h-[900px] md:h-[1050px] bg-gray-50 flex items-center justify-center select-none"
                onClickCapture={blockInteraction}
                onMouseDownCapture={blockInteraction}
                onPointerDownCapture={blockInteraction}
                onContextMenuCapture={blockInteraction}
                onDragStartCapture={blockInteraction}
                onTouchStartCapture={blockInteraction}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  onDragStart={blockInteraction}
                  onContextMenu={blockInteraction}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              <div className="px-4 py-3 text-sm text-gray-700">
                Page {idx + 1}
              </div>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
