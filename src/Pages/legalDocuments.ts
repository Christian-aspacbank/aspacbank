// Mobile-app-only legal documents. Each one is served on its own subdomain
// (see App.tsx and vercel.json) and its content lives in a JSON file in
// public/legal/. Kept separate from LegalDocumentPage so App.tsx can import
// these without pulling the lazy-loaded page into the main bundle.
export interface LegalDocumentConfig {
  /** Subdomain prefix, e.g. "legal-agreements." for legal-agreements.aspacbank.com */
  hostPrefix: string;
  /** Page path on the subdomain; the JSON is served at `${path}.json` */
  path: string;
  /** JSON file in public/ */
  jsonUrl: string;
  name: string;
}

export const TERMS_DOC: LegalDocumentConfig = {
  hostPrefix: "legal-agreements.",
  path: "/terms-and-conditions",
  jsonUrl: "/legal/terms-and-conditions.json",
  name: "Terms and Conditions",
};

export const PRIVACY_DOC: LegalDocumentConfig = {
  hostPrefix: "privacy-notice.",
  path: "/data-privacy",
  jsonUrl: "/legal/data-privacy.json",
  name: "Data Privacy Notice",
};

export const LEGAL_DOCUMENTS = [TERMS_DOC, PRIVACY_DOC];
