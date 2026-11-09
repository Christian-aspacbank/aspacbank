"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useModalA11y } from "../hooks/useModalA11y";
import { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "./config/api";
import { IoIosArrowDown } from "react-icons/io";
import AlertDialog from "./AlertDialog";
import TurnstileWidget, { TurnstileHandle } from "./TurnstileWidget";

// Cloudflare Turnstile site key (public). Test key used in development.
const TURNSTILE_SITE_KEY =
  process.env.REACT_APP_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

type Message = {
  type: "user" | "bot";
  text: string;
};

const quickReplies = [
  "Branch hours",
  "Loan products",
  "Branches",
  "Teacher's Loan",
  "Services",
  "Features",
  "Careers",
];

const formatBotAnswer = (answer: string) => {
  return answer
    .replace(/\*\*/g, "")
    .replace(/Q:\s?/g, "")
    .replace(/A:\s?/g, "")
    .trim();
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const panelRef = useModalA11y<HTMLDivElement>(open, () => setOpen(false));
  const [wide, setWide] = useState(false);
  const [showClosedHint, setShowClosedHint] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_URL = (process.env.SERVER_URL || SERVER_URL).replace(/\/+$/, "");

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("chatMessages");
      if (saved) {
        console.log("✅ Loaded chat history from localStorage");
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }

    return [
      {
        type: "bot",
        text: "Hi! I am ARBI, how may I assist you today?",
      },
    ];
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setSessionId(newSessionId);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (open) {
      setShowClosedHint(false);
      return;
    }

    let closeTimer: ReturnType<typeof setTimeout>;

    const showHint = () => {
      setShowClosedHint(true);

      closeTimer = setTimeout(() => {
        setShowClosedHint(false);
      }, 9000);
    };

    const interval = setInterval(showHint, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(closeTimer);
    };
  }, [open]);

  const sendMessage = async (messageText: string) => {
    const userMessage = messageText.trim();
    if (!userMessage || loading) return;

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.success
            ? formatBotAnswer(data.answer)
            : "Sorry, I could not process your request right now.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I am having trouble connecting right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const handleClearChat = async () => {
    try {
      setClearLoading(true);

      const response = await fetch(`${API_URL}/api/chat/session/${sessionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to clear: ${response.status}`);
      }

      localStorage.removeItem("chatMessages");

      setMessages([
        {
          type: "bot",
          text: "Hi! I am ARBI, how may I assist you today?",
        },
      ]);

      const newSessionId = `session-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}`;

      setSessionId(newSessionId);
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Error clearing chat:", error);
    } finally {
      setClearLoading(false);
    }
  };
  return (
    <>
      <AnimatePresence>
        {!open && showClosedHint && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={[
                "fixed z-[9999]",
                "bottom-28 right-4 sm:bottom-32 sm:right-8",
                "max-w-[230px] rounded-tr-2xl rounded-l-2xl rounded-b-2xl rounded-r-none border border-green-100 bg-white px-4 py-3",
                "text-sm font-medium text-slate-700 shadow-2xl",
              ].join(" ")}
            >
              Need help? Ask ARBI about loans, branches, banking hours, and
              services.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 9, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className={[
                "fixed z-[9999]",
                "bottom-20 right-4 sm:bottom-24 sm:right-7",
                "max-w-[20px] rounded-2xl border border-green-100 bg-white px-4 py-2",
                "text-sm font-medium text-slate-700 shadow-2xl",
              ].join(" ")}
            />
          </>
        )}
      </AnimatePresence>
      <div className="fixed z-[9999] bottom-4 right-4 sm:bottom-6 sm:right-6">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close chatbot" : "Open chatbot"}
          className={[
            "relative",
            "flex h-14 w-14 items-center justify-center overflow-hidden rounded-full",
            "text-white shadow-2xl transition-all duration-300",
            "hover:scale-105 active:scale-95 group",
            open ? "bg-white" : "animate-float",
          ].join(" ")}
        >
          <div className="rounded-tr-2xl rounded-l-2xl rounded-b-2xl rounded-r-none border border-purple-500 pointer-events-none absolute bottom-full -left-28 -mb-2 hidden rounded-md bg-purple-900 px-2 py-1 text-[12px] text-white shadow-lg group-hover:block whitespace-nowrap">
            Chat with ARBI 💬
          </div>

          {open ? (
            <span className="text-lg leading-none sm:text-xl text-black">
              ⛌
            </span>
          ) : (
            <img
              src="/arbi-assistant.webp"
              alt="ARBI Assistant"
              width={180}
              height={180}
              className="h-full w-full object-cover"
            />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-panel-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={[
              "fixed z-[9999] flex flex-col overflow-hidden bg-white",
              "shadow-[0_30px_80px_rgba(0,0,0,0.28)]",
              // Mobile: full-screen sheet
              "inset-0 h-[100dvh] w-full rounded-none",
              // Desktop: floating panel
              "sm:inset-auto sm:bottom-4 sm:right-6 sm:rounded-[28px]",
              wide
                ? "sm:right-4 sm:h-[calc(100dvh-2rem)] sm:w-[min(900px,calc(100vw-2rem))]"
                : "sm:h-[600px] sm:max-h-[calc(100dvh-2rem)] sm:w-[400px] sm:max-w-[calc(100vw-2rem)]",
            ].join(" ")}
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#229b15] via-[#28b51b] to-[#38cb2c] px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] text-white sm:px-5 sm:py-5">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-xl" />
              <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />

              <div className="relative flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src="/arbi-assistant.webp"
                    alt="ARBI Assistant"
                    width={48}
                    height={48}
                    className="h-11 w-11 shrink-0 object-cover sm:h-12 sm:w-12"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 id="chatbot-panel-title" className="truncate text-sm font-bold leading-tight sm:text-base">
                        ARBI Assistant
                      </h2>
                      {/* {backendOnline ? (
                      <span className="hidden items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-200" />
                        Online
                      </span>
                    ) : (
                      <span className="hidden items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-800 sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Message
                      </span>
                    )} */}
                      <span className="hidden items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-200" />
                        Online
                      </span>
                    </div>
                    <p className="truncate text-xs text-white/90">
                      ASPAC Bank virtual assistant
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => setWide((prev) => !prev)}
                    aria-label={wide ? "Restore size" : "Expand chatbot"}
                    className="hidden rounded-full px-2 text-2xl pt-0 text-white/90 transition hover:bg-white/15 hover:text-white sm:block"
                  >
                    {wide ? (
                      <p className="pb-0">⿻</p>
                    ) : (
                      <p className="pb-0">⛶</p>
                    )}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chatbot"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 hover:text-white sm:h-9 sm:w-9"
                  >
                    <IoIosArrowDown size={22} />
                  </button>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-b border-green-100 bg-green-50 px-3 py-2 text-center text-[11px] text-green-800 sm:px-4 sm:text-xs">
              Ask about loans, branches, banking hours, and services.
            </div>

            {handoffOpen ? (
              <HandoffForm
                sessionId={sessionId}
                transcript={messages.slice(-10)}
                onBack={() => setHandoffOpen(false)}
              />
            ) : (
              <>
            {/* Messages */}
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-gradient-to-b from-slate-50 via-white to-green-50/70 px-3 py-4 sm:px-4">
              {messages.map((msg, idx) => {
                const isUser = msg.type === "user";

                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={[
                        "px-3.5 py-2.5 text-sm leading-relaxed shadow-sm sm:px-4 sm:py-3",
                        "max-w-[88%] sm:max-w-[82%]",
                        isUser
                          ? "rounded-2xl rounded-br-md bg-gradient-to-br from-[#229b15] to-[#38cb2c] text-white"
                          : "rounded-2xl rounded-bl-md border border-slate-100 bg-white text-slate-700",
                      ].join(" ")}
                    >
                      <MessageText text={msg.text} isUser={isUser} />
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>ARBI is thinking</span>
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="shrink-0 border-t border-slate-100 bg-white px-3 py-3 sm:px-4">
                <div className="mb-2 text-xs font-medium text-slate-500">
                  Quick questions
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => sendMessage(reply)}
                      disabled={loading}
                      className="shrink-0 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:border-green-300 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSend}
              className="shrink-0 border-t border-slate-100 bg-white px-3 pt-3 sm:px-4 sm:pt-4"
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5 transition focus-within:border-green-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ARBI a question..."
                  aria-label="Message ARBI"
                  enterKeyHint="send"
                  autoComplete="off"
                  disabled={loading}
                  className="h-10 min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed sm:text-sm"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={loading || !input.trim()}
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition",
                    loading || !input.trim()
                      ? "cursor-not-allowed bg-slate-300"
                      : "bg-gradient-to-br from-[#229b15] to-[#38cb2c] shadow-md hover:scale-105 active:scale-95",
                  ].join(" ")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.1 15 12 3.4 13.9z" />
                  </svg>
                </button>
              </div>

              <div className="mt-2  mb-2 flex items-start justify-end gap-3">
                
                  <button
                  type="button"
                  onClick={() => setHandoffOpen(true)}
                  className="shrink-0 bg-[#1da710a2] text-white rounded py-1 mt-2 text-[10px] font-medium uppercase px-5  transition hover:text-[#252a00]"
                >
                  Talk to a human
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  disabled={clearLoading}
                  title="Clear chat history"
                  className="shrink-0 bg-[#cad108] text-white rounded py-1 mt-2 text-[10px] font-medium uppercase px-5  transition hover:text-[#f97204]"
                 >
                  {clearLoading ? "Clearing..." : "Clear"}
                </button>
              </div>
              <p className="flex-1 text-[8px] md:text-[10px] leading-snug text-slate-900">
                 ARBI will provide your conversation history to a support team if you have any concerns you'd like to discuss with a human. Your information will be handled according to our privacy policy.
                </p>
            </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AlertDialog
        open={showClearConfirm}
        title="Clear chat history?"
        message="Would you like to clear your chat with ARBI history from this device?"
        icon="🗑️"
        confirmText="Clear"
        cancelText="Cancel"
        loading={loading}
        loadingText="Clearing..."
        onCancel={() => setShowClearConfirm(false)}
        onConfirm={handleClearChat}
      />
    </>
  );
}

function MessageText({ text, isUser }: { text: string; isUser: boolean }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return (
    <div className="space-y-2 break-words">
      {text.split("\n").map((line, lineIndex) => {
        const parts = line.split(urlRegex);

        return (
          <p key={lineIndex} className="m-0 text-sm">
            {parts.map((part, partIndex) => {
              const isUrl = urlRegex.test(part);
              urlRegex.lastIndex = 0;

              if (isUrl) {
                const cleanUrl = part.replace(/[.,)]$/, "");

                return (
                  <a
                    key={partIndex}
                    href={cleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "break-all font-semibold underline underline-offset-2",
                      isUser
                        ? "text-white hover:text-green-100 "
                        : "text-[#229b15] hover:text-[#16750d]",
                    ].join(" ")}
                  >
                    {cleanUrl}
                  </a>
                );
              }

              return <span key={partIndex}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

const handoffTopics = [
  "Loan inquiry",
  "Account concern",
  "Branch / ATM",
  "Complaint",
  "Careers",
  "Other",
];

function HandoffForm({
  sessionId,
  transcript,
  onBack,
}: {
  sessionId: string;
  transcript: Message[];
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState(handoffTopics[0]);
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
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
      const res = await fetch("/api/handoff", {
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
          transcript,
          website: honeypot,
          turnstileToken,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "failed");
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "failed" && err.message !== "Failed to fetch"
          ? err.message
          : "We could not send your request. Please try again or contact ASPAC Bank directly.",
      );
    } finally {
      // Turnstile tokens are single-use
      turnstileRef.current?.reset();
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-white px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-[#229b15]">
          ✓
        </div>
        <h3 className="text-base font-bold text-slate-800">Request sent</h3>
        <p className="text-sm text-slate-500">
          A bank representative will reach out via your{" "}
          {method === "phone" ? "phone number" : "email"} during banking hours.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 rounded-full bg-gradient-to-br from-[#229b15] to-[#38cb2c] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Talk to a human</h3>
          <p className="mt-1 text-xs text-slate-500">
            Leave your details and a representative will contact you. Your
            recent chat is shared so you do not have to repeat yourself.
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
          <div className="mb-2 grid grid-cols-2 gap-1 md:rounded-full bg-slate-100 mp-1">
            {(["phone", "email"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMethod(m);
                  setContact("");
                }}
                className={[
                  "md:rounded-full py-2.5 text-xs font-semibold transition",
                  method === m ? "bg-white text-[#229b15] shadow-sm" : "text-slate-500",
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
            placeholder={method === "phone" ? "09XX XXX XXXX" : "you@example.com"}
            className={fieldClass}
          />
        </div>

        <label className="block">
          <span className={labelClass}>Topic</span>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className={fieldClass}>
            {handoffTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>How can we help?</span>
          <textarea
            required
            rows={3}
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

        <label className="flex items-start gap-2 text-[11px] leading-snug text-slate-500 sm:text-xs">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#229b15]"
          />
          <span>
            I agree to ASPAC Bank collecting my details and this chat to respond to
            my request, per its Data Privacy Notice.
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
          <p className="text-xs text-red-600">Security check is not configured.</p>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
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
          {submitting ? "Sending..." : "Request a call back"}
        </button>
      </div>
    </form>
  );
}
