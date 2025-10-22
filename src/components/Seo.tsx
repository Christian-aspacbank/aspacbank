import { useEffect } from "react";

type JsonLd = Record<string, any>;

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string; // absolute URL preferred
  ogImage?: string; // absolute URL preferred
  ogImageAlt?: string;

  jsonLd?: JsonLd; // single JSON-LD block
  jsonLdList?: JsonLd[]; // multiple JSON-LD blocks

  // Open Graph options
  ogType?: string; // "website" | "article" | "product" ...
  ogSiteName?: string; // e.g., "ASPAC Bank"
  ogLocale?: string; // e.g., "en_PH"

  // Twitter options (off by default)
  includeTwitter?: boolean; // set true only if you want Twitter tags
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string; // e.g., "@aspacbank"
  twitterCreator?: string;

  // Robots controls
  noindex?: boolean;
  nofollow?: boolean;

  // Icons / PWA / theme
  themeColor?: string; // e.g., "#0a3d62"
  iconHref?: string; // e.g., "https://www.aspacbank.com/favicon.ico"
  appleTouchIconHref?: string; // e.g., "https://www.aspacbank.com/apple-touch-icon.png"
  manifestHref?: string; // e.g., "https://www.aspacbank.com/manifest.json"
};

function ensureHead() {
  if (typeof document === "undefined") return null as never;
  return document.head;
}

function upsertMetaBy(
  keyAttr: "name" | "property",
  keyValue: string,
  content: string
) {
  const head = ensureHead();
  let el = head.querySelector<HTMLMetaElement>(
    `meta[${keyAttr}="${keyValue}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, keyValue);
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
    head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  jsonLd,
  jsonLdList,

  ogType = "website",
  ogSiteName,
  ogLocale,

  includeTwitter = false,
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,

  noindex,
  nofollow,

  themeColor,
  iconHref,
  appleTouchIconHref,
  manifestHref,
}: SeoProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const createdNodes: HTMLElement[] = [];
    function mark<T extends HTMLElement>(el: T) {
      createdNodes.push(el);
      return el;
    }

    // Title
    document.title = title;

    // Description
    if (description) {
      mark(
        upsertMeta('meta[name="description"]', {
          name: "description",
          content: description,
        })
      );
    }

    // Canonical (fallback to current URL if not provided)
    const effectiveCanonical =
      canonical ||
      (typeof window !== "undefined" ? window.location.href : undefined);

    if (effectiveCanonical) {
      mark(upsertLinkRel("canonical", String(effectiveCanonical)));
    }

    // Theme color
    if (themeColor) {
      mark(
        upsertMeta('meta[name="theme-color"]', {
          name: "theme-color",
          content: themeColor,
        })
      );
    }

    // Icons & manifest
    if (iconHref) mark(upsertLinkRel("icon", iconHref));
    if (appleTouchIconHref)
      mark(upsertLinkRel("apple-touch-icon", appleTouchIconHref));
    if (manifestHref) mark(upsertLinkRel("manifest", manifestHref));

    // Robots
    if (noindex || nofollow) {
      const robots = `${noindex ? "noindex" : "index"}, ${
        nofollow ? "nofollow" : "follow"
      }`;
      mark(
        upsertMeta('meta[name="robots"]', { name: "robots", content: robots })
      );
      mark(
        upsertMeta('meta[name="googlebot"]', {
          name: "googlebot",
          content: robots,
        })
      );
    }

    // Open Graph
    mark(upsertMetaBy("property", "og:type", ogType));
    mark(upsertMetaBy("property", "og:title", title));

    if (description) {
      mark(upsertMetaBy("property", "og:description", description));
    }
    if (effectiveCanonical) {
      mark(upsertMetaBy("property", "og:url", String(effectiveCanonical)));
    }
    if (ogImage) {
      mark(upsertMetaBy("property", "og:image", ogImage));
      if (ogImageAlt) {
        mark(upsertMetaBy("property", "og:image:alt", ogImageAlt));
      }
    }
    if (ogSiteName) {
      mark(upsertMetaBy("property", "og:site_name", ogSiteName));
    }
    if (ogLocale) {
      mark(upsertMetaBy("property", "og:locale", ogLocale));
    }

    // Twitter (optional)
    if (includeTwitter) {
      mark(upsertMetaBy("name", "twitter:card", twitterCard));
      mark(upsertMetaBy("name", "twitter:title", title));

      if (description) {
        mark(upsertMetaBy("name", "twitter:description", description));
      }
      if (ogImage) {
        mark(upsertMetaBy("name", "twitter:image", ogImage));
        if (ogImageAlt) {
          mark(upsertMetaBy("name", "twitter:image:alt", ogImageAlt));
        }
      }
      if (twitterSite) {
        mark(upsertMetaBy("name", "twitter:site", twitterSite));
      }
      if (twitterCreator) {
        mark(upsertMetaBy("name", "twitter:creator", twitterCreator));
      }
    }

    // JSON-LD (support single or multiple blocks)
    const blocks: JsonLd[] = [
      ...(jsonLd ? [jsonLd] : []),
      ...(jsonLdList ?? []),
    ];
    const createdScripts: HTMLScriptElement[] = [];

    if (blocks.length > 0) {
      blocks.forEach((block, i) => {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.text = JSON.stringify(block);
        // No custom attributes added to keep HTML clean
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
    jsonLd,
    jsonLdList,
    ogType,
    ogSiteName,
    ogLocale,
    includeTwitter,
    twitterCard,
    twitterSite,
    twitterCreator,
    noindex,
    nofollow,
    themeColor,
    iconHref,
    appleTouchIconHref,
    manifestHref,
  ]);

  return null; // nothing to render in the page body
}
