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

// Kept (in case you use later)
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
  const ref = escapeHtml(payload.referenceNo || "N/A");
  const name = escapeHtml(payload.fullName || "-");
  const email = escapeHtml(payload.email || "-");
  const mobile = escapeHtml(payload.mobile || "-");
  const school = escapeHtml(payload.school || "-");
 const division = escapeHtml(payload.division || "-");
const station = escapeHtml(payload.station || "-"); // ✅ NEW


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
  <td style="padding:3px 0;"><b>Division:</b></td>
  <td style="padding:3px 0;">${division}</td>
</tr>
<tr>
  <td style="padding:3px 0;"><b>Station:</b></td>
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
Division: ${payload.division || "-"}
Station: ${payload.station || "-"}


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

    const clean = (v) => {
      const val = Array.isArray(v) ? v[0] : v;
      return String(val || "").trim();
    };

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

  division: clean(fields.division),
  station: clean(fields.station), // ✅ NEW

  loanAmount: clean(fields.loanAmount),
  termMonths: clean(fields.termMonths),
  remarks: clean(fields.remarks),
  submittedAt: clean(fields.submittedAt),
  website: clean(fields.website),
};
// ✅ normalize BEFORE validations
payload.email = payload.email.toLowerCase();
payload.mobile = payload.mobile.replace(/\D/g, "");

    // Honeypot hit: pretend success
    if (payload.website) return res.status(200).json({ ok: true });

    if (
  !payload.fullName ||
  !payload.email ||
  !payload.mobile ||
  !payload.school ||
  !payload.division || // ✅ required
  !payload.station ||  // ✅ required
  !payload.loanAmount ||
  !payload.termMonths
) {
  return res.status(400).json({ message: "Missing required fields." });
}

    // ✅ REQUIRED attachment
    const file = files.attachment; // must match fd.append("attachment", ...)

    if (!file) {
      return res.status(400).json({
        message: "Attachment is required. Please attach a PDF/JPG/PNG file.",
      });
    }

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

    const attachmentMeta = {
      name: f.originalFilename || "attachment",
      type: f.mimetype,
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

    const from = (process.env.MAIL_FROM || "no-reply@aspacbank.com").trim();
    const to = (process.env.MAIL_TO || "dzpo@aspacbank.com").trim();

    const accessToken = await getAccessToken();

    const html = buildHtmlEmail(payload, attachmentMeta);
    const text = buildTextEmail(payload);

    // ✅ DEBUG LOGS
    console.log("MAIL_FROM:", from);
    console.log("MAIL_TO:", to);

    // ✅ Step 1: Create message IN Sent Items (guaranteed entry)
    const createUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/mailFolders('SentItems')/messages`;

    console.log("CREATE URL:", createUrl);

    const createResp = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `APDS Loan Application - ${payload.fullName}`,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: to } }],
        replyTo: [{ emailAddress: { address: payload.email } }],
        ...(graphAttachments.length ? { attachments: graphAttachments } : {}),
      }),
    });

    console.log("CREATE STATUS:", createResp.status);

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

    // ✅ Step 2: Send the created message
    const sendUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/messages/${encodeURIComponent(messageId)}/send`;

    console.log("SEND URL:", sendUrl);

    const sendResp = await fetch(sendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("SEND STATUS:", sendResp.status);

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
