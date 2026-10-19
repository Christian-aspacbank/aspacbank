import React, { useEffect, useState } from "react";
import Seo from "../components/Seo";

import type { LegalDocumentConfig } from "./legalDocuments";

// Mobile-app-only legal document view (Terms and Conditions, Data Privacy
// Notice). Not linked anywhere on the website; the ASPAC mobile banking app
// loads these URLs inside its own modal WebView. Content comes from a JSON
// file in public/legal/, which the app can also fetch directly to compare
// `version` for re-acceptance.

type TermsBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] };

interface TermsSection {
  id: string;
  heading?: string;
  blocks: TermsBlock[];
}

interface TermsDocument {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  title: string;
  intro?: string;
  sections: TermsSection[];
}

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; doc: TermsDocument };

const LegalDocumentPage: React.FC<{ doc: LegalDocumentConfig }> = ({
  doc: { jsonUrl, name },
}) => {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    fetch(jsonUrl, { cache: "no-cache", signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<TermsDocument>;
      })
      .then((doc) => setState({ status: "ready", doc }))
      .catch((err) => {
        if (err?.name !== "AbortError") setState({ status: "error" });
      });

    return () => controller.abort();
  }, [jsonUrl, attempt]);

  return (
    <>
      <Seo
        title={`${name} | ASPAC Bank Mobile Banking`}
        noindex
        nofollow
      />

      <div className="min-h-screen bg-white px-4 py-5 text-gray-800">
        {state.status === "loading" && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <span className="text-sm text-gray-500">
              Loading {name}…
            </span>
          </div>
        )}

        {state.status === "error" && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-gray-600">
              Unable to load the {name}. Please check your connection and
              try again.
            </p>
            <button
              type="button"
              onClick={() => setAttempt((n) => n + 1)}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && (
          <article className="mx-auto max-w-2xl">
            <h1 className="text-xl font-bold text-primary">
              {state.doc.title}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Version {state.doc.version} · Effective {state.doc.effectiveDate}{" "}
              · Last updated {state.doc.lastUpdated}
            </p>

            {state.doc.intro && (
              <p className="mt-4 text-sm leading-relaxed">{state.doc.intro}</p>
            )}

            {state.doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-6">
                {section.heading && (
                  <h2 className="text-base font-semibold text-gray-900">
                    {section.heading}
                  </h2>
                )}
                {section.blocks.map((block, i) => {
                  if (block.type === "p") {
                    return (
                      <p key={i} className="mt-2 text-sm leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "ul") {
                    return (
                      <ul
                        key={i}
                        className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed"
                      >
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <div key={i} className="mt-3 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            {block.columns.map((col, j) => (
                              <th
                                key={j}
                                scope="col"
                                className="border border-gray-300 px-2 py-1.5 font-semibold"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, r) => (
                            <tr key={r}>
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className="border border-gray-300 px-2 py-1.5 align-top"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </section>
            ))}
          </article>
        )}
      </div>
    </>
  );
};

export default LegalDocumentPage;
