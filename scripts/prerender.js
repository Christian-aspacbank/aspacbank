/**
 * Post-build SEO prerender.
 *
 * This app is a client-side-rendered CRA/craco SPA: the initial HTML served
 * to crawlers is just the generic shell (build/index.html) until React
 * mounts and the <Seo> component patches in the per-route title/description/
 * canonical/JSON-LD via useEffect. That's a real handicap for ranking on
 * specific route keywords (e.g. "teachers loan"), since it depends on the
 * crawler executing JS and waiting for it to settle.
 *
 * This script runs after `craco build` (see package.json "postbuild"). For
 * every route listed in build/sitemap.xml, it boots a throwaway static
 * server over build/, loads the route in headless Chromium, waits for the
 * client app to render (and for <Seo> to patch the <head>), and writes the
 * fully-populated HTML to build/<route>/index.html. Vercel serves static
 * files before applying vercel.json rewrites, so these prerendered files
 * are picked up automatically with no deploy config changes.
 *
 * The live client bundle is untouched (still ReactDOM.createRoot(...).render
 * in src/index.tsx, not hydrateRoot), so on load the browser briefly shows
 * the prerendered markup and then React replaces it with the normal client
 * render — no hydration-mismatch risk.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");

const BUILD_DIR = path.join(__dirname, "..", "build");
const SITEMAP_PATH = path.join(BUILD_DIR, "sitemap.xml");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
  ".map": "application/json; charset=utf-8",
};

function readRoutesFromSitemap() {
  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  const paths = locs
    .map((loc) => {
      try {
        return new URL(loc).pathname;
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .map((p) => (p === "" ? "/" : p));

  return Array.from(new Set(paths));
}

function startStaticServer(indexHtmlTemplate) {
  const server = http.createServer((req, res) => {
    const requestPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(BUILD_DIR, requestPath);

    const isWithinBuildDir = filePath.startsWith(BUILD_DIR);
    const exists =
      isWithinBuildDir && fs.existsSync(filePath) && fs.statSync(filePath).isFile();

    if (exists) {
      const ext = path.extname(filePath);
      res.writeHead(200, {
        "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback — same intent as the vercel.json catch-all rewrite.
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(indexHtmlTemplate);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function prerenderRoute(browser, baseUrl, routePath) {
  const page = await browser.newPage();
  try {
    await page.goto(`${baseUrl}${routePath}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // <Seo> patches <head> via useEffect right after mount; networkidle0
    // already waits out any async work, this is just a small safety margin.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const html = await page.content();
    return html;
  } finally {
    await page.close();
  }
}

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn("[prerender] build/sitemap.xml not found, skipping prerender.");
    return;
  }

  const indexHtmlTemplate = fs.readFileSync(
    path.join(BUILD_DIR, "index.html"),
    "utf8",
  );
  const routes = readRoutesFromSitemap();

  const server = await startStaticServer(indexHtmlTemplate);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const routePath of routes) {
      try {
        const html = await prerenderRoute(browser, baseUrl, routePath);
        const outDir =
          routePath === "/" ? BUILD_DIR : path.join(BUILD_DIR, routePath);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html);
        console.log(`[prerender] wrote ${routePath}`);
      } catch (error) {
        console.error(`[prerender] failed for ${routePath}:`, error.message);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error("[prerender] fatal error:", error);
  process.exitCode = 1;
});
