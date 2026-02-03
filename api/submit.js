// /api/submit.js
async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

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
  if (!resp.ok) throw new Error(data.error_description || "Failed to get token");
  return data.access_token;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const clean = (v) => String(v || "").trim();

    const payload = {
      referenceNo: clean(req.body?.referenceNo),
      fullName: clean(req.body?.fullName),
      email: clean(req.body?.email),
      mobile: clean(req.body?.mobile),
      school: clean(req.body?.school),
      loanAmount: clean(req.body?.loanAmount),
      termMonths: clean(req.body?.termMonths),
      remarks: clean(req.body?.remarks),
      // simple anti-bot honeypot:
      website: clean(req.body?.website),
    };

    // Honeypot: bots usually fill hidden field
    if (payload.website) return res.status(200).json({ ok: true });

    if (!payload.fullName || !payload.email || !payload.mobile || !payload.school || !payload.loanAmount || !payload.termMonths) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const accessToken = await getAccessToken();

    const from = process.env.MAIL_FROM || "no-reply@aspacbank.com";
    const to = process.env.MAIL_TO || "wppontillas@aspacbank.com";

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`;

    const messageText = `
New APDS Loan Application

Reference No: ${payload.referenceNo || "N/A"}
Full Name: ${payload.fullName}
Email: ${payload.email}
Mobile: ${payload.mobile}
School/Office: ${payload.school}
Loan Amount (PHP): ${payload.loanAmount}
Term (Months): ${payload.termMonths}

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
          subject: `Teachers Loan Application - ${payload.fullName}`,
          body: { contentType: "Text", content: messageText },
          toRecipients: [{ emailAddress: { address: to } }],
          replyTo: [{ emailAddress: { address: payload.email } }],
        },
        saveToSentItems: false,
      }),
    });

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      throw new Error(`Graph sendMail failed: ${errText}`);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: "Submission failed.", error: String(err?.message || err) });
  }
};
