import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// ✅ CDN worker (stable)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

type Props = {
  pdfUrl: string;
  containerHeight?: number;
  maxPageWidth?: number; // desktop cap
  scale?: number; // base scale cap (desktop only)
  title?: string; // accessible name for the rendered document
};

type PageSize = { width: number; height: number };

export default function ReadonlyPdfViewer({
  pdfUrl,
  containerHeight = 1050,
  maxPageWidth = 980, // ✅ wider desktop default
  scale = 1.25,
  title = "PDF document preview",
}: Props) {
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());
  const [pageSizes, setPageSizes] = useState<Record<number, PageSize>>({});

  const pdfDocRef = useRef<any>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const pageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const renderingRef = useRef<Set<number>>(new Set());
  const isMountedRef = useRef(true);

  const safeUrl = useMemo(() => encodeURI(pdfUrl), [pdfUrl]);
  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i + 1),
    [pageCount],
  );

  // ✅ detect mobile width
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ load document metadata only — page content is fetched/rendered lazily below
  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    setPageCount(0);
    setRenderedPages(new Set());
    setPageSizes({});
    canvasRefs.current = [];
    pageContainerRefs.current = [];
    renderingRef.current = new Set();
    pdfDocRef.current = null;

    // ✅ range requests let the viewer fetch only the pages it actually renders
    const task = pdfjsLib.getDocument({
      url: safeUrl,
      disableAutoFetch: true,
      disableStream: false,
    } as any);

    task.promise.then((pdf: any) => {
      if (!isMountedRef.current) return;
      pdfDocRef.current = pdf;
      setPageCount(pdf.numPages);
      setLoading(false);
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [safeUrl]);

  const renderPage = useCallback(
    async (pageNum: number) => {
      const pdf = pdfDocRef.current;
      if (!pdf || renderingRef.current.has(pageNum)) return;
      renderingRef.current.add(pageNum);

      try {
        const page = await pdf.getPage(pageNum);
        if (!isMountedRef.current) return;

        const base = page.getViewport({ scale: 1 });
        const containerPadding = isMobile ? 8 : 16;
        const availableWidth = Math.max(
          320,
          Math.min(window.innerWidth - containerPadding * 2, maxPageWidth),
        );
        const fitScale = availableWidth / base.width;
        const finalScale = isMobile ? fitScale : Math.min(scale, fitScale);
        const viewport = page.getViewport({ scale: finalScale });

        setPageSizes((prev) => ({
          ...prev,
          [pageNum]: { width: viewport.width, height: viewport.height },
        }));

        // wait for the canvas to mount at its measured size
        await new Promise((r) => setTimeout(r, 0));
        if (!isMountedRef.current) return;

        const canvas = canvasRefs.current[pageNum - 1];
        if (!canvas) {
          renderingRef.current.delete(pageNum);
          return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!isMountedRef.current) return;

        page.cleanup?.();
        setRenderedPages((prev) => {
          const next = new Set(prev);
          next.add(pageNum);
          return next;
        });
      } catch {
        renderingRef.current.delete(pageNum);
      }
    },
    [isMobile, maxPageWidth, scale],
  );

  // ✅ only render pages once they're near the viewport, instead of all at once
  useEffect(() => {
    if (!pageCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const pageNum = Number(
            (entry.target as HTMLElement).dataset.page || 0,
          );
          if (pageNum > 0) {
            renderPage(pageNum);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "800px 0px", threshold: 0.01 },
    );

    pageContainerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pageCount, renderPage]);

  return (
    <div
      className="w-full overflow-auto rounded-2xl bg-slate-50/60" // ✅ subtle outer
      style={{ height: containerHeight }}
      role="document"
      aria-label={title}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      <div className={isMobile ? "p-2" : "p-3"}>
        <div className="flex flex-col items-center gap-4">
          {loading && <div className="text-sm text-gray-600">Loading PDF…</div>}

          {pages.map((pageNum) => {
            const size = pageSizes[pageNum];
            const isRendered = renderedPages.has(pageNum);

            return (
              <div
                key={pageNum}
                data-page={pageNum}
                ref={(el) => {
                  pageContainerRefs.current[pageNum - 1] = el;
                }}
                className="bg-white border border-gray-200/70 shadow-md rounded-lg overflow-hidden" // ✅ emphasize page
                style={{
                  width: "100%",
                  maxWidth: isMobile ? "100%" : maxPageWidth,
                }}
              >
                {!isRendered && (
                  <div
                    className="flex items-center justify-center text-xs text-gray-400"
                    style={{ height: size ? size.height : 400 }}
                  >
                    Page {pageNum}
                  </div>
                )}
                <canvas
                  ref={(el) => {
                    canvasRefs.current[pageNum - 1] = el;
                  }}
                  role="img"
                  aria-label={`${title} — page ${pageNum} of ${pageCount}`}
                  style={{
                    display: isRendered ? "block" : "none",
                    width: "100%",
                    height: "auto",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
