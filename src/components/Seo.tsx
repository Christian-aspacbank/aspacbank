import { useEffect } from "react";

type JsonLd = Record<string, any>;

type HrefLang = {
  href: string; // absolute URL
  hrefLang: string; // e.g., "en-PH" or "x-default"
};

type OgImage = {
  url: string; // absolute URL
  alt?: string;
  width?: number;
  height?: number;
};

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string; // absolute URL preferred (auto-absolute if relative)
  // Legacy single OG image (kept for compatibility)
  ogImage?: string;
  ogImageAlt?: string;
  // New: richer OG image list
  ogImages?: OgImage[];

  // JSON-LD
  jsonLd?: JsonLd;
  jsonLdList?: JsonLd[]; // merged with jsonLd
  autoWebPageJsonLd?: boolean; // default true

  // Open Graph options
  ogType?: string; // "website" | "article" | "product" ...
  ogTitle?: string; // social-specific title
  ogDescription?: string; // social-specific description
  ogSiteName?: string;
  ogLocale?: string;
  ogUpdatedTimeFromLastModified?: boolean; // default true

  // Twitter options (off by default)
  includeTwitter?: boolean;
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;

  // Robots controls
  noindex?: boolean;
  nofollow?: boolean;
  // Advanced robots (Google & general)
  indexIfEmbedded?: boolean;
  noarchive?: boolean;
  notranslate?: boolean;
  maxSnippet?: number | "none";
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number | "none";

  // Hreflang alternates
  hrefLangs?: HrefLang[];

  // Icons / PWA / theme
  themeColor?: string;
  iconHref?: string;
  appleTouchIconHref?: string;
  manifestHref?: string;
};

const DATA_ATTR = "data-seo-managed";

function ensureHead() {
  if (typeof document === "undefined") return null as never;
  return document.head;
}

