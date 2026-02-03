require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Allow CRA dev server (ok pa rin kahit may proxy)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatNumber(value) {
  const n = Number(String(value ?? "").replace(/,/g, ""));
  if (!Number.isFinite(n)) return String(value ?? "");
  return n.toLocaleString("en-US");
}

function getLogoSrc() {
  // Option 1: Use a public HTTPS URL (recommended)
  if (process.env.MAIL_LOGO_URL) return process.env.MAIL_LOGO_URL.trim();

  // Option 2: Inline base64 (no hosting needed)
  // Put ONLY the base64 string (no "data:image/png;base64,")
  if (process.env.MAIL_LOGO_BASE64) {
    const b64 = process.env.MAIL_LOGO_BASE64.trim();
    return `data:image/png;base64,${b64}`;
  }

  return null;
}

async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Missing AZURE_TENANT_ID / AZURE_CLIENT_ID / AZURE_CLIENT_SECRET in .env"
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

  const data = await resp.json();

  // Optional debug log (safe-ish)
  if (process.env.DEBUG_TOKEN === "true") {
    console.log("token resp ok?", resp.ok, {
      status: resp.status,
      has_access_token: Boolean(data?.access_token),
      error: data?.error,
      error_description: data?.error_description,
    });
  }

  if (!resp.ok) throw new Error(data.error_description || "Failed to get token");
  return data.access_token;
}

function buildHtmlEmail(payload) {
  const logoSrc = getLogoSrc();

  const ref = escapeHtml(payload.referenceNo || "N/A");
  const name = escapeHtml(payload.fullName);
  const email = escapeHtml(payload.email);
  const mobile = escapeHtml(payload.mobile);
  const school = escapeHtml(payload.school);
  const station = escapeHtml(payload.station || "-");
  const loanAmount = escapeHtml(formatNumber(payload.loanAmount));
  const termMonths = escapeHtml(payload.termMonths);
  const submittedAt = escapeHtml(payload.submittedAt || "-");
  const remarks = escapeHtml(payload.remarks || "-").replace(/\n/g, "<br/>");

  const headerLogo = logoSrc
    ? `<img src="${escapeHtml(logoSrc)}" alt="ASPAC Bank" style="height:42px; display:block;" />`
    : `<div style="font-weight:700; font-size:16px; color:#0f5132;">ASPAC Bank, Inc.</div>`;

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#111; background:#fff; padding:18px;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
      ${headerLogo}
      <div style="border-left:3px solid #0f5132; padding-left:12px;">
        <div style="font-size:20px; font-weight:800; letter-spacing:0.3px;">NEW APDS LOAN APPLICATION</div>
        <div style="margin-top:4px; font-size:13px; color:#444;">
          A new APDS Loan Application has been submitted. Please review the details below.
        </div>
      </div>
    </div>

    <div style="height:1px; background:#d0d0d0; margin:14px 0 16px;"></div>

    <!-- Summary -->
    <table cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr>
        <td style="padding:2px 0; width:170px;"><b>Reference No:</b></td>
        <td style="padding:2px 0;">${ref}</td>
      </tr>
      <tr>
        <td style="padding:2px 0;"><b>Applicant Name:</b></td>
        <td style="padding:2px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding:2px 0;"><b>Submitted At:</b></td>
        <td style="padding:2px 0;">${submittedAt}</td>
      </tr>
    </table>

    <div style="margin:18px 0 10px; font-size:16px; font-weight:800;">Applicant Details</div>
    <table cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr>
        <td style="padding:3px 0; width:170px;"><b>Email:</b></td>
        <td style="padding:3px 0;">${email}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Mobile Number:</b></td>
        <td style="padding:3px 0;">${mobile}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>School/Office:</b></td>
        <td style="padding:3px 0;">${school}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Station/City:</b></td>
        <td style="padding:3px 0;">${station}</td>
      </tr>
    </table>

    <div style="margin:18px 0 10px; font-size:16px; font-weight:800;">Loan Request</div>
    <table cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr>
        <td style="padding:3px 0; width:170px;"><b>Loan Amount (PHP):</b></td>
        <td style="padding:3px 0;">${loanAmount}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Desired Term (Months):</b></td>
        <td style="padding:3px 0;">${termMonths}</td>
      </tr>
    </table>

    <div style="margin:18px 0 10px; font-size:16px; font-weight:800;">Remarks</div>
    <div style="font-size:14px; line-height:1.5; padding:10px 12px; border:1px solid #e5e5e5; border-radius:8px; background:#fafafa;">
      ${remarks}
    </div>

    <div style="height:1px; background:#d0d0d0; margin:18px 0 0;"></div>
    <div style="font-size:12px; color:#666; margin-top:10px;">
      This is an automated notification from ASPAC Bank website form.
    </div>
  </div>
  `.trim();
}

function buildTextEmail(payload) {
  return `
NEW APDS LOAN APPLICATION

Reference No: ${payload.referenceNo || "N/A"}
Applicant Name: ${payload.fullName}
Submitted At: ${payload.submittedAt || "-"}

Applicant Details
Email: ${payload.email}
Mobile Number: ${payload.mobile}
School/Office: ${payload.school}
Station/City: ${payload.station || "-"}

Loan Request
Loan Amount (PHP): ${formatNumber(payload.loanAmount)}
Desired Term (Months): ${payload.termMonths}

Remarks
${payload.remarks || "-"}
`.trim();
}

app.post("/api/submit", async (req, res) => {
  try {
    const clean = (v) => String(v || "").trim();
    const b = req.body || {};

    // Honeypot - if filled, pretend success
    if (clean(b.website)) return res.json({ ok: true });

    const payload = {
      referenceNo: clean(b.referenceNo),
      fullName: clean(b.fullName),
      email: clean(b.email),
      mobile: clean(b.mobile),
      school: clean(b.school),
      station: clean(b.station),
      loanAmount: clean(b.loanAmount),
      termMonths: clean(b.termMonths),
      remarks: clean(b.remarks),
      submittedAt: clean(b.submittedAt),
    };

    if (
      !payload.fullName ||
      !payload.email ||
      !payload.mobile ||
      !payload.school ||
      !payload.loanAmount ||
      !payload.termMonths
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const token = await getAccessToken();

    const FROM = process.env.MAIL_FROM || "no-reply@aspacbank.com";
    const TO = process.env.MAIL_TO || "wppontillas@aspacbank.com";

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      FROM
    )}/sendMail`;

    const html = buildHtmlEmail(payload);
    const text = buildTextEmail(payload);

    const sendResp = await fetch(graphUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `APDS Loan Application - ${payload.fullName}`,
          body: {
            contentType: "HTML",
            content: html,
          },
          // optional: keep plaintext as an attachment for reference (some prefer this)
          attachments: [
            {
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: "application.txt",
              contentType: "text/plain",
              contentBytes: Buffer.from(text, "utf8").toString("base64"),
            },
          ],
          toRecipients: [{ emailAddress: { address: TO } }],
          replyTo: [{ emailAddress: { address: payload.email } }],
        },
        saveToSentItems: false,
      }),
    });

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      return res
        .status(500)
        .json({ message: "Graph sendMail failed", error: errText });
    }

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
      error: String(e?.message || e),
    });
  }
});

app.get("/health", (_, res) => res.send("OK"));

app.listen(4000, () => {
  console.log("Local API running on http://localhost:4000");
});
