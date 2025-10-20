import React, { useEffect } from "react";

type JsonLd = Record<string, any>;

type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string; // e.g. "PH"
};

type OrganizationSchemaInput = {
  type?: "Organization" | "BankOrCreditUnion";
  name: string;
  url?: string;
  logo?: string;
  telephone?: string;
  sameAs?: string[];
  address: PostalAddress;
};

type FinancialServiceInput = {
  name: string;
  url: string;
  serviceType?: string;
  areaServed?: string | string[];
  providerName?: string; // defaults to organization.name
};

type BreadcrumbItem = { name: string; url: string };

export type SeoProps = {
  title: string;
  description?: string;
  canonical?: string; // absolute preferred
  ogImage?: string; // absolute preferred
  ogImageAlt?: string;

  // JSON-LD (raw)
  jsonLd?: JsonLd;
  jsonLdList?: JsonLd[];

  // Open Graph
  ogType?: string; // default: "website"
  ogSiteName?: string; // e.g., "ASPAC Bank"
  ogLocale?: string; // e.g., "en_PH"

  // Twitter
  includeTwitter?: boolean;
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string; // e.g., "@aspacbank"
  twitterCreator?: string;

  // Structured data helpers
  organization?: OrganizationSchemaInput;
  services?: FinancialServiceInput[];
  includeWebsiteSchema?: boolean; // emits WebSite with SearchAction
  breadcrumbs?: BreadcrumbItem[];
};

const DATA_ATTR = "data-seo-managed";

function ensureHead() {
  if (typeof document === "undefined") return null as never;
  return document.head;
}

function abs(url?: string) {
  if (!url) return url;
  try {
    return new URL(url).toString();
  } catch {
    if (typeof window !== "undefined" && url.startsWith("/")) {
      return `${window.location.origin}${url}`;
    }
    return url;
  }
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

const Seo: React.FC<SeoProps> = ({
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

  organization,
  services,
  includeWebsiteSchema,
  breadcrumbs,
}) => {
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
        })
      );
    }

    // Canonical (fall back to current URL)
    const effectiveCanonical =
      abs(canonical) ||
      (typeof window !== "undefined" ? window.location.href : undefined);

    if (effectiveCanonical) {
      mark(upsertLinkRel("canonical", String(effectiveCanonical)));
    }

    // Open Graph
    mark(upsertMetaBy("property", "og:type", ogType));
    mark(upsertMetaBy("property", "og:title", title));
    if (description)
      mark(upsertMetaBy("property", "og:description", description));
    if (effectiveCanonical)
      mark(upsertMetaBy("property", "og:url", String(effectiveCanonical)));
    if (ogImage) {
      mark(upsertMetaBy("property", "og:image", abs(ogImage)!));
      if (ogImageAlt)
        mark(upsertMetaBy("property", "og:image:alt", ogImageAlt));
    }
    if (ogSiteName) mark(upsertMetaBy("property", "og:site_name", ogSiteName));
    if (ogLocale) mark(upsertMetaBy("property", "og:locale", ogLocale));

    // Twitter
    if (includeTwitter) {
      mark(upsertMetaBy("name", "twitter:card", twitterCard));
      mark(upsertMetaBy("name", "twitter:title", title));
      if (description)
        mark(upsertMetaBy("name", "twitter:description", description));
      if (ogImage) {
        mark(upsertMetaBy("name", "twitter:image", abs(ogImage)!));
        if (ogImageAlt)
          mark(upsertMetaBy("name", "twitter:image:alt", ogImageAlt));
      }
      if (twitterSite) mark(upsertMetaBy("name", "twitter:site", twitterSite));
      if (twitterCreator)
        mark(upsertMetaBy("name", "twitter:creator", twitterCreator));
    }

    // ---------- JSON-LD ----------
    const blocks: JsonLd[] = [
      ...(jsonLd ? [jsonLd] : []),
      ...(jsonLdList ?? []),
    ];
    const createdScripts: HTMLScriptElement[] = [];

    // Organization / BankOrCreditUnion
    if (organization) {
      const orgType = organization.type ?? "BankOrCreditUnion";
      blocks.push({
        "@context": "https://schema.org",
        "@type": orgType,
        name: organization.name,
        url: abs(organization.url),
        logo: abs(organization.logo),
        telephone: organization.telephone,
        sameAs: organization.sameAs,
        address: { "@type": "PostalAddress", ...organization.address },
      });
    }

    // FinancialService entries
    if (services?.length) {
      services.forEach((svc) => {
        blocks.push({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: svc.name,
          url: abs(svc.url),
          serviceType: svc.serviceType,
          areaServed: svc.areaServed,
          provider: organization
            ? {
                "@type": organization.type ?? "BankOrCreditUnion",
                name: svc.providerName ?? organization.name,
                url: abs(organization.url),
                address: { "@type": "PostalAddress", ...organization.address },
              }
            : undefined,
        });
      });
    }

    // WebSite schema with SearchAction
    if (includeWebsiteSchema) {
      const origin =
        typeof window !== "undefined" ? window.location.origin : undefined;
      if (origin) {
        blocks.push({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: origin,
          name: title,
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        });
      }
    }

    // Breadcrumbs
    if (breadcrumbs?.length) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: abs(b.url),
        })),
      });
    }

    // Emit scripts (declare createdScripts only once)
    if (blocks.length > 0) {
      blocks.forEach((block, i) => {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.text = JSON.stringify(block);
        el.setAttribute("data-seo-jsonld", `block-${i}`);
        el.setAttribute(DATA_ATTR, "1");
        document.head.appendChild(el);
        createdScripts.push(el);
        el.removeAttribute(DATA_ATTR);
      });
    }

    // Cleanup only what we created
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
    organization,
    services,
    includeWebsiteSchema,
    breadcrumbs,
  ]);

  return null;
};

export default Seo;