function upsertMetaBy(
  keyAttr: "name" | "property",
  keyValue: string,
  content: string,
) {
  const head = ensureHead();
  let el = head.querySelector<HTMLMetaElement>(
    `meta[${keyAttr}="${keyValue}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, keyValue);
    el.setAttribute(DATA_ATTR, "1");
    head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  const head = ensureHead();
  let el = head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(DATA_ATTR, "1");
    head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  return el;
}

function upsertLinkRel(rel: string, href: string) {
  const head = ensureHead();
  let el = head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(DATA_ATTR, "1");
    head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

function toAbsoluteUrl(url?: string) {
  if (!url) return url;
  try {
    // If already absolute, this will pass; otherwise we resolve against location
    return new URL(url, window.location.origin).toString();
  } catch {
    return url; // fall back silently
  }
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  ogImages,

  jsonLd,
  jsonLdList,
  autoWebPageJsonLd = true,

  ogType = "website",
  ogTitle,
  ogDescription,
  ogSiteName,
  ogLocale,
  ogUpdatedTimeFromLastModified = true,

  includeTwitter = false,
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,

  noindex,
  nofollow,
  indexIfEmbedded,
  noarchive,
  notranslate,
  maxSnippet,
  maxImagePreview,
  maxVideoPreview,

  hrefLangs,

  themeColor,
  iconHref,
  appleTouchIconHref,
  manifestHref,
}: SeoProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const createdNodes: HTMLElement[] = [];

    const mark = <T extends HTMLElement>(el: T) => {
      if (el.getAttribute(DATA_ATTR) === "1") {
        createdNodes.push(el);
        el.removeAttribute(DATA_ATTR);
      }
      return el;
    };

    // Title
    document.title = title;

    // Description
    if (description) {
      mark(
        upsertMeta('meta[name="description"]', {
          name: "description",
          content: description,
        }),
      );
    }

    // Canonical (absolute; fallback to current URL)
    const effectiveCanonical =
      toAbsoluteUrl(
        canonical ||
          (typeof window !== "undefined" ? window.location.href : undefined),
      ) ?? undefined;

    if (effectiveCanonical) {
      mark(upsertLinkRel("canonical", String(effectiveCanonical)));
    }

    // Hreflang alternates
    if (hrefLangs?.length) {
      hrefLangs.forEach(({ href, hrefLang }) => {
        const head = ensureHead();
        let el = head.querySelector<HTMLLinkElement>(
          `link[rel="alternate"][href="${href}"][hreflang="${hrefLang}"]`,
        );
        if (!el) {
          el = document.createElement("link");
          el.setAttribute("rel", "alternate");
          el.setAttribute("hreflang", hrefLang);
          el.setAttribute("href", href);
          el.setAttribute(DATA_ATTR, "1");
          head.appendChild(el);
          createdNodes.push(el);
          el.removeAttribute(DATA_ATTR);
        }
      });
    }

    // Theme color
    if (themeColor) {
      mark(
        upsertMeta('meta[name="theme-color"]', {
          name: "theme-color",
          content: themeColor,
        }),
      );
    }

    // Icons & manifest
    if (iconHref) mark(upsertLinkRel("icon", iconHref));
    if (appleTouchIconHref)
      mark(upsertLinkRel("apple-touch-icon", appleTouchIconHref));
    if (manifestHref) mark(upsertLinkRel("manifest", manifestHref));

    // Robots (basic)
    if (noindex || nofollow) {
      const robots = `${noindex ? "noindex" : "index"}, ${
        nofollow ? "nofollow" : "follow"
      }`;
      mark(
        upsertMeta('meta[name="robots"]', { name: "robots", content: robots }),
      );
      mark(
        upsertMeta('meta[name="googlebot"]', {
          name: "googlebot",
          content: robots,
        }),
      );
      mark(
        upsertMeta('meta[name="bingbot"]', {
          name: "bingbot",
          content: robots,
        }),
      );
    }

    // Robots (advanced signals)
    const advancedDirectives: string[] = [];
    if (indexIfEmbedded) advancedDirectives.push("indexifembedded");
    if (noarchive) advancedDirectives.push("noarchive");
    if (notranslate) advancedDirectives.push("notranslate");
    if (typeof maxSnippet !== "undefined")
      advancedDirectives.push(
        maxSnippet === "none" ? "nosnippet" : `max-snippet:${maxSnippet}`,
      );
    if (maxImagePreview)
      advancedDirectives.push(`max-image-preview:${maxImagePreview}`);
    if (typeof maxVideoPreview !== "undefined")
      advancedDirectives.push(
        maxVideoPreview === "none"
          ? "max-video-preview:0"
          : `max-video-preview:${maxVideoPreview}`,
      );

    if (advancedDirectives.length) {
      const content = advancedDirectives.join(", ");
      mark(
        upsertMeta('meta[name="googlebot"]', { name: "googlebot", content }),
      );
      mark(upsertMeta('meta[name="robots"]', { name: "robots", content }));
    }

    // Open Graph (allow social-specific title/desc)
    const ogTitleFinal = ogTitle || title;
    const ogDescFinal = ogDescription || description;

    mark(upsertMetaBy("property", "og:type", ogType));
    mark(upsertMetaBy("property", "og:title", ogTitleFinal));
    if (ogDescFinal)
      mark(upsertMetaBy("property", "og:description", ogDescFinal));
    if (effectiveCanonical)
      mark(upsertMetaBy("property", "og:url", String(effectiveCanonical)));
    if (ogSiteName) mark(upsertMetaBy("property", "og:site_name", ogSiteName));
    if (ogLocale) mark(upsertMetaBy("property", "og:locale", ogLocale));

    // OG images (multiple supported)
    const images: OgImage[] = (
      ogImages && ogImages.length
        ? ogImages
        : ogImage
          ? [{ url: ogImage, alt: ogImageAlt }]
          : []
    ) as OgImage[];

    images.forEach((img, idx) => {
      const base = idx === 0 ? "og:image" : `og:image:${idx}`;
      mark(upsertMetaBy("property", base, img.url));
      if (img.alt) mark(upsertMetaBy("property", `${base}:alt`, img.alt));
      if (img.width)
        mark(upsertMetaBy("property", `${base}:width`, String(img.width)));
      if (img.height)
        mark(upsertMetaBy("property", `${base}:height`, String(img.height)));
    });

    // og:updated_time from document lastModified (optional)
    if (
      ogUpdatedTimeFromLastModified &&
      typeof document.lastModified === "string"
    ) {
      const dt = new Date(document.lastModified);
      if (!isNaN(dt.getTime())) {
        mark(upsertMetaBy("property", "og:updated_time", dt.toISOString()));
      }
    }

    // Twitter
    if (includeTwitter) {
      mark(upsertMetaBy("name", "twitter:card", twitterCard));
      mark(upsertMetaBy("name", "twitter:title", ogTitleFinal));
      if (ogDescFinal)
        mark(upsertMetaBy("name", "twitter:description", ogDescFinal));
      if (images[0]?.url) {
        mark(upsertMetaBy("name", "twitter:image", images[0].url));
        if (images[0]?.alt)
          mark(upsertMetaBy("name", "twitter:image:alt", images[0].alt!));
      }
      if (twitterSite) mark(upsertMetaBy("name", "twitter:site", twitterSite));
      if (twitterCreator)
        mark(upsertMetaBy("name", "twitter:creator", twitterCreator));
    }

    // JSON-LD (single or multiple blocks + optional auto WebPage)
    const blocks: JsonLd[] = [
      ...(jsonLd ? [jsonLd] : []),
      ...(jsonLdList ?? []),
    ];

    if (autoWebPageJsonLd) {
      const webpageLd: JsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: description,
        url: effectiveCanonical,
        inLanguage: ogLocale,
        dateModified: new Date(
          document.lastModified || Date.now(),
        ).toISOString(),
      };
      blocks.unshift(webpageLd);
    }

    const createdScripts: HTMLScriptElement[] = [];
    if (blocks.length > 0) {
      blocks.forEach((block, i) => {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.text = JSON.stringify(block);
        el.setAttribute("data-seo-jsonld", `block-${i}`);
        document.head.appendChild(el);
        createdScripts.push(el);
      });
    }

    // Cleanup only nodes we created this render
    return () => {
      createdScripts.forEach((s) => s.parentNode?.removeChild(s));
      createdNodes.forEach((n) => n.parentNode?.removeChild(n));
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    JSON.stringify(ogImages),
    JSON.stringify(jsonLd),
    JSON.stringify(jsonLdList),
    autoWebPageJsonLd,
    ogType,
    ogTitle,
    ogDescription,
    ogSiteName,
    ogLocale,
    includeTwitter,
    twitterCard,
    twitterSite,
    twitterCreator,
    noindex,
    nofollow,
    indexIfEmbedded,
    noarchive,
    notranslate,
    maxSnippet,
    maxImagePreview,
    maxVideoPreview,
    JSON.stringify(hrefLangs),
    themeColor,
    iconHref,
    appleTouchIconHref,
    manifestHref,
    ogUpdatedTimeFromLastModified,
  ]);

  return null;
}
