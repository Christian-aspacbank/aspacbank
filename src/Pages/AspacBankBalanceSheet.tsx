import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// --- Helpers ---------------------------------------------------------------
// simplest: serve from /public/files -> available at /files/<name>
const fileUrl = (name: string) => `/files/${name}`;

// LocalStorage key (store by asOf so file renames don't break)
const LS_KEY = "aspac-balance-selected-asOf";

type DocOption = {
  label: string; // e.g., "June 30, 2025 (Q2)"
  asOf: string; // ISO date: "2025-06-30"
  pages: string[]; // 1+ image URLs, in order
};

// Build the options list here so adding new periods is trivial
const DOC_OPTIONS: DocOption[] = [
  {
    label: "June 30, 2025 (Q2)",
    asOf: "2025-06-30",
    pages: [
      fileUrl("balancesheet-6-30-2025.jpg"),
      fileUrl("balancesheet-6-30-2025_1.jpg"),
    ],
  },
  {
    label: "March 31, 2025 (Q1)",
    asOf: "2025-03-31",
    pages: [
      fileUrl("balancesheet-3-31-2025.jpg"),
      fileUrl("balancesheet-3-31-2025_1.jpg"),
    ],
  },
];

// Utility: find option by asOf
const findByAsOf = (asOf: string) => DOC_OPTIONS.find((o) => o.asOf === asOf);

// --- Component -------------------------------------------------------------
const AspacBankBalanceSheet: React.FC = () => {
  const options = useMemo(() => DOC_OPTIONS, []);

  // Determine initial selection: URL param -> localStorage -> first option
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
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const selectedOption = findByAsOf(selectedAsOf);
  const totalPages = selectedOption?.pages.length ?? 0;
  const currentSrc = selectedOption ? selectedOption.pages[pageIndex] : "";

  // Sync selection to localStorage & query param (depend on primitive, not object)
  useEffect(() => {
    if (!selectedAsOf) return;
    try {
      localStorage.setItem(LS_KEY, selectedAsOf);
      const url = new URL(window.location.href);
      url.searchParams.set("asOf", selectedAsOf);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, [selectedAsOf]);

  // Reset loader on src change
  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
  }, [currentSrc]);

  // Stable callbacks used in effects/handlers
  const stepPeriod = useCallback(
    (delta: number) => {
      if (!options.length) return;
      const idx = options.findIndex((o) => o.asOf === selectedAsOf);
      const next = options[(idx + delta + options.length) % options.length];
      setSelectedAsOf(next.asOf);
      setPageIndex(0);
    },
    [options, selectedAsOf]
  );

  const stepPage = useCallback(
    (delta: number) => {
      if (totalPages <= 0) return;
      setPageIndex((prev) => (prev + delta + totalPages) % totalPages);
    },
    [totalPages]
  );

  const triggerDownload = useCallback(() => {
    if (!currentSrc) return;
    const a = document.createElement("a");
    a.href = currentSrc;
    const file = currentSrc.split("/").pop() || "balance-sheet.jpg";
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [currentSrc]);

  const enterFullscreen = useCallback(async () => {
    const container = document.getElementById("img-container");
    if (!container) return;
    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // no-op
    }
  }, []);

  // Keyboard shortcuts (all used refs/functions are stable or listed)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

      const k = e.key.toLowerCase();

      // period nav
      if (k === "arrowright" || k === "j") {
        e.preventDefault();
        stepPeriod(1);
      } else if (k === "arrowleft" || k === "k") {
        e.preventDefault();
        stepPeriod(-1);
      }

      // page nav
      if (k === "arrowdown" || k === "n" || k === " ") {
        e.preventDefault();
        stepPage(1);
      } else if (k === "arrowup" || k === "p" || k === "backspace") {
        e.preventDefault();
        stepPage(-1);
      }

      // open / download
      if (k === "o" && currentSrc) {
        window.open(currentSrc, "_blank", "noopener,noreferrer");
      } else if (k === "d") {
        triggerDownload();
      }

      // fullscreen
      if (k === "f") {
        enterFullscreen();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSrc, stepPeriod, stepPage, triggerDownload, enterFullscreen]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-8">
      {/* Top Bar */}
      <header className="w-full sticky top-0 z-30 bg-[#459243] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg md:text-2xl font-semibold leading-tight">
                ASPACBank Balance Sheet 2025
              </h1>
              {selectedOption && (
                <p className="text-white/80 text-xs md:text-sm">
                  As of {selectedOption.label.replace(/\s*\((Q\d)\)/, " ($1)")}
                  {totalPages > 1
                    ? ` — Page ${pageIndex + 1} of ${totalPages}`
                    : ""}
                </p>
              )}
            </div>
          </div>

          {/* Header actions kept minimal – quick actions live in the card below */}
          <div className="flex items-center gap-2"></div>
        </div>
      </header>

      {/* Selector (restyled card) */}
      <div className="w-full max-w-6xl px-4 mt-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-3">
          {/* Left: Reporting period */}
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
              Reporting period
            </div>
            <div className="relative inline-flex">
              <select
                id="period"
                className="appearance-none border rounded-xl pl-3 pr-9 py-2 text-sm md:text-base shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-[#459243]/40 focus:border-[#459243]/60"
                value={selectedAsOf}
                onChange={(e) => {
                  setSelectedAsOf(e.target.value);
                  setPageIndex(0);
                }}
              >
                {options.map((o) => (
                  <option key={o.asOf} value={o.asOf}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </div>

          {/* Middle: Page selector (only when multi-page) */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 md:ml-2">
              <span className="text-xs md:text-sm text-gray-500">Page</span>
              <select
                className="border rounded-xl px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#459243]/40 focus:border-[#459243]/60"
                value={pageIndex}
                onChange={(e) => setPageIndex(Number(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i} value={i}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-400">
                ({pageIndex + 1} / {totalPages})
              </span>
            </div>
          )}

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2 md:ml-auto"></div>
        </div>
      </div>

      {/* Image Viewer */}
      <section
        id="img-container"
        className="w-full max-w-6xl mt-4 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center"
        style={{ minHeight: "min(85vh, calc(100vh - 220px))" }}
      >
        {/* Loading skeleton */}
        {isLoading && !isError && (
          <div className="animate-pulse h-[60vh] md:h-[75vh] w-full bg-gray-200" />
        )}

        {/* Error state */}
        {isError && (
          <div className="p-6 text-center text-sm text-gray-700 w-full">
            <p>{isError}</p>
            <div className="mt-3 flex justify-center gap-2">
              <a
                className="px-3 py-2 rounded-xl bg-[#459243] text-white"
                href={currentSrc}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open current page
              </a>
              <button
                onClick={triggerDownload}
                className="px-3 py-2 rounded-xl border"
              >
                Download current page
              </button>
            </div>
          </div>
        )}

        {/* Image */}
        {!isError && currentSrc && (
          <img
            ref={imgRef}
            src={currentSrc}
            alt={`ASPACBank Balance Sheet ${selectedOption?.label} page ${
              pageIndex + 1
            }`}
            className={`max-w-full h-auto ${isLoading ? "hidden" : "block"}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setIsError(
                "We couldn’t display the image in this browser. You can still open it in a new tab or download it below."
              );
            }}
            onContextMenu={(e) => e.preventDefault()} // ⛔ disables right-click
            draggable={false} // 🚫 prevents dragging the image
          />
        )}
      </section>
    </div>
  );
};

export default AspacBankBalanceSheet;
