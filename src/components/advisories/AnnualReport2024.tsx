import React, { useMemo, useState } from "react";

type YearConfig = {
  year: 2024 | 2025;
  title: string;
  basePath: string; // folder in public
  totalPages: number; // how many images exist
};

type AdvisoryImage = {
  src: string;
  alt: string;
};

export default function AnnualReport2024() {
  // ✅ Add/adjust here when new year comes
  const YEARS: YearConfig[] = useMemo(
    () => [
      {
        year: 2024,
        title: "Annual Report 2024 ",
        basePath: "/assets/annual_report", // public/assets/annual_report
        totalPages: 20,
      },
      {
        year: 2025,
        title: "Annual Report 2025",
        basePath: "/assets/annual_report_2025", // create this folder later
        totalPages: 0, // set this once files are ready
      },
    ],
    [],
  );

  const [activeYear, setActiveYear] = useState<2024 | 2025>(2024);

  const current = useMemo(() => {
    return YEARS.find((y) => y.year === activeYear) ?? YEARS[0];
  }, [YEARS, activeYear]);

  const images: AdvisoryImage[] = useMemo(() => {
    const n = current.totalPages;
    if (!n || n <= 0) return [];
    return Array.from({ length: n }, (_, idx) => {
      const page = idx + 1;
      return {
        src: `${current.basePath}/annual-report-${page}.jpg`,
        alt: "",
      };
    });
  }, [current.basePath, current.totalPages]);

  return (
    <section className="w-full px-6 py-6">
      <header className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {YEARS.map((y) => {
            const isActive = y.year === activeYear;
            return (
              <button
                key={y.year}
                type="button"
                onClick={() => setActiveYear(y.year)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-medium border",
                  isActive
                    ? "bg-[#459243] text-white border-[#459243]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                {y.year}
              </button>
            );
          })}
        </div>

        <h1 className="text-lg md:text-xl font-semibold">{current.title}</h1>
      </header>

      {current.totalPages <= 0 ? (
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700">
          No files yet for {current.year}. (Add images to{" "}
          <span className="font-mono">{`public${current.basePath}`}</span> and
          set <span className="font-mono">totalPages</span>.)
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {images.map((img, idx) => (
            <figure
              key={img.src}
              className="rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="w-full h-[700px] bg-gray-50 flex items-center justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-contain select-none pointer-events-none"
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
