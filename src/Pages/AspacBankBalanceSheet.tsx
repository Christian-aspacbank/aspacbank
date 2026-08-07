import React, { useMemo, useState } from "react";
import Seo from "../components/Seo";

const LS_KEY = "aspac-balance-selected-asOf";

type DocOption = {
  label: string;
  asOf: string;
  pages: string[];
};

const fileUrl = (name: string) => `/assets/balancesheet/${name}`;

const DOC_OPTIONS: DocOption[] = [
  {
    label: "June 30, 2026",
    asOf: "2026-06-30",
    pages: [
      fileUrl("balancesheet-6-30-2026-1.jpg"),
      fileUrl("balancesheet-6-30-2026-2.jpg"),
    ],
  },
  {
    label: "March 31, 2026",
    asOf: "2026-03-31",
    pages: [
      fileUrl("balancesheet-3-31-2026.jpg"),
      fileUrl("balancesheet-3-31-2026_1.jpg"),
    ],
  },
  {
    label: "December 31, 2025",
    asOf: "2025-12-31",
    pages: [
      fileUrl("balancesheet-12-31-2025_1.jpg"),
      fileUrl("balancesheet-12-31-2025_2.jpg"),
    ],
  },
  {
    label: "September 30, 2025",
    asOf: "2025-09-30",
    pages: [
      fileUrl("balancesheet-9-30-2025_1.jpg"),
      fileUrl("balancesheet-9-30-2025_2.jpg"),
    ],
  },
  {
    label: "June 30, 2025",
    asOf: "2025-06-30",
    pages: [
      fileUrl("balancesheet-6-30-2025.jpg"),
      fileUrl("balancesheet-6-30-2025_1.jpg"),
    ],
  },
  {
    label: "March 31, 2025",
    asOf: "2025-03-31",
    pages: [
      fileUrl("balancesheet-3-31-2025.jpg"),
      fileUrl("balancesheet-3-31-2025_1.jpg"),
    ],
  },
];

const findByAsOf = (asOf: string) => DOC_OPTIONS.find((o) => o.asOf === asOf);

const AspacBankBalanceSheet: React.FC = () => {
  const options = useMemo(() => DOC_OPTIONS, []);

  const initialAsOf = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const asOfParam = params.get("asOf");
      if (asOfParam && findByAsOf(asOfParam)) return asOfParam;

      const saved = localStorage.getItem(LS_KEY);
      if (saved && findByAsOf(saved)) return saved;
    } catch {}

    return options[0]?.asOf || "";
  })();

  const [selectedAsOf, setSelectedAsOf] = useState<string>(initialAsOf);
  const selectedOption = findByAsOf(selectedAsOf);

  const handleChange = (asOf: string) => {
    setSelectedAsOf(asOf);
    try {
      localStorage.setItem(LS_KEY, asOf);
      const url = new URL(window.location.href);
      url.searchParams.set("asOf", asOf);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const preventImageInteraction = {
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    onClick: (e: React.MouseEvent) => e.preventDefault(),
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    draggable: false,
  };

  return (
    <>
      <Seo
        title="ASPAC Bank Balance Sheets | Quarterly Financial Reports"
        description="View ASPAC Bank balance sheet publications by quarterly reporting period and access available financial documents."
        canonical="https://www.aspacbank.com/advisories/financial-overview/aspacbank-balance-sheet"
        ogType="website"
        ogImage="https://www.aspacbank.com/Aspac_logo-03A.png"
        ogImageAlt="ASPAC Bank logo"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm shadow-gray-200/60">
            <div className="flex h-1.5 w-full">
              <span className="w-2/3 bg-[#459243]" />
              <span className="w-1/3 bg-[#ebd839]" />
            </div>

            <div className="p-6 sm:p-10">
              <header className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Balance Sheet
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 sm:text-base">
                  View ASPAC Rural Bank, Inc. balance sheets by reporting
                  period.
                </p>
              </header>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <label
                  htmlFor="period"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Reporting Period
                </label>

                <div className="relative">
                  <select
                    id="period"
                    value={selectedAsOf}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-900 shadow-sm outline-none transition focus:border-[#459243] focus:ring-2 focus:ring-[#459243]/20"
                  >
                    {options.map((option) => (
                      <option key={option.asOf} value={option.asOf}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#459243]">
                    ▾
                  </span>
                </div>
              </div>

              {selectedOption && (
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="h-2 w-2 rounded-full bg-[#459243]" />
                    {selectedOption.label}
                  </h2>

                  <div className="mt-5 space-y-8">
                    {selectedOption.pages.map((src, index) => (
                      <div key={src}>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ebd839]" />
                          Page {index + 1}
                        </p>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-inner sm:p-3">
                          <img
                            src={src}
                            alt={`ASPAC Bank Balance Sheet ${selectedOption.label} page ${
                              index + 1
                            }`}
                            className="h-auto w-full select-none rounded-lg bg-white shadow-sm"
                            style={{
                              WebkitTouchCallout: "none",
                              cursor: "default",
                            }}
                            {...preventImageInteraction}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AspacBankBalanceSheet;
