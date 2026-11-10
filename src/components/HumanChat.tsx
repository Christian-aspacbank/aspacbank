import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AlertDialog from "./AlertDialog";
import type { HandoffSession } from "./HandoffForm";

type Status = "waiting" | "active" | "closed";

type HumanMessage = {
  id: number;
  sender: "customer" | "agent" | "system";
  text: string;
  createdAt: string;
};

const POLL_MS = 3000;

export default function HumanChat({
  apiUrl,
  session,
  onBackToBot,
  onFinished,
}: {
  apiUrl: string;
  session: HandoffSession;
  /** Leave the live chat screen but keep the session so the customer can return. */
  onBackToBot: () => void;
  /** The chat is over: forget the session. */
  onFinished: () => void;
}) {
  const [messages, setMessages] = useState<HumanMessage[]>([]);
  const [status, setStatus] = useState<Status>("waiting");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [ending, setEnding] = useState(false);

  const lastIdRef = useRef(0);
  const endRef = useRef<HTMLDivElement | null>(null);
  const base = `${apiUrl}/api/handoff/${encodeURIComponent(session.id)}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Handoff-Token": session.token,
  };

  const merge = useCallback((incoming: HumanMessage[]) => {
    if (!incoming.length) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m.id));
      const fresh = incoming.filter((m) => !seen.has(m.id));
      return fresh.length ? [...prev, ...fresh] : prev;
    });
    lastIdRef.current = Math.max(
      lastIdRef.current,
      ...incoming.map((m) => m.id),
    );
  }, []);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`${base}/messages?after=${lastIdRef.current}`, {
        headers,
      });
      if (res.status === 404) {
        // Session no longer exists (or token invalid): nothing to resume.
        setStatus("closed");
        setError("This chat is no longer available.");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setError("");
      merge(data.messages as HumanMessage[]);
      setStatus(data.status as Status);
    } catch {
      setError("Connection problem. Retrying...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, session.token, merge]);

  useEffect(() => {
    poll();
    if (status === "closed") return;
    const timer = setInterval(() => {
      if (!document.hidden) poll();
    }, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [poll, status]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || status === "closed") return;
    setSending(true);
    try {
      const res = await fetch(`${base}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) setStatus("closed");
        throw new Error(data?.message || "Could not send your message.");
      }
      setInput("");
      setError("");
      merge([data.message as HumanMessage]);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Could not send your message. Check your connection.",
      );
    } finally {
      setSending(false);
    }
  };

  const endChat = async () => {
    setEnding(true);
    try {
      await fetch(`${base}/close`, { method: "POST", headers });
    } catch {
      /* the session expires on its own; still let the customer leave */
    }
    setEnding(false);
    setShowEndConfirm(false);
    await poll();
  };

  const closed = status === "closed";

  return (
    <>
      {/* Status banner */}
      <div
        className={[
          "shrink-0 border-b px-3 py-2 text-center text-[11px] sm:px-4 sm:text-xs",
          status === "active"
            ? "border-green-100 bg-green-50 text-green-800"
            : closed
              ? "border-slate-200 bg-slate-100 text-slate-600"
              : "border-amber-100 bg-amber-50 text-amber-800",
        ].join(" ")}
      >
        {status === "active" && "You are chatting with an ASPAC Bank representative."}
        {status === "waiting" && "Request received. Waiting for a representative to join..."}
        {closed && "This chat has ended."}
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-gradient-to-b from-slate-50 via-white to-green-50/70 px-3 py-4 sm:px-4">
        {status === "waiting" && (
          <div className="mx-auto max-w-[92%] rounded-2xl border border-amber-100 bg-white px-4 py-4 text-center shadow-sm">
            <div className="mb-2 flex justify-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Thanks, {session.name.split(" ")[0]}. We have notified our team.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Please keep this window open. A representative will join as soon
              as one is available. You can also type more details below.
            </p>
          </div>
        )}

        {messages.map((m) => {
          if (m.sender === "system") {
            return (
              <div
                key={m.id}
                className="text-center text-[11px] text-slate-400"
              >
                {m.text}
              </div>
            );
          }
          const mine = m.sender === "customer";
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={[
                  "max-w-[88%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[82%] sm:px-4 sm:py-3",
                  mine
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-[#229b15] to-[#38cb2c] text-white"
                    : "rounded-2xl rounded-bl-md border border-slate-100 bg-white text-slate-700",
                ].join(" ")}
              >
                {!mine && (
                  <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#229b15]">
                    ASPAC representative
                  </div>
                )}
                {m.text}
              </div>
            </div>
          );
        })}

        {closed && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onFinished}
              className="rounded-full bg-gradient-to-br from-[#229b15] to-[#38cb2c] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
            >
              Back to ARBI
            </button>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={send}
        className="shrink-0 border-t border-slate-100 bg-white px-3 pt-3 sm:px-4"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {error && (
          <p role="alert" className="mb-2 text-center text-[11px] text-red-600">
            {error}
          </p>
        )}
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5 transition focus-within:border-green-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={closed ? "This chat has ended" : "Type your message..."}
            aria-label="Message the representative"
            enterKeyHint="send"
            autoComplete="off"
            maxLength={1000}
            disabled={closed}
            className="h-10 min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed sm:text-sm"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={closed || sending || !input.trim()}
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition",
              closed || sending || !input.trim()
                ? "cursor-not-allowed bg-slate-300"
                : "bg-gradient-to-br from-[#229b15] to-[#38cb2c] shadow-md hover:scale-105 active:scale-95",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.1 15 12 3.4 13.9z" />
            </svg>
          </button>
        </div>

        {!closed && (
          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToBot}
              className="rounded px-1 py-1 text-[11px] font-medium text-slate-500 transition hover:text-slate-800"
            >
              ← Back to ARBI
            </button>
            <button
              type="button"
              onClick={() => setShowEndConfirm(true)}
              className="rounded px-1 py-1 text-[11px] font-medium uppercase text-red-600 transition hover:text-red-500"
            >
              End chat
            </button>
          </div>
        )}
      </form>

      {createPortal(
      <AlertDialog
        open={showEndConfirm}
        title="End this chat?"
        message="This will end your live chat with the representative."
        icon="💬"
        confirmText="End chat"
        cancelText="Keep chatting"
        loading={ending}
        loadingText="Ending..."
        onCancel={() => setShowEndConfirm(false)}
        onConfirm={endChat}
      />,
        document.body,
      )}
    </>
  );
}
