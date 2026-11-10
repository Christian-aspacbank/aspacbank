"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useModalA11y } from "../hooks/useModalA11y";
import { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "./config/api";
import { IoIosArrowDown } from "react-icons/io";
import AlertDialog from "./AlertDialog";
import HandoffForm, { HandoffSession } from "./HandoffForm";
import HumanChat from "./HumanChat";

const HANDOFF_STORAGE_KEY = "handoffSession";

const loadHandoff = (): HandoffSession | null => {
  try {
    const raw = localStorage.getItem(HANDOFF_STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s?.id && s?.token ? s : null;
  } catch {
    return null;
  }
};

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
  // "ai" = ARBI, "form" = fill details, "chat" = live chat with a human
  const [humanView, setHumanView] = useState<"ai" | "form" | "chat">("ai");
  const [handoff, setHandoff] = useState<HandoffSession | null>(loadHandoff);

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

  const startHumanChat = (session: HandoffSession) => {
    try {
      localStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(session));
    } catch {
      /* private mode: chat still works until the page is closed */
    }
    setHandoff(session);
    setHumanView("chat");
  };

  const finishHumanChat = () => {
    try {
      localStorage.removeItem(HANDOFF_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setHandoff(null);
    setHumanView("ai");
  };

  const inAi = humanView === "ai";

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
                        {humanView === "ai" ? "ARBI Assistant" : "Live Support"}
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
                      {humanView === "ai"
                        ? "ASPAC Bank virtual assistant"
                        : "Chat with an ASPAC Bank representative"}
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

            {inAi && (
              <div className="shrink-0 border-b border-green-100 bg-green-50 px-3 py-2 text-center text-[11px] text-green-800 sm:px-4 sm:text-xs">
                Ask about loans, branches, banking hours, and services.
              </div>
            )}

            {humanView === "form" && (
              <HandoffForm
                apiUrl={API_URL}
                sessionId={sessionId}
                onBack={() => setHumanView("ai")}
                onCreated={startHumanChat}
              />
            )}

            {humanView === "chat" && handoff && (
              <HumanChat
                apiUrl={API_URL}
                session={handoff}
                onBackToBot={() => setHumanView("ai")}
                onFinished={finishHumanChat}
              />
            )}

            {inAi && (
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
                  onClick={() =>
                    setHumanView(handoff ? "chat" : "form")
                  }
                  className="shrink-0 bg-[#1da710a2] text-white rounded py-1 mt-2 text-[10px] font-medium uppercase px-5  transition hover:text-[#252a00]"
                >
                  {handoff ? "Return to live chat" : "Talk to a human"}
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
                 Need a person? Tap "Talk to a human" to chat live with our team. Your conversation with ARBI stays private and is not shared with them. Your details are handled according to our privacy policy.
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
