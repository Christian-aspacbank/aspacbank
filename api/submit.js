// /api/submit.js
const formidable = require("formidable");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const clean = (v) => String(v || "").trim();

    // ✅ Parse multipart/form-data (FormData)
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = formidable({
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
    const file = files.attachment; // name must match fd.append("attachment", ...)

    if (file) {
      const f = Array.isArray(file) ? file[0] : file;

      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(f.mimetype)) {
        return res.status(400).json({
          message: "Invalid attachment type. Only PDF/JPG/PNG allowed.",
        });
      }

      const buffer = fs.readFileSync(f.filepath);

      graphAttachments = [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: f.originalFilename || "attachment",
          contentType: f.mimetype,
          contentBytes: buffer.toString("base64"),
        },
      ];
    }

    // ---- Graph Token ----
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
      if (!resp.ok)
        throw new Error(data?.error_description || "Failed to get token");

      return data.access_token;
    }

    const from = (process.env.MAIL_FROM || "no-reply@aspacbank.com").trim();
    const to = (process.env.MAIL_TO || "wppontillas@aspacbank.com").trim();

    const accessToken = await getAccessToken();

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      from
    )}/sendMail`;

    const messageText = `
New APDS Loan Application

Reference No: ${payload.referenceNo || "N/A"}
Full Name: ${payload.fullName}
Email: ${payload.email}
Mobile: ${payload.mobile}
School/Office: ${payload.school}
Station/City: ${payload.station || "-"}
Loan Amount (PHP): ${payload.loanAmount}
Term (Months): ${payload.termMonths}
Submitted At: ${payload.submittedAt || "-"}

Remarks:
${payload.remarks || "-"}
    `.trim();

    const sendResp = await fetch(graphUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `APDS Loan Application - ${payload.fullName}`,
          body: { contentType: "Text", content: messageText },
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
