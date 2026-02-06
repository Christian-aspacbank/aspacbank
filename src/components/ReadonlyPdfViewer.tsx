import React, { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// ✅ CDN worker (stable)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

type Props = {
  pdfUrl: string;
  containerHeight?: number;
  maxPageWidth?: number; // desktop cap
  scale?: number; // base scale cap (desktop only)
};

export default function ReadonlyPdfViewer({
  pdfUrl,
  containerHeight = 1050,
  maxPageWidth = 980, // ✅ wider desktop default
  scale = 1.25,
}: Props) {
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const safeUrl = useMemo(() => encodeURI(pdfUrl), [pdfUrl]);
  const canvases = useMemo(
    () => Array.from({ length: pageCount }),
    [pageCount],
  );

  // ✅ detect mobile width
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setPageCount(0);
      canvasRefs.current = [];

      try {
        const task = pdfjsLib.getDocument({ url: safeUrl } as any);
        const pdf = await task.promise;
        if (cancelled) return;

        setPageCount(pdf.numPages);

        // wait canvases mount
        await new Promise((r) => setTimeout(r, 0));

        // ✅ smaller outer padding => less “gray”
        const containerPadding = isMobile ? 8 : 16;

        // ✅ allow wider pages on desktop (980 default)
        const availableWidth = Math.max(
          320,
          Math.min(window.innerWidth - containerPadding * 2, maxPageWidth),
        );

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNum);

          const base = page.getViewport({ scale: 1 });
          const fitScale = availableWidth / base.width;

          // ✅ mobile: always fit-to-width (readable)
          // ✅ desktop: fit-to-width but cap by scale
          const finalScale = isMobile ? fitScale : Math.min(scale, fitScale);

          const viewport = page.getViewport({ scale: finalScale });

          const canvas = canvasRefs.current[pageNum - 1];
          if (!canvas) continue;

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [safeUrl, maxPageWidth, scale, isMobile]);

  return (
    <div
      className="w-full overflow-auto rounded-2xl bg-slate-50/60" // ✅ subtle outer
      style={{ height: containerHeight }}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      <div className={isMobile ? "p-2" : "p-3"}>
        <div className="flex flex-col items-center gap-4">
          {loading && <div className="text-sm text-gray-600">Loading PDF…</div>}

          {canvases.map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/70 shadow-md rounded-lg overflow-hidden" // ✅ emphasize page
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : maxPageWidth,
              }}
            >
              <canvas
                ref={(el) => {
                  canvasRefs.current[idx] = el;
                }}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
