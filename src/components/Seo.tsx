import { useEffect } from "react";

type JsonLd = Record<string, any>;

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string; // absolute URL preferred
  ogImage?: string; // absolute URL preferred
  jsonLd?: JsonLd; // single JSON-LD block
  jsonLdList?: JsonLd[]; // multiple JSON-LD blocks

  // Open Graph options
  ogType?: string; // e.g., "website" | "article" | "product"
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
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLinkRel(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
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
}: SeoProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Description
    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
    }

    // Canonical
    if (canonical) {
      upsertLinkRel("canonical", canonical);
    }

    // Robots
    if (noindex || nofollow) {
      const robots = `${noindex ? "noindex" : "index"}, ${
        nofollow ? "nofollow" : "follow"
      }`;
      upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
      upsertMeta('meta[name="googlebot"]', {
        name: "googlebot",
        content: robots,
      });
    }

    // Open Graph
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: ogType,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    if (description) {
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
    }
    if (canonical) {
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: canonical,
      });
    }
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: ogImage,
      });
    }
    if (ogSiteName) {
      upsertMeta('meta[property="og:site_name"]', {
        property: "og:site_name",
        content: ogSiteName,
      });
    }
    if (ogLocale) {
      upsertMeta('meta[property="og:locale"]', {
        property: "og:locale",
        content: ogLocale,
      });
    }

    // Twitter (optional)
    if (includeTwitter) {
      upsertMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: twitterCard,
      });
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: title,
      });
      if (description) {
        upsertMeta('meta[name="twitter:description"]', {
          name: "twitter:description",
          content: description,
        });
      }
      if (ogImage) {
        upsertMeta('meta[name="twitter:image"]', {
          name: "twitter:image",
          content: ogImage,
        });
      }
      if (twitterSite) {
        upsertMeta('meta[name="twitter:site"]', {
          name: "twitter:site",
          content: twitterSite,
        });
      }
      if (twitterCreator) {
        upsertMeta('meta[name="twitter:creator"]', {
          name: "twitter:creator",
          content: twitterCreator,
        });
      }
    }

    // JSON-LD (support single or multiple blocks)
    const createdScripts: HTMLScriptElement[] = [];
    const blocks: JsonLd[] = [
      ...(jsonLd ? [jsonLd] : []),
      ...(jsonLdList ?? []),
    ];

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

    // Cleanup only the JSON-LD scripts we created on this render
    return () => {
      createdScripts.forEach((s) => s.parentNode?.removeChild(s));
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
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
  ]);

  return null; // nothing to render in the page body
}
