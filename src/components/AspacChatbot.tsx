import React, { useEffect, useRef, useState } from "react";

/**
 * ASPAC Assistant — React floating chatbot (no API)
 */

// -------------------------
// 🔧 Configuration
// -------------------------
const BRAND = {
  name: "ARBI",
  bankName: "ASPAC Bank",
  primary: "#229b15",
  accent: "#38cb2c",
};

const CONTACTS = {
  email: "customerservice@aspacbank.com",
  phone: "+63-000-000-0000",
  branchLocatorUrl: "/branches",
  loansUrl: "/WelcomePage",
};

// FAQ items
const FAQ_DATA: Array<{ q: string; a: string; tags?: string[] }> = [
  {
    q: "What are your branch hours?",
    a: `We are generally open Mondays through Fridays at 9:00AM to 3:00PM except for Carcar Branches that operate on Saturdays where we operate on Saturdays at 9:00 to 3:00PM excluding national and local holidays.`,
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

For complete details on available loan options and requirements, you may:
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
  <a href="https://www.aspacbank.com/loans" target="_blank" rel="noopener noreferrer" class="underline text-green-700">
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
  <a href="https://www.aspacbank.com/teachersalary-loanform" target="_blank" class="underline text-green-700">
    Teacher Salary Form
  </a>. All required documentation and eligibility requirements are detailed on the second page of the form.`,
    tags: ["APDS", "inquire", "teachers", "teacher's"],
  },
  {
    q: "How to apply Teacher's Loan?",
    a: `
    <ul class="list-none space-y-3 text-left">
      <li><span class="font-semibold">Step 1:</span> Download the Salary Loan Application Form here:  <a href="https://www.aspacbank.com/teachersalary-loanform" target="_blank" class="underline text-green-700">
   Teacher Salary Form
  </a>. Prepare the requirements — Application Form, Payslip, Appointment Letter, 2x2 Picture, and Valid IDs.</li>
      <li><span class="font-semibold">Step 2:</span> Submit the requirements to the nearest ASPAC Bank Branch.</li>
      <li><span class="font-semibold">Step 3:</span> Wait for our feedback for the next steps or visit the nearest ASPAC Bank Branch.</li>
    </ul>
  `,
    tags: ["apply", "teacher", "loan", "requirements"],
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

  useEffect(() => {
    try {
      localStorage.setItem("aspac_chat_history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Initial greeting
  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      const hello: Msg = {
        id: crypto.randomUUID(),
        role: "bot",
        html: `<p>Hi! this is <b>ARBI</b>, how may I assist you today?</p>`,
        ts: Date.now(),
      };
      setMessages([hello]);
    }
  }, [open]);

  function handleAsk(raw: string) {
    const text = raw.trim();
    if (!text) return;

    const user: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      ts: Date.now(),
    };

    // Build the final HTML for the bot reply (exact match first, else best fuzzy)
    const exact = FAQ_DATA.find(
      (item) => item.q.toLowerCase() === text.toLowerCase()
    );

    let botHtml = "";
    if (exact) {
      // ⬇️ Only show the answer
      botHtml = `<div class="opacity-90">${exact.a}</div>`;
    } else {
      const [best] = matchFAQ(text);
      if (best) {
        // ⬇️ Only show the answer
        botHtml = `<div class="opacity-90">${best.a}</div>`;
      } else {
        botHtml = `I'm not sure yet. You can email <a class="underline" href="mailto:${CONTACTS.email}">${CONTACTS.email}</a> and we'll help right away.`;
      }
    }

    // Add user message immediately
    setMessages((prev) => [...prev, user]);

    // Add typing indicator bubble (Messenger-style 3 dots)
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

    // After 2s, replace typing indicator with the real reply
    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "typing")
          .concat({
            id: crypto.randomUUID(),
            role: "bot",
            html: botHtml,
            ts: Date.now(),
          })
      );
    }, 2000);

    setInput("");
  }

  const headerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
  };

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open ASPAC Assistant"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-40 bottom-4 right-4 transform transition-transform duration-300 ease-in-out hover:scale-110"
      >
        {open ? (
          // Close icon with background (needs background for visibility)
          <div className="bg-white rounded-full p-3 shadow-xl border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
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
          // Your chatbot image without background - just drop shadow
          <img
            src="/chatbot.png"
            alt="Chat with us"
            className="w-24 h-24 object-contain drop-shadow-2xl cursor-pointer"
            onError={(e) => {
              console.log("Image failed to load, using fallback");
              // Fallback to SVG if image fails
              e.currentTarget.outerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-blue-600 drop-shadow-2xl cursor-pointer">
            <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" clip-rule="evenodd" />
          </svg>
        `;
            }}
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed z-40 bottom-20 right-4 w-[380px] max-w-[92vw] h-[530px] rounded-2xl shadow-2xl bg-white flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 text-white" style={headerStyle}>
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
                      ? "bg-green-600 text-white rounded-br-sm"
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

          {/* Quick Replies (short labels) */}
          {messages.length <= 1 && (
            <div className="px-3 pt-2 pb-1 bg-gray-50">
              <div className="text-xs mb-2 text-gray-600">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((label) => (
                  <button
                    key={label}
                    // 🔗 Map short label → exact FAQ question
                    onClick={() => handleAsk(QUICK_REPLY_MAP[label] ?? label)}
                    className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
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
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl text-white shadow"
                style={{ backgroundColor: BRAND.primary }}
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
