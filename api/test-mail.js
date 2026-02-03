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
  if (req.method !== "GET") return res.status(405).send("Method not allowed");

  try {
    const accessToken = await getAccessToken();

    const FROM = "no-reply@aspacbank.com";
    const TO = "wppontillas@aspacbank.com";

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(FROM)}/sendMail`;

    const sendResp = await fetch(graphUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: "APDS Form Mailer - Test Email",
          body: { contentType: "Text", content: "Hello! Graph sending works ✅" },
          toRecipients: [{ emailAddress: { address: TO } }],
        },
        saveToSentItems: false,
      }),
    });

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      throw new Error(errText);
    }

    return res.status(200).json({ ok: true, message: "Sent!" });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
};
