// /api/handoff.js
// "Talk to a human" requests from the chatbot. Verifies Cloudflare Turnstile,
// rate-limits per IP, then emails the request MAIL_FROM -> HANDOFF_MAIL_TO
// (falls back to MAIL_TO) through Microsoft Graph, same as /api/submit.
const { Redis } = require("@upstash/redis");

const TOPICS = new Set([
  "Loan inquiry",
  "Account concern",
  "Branch / ATM",
  "Complaint",
  "Careers",
  "Other",
]);

// ---------- origin allowlist ----------
const ALLOWED_ORIGINS = new Set([
  "https://www.aspacbank.com",
  "https://aspacbank.com",
]);

function isAllowedOrigin(originOrReferer) {
  if (!originOrReferer) return false;
  try {
    const { origin, hostname } = new URL(originOrReferer);
    if (ALLOWED_ORIGINS.has(origin)) return true;
    if (hostname.endsWith(".vercel.app")) return true;
    if (
      process.env.NODE_ENV !== "production" &&
      (hostname === "localhost" || hostname === "127.0.0.1")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ---------- rate limit (Redis when configured, else per-instance memory) ----------
const WINDOW_SEC = 10 * 60;
const WINDOW_MAX = 5; // 5 requests / 10 minutes / IP
const BURST_SEC = 3;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const memory = new Map();

function getClientIp(req) {
  const xff = String(req.headers["x-forwarded-for"] || "");
  return (
    xff.split(",")[0].trim() || req.socket?.remoteAddress || "unknown"
  );
}

async function rateLimit(ip) {
  if (redis) {
    try {
      const burstKey = `handoff:burst:${ip}`;
      const windowKey = `handoff:window:${ip}`;
      const burst = await redis.incr(burstKey);
      if (burst === 1) await redis.expire(burstKey, BURST_SEC);
      if (burst > 1) return { ok: false, retryAfterSec: BURST_SEC };
      const win = await redis.incr(windowKey);
      if (win === 1) await redis.expire(windowKey, WINDOW_SEC);
      if (win > WINDOW_MAX) {
        const ttl = await redis.ttl(windowKey);
        return { ok: false, retryAfterSec: Math.max(1, ttl) };
      }
      return { ok: true };
    } catch (err) {
      console.error("handoff redis rate limit failed, using memory:", err);
    }
  }
  const now = Date.now();
  const hits = (memory.get(ip) || []).filter((t) => now - t < WINDOW_SEC * 1000);
  if (hits.length && now - hits[hits.length - 1] < BURST_SEC * 1000) {
    return { ok: false, retryAfterSec: BURST_SEC };
  }
  if (hits.length >= WINDOW_MAX) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((WINDOW_SEC * 1000 - (now - hits[0])) / 1000)),
    };
  }
  hits.push(now);
  memory.set(ip, hits);
  if (memory.size > 5000) memory.clear();
  return { ok: true };
}

// ---------- Cloudflare Turnstile ----------
async function verifyTurnstile(token, ip) {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV !== "production"
      ? "1x0000000000000000000000000000000AA"
      : "");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return false;
  }
  if (!token || typeof token !== "string" || token.length > 2048) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") params.append("remoteip", ip);

  try {
    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: params }
    );
    const data = await resp.json().catch(() => ({}));
    return data?.success === true;
  } catch (err) {
    console.error("Turnstile verify failed:", err);
    return false;
  }
}

// ---------- helpers ----------
const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const clean = (v, max) => String(v ?? "").trim().slice(0, max);
// strip CR/LF so values can never inject mail headers
const safeHeader = (s, max = 200) =>
  String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e);

// accepts 09XXXXXXXXX, +639XXXXXXXXX, 639XXXXXXXXX
function normalizePhone(raw) {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("63")) d = "0" + d.slice(2);
  return /^0[1-9]\d{9}$/.test(d) ? d : "";
}

