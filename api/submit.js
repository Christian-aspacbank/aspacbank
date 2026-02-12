// /api/submit.js
const { IncomingForm } = require("formidable");
const fs = require("fs");

// ---------- simple in-memory rate limit (per IP) ----------
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 2; // ✅ max 2 submits / 10 minutes
const BURST_WINDOW_MS = 2 * 1000; // 2 seconds
const BURST_MAX = 1; // ✅ max 1 submit / 5 seconds


const ipBuckets = new Map();

function getClientIp(req) {
  const xff = String(req.headers["x-forwarded-for"] || "");
  const ipFromXff = xff.split(",")[0].trim();
  return (
    ipFromXff ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function rateLimitCheck(req) {
  const ip = getClientIp(req);
  const now = Date.now();

  const bucket = ipBuckets.get(ip) || { hits: [], burst: [] };

  bucket.hits = bucket.hits.filter((t) => now - t < RATE_WINDOW_MS);
  bucket.burst = bucket.burst.filter((t) => now - t < BURST_WINDOW_MS);

  if (bucket.burst.length >= BURST_MAX) {
    ipBuckets.set(ip, bucket);
    return {
      ok: false,
      reason: "burst",
      retryAfterSec: Math.max(
        1,
        Math.ceil((BURST_WINDOW_MS - (now - bucket.burst[0])) / 1000)
      ),
    };
  }

  if (bucket.hits.length >= RATE_MAX) {
    ipBuckets.set(ip, bucket);
    return {
      ok: false,
      reason: "window",
      retryAfterSec: Math.max(
        1,
        Math.ceil((RATE_WINDOW_MS - (now - bucket.hits[0])) / 1000)
      ),
    };
  }

  bucket.hits.push(now);
  bucket.burst.push(now);
  ipBuckets.set(ip, bucket);

  // lightweight cleanup (optional)
  if (ipBuckets.size > 5000) {
    const cutoff = now - RATE_WINDOW_MS * 2;
    for (const [k, v] of ipBuckets.entries()) {
      const latest = Math.max(
        v.hits?.[v.hits.length - 1] || 0,
        v.burst?.[v.burst.length - 1] || 0
      );
      if (latest < cutoff) ipBuckets.delete(k);
    }
  }

  return { ok: true, reason: null, retryAfterSec: 0 };
}



// ---------- helpers ----------
const escapeHtml = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatNumber = (value) => {
  const n = Number(String(value ?? "").replace(/,/g, ""));
  if (!Number.isFinite(n)) return String(value ?? "");
  return n.toLocaleString("en-US");
};

// prevent header injection (CRLF)
const safeHeader = (s, max = 200) =>
  String(s ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

// basic text cleanup with max length
const cleanText = (v, maxLen = 200) => {
  const val = Array.isArray(v) ? v[0] : v;
  return String(val ?? "").trim().slice(0, maxLen);
};

const normalizeEmail = (email) => cleanText(email, 160).toLowerCase();
const normalizeMobile = (mobile) => cleanText(mobile, 40).replace(/\D/g, "");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

// 11 digits, starts with 01–09
const isValidMobilePH = (m) => /^0[1-9]\d{9}$/.test(m);


// numeric parse for loan amount
function parseAmount(v) {
  const raw = String(v ?? "").replace(/,/g, "").trim();
  if (!raw) return NaN;
  const n = Number(raw);
  return Number.isFinite(n) ? n : NaN;
}

const ALLOWED_TERMS = new Set(["6", "12", "18", "24", "36", "48", "60"]);

// filename sanitize
function safeFilename(name) {
  const n = String(name ?? "attachment").trim();
  // keep letters/numbers/space/._- only
  const cleaned = n.replace(/[^a-zA-Z0-9 ._-]/g, "_").slice(0, 120);
  return cleaned || "attachment";
}

// magic bytes (signature) check
function detectFileKind(buf) {
  if (!buf || buf.length < 8) return null;

  // PDF: %PDF
  if (buf.slice(0, 4).toString("ascii") === "%PDF") return "pdf";

  // JPG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.slice(0, 8).equals(pngSig)) return "png";

  return null;
}

function kindToMime(kind) {
  if (kind === "pdf") return "application/pdf";
  if (kind === "jpg") return "image/jpeg";
  if (kind === "png") return "image/png";
  return "application/octet-stream";
}

async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Missing Azure env vars (AZURE_TENANT_ID / AZURE_CLIENT_ID / AZURE_CLIENT_SECRET)."
    );
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("grant_type", "client_credentials");
  params.append("scope", "https://graph.microsoft.com/.default");

  const resp = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data?.error_description || "Failed to get token");

  return data.access_token;
}

