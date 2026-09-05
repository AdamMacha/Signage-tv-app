import { Resend } from "resend";
import { LeadSubmission } from "./validations";

export interface SendLeadEmailResult {
  success: boolean;
  messageId?: string;
  isDemo?: boolean;
  error?: string;
}

export async function sendLeadEmail(lead: LeadSubmission): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || "info@alionadvert.cz";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "ALION Advert <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is not configured in environment variables. Lead received in DEMO mode:", lead);
    return {
      success: true,
      isDemo: true,
      messageId: `demo-${Date.now()}`,
    };
  }

  const resend = new Resend(apiKey);

  const isAdvertiser = lead.type === "advertiser";
  const subject = isAdvertiser
    ? `🎯 Nový zájemce o inzerci: ${lead.company} (${lead.name})`
    : `📍 Nová nabídka prostoru pro TV: ${lead.company} (${lead.venueType})`;

  const htmlContent = isAdvertiser
    ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f8fafc; padding: 24px; }
    .card { background-color: #111726; border: 1px solid #1e293b; border-radius: 12px; padding: 28px; max-width: 600px; margin: 0 auto; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(99, 102, 241, 0.2); color: #818cf8; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 20px; margin-top: 0; margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .td-label { color: #94a3b8; font-size: 13px; padding: 8px 0; width: 35%; border-bottom: 1px solid #1e293b; }
    .td-value { color: #f8fafc; font-size: 14px; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #1e293b; }
    .message-box { background: #0b0f17; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; margin-top: 20px; font-size: 14px; color: #e2e8f0; }
    .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Inzerce – Poptávka kampaně</div>
    <h1>Nová poptávka reklamní kampaně</h1>
    <table class="table">
      <tr>
        <td class="td-label">Jméno a příjmení:</td>
        <td class="td-value">${escapeHtml(lead.name)}</td>
      </tr>
      <tr>
        <td class="td-label">Firma / Značka:</td>
        <td class="td-value"><strong>${escapeHtml(lead.company)}</strong></td>
      </tr>
      <tr>
        <td class="td-label">E-mail:</td>
        <td class="td-value"><a href="mailto:${escapeHtml(lead.email)}" style="color: #38bdf8;">${escapeHtml(lead.email)}</a></td>
      </tr>
      <tr>
        <td class="td-label">Telefon:</td>
        <td class="td-value"><a href="tel:${escapeHtml(lead.phone)}" style="color: #38bdf8;">${escapeHtml(lead.phone)}</a></td>
      </tr>
      <tr>
        <td class="td-label">Webové stránky:</td>
        <td class="td-value">${lead.website ? `<a href="${escapeHtml(lead.website)}" target="_blank" style="color: #818cf8;">${escapeHtml(lead.website)}</a>` : "Neuvedeno"}</td>
      </tr>
      <tr>
        <td class="td-label">Cílová lokalita:</td>
        <td class="td-value">${escapeHtml(lead.location)}</td>
      </tr>
      <tr>
        <td class="td-label">Rozpočet:</td>
        <td class="td-value"><span style="color: #10b981; font-weight: 600;">${escapeHtml(lead.budget)}</span></td>
      </tr>
    </table>
    ${lead.message ? `
      <div style="margin-top: 20px;">
        <span style="font-size: 13px; color: #94a3b8; font-weight: 600;">Zpráva od klienta:</span>
        <div class="message-box">${escapeHtml(lead.message).replace(/\n/g, "<br>")}</div>
      </div>
    ` : ""}
    <div class="footer">Odesláno z marketingového webu ALION Advert • ${new Date().toLocaleString("cs-CZ")}</div>
  </div>
</body>
</html>
`
    : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f8fafc; padding: 24px; }
    .card { background-color: #111726; border: 1px solid #1e293b; border-radius: 12px; padding: 28px; max-width: 600px; margin: 0 auto; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(6, 182, 212, 0.2); color: #22d3ee; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 20px; margin-top: 0; margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .td-label { color: #94a3b8; font-size: 13px; padding: 8px 0; width: 35%; border-bottom: 1px solid #1e293b; }
    .td-value { color: #f8fafc; font-size: 14px; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #1e293b; }
    .message-box { background: #0b0f17; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; margin-top: 20px; font-size: 14px; color: #e2e8f0; }
    .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Partner – Nabídka prostoru</div>
    <h1>Nová nabídka prostoru pro TV obrazovku</h1>
    <table class="table">
      <tr>
        <td class="td-label">Kontaktní osoba:</td>
        <td class="td-value">${escapeHtml(lead.name)}</td>
      </tr>
      <tr>
        <td class="td-label">Provozovna / Firma:</td>
        <td class="td-value"><strong>${escapeHtml(lead.company)}</strong></td>
      </tr>
      <tr>
        <td class="td-label">Typ prostoru:</td>
        <td class="td-value"><span style="color: #22d3ee; font-weight: 600;">${escapeHtml(lead.venueType)}</span></td>
      </tr>
      <tr>
        <td class="td-label">Adresa prostoru:</td>
        <td class="td-value">${escapeHtml(lead.address)}</td>
      </tr>
      <tr>
        <td class="td-label">Odhad návštěvnosti:</td>
        <td class="td-value">${escapeHtml(lead.footTraffic)}</td>
      </tr>
      <tr>
        <td class="td-label">Vlastnický vztah:</td>
        <td class="td-value">${escapeHtml(lead.ownership)}</td>
      </tr>
      <tr>
        <td class="td-label">E-mail:</td>
        <td class="td-value"><a href="mailto:${escapeHtml(lead.email)}" style="color: #38bdf8;">${escapeHtml(lead.email)}</a></td>
      </tr>
      <tr>
        <td class="td-label">Telefon:</td>
        <td class="td-value"><a href="tel:${escapeHtml(lead.phone)}" style="color: #38bdf8;">${escapeHtml(lead.phone)}</a></td>
      </tr>
    </table>
    ${lead.message ? `
      <div style="margin-top: 20px;">
        <span style="font-size: 13px; color: #94a3b8; font-weight: 600;">Doplňující informace o prostoru:</span>
        <div class="message-box">${escapeHtml(lead.message).replace(/\n/g, "<br>")}</div>
      </div>
    ` : ""}
    <div class="footer">Odesláno z marketingového webu ALION Advert • ${new Date().toLocaleString("cs-CZ")}</div>
  </div>
</body>
</html>
`;

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: lead.email,
      subject,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: data.data?.id,
    };
  } catch (err: any) {
    console.error("Resend send error:", err);
    return {
      success: false,
      error: err.message || "Nepodařilo se odeslat e-mail přes Resend.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
