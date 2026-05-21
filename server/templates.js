const BRAND = {
  name: 'Velttora',
  accent: '#00e5a0',
  bg: '#09090f',
  surface: '#111118',
  text: '#f0efe8',
  muted: '#8a8a9a',
  siteUrl: 'https://velttora.com',
  contactEmail: 'contact@velttora.com',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function layout({ title, preheader, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.surface};border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.accent};">Velttora LLC</p>
              <h1 style="margin:12px 0 0;font-size:24px;line-height:1.3;color:${BRAND.text};font-weight:700;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 32px;color:${BRAND.muted};font-size:15px;line-height:1.7;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#55556a;line-height:1.6;">
              <a href="${BRAND.siteUrl}" style="color:${BRAND.accent};text-decoration:none;">velttora.com</a>
              · Cali, Colombia · Wyoming, USA
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label, value) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);vertical-align:top;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#55556a;">${escapeHtml(label)}</p>
      <p style="margin:0;color:${BRAND.text};font-size:15px;line-height:1.5;">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

export function adminNotificationEmail(data) {
  const submittedAt = new Date(data.submittedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  const body = `
    <p style="margin:0 0 20px;color:${BRAND.muted};">A new message was submitted through the website contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${fieldRow('Name', data.name)}
      ${fieldRow('Email', data.email)}
      ${fieldRow('Organization', data.organization || '—')}
      ${fieldRow('Reason', data.reason)}
      ${fieldRow('Message', data.message)}
      ${fieldRow('Submitted (UTC)', submittedAt)}
    </table>
    <p style="margin:0;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:${BRAND.accent};color:${BRAND.bg};font-weight:600;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px;">Reply to ${escapeHtml(data.name)}</a>
    </p>`;

  return {
    subject: `[Velttora] New contact — ${data.name}`,
    html: layout({
      title: 'New contact request',
      preheader: `${data.name} wants to get in touch (${data.reason})`,
      body,
    }),
  };
}

export function userConfirmationEmail(data) {
  const body = `
    <p style="margin:0 0 16px;color:${BRAND.text};font-size:17px;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 20px;">Thank you for reaching out to <strong style="color:${BRAND.text};">Velttora</strong>. We received your message and a member of our team will contact you soon.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,229,160,0.08);border:1px solid rgba(0,229,160,0.2);border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.accent};">Your submission</p>
          <p style="margin:0 0 8px;color:${BRAND.text};"><strong>Reason:</strong> ${escapeHtml(data.reason)}</p>
          <p style="margin:0;color:${BRAND.muted};font-size:14px;line-height:1.6;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;"><strong style="color:${BRAND.text};">What happens next?</strong></p>
    <ul style="margin:0 0 24px;padding-left:20px;color:${BRAND.muted};">
      <li style="margin-bottom:8px;">We review your request within 1–2 business days.</li>
      <li style="margin-bottom:8px;">We reply to <span style="color:${BRAND.text};">${escapeHtml(data.email)}</span>.</li>
      <li>If your inquiry is urgent, reply to this email or write to ${BRAND.contactEmail}.</li>
    </ul>
    <p style="margin:0;color:${BRAND.muted};font-size:14px;">We build real infrastructure — thank you for considering Velttora as a partner.</p>`;

  return {
    subject: 'We received your message — Velttora',
    html: layout({
      title: 'We will be in touch',
      preheader: 'Your message was received. Our team will contact you soon.',
      body,
    }),
  };
}
