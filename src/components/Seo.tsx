import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string; // absolute URL preferred
  jsonLd?: Record<string, any>; // optional JSON-LD
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

    // Open Graph
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
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

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
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

    // JSON-LD
    let ldEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      ldEl = document.createElement("script");
      ldEl.type = "application/ld+json";
      ldEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(ldEl);
    }

    return () => {
      // We usually keep SEO tags when navigating SPA routes,
      // so no cleanup to avoid flicker. Remove JSON-LD script on unmount to prevent duplicates.
      if (ldEl && ldEl.parentNode) ldEl.parentNode.removeChild(ldEl);
    };
  }, [title, description, canonical, ogImage, jsonLd]);

  return null; // nothing to render in the page body
}
