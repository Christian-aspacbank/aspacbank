import React, { useRef, useState } from "react";
import TurnstileWidget, { TurnstileHandle } from "./TurnstileWidget";

// Cloudflare Turnstile site key (public). Test key used in development.
const TURNSTILE_SITE_KEY =
  process.env.REACT_APP_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

export type HandoffSession = {
  id: string;
  token: string;
  name: string;
  contact: string;
};

const handoffTopics = [
  "Loan inquiry",
  "Account concern",
  "Branch / ATM",
  "Complaint",
  "Careers",
  "Other",
];

export default function HandoffForm({
  apiUrl,
  sessionId,
  onBack,
  onCreated,
}: {
  apiUrl: string;
  sessionId: string;
  onBack: () => void;
  onCreated: (session: HandoffSession) => void;
}) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState(handoffTopics[0]);
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100 sm:text-sm";
  const labelClass = "mb-1 block text-xs font-medium text-slate-600";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the security check first.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${apiUrl}/api/handoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: name.trim(),
          contactMethod: method,
          contact: contact.trim(),
          topic,
          details: details.trim(),
          consent,
          website: honeypot,
          turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.id || !data?.token) {
        throw new Error(data?.message || "failed");
      }
      onCreated({
        id: data.id,
        token: data.token,
        name: name.trim(),
        contact: contact.trim(),
      });
    } catch (err) {
      setError(
        err instanceof Error &&
          err.message !== "failed" &&
          err.message !== "Failed to fetch"
          ? err.message
          : "We could not start the chat. Please try again or contact ASPAC Bank directly.",
      );
      // Turnstile tokens are single-use
      turnstileRef.current?.reset();
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-1 flex-col bg-white"
    >
      <div className="relative min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Talk to a human
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            <b>
              Fill in your details to start a live chat with an ASPAC Bank
              representative.
            </b>{" "}
            Your chat with ARBI is private. Our team is available Monday–Friday,
            9:00 AM–5:00 PM. Outside these hours, we will follow up with you on
            the next business day.
          </p>
        </div>

        <label className="block">
          <span className={labelClass}>Full name</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            className={fieldClass}
          />
        </label>

        <div>
          <span className={labelClass}>How should we reach you?</span>
          <div className="mb-2 grid grid-cols-2 gap-1 rounded-full bg-slate-100 p-1">
            {(["phone", "email"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMethod(m);
                  setContact("");
                }}
                className={[
                  "rounded-full py-2.5 text-xs font-semibold transition",
                  method === m
                    ? "bg-white text-[#229b15] shadow-sm"
                    : "text-slate-500",
                ].join(" ")}
              >
                {m === "phone" ? "Phone" : "Email"}
              </button>
            ))}
          </div>
          <input
            key={method}
            type={method === "phone" ? "tel" : "email"}
            inputMode={method === "phone" ? "tel" : "email"}
            autoComplete={method === "phone" ? "tel" : "email"}
            aria-label={method === "phone" ? "Phone number" : "Email address"}
            required
            minLength={method === "phone" ? 7 : undefined}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={
              method === "phone" ? "09XX XXX XXXX" : "you@example.com"
            }
            className={fieldClass}
          />
        </div>

        <label className="block">
          <span className={labelClass}>Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={fieldClass}
          >
            {handoffTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>How can we help?</span>
          <textarea
            required
            rows={4}
            maxLength={500}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Briefly describe your concern..."
            className={fieldClass + " resize-none"}
          />
          <span className="mt-1 block text-right text-[10px] text-slate-400">
            {details.length}/500
          </span>
        </label>
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
          >
            {error}
          </p>
        )}
        <label className="flex items-start gap-2 text-[11px] leading-snug text-slate-500 sm:text-xs">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#229b15]"
          />
          <span>
            I agree to ASPAC Bank collecting my details and this chat to respond
            to my request, per its Data Privacy Notice.
          </span>
        </label>

        {/* honeypot: hidden from people, bots fill it */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {TURNSTILE_SITE_KEY ? (
          <TurnstileWidget
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            size="compact"
            onToken={setTurnstileToken}
          />
        ) : (
          <p className="text-xs text-red-600">
            Security check is not configured.
          </p>
        )}
      </div>

      <div
        className="flex shrink-0 gap-2 border-t border-slate-100 px-4 pt-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex-1 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-600"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting || !turnstileToken}
          className="flex-[2] rounded-full bg-gradient-to-br from-[#229b15] to-[#38cb2c] py-3 text-sm font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Connecting..." : "Start live chat"}
        </button>
      </div>
    </form>
  );
}
