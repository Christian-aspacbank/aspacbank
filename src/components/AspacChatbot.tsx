import React, { useEffect, useRef, useState } from "react";

/**
 * ASPAC Assistant — React floating chatbot (no API)
 * - Brand colors via Tailwind tokens: primary (#459243), aspac-yellow (#ebd839)
 * - Restores history from localStorage
 * - A11y: dialog roles, focus rings, Escape to close
 */

const BRAND = {
  name: "ARBI",
  bankName: "ASPAC Bank",
  // Tailwind tokens should be defined in tailwind.config.js
  // colors: { primary: "#459243", "aspac-yellow": "#ebd839" }
  primaryClass: "bg-primary",
  accentClass: "from-primary to-aspac-yellow",
};

const CONTACTS = {
  email: "customerservice@aspacbank.com",
  phone: "+63-917-127-7796",
  branchLocatorUrl: "/branches",
  loansUrl: "/teachers-loan",
};

// FAQ items
const FAQ_DATA: Array<{ q: string; a: string; tags?: string[] }> = [
  {
    q: "What are your branch hours?",
    a: `We are generally open Mondays through Fridays from 9:00 a.m. to 3:00 p.m., excluding national and local holidays. Our Carcar and N. Bacalso Branches are open on Saturdays from 9:00 a.m. to 2:00 p.m..`,
    tags: ["hours", "schedule", "branches"],
  },
  {
    q: "Where are your branches?",
    a: `See all locations and maps on our <a href="${CONTACTS.branchLocatorUrl}" class="underline">branch locator</a>.`,
    tags: [
      "branches",
      "locations",
      "address",
      "nearest",
      "nearby",
      "map",
      "locator",
    ],
  },
  {
    q: "Do you offer anticipated loans?",
    a: `ASPAC Bank provides a wide range of loan facilities designed to suit your financial needs.
<ul class="list-disc list-inside mt-2 space-y-1">
  <li>Visit the nearest ASPAC Bank branch</li>
  <li>Email us at customerservice@aspacbank.com</li>
  <li>Call us at Tel. No. 512-2724 / Mobile No. 0998-272-2724</li>
</ul>`,
    tags: ["anticipated"],
  },
  {
    q: "What loan products do you offer?",
    a: `We offer Commercial Loan, Real Estate Loan, APDS Teachers Loan, Pension Loan, and other financing options. 
  Learn more on our 
  <a href="https://www.aspacbank.com/loans" target="_blank" rel="noopener noreferrer" class="underline text-primary">
    Loans & Products
  </a>.`,
    tags: ["loans", "products", "msme", "salary", "anticipated"],
  },
  {
    q: "What are the requirements in Teacher's loan?",
    a: `Hi, requirements for APDS Teachers Loan are listed below:
  <ul class="list-disc list-inside mt-2 space-y-1">
    <li>Duly accomplished and signed Loan Application Form</li>
    <li>1 pc. 2x2 colored ID Picture</li>
    <li>Original Permanent Appointment</li>
    <li>Original copy of latest payslip</li>
    <li>Photocopy of DepEd and PRC ID</li>
    <li>Loan Summary from GSIS</li>
  </ul>`,
    tags: ["requirements"],
  },
  {
    q: "Do you offer Teacher's Loan?",
    a: `Thank you for your inquiry. We are pleased to confirm that we offer teacher salary loans.<br/>
  To begin your application, please download the loan application form here: 
  <a href="https://www.aspacbank.com/teachersalary-loanform" target="_blank" class="underline text-primary">
    Teacher Salary Form
  </a>. All required documentation and eligibility requirements are detailed on the second page of the form.`,
    tags: ["APDS", "inquire", "teachers", "teacher's"],
  },
  {
    q: "How to apply Teacher's Loan?",
    a: `
    <ul class="list-none space-y-3 text-left">
      <li><span class="font-semibold">Step 1:</span> Download the Salary Loan Application Form here:  <a href="https://www.aspacbank.com/teachersalary-loanform" target="_blank" class="underline text-primary">
   Teacher Salary Form
  </a>. Prepare the requirements — Application Form, Payslip, Appointment Letter, 2x2 Picture, and Valid IDs.</li>
      <li><span class="font-semibold">Step 2:</span> Submit the requirements to the nearest ASPAC Bank Branch.</li>
      <li><span class="font-semibold">Step 3:</span> Wait for our feedback for the next steps or visit the nearest ASPAC Bank Branch.</li>
    </ul>
  `,
    tags: ["apply", "teacher", "loan", "requirements"],
  },
  { q: "Hi", a: `Hello! How can I help you today?`, tags: ["hi"] },
  { q: " Hello", a: `Hi there! How may I help you?`, tags: ["hello"] },
  {
    q: "Good Evening ",
    a: `Good evening! What can I help you with?`,
    tags: ["gabie", "gavie", "evening"],
  },
  {
    q: "Good Afternoon",
    a: `Good afternoon! How may I assist you?`,
    tags: ["afternoon", "udto"],
  },
  {
    q: "Good Morning",
    a: `Good morning! How can I help you today?`,
    tags: ["morning", "buntag"],
  },
  {
    q: "Thank you",
    a: `My pleasure! Feel free to contact us anytime if you need further support.`,
    tags: ["salamat", "Thank you", "Thanks", "Daghang Salamat"],
  },
  {
    q: "How do I contact customer support?",
    a: `Email us at <a href="mailto:${CONTACTS.email}" class="underline">${CONTACTS.email}</a> or call ${CONTACTS.phone}.`,
    tags: ["contact", "support", "help"],
  },
  {
    q: "Is online banking available?",
    a: `For account services and balance inquiries, please visit our nearest branch while we roll out additional online features.`,
    tags: ["online", "ebanking", "internet banking"],
  },
  {
    q: "How can I talk to a human?",
    a: `You can email <a href="mailto:${CONTACTS.email}" class="underline">${CONTACTS.email}</a> or use our phone/WhatsApp above.`,
    tags: ["agent", "human", "representative"],
  },
];