// ---------- email builders ----------
function buildHtmlEmail(payload, attachmentMeta) {
  const ref = escapeHtml(payload.referenceNo || "N/A");
  const name = escapeHtml(payload.fullName || "-");
  const email = escapeHtml(payload.email || "-");
  const mobile = escapeHtml(payload.mobile || "-");
  const school = escapeHtml(payload.school || "-");
  const division = escapeHtml(payload.division || "-");
  const station = escapeHtml(payload.station || "-");

  const loanAmount = escapeHtml(formatNumber(payload.loanAmount || "-"));
  const termMonths = escapeHtml(payload.termMonths || "-");
  const submittedAt = escapeHtml(payload.submittedAt || "-");
  const remarks = escapeHtml(payload.remarks || "-").replace(/\n/g, "<br/>");

  const attachmentBlock = attachmentMeta?.name
    ? `
      <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Attachment</div>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
        <tr>
          <td style="padding:3px 0; width:170px;"><b>File Name:</b></td>
          <td style="padding:3px 0;">${escapeHtml(attachmentMeta.name)}</td>
        </tr>
        <tr>
          <td style="padding:3px 0;"><b>File Type:</b></td>
          <td style="padding:3px 0;">${escapeHtml(attachmentMeta.type || "-")}</td>
        </tr>
        <tr>
          <td style="padding:3px 0;"><b>File Size:</b></td>
          <td style="padding:3px 0;">${escapeHtml(attachmentMeta.size || "-")}</td>
        </tr>
      </table>
    `
    : "";

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#111; background:#ffffff; padding:18px;">
    <div style="font-size:26px; font-weight:900; letter-spacing:.3px; color:#111; margin:2px 0 4px;">
      NEW APDS LOAN APPLICATION
    </div>
    <div style="font-size:13px; color:#444; margin:0 0 12px;">
      A new APDS Loan Application has been submitted. Please review the details below.
    </div>

    <div style="height:1px; background:#d0d0d0; margin:12px 0 16px;"></div>

    <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr><td style="padding:3px 0; width:170px;"><b>Reference No:</b></td><td style="padding:3px 0;">${ref}</td></tr>
      <tr><td style="padding:3px 0;"><b>Applicant Name:</b></td><td style="padding:3px 0;">${name}</td></tr>
      <tr><td style="padding:3px 0;"><b>Submitted At:</b></td><td style="padding:3px 0;">${submittedAt}</td></tr>
    </table>

    <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Applicant Details</div>
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr><td style="padding:3px 0; width:170px;"><b>Email:</b></td><td style="padding:3px 0;">${email}</td></tr>
      <tr><td style="padding:3px 0;"><b>Mobile Number:</b></td><td style="padding:3px 0;">${mobile}</td></tr>
      <tr><td style="padding:3px 0;"><b>School/Office:</b></td><td style="padding:3px 0;">${school}</td></tr>
      <tr><td style="padding:3px 0;"><b>Division:</b></td><td style="padding:3px 0;">${division}</td></tr>
      <tr><td style="padding:3px 0;"><b>Station:</b></td><td style="padding:3px 0;">${station}</td></tr>
    </table>

    <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Loan Request</div>
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr><td style="padding:3px 0; width:170px;"><b>Loan Amount (PHP):</b></td><td style="padding:3px 0;">${loanAmount}</td></tr>
      <tr><td style="padding:3px 0;"><b>Desired Term (Months):</b></td><td style="padding:3px 0;">${termMonths}</td></tr>
    </table>

    ${attachmentBlock}

    <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Remarks</div>
    <div style="font-size:14px; line-height:1.5; padding:12px 12px; border:1px solid #e5e5e5; border-radius:8px; background:#fafafa;">
      ${remarks}
    </div>

    <div style="height:1px; background:#d0d0d0; margin:18px 0 10px;"></div>
    <div style="font-size:12px; color:#666;">
      This is an automated notification from ASPAC Bank website form.
    </div>
  </div>
  `.trim();
}

function buildTextEmail(payload) {
  return `
NEW APDS LOAN APPLICATION

Reference No: ${payload.referenceNo || "N/A"}
Applicant Name: ${payload.fullName || "-"}
Submitted At: ${payload.submittedAt || "-"}

Applicant Details
Email: ${payload.email || "-"}
Mobile Number: ${payload.mobile || "-"}
School/Office: ${payload.school || "-"}
Division: ${payload.division || "-"}
Station: ${payload.station || "-"}

Loan Request
Loan Amount (PHP): ${formatNumber(payload.loanAmount || "-")}
Desired Term (Months): ${payload.termMonths || "-"}

Remarks
${payload.remarks || "-"}
`.trim();
}

// ---------- handler ----------
const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

        // ✅ rate limit BEFORE parsing multipart (spam protection)
    const rl = rateLimitCheck(req);
if (!rl.ok) {
  res.setHeader("Retry-After", String(rl.retryAfterSec || 5));
  return res.status(429).json({
    message: rl.reason === "burst"
      ? `Too many requests. Please wait ${rl.retryAfterSec || 5} seconds then try again.`
      : `Too many submissions. Please try again later (wait ${rl.retryAfterSec || 5} seconds).`,
  });
}



    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,

        // upload hard limits
        maxFileSize: 5 * 1024 * 1024, // 5MB
        minFileSize: 1, // disallow empty file
        allowEmptyFiles: false,
        keepExtensions: true,

        // field hard limits
        maxFields: 50,
        maxFieldsSize: 64 * 1024, // 64KB total fields
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const payload = {
      referenceNo: cleanText(fields.referenceNo, 40),
      fullName: cleanText(fields.fullName, 120),
      email: normalizeEmail(fields.email),
      mobile: normalizeMobile(fields.mobile),
      school: cleanText(fields.school, 120),
      division: cleanText(fields.division, 120),
      station: cleanText(fields.station, 120),
      loanAmount: cleanText(fields.loanAmount, 30),
      termMonths: cleanText(fields.termMonths, 10),
      remarks: cleanText(fields.remarks, 800),
      submittedAt: cleanText(fields.submittedAt, 40),
      website: cleanText(fields.website, 80), // honeypot
    };

    // honeypot: pretend success ASAP
    if (payload.website) return res.status(200).json({ ok: true });

    // validations
    if (!payload.fullName || payload.fullName.length < 3) {
      return res.status(400).json({ message: "Invalid full name." });
    }
    if (!payload.email || !isValidEmail(payload.email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
    if (!payload.mobile || !isValidMobilePH(payload.mobile)) {
      return res.status(400).json({
  message: "Invalid mobile number. Must be 11 digits and start with 01–09.",
});

    }
    if (!payload.school) {
      return res.status(400).json({ message: "School/Office is required." });
    }
    if (!payload.division) {
      return res.status(400).json({ message: "Division is required." });
    }
    if (!payload.station) {
      return res.status(400).json({ message: "Station is required." });
    }

    const amt = parseAmount(payload.loanAmount);
    // adjust these bounds as needed
    const MIN_AMT = 1000;
    const MAX_AMT = 5000000;
    if (!Number.isFinite(amt) || amt < MIN_AMT || amt > MAX_AMT) {
      return res.status(400).json({
        message: `Invalid loan amount. Must be between ${MIN_AMT} and ${MAX_AMT}.`,
      });
    }

    if (!payload.termMonths || !ALLOWED_TERMS.has(payload.termMonths)) {
      return res.status(400).json({
        message: "Invalid term. Allowed: 6,12,18,24,36,48,60 months.",
      });
    }

    // REQUIRED attachment
    const file = files.attachment;
    if (!file) {
      return res.status(400).json({
        message: "Attachment is required. Please attach a PDF/JPG/PNG file.",
      });
    }
    const f = Array.isArray(file) ? file[0] : file;

    // read file + cleanup temp
    let buffer;
    try {
      buffer = fs.readFileSync(f.filepath);
    } finally {
      try {
        fs.unlinkSync(f.filepath);
      } catch (_) {}
    }

    if (!buffer || buffer.length < 1) {
      return res.status(400).json({ message: "Invalid attachment file." });
    }

    // signature check (stronger than mimetype)
    const kind = detectFileKind(buffer);
    if (!kind) {
      return res.status(400).json({
        message: "Invalid attachment content. Only PDF/JPG/PNG allowed.",
      });
    }

    // optional extra: cross-check mimetype if provided
    const allowedMimes = new Set(["application/pdf", "image/jpeg", "image/png"]);
    if (f.mimetype && !allowedMimes.has(f.mimetype)) {
      return res.status(400).json({
        message: "Invalid attachment type. Only PDF/JPG/PNG allowed.",
      });
    }

    const bytes = buffer.length;
    const sizeLabel =
      bytes >= 1024 * 1024
        ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.max(1, Math.round(bytes / 1024))} KB`;

    const attachmentMeta = {
      name: safeFilename(f.originalFilename || "attachment"),
      type: kindToMime(kind),
      size: sizeLabel,
    };

    const graphAttachments = [
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: attachmentMeta.name,
        contentType: attachmentMeta.type,
        contentBytes: buffer.toString("base64"),
      },
    ];

    const from = safeHeader(process.env.MAIL_FROM || "no-reply@aspacbank.com");
    const to = safeHeader(process.env.MAIL_TO || "dzpo@aspacbank.com");

    if (!from || !isValidEmail(from)) {
      return res.status(500).json({
        message: "Server config missing/invalid.",
        error: "MAIL_FROM is missing or invalid.",
      });
    }
    if (!to || !isValidEmail(to)) {
      return res.status(500).json({
        message: "Server config missing/invalid.",
        error: "MAIL_TO is missing or invalid.",
      });
    }

    const accessToken = await getAccessToken();

    // safer subject
    const subjectName = safeHeader(payload.fullName, 80);
    const subject = `APDS Loan Application - ${subjectName}`;

    const html = buildHtmlEmail(
      {
        ...payload,
        loanAmount: String(amt), // normalized number string
      },
      attachmentMeta
    );
    const text = buildTextEmail({ ...payload, loanAmount: String(amt) });

    // keep logs minimal
    console.log("APDS submit:", {
      ref: payload.referenceNo || "N/A",
      hasAttachment: true,
      bytes,
    });

    // Create message in SentItems
    const createUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/mailFolders('SentItems')/messages`;

    const createResp = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: to } }],
        replyTo: [{ emailAddress: { address: safeHeader(payload.email, 160) } }],
        attachments: graphAttachments,
      }),
    });

    if (!createResp.ok) {
      const errText = await createResp.text();
      console.error("Create message failed:", errText);
      return res.status(500).json({
        message: "Submission failed.",
        error: `Create message failed: ${errText}`,
        fallback: text,
      });
    }

    const created = await createResp.json();
    const messageId = created?.id;

    if (!messageId) {
      return res.status(500).json({
        message: "Submission failed.",
        error: "No message id returned from create message.",
        fallback: text,
      });
    }

    // Send message
    const sendUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/messages/${encodeURIComponent(messageId)}/send`;

    const sendResp = await fetch(sendUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      console.error("Send message failed:", errText);
      return res.status(500).json({
        message: "Submission failed.",
        error: `Send message failed: ${errText}`,
        fallback: text,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("submit error:", err);
    return res.status(500).json({
      message: "Submission failed.",
      error: String(err?.message || err),
    });
  }
};

module.exports = handler;

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
