// /api/submit.js
const { IncomingForm } = require("formidable");
const fs = require("fs");

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

const getLogoSrc = () => {
  if (process.env.MAIL_LOGO_URL) return process.env.MAIL_LOGO_URL.trim();
  if (process.env.MAIL_LOGO_BASE64) {
    const b64 = process.env.MAIL_LOGO_BASE64.trim();
    return `data:image/png;base64,${b64}`;
  }
  return null;
};

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

function buildHtmlEmail(payload, attachmentMeta) {
  // (logoSrc kept in case you want to reuse later, but header no longer shows ASPAC Bank Inc.)
  const logoSrc = getLogoSrc();

  const ref = escapeHtml(payload.referenceNo || "N/A");
  const name = escapeHtml(payload.fullName || "-");
  const email = escapeHtml(payload.email || "-");
  const mobile = escapeHtml(payload.mobile || "-");
  const school = escapeHtml(payload.school || "-");
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

  // ✅ Updated header: removed ASPAC Bank, Inc. block + divider
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
      <tr>
        <td style="padding:3px 0; width:170px;"><b>Reference No:</b></td>
        <td style="padding:3px 0;">${ref}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Applicant Name:</b></td>
        <td style="padding:3px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Submitted At:</b></td>
        <td style="padding:3px 0;">${submittedAt}</td>
      </tr>
    </table>

    <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Applicant Details</div>
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
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

    <div style="margin:18px 0 10px; font-size:18px; font-weight:900;">Loan Request</div>
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse; font-size:14px;">
      <tr>
        <td style="padding:3px 0; width:170px;"><b>Loan Amount (PHP):</b></td>
        <td style="padding:3px 0;">${loanAmount}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;"><b>Desired Term (Months):</b></td>
        <td style="padding:3px 0;">${termMonths}</td>
      </tr>
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
Station/City: ${payload.station || "-"}

Loan Request
Loan Amount (PHP): ${formatNumber(payload.loanAmount || "-")}
Desired Term (Months): ${payload.termMonths || "-"}

Remarks
${payload.remarks || "-"}
`.trim();
}

const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const clean = (v) => String(v || "").trim();

    // ✅ Parse multipart/form-data (FormData)
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        keepExtensions: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const payload = {
      referenceNo: clean(fields.referenceNo),
      fullName: clean(fields.fullName),
      email: clean(fields.email),
      mobile: clean(fields.mobile),
      school: clean(fields.school),
      station: clean(fields.station),
      loanAmount: clean(fields.loanAmount),
      termMonths: clean(fields.termMonths),
      remarks: clean(fields.remarks),
      submittedAt: clean(fields.submittedAt),
      website: clean(fields.website), // honeypot
    };

    // Honeypot hit: pretend success
    if (payload.website) return res.status(200).json({ ok: true });

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

    // ✅ Optional attachment
    let graphAttachments = [];
    let attachmentMeta = null;

    const file = files.attachment; // must match fd.append("attachment", ...)

    if (file) {
      const f = Array.isArray(file) ? file[0] : file;

      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(f.mimetype)) {
        return res.status(400).json({
          message: "Invalid attachment type. Only PDF/JPG/PNG allowed.",
        });
      }

      const buffer = fs.readFileSync(f.filepath);

      const bytes = Number(f.size || buffer.length || 0);
      const sizeLabel =
        bytes >= 1024 * 1024
          ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
          : `${Math.max(1, Math.round(bytes / 1024))} KB`;

      attachmentMeta = {
        name: f.originalFilename || "attachment",
        type: f.mimetype,
        size: sizeLabel,
      };

      graphAttachments = [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: attachmentMeta.name,
          contentType: attachmentMeta.type,
          contentBytes: buffer.toString("base64"),
        },
      ];
    }

    const from = (process.env.MAIL_FROM || "no-reply@aspacbank.com").trim();
    const to = (process.env.MAIL_TO || "wppontillas@aspacbank.com").trim();

    const accessToken = await getAccessToken();

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/sendMail`;

    const html = buildHtmlEmail(payload, attachmentMeta);
    const text = buildTextEmail(payload);

    const sendResp = await fetch(graphUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `APDS Loan Application - ${payload.fullName}`,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: to } }],
          replyTo: [{ emailAddress: { address: payload.email } }],
          ...(graphAttachments.length ? { attachments: graphAttachments } : {}),
        },
        saveToSentItems: false,
      }),
    });

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      console.error("Graph sendMail failed:", errText);
      return res.status(500).json({
        message: "Submission failed.",
        error: `Graph sendMail failed: ${errText}`,
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

// ✅ IMPORTANT: must be AFTER module.exports = handler
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