// ✅ Keep short labels for the UI…
const QUICK_REPLIES = [
  "Branch hours",
  "Nearest branch",
  "Loan products",
  "Teachers Loan",
  "Talk to a human",
  "APDS",
];

// …and map each label to its exact FAQ question
const QUICK_REPLY_MAP: Record<string, string> = {
  "Branch hours": "What are your branch hours?",
  "Nearest branch": "Where are your branches?",
  "Loan products": "What loan products do you offer?",
  "Loan requirements": "What are the basic loan requirements?",
  "Teachers Loan": "What are the requirements in Teacher's loan?",
  "Talk to a human": "How can I talk to a human?",
};

// -------------------------
// 🧠 Tiny matcher (no deps)
// -------------------------
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter(Boolean)
    .filter((t) => t.length > 1);
}
function jaccardScore(a: string, b: string) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  A.forEach((t) => {
    if (B.has(t)) inter++;
  });
  return inter / (A.size + B.size - inter);
}
function prefixBoost(query: string, text: string) {
  const q = tokenize(query);
  const t = tokenize(text);
  let hits = 0;
  for (const qt of q)
    if (t.some((tt) => tt.startsWith(qt) || qt.startsWith(tt))) hits++;
  return (hits / Math.max(1, q.length)) * 0.25;
}
function matchFAQ(query: string) {
  const scores = FAQ_DATA.map((item, idx) => {
    const base = Math.max(
      jaccardScore(query, item.q),
      jaccardScore(query, (item.tags || []).join(" "))
    );
    const bonus = prefixBoost(
      query,
      item.q + " " + (item.tags || []).join(" ")
    );
    return { idx, score: base + bonus };
  });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 3).filter((s) => s.score > 0.15);
  return top.map((s) => FAQ_DATA[s.idx]);
}

// -------------------------
// 🧩 Types
// -------------------------
interface Msg {
  id: string;
  role: "user" | "bot";
  html?: string;
  text?: string;
  ts: number;
}