async function getAccessToken() {
  const { AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET } = process.env;
  if (!AZURE_TENANT_ID || !AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET) {
    throw new Error("Missing Azure env vars.");
  }
  const resp = await fetch(
    `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: AZURE_CLIENT_ID,
        client_secret: AZURE_CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "https://graph.microsoft.com/.default",
      }).toString(),
    }
  );
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data?.error_description || "Failed to get token");
  return data.access_token;
}

function buildHtml(p) {
  const row = (k, v) =>
    `<tr><td style="padding:3px 0;width:150px;"><b>${k}:</b></td><td style="padding:3px 0;">${escapeHtml(v) || "-"}</td></tr>`;

  const chat = p.transcript.length
    ? p.transcript
        .map(
          (m) =>
            `<div style="margin:6px 0;"><b>${m.type === "user" ? "Customer" : "ARBI"}:</b> ${escapeHtml(m.text).replace(/\n/g, "<br/>")}</div>`
        )
        .join("")
    : "<i>No chat history.</i>";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;padding:18px;">
    <div style="font-size:24px;font-weight:900;margin:2px 0 4px;">NEW CHATBOT HANDOFF REQUEST</div>
    <div style="font-size:13px;color:#444;margin:0 0 12px;">A customer asked to talk to a human via the ARBI chatbot.</div>
    <div style="height:1px;background:#d0d0d0;margin:12px 0 16px;"></div>
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:14px;">
      ${row("Name", p.name)}
      ${row(p.method === "email" ? "Email" : "Phone", p.contact)}
      ${row("Topic", p.topic)}
      ${row("Submitted At", p.submittedAt)}
      ${row("Session", p.sessionId)}
    </table>
    <div style="margin:18px 0 8px;font-size:17px;font-weight:900;">Concern</div>
    <div style="font-size:14px;line-height:1.5;padding:12px;border:1px solid #e5e5e5;border-radius:8px;background:#fafafa;">
      ${escapeHtml(p.details).replace(/\n/g, "<br/>")}
    </div>
    <div style="margin:18px 0 8px;font-size:17px;font-weight:900;">Recent chat</div>
    <div style="font-size:13px;line-height:1.5;padding:12px;border:1px solid #e5e5e5;border-radius:8px;">${chat}</div>
    <div style="height:1px;background:#d0d0d0;margin:18px 0 10px;"></div>
    <div style="font-size:12px;color:#666;">Automated notification from the ASPAC Bank website chatbot.</div>
  </div>`.trim();
}

// ---------- handler ----------
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    if (!isAllowedOrigin(req.headers.origin || req.headers.referer)) {
      return res.status(403).json({ message: "Request not allowed." });
    }

    const ip = getClientIp(req);

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = null;
      }
    }
    if (!body || typeof body !== "object") {
      return res.status(400).json({ message: "Invalid request." });
    }

    // honeypot: pretend success
    if (clean(body.website, 80)) return res.status(200).json({ ok: true });

    if (!(await verifyTurnstile(clean(body.turnstileToken, 2048), ip))) {
      return res.status(403).json({
        message: "Security check failed. Please refresh and try again.",
      });
    }

    const method = body.contactMethod === "email" ? "email" : "phone";
    const name = clean(body.name, 120);
    const topic = TOPICS.has(body.topic) ? body.topic : "Other";
    const details = clean(body.details, 500);
    const sessionId = clean(body.sessionId, 80).replace(/[^\w-]/g, "");

    if (name.length < 2) {
      return res.status(400).json({ message: "Please enter your full name." });
    }
    if (body.consent !== true) {
      return res.status(400).json({ message: "Consent is required." });
    }
    if (details.length < 5) {
      return res.status(400).json({ message: "Please describe your concern." });
    }

    let contact;
    if (method === "email") {
      contact = clean(body.contact, 160).toLowerCase();
      if (!isValidEmail(contact)) {
        return res.status(400).json({ message: "Invalid email address." });
      }
    } else {
      contact = normalizePhone(body.contact);
      if (!contact) {
        return res.status(400).json({
          message: "Invalid mobile number. Use 11 digits, e.g. 09XX XXX XXXX.",
        });
      }
    }

    const transcript = (Array.isArray(body.transcript) ? body.transcript : [])
      .slice(-10)
      .filter((m) => m && (m.type === "user" || m.type === "bot"))
      .map((m) => ({ type: m.type, text: clean(m.text, 1000) }));

    const from = safeHeader(process.env.MAIL_HUMAN || "no-reply@aspacbank.com");
    const to = safeHeader(process.env.MAIL_HUMAN || process.env.MAIL_HUMAN || "");
    if (!isValidEmail(from) || !isValidEmail(to)) {
      console.error("handoff: MAIL_HUMAN missing or invalid.");
      return res.status(500).json({ message: "Submission failed." });
    }

    // Rate limit only requests that passed Turnstile + validation, so typos
    // and failed attempts don't use up a real person's quota.
    const rl = await rateLimit(ip);
    if (!rl.ok) {
      res.setHeader("Retry-After", String(rl.retryAfterSec));
      return res.status(429).json({
        message: `Too many requests. Please try again in ${rl.retryAfterSec} seconds.`,
      });
    }

    const html = buildHtml({
      name,
      method,
      contact,
      topic,
      details,
      sessionId,
      transcript,
      submittedAt: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
    });

    const accessToken = await getAccessToken();

    const sendResp = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: safeHeader(`Chatbot Handoff - ${topic} - ${name}`, 150),
            body: { contentType: "HTML", content: html },
            toRecipients: [{ emailAddress: { address: to } }],
            ...(method === "email"
              ? { replyTo: [{ emailAddress: { address: contact } }] }
              : {}),
          },
          saveToSentItems: true,
        }),
      }
    );

    if (!sendResp.ok) {
      console.error("handoff sendMail failed:", await sendResp.text());
      return res.status(500).json({ message: "Submission failed." });
    }

    console.log("Handoff sent:", { topic, method });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("handoff error:", err);
    return res.status(500).json({ message: "Submission failed." });
  }
};