// -------------------------
// 💬 Component
// -------------------------
export default function AspacChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // restore history
  useEffect(() => {
    try {
      const raw = localStorage.getItem("aspac_chat_history");
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {}
  }, []);

  // persist history
  useEffect(() => {
    try {
      localStorage.setItem("aspac_chat_history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages.length]);

  // Initial greeting
  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      const hello: Msg = {
        id: crypto?.randomUUID?.() ?? `${Date.now()}-seed`,
        role: "bot",
        html: `<p>Hi! this is <b>ARBI</b>, how may I assist you today?</p>`,
        ts: Date.now(),
      };
      setMessages([hello]);
    }
  }, [open, messages.length]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleAsk(raw: string) {
    const text = raw.trim();
    if (!text) return;

    const user: Msg = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}-u`,
      role: "user",
      text,
      ts: Date.now(),
    };

    // exact or fuzzy
    const exact = FAQ_DATA.find(
      (item) => item.q.toLowerCase() === text.toLowerCase()
    );

    let botHtml = "";
    if (exact) {
      botHtml = `<div class="opacity-90">${exact.a}</div>`;
    } else {
      const [best] = matchFAQ(text);
      if (best) {
        botHtml = `<div class="opacity-90">${best.a}</div>`;
      } else {
        botHtml = `I'm not sure yet. You can email <a class="underline" href="mailto:${CONTACTS.email}">${CONTACTS.email}</a> and we'll help right away.`;
      }
    }

    setMessages((prev) => [...prev, user]);

    // typing indicator
    const typing: Msg = {
      id: "typing",
      role: "bot",
      html: `<div class="flex items-center gap-1 py-0.5">
               <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
               <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
               <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
             </div>`,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, typing]);

    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "typing")
          .concat({
            id: crypto?.randomUUID?.() ?? `${Date.now()}-b`,
            role: "bot",
            html: botHtml,
            ts: Date.now(),
          })
      );
    }, 1200);

    setInput("");
  }

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label={open ? "Close ASPAC Assistant" : "Open ASPAC Assistant"}
        onClick={() => setOpen((v) => !v)}
        className="fixed z-40 bottom-4 right-4 transform transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded-full"
      >
        {open ? (
          <div className="bg-white rounded-full p-3 shadow-xl border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-8 h-8 text-gray-700"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <img
            src="/chatbot.png"
            alt="Chat with ASPAC Assistant"
            className="w-40 h-40 object-contain drop-shadow-2xl cursor-pointer"
            onError={(e) => {
              // Fallback to SVG if image fails
              e.currentTarget.outerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Open chat" viewBox="0 0 24 24" class="w-20 h-20 text-primary drop-shadow-2xl cursor-pointer">
            <path fill="currentColor" d="M4.8 21.6c.4.1.8.1 1.2.1 5.3 0 9.7-4 9.7-9s-4.4-9-9.7-9S.1 7.7.1 12.7c0 2.4 1 4.6 2.7 6.2.2.2.3.4.3.5-.1.6-.4 1.2-.8 1.7a.75.75 0 00.5 1.2z"/>
          </svg>`;
            }}
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed z-40 bottom-20 right-4 w-[380px] max-w-[92vw] h-[530px] rounded-2xl shadow-2xl bg-white flex flex-col border border-gray-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="ASPAC Assistant"
        >
          {/* Header */}
          <div
            className={`p-4 text-white bg-gradient-to-r ${BRAND.accentClass}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">{BRAND.bankName}</div>
                <div className="text-xl font-semibold">{BRAND.name}</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow " +
                    (m.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white border border-gray-200 rounded-bl-sm")
                  }
                >
                  {m.role === "bot" && m.html ? (
                    <div dangerouslySetInnerHTML={{ __html: m.html }} />
                  ) : (
                    <span>{m.text}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-3 pt-2 pb-1 bg-gray-50">
              <div className="text-xs mb-2 text-gray-600">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((label) => (
                  <button
                    key={label}
                    onClick={() => handleAsk(QUICK_REPLY_MAP[label] ?? label)}
                    className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
            className="p-3 bg-white border-t border-gray-200"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Message input"
              />
              <button
                type="submit"
                className={`px-3 py-2 rounded-xl text-white shadow focus:outline-none focus:ring-2 focus:ring-primary/40 ${BRAND.primaryClass}`}
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500">
              Tips: "branch hours", "loan requirements", "talk to a human".
            </div>
          </form>
        </div>
      )}
    </>
  );
}
