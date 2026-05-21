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

const REASON_KEYS = new Set(['partner', 'investor', 'government', 'builder', 'press', 'other']);

/** @type {Record<string, {
 *   label: string;
 *   admin: { title: string; preheader: (d: object) => string; intro: string; subject: (d: object) => string };
 *   user: { title: string; preheader: string; subject: string; intro: string; nextSteps: string[]; closing: string };
 * }>} */
const REASON_TEMPLATES = {
  partner: {
    label: 'Partnership',
    admin: {
      title: 'New partnership inquiry',
      preheader: (d) => `${d.name} is interested in partnering with Velttora`,
      intro:
        'A potential partner reached out through the website. Review their organization and message to assess fit across our portfolio (Urbi, Edify, CobraAI, Hicap).',
      subject: (d) => `[Velttora] Partnership — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'Thanks for your partnership interest',
      preheader: 'We received your partnership inquiry and will follow up soon.',
      subject: 'Your partnership inquiry — Velttora',
      intro:
        'Thank you for considering a strategic partnership with <strong style="color:#f0efe8;">Velttora</strong>. We build real-world platforms across GovTech, EdTech, FinTech, and SportsTech — and we’re always open to alliances that create mutual leverage.',
      nextSteps: [
        'Our partnerships team reviews your note within <strong style="color:#f0efe8;">1–2 business days</strong>.',
        'If there’s a fit, we’ll schedule a short discovery call to explore scope, geography, and integration.',
        'We’ll reply to <strong style="color:#f0efe8;">{{email}}</strong> with next steps — no need to resubmit the form.',
      ],
      closing:
        'Whether you represent a city, a company, or a distribution channel — we appreciate you thinking of Velttora as a build partner.',
    },
  },

  investor: {
    label: 'Investment',
    admin: {
      title: 'New investor inquiry',
      preheader: (d) => `${d.name} is exploring an investment conversation`,
      intro:
        'An investor or fund contact submitted the form. Prioritize a timely response — include deck readiness and which product lines they referenced in the message.',
      subject: (d) => `[Velttora] Investment — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'Thanks for your investment interest',
      preheader: 'Your investment inquiry was received by the Velttora team.',
      subject: 'Your investment inquiry — Velttora',
      intro:
        'Thank you for your interest in <strong style="color:#f0efe8;">Velttora</strong>. We’re building a portfolio of AI-native companies targeting large, fragmented industries across Latin America and beyond.',
      nextSteps: [
        'Our team reviews investor inquiries within <strong style="color:#f0efe8;">1–2 business days</strong>.',
        'If aligned, we’ll share relevant materials (deck, metrics, product overview) and propose a call.',
        'All correspondence will go to <strong style="color:#f0efe8;">{{email}}</strong>.',
      ],
      closing:
        'We value thoughtful capital partners who care about execution, not just slides — thank you for reaching out.',
    },
  },

  government: {
    label: 'Government / institution',
    admin: {
      title: 'New government / institution inquiry',
      preheader: (d) => `${d.name} from a public or institutional body reached out`,
      intro:
        'A government or institution contact submitted the form. This may relate to Urbi (civic reporting), procurement, or a pilot — route to the appropriate product lead and note any jurisdiction in the message.',
      subject: (d) => `[Velttora] Government — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'Thank you for contacting Velttora',
      preheader: 'We received your institutional inquiry and will respond shortly.',
      subject: 'Your inquiry — Velttora (Government & institutions)',
      intro:
        'Thank you for reaching out on behalf of your <strong style="color:#f0efe8;">institution or government body</strong>. Velttora builds civic and operational technology designed for transparency, measurable outcomes, and citizen trust — including <strong style="color:#f0efe8;">Urbi</strong>, our AI civic reporting platform.',
      nextSteps: [
        'We review institutional requests within <strong style="color:#f0efe8;">1–2 business days</strong>.',
        'A team member will contact you to understand jurisdiction, scope, and timeline for a pilot or briefing.',
        'We’ll respond at <strong style="color:#f0efe8;">{{email}}</strong> with a clear point of contact.',
      ],
      closing:
        'We respect public-service timelines and compliance requirements — we look forward to learning what you’re trying to solve.',
    },
  },

  builder: {
    label: 'Fellow builder',
    admin: {
      title: 'New message from a fellow builder',
      preheader: (d) => `${d.name} — builder / technical outreach`,
      intro:
        'A founder, engineer, or operator reached out. Could be hiring, collaboration, open-source, or product feedback — scan the message for stack and intent.',
      subject: (d) => `[Velttora] Builder — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'Good to connect, builder',
      preheader: 'Your message reached the Velttora team — we’ll get back to you.',
      subject: 'Thanks for reaching out — Velttora',
      intro:
        'Thanks for writing in from the builder community. At <strong style="color:#f0efe8;">Velttora</strong> we ship with React, React Native, NestJS, and AI from day one — we enjoy talking to people who care about craft and real users.',
      nextSteps: [
        'We read builder notes within <strong style="color:#f0efe8;">1–2 business days</strong>.',
        'If your message is about collaboration, hiring, or a technical idea, we’ll route it to the right person.',
        'Watch <strong style="color:#f0efe8;">{{email}}</strong> for our reply.',
      ],
      closing:
        'Keep building — we’re glad you said hello.',
    },
  },

  press: {
    label: 'Press / media',
    admin: {
      title: 'New press / media inquiry',
      preheader: (d) => `${d.name} — media or press contact`,
      intro:
        'Press or media submitted the form. Check deadline language in the message and loop in comms/founder if interview or statement is requested.',
      subject: (d) => `[Velttora] Press — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'Thanks for your media inquiry',
      preheader: 'Velttora received your press request.',
      subject: 'Your media inquiry — Velttora',
      intro:
        'Thank you for contacting <strong style="color:#f0efe8;">Velttora</strong> for press or media purposes. We’re happy to support accurate coverage of our products and mission — Urbi, Edify, CobraAI, and Hicap.',
      nextSteps: [
        'We prioritize press requests and aim to respond within <strong style="color:#f0efe8;">1 business day</strong> when a deadline is noted.',
        'Share any publication date, format (interview, written Q&A), and topics of interest in your follow-up.',
        'Our team will write to <strong style="color:#f0efe8;">{{email}}</strong>.',
      ],
      closing:
        'Thank you for helping tell the story of technology built for the real world.',
    },
  },

  other: {
    label: 'General inquiry',
    admin: {
      title: 'New contact request',
      preheader: (d) => `${d.name} sent a general inquiry`,
      intro: 'A general inquiry was submitted through the website contact form.',
      subject: (d) => `[Velttora] Contact — ${d.name}${d.organization ? ` · ${d.organization}` : ''}`,
    },
    user: {
      title: 'We received your message',
      preheader: 'Your message was received. Our team will contact you soon.',
      subject: 'We received your message — Velttora',
      intro:
        'Thank you for reaching out to <strong style="color:#f0efe8;">Velttora</strong>. We received your message and a member of our team will review it shortly.',
      nextSteps: [
        'We review inquiries within <strong style="color:#f0efe8;">1–2 business days</strong>.',
        'We’ll reply to <strong style="color:#f0efe8;">{{email}}</strong>.',
        'For urgent matters, you can also write to {{contactEmail}}.',
      ],
      closing: 'Thank you for getting in touch with Velttora.',
    },
  },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveReasonKey(key) {
  const k = String(key ?? '').trim().toLowerCase();
  return REASON_KEYS.has(k) ? k : 'other';
}

function getTemplate(reasonKey) {
  return REASON_TEMPLATES[resolveReasonKey(reasonKey)];
}

function interpolate(text, data) {
  return text
    .replace(/\{\{email\}\}/g, escapeHtml(data.email))
    .replace(/\{\{contactEmail\}\}/g, BRAND.contactEmail);
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

function reasonBadge(reasonLabel) {
  return `<span style="display:inline-block;background:rgba(0,229,160,0.12);border:1px solid rgba(0,229,160,0.25);color:${BRAND.accent};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border-radius:4px;margin-bottom:16px;">${escapeHtml(reasonLabel)}</span>`;
}

export function adminNotificationEmail(data) {
  const tpl = getTemplate(data.reasonKey);
  const submittedAt = new Date(data.submittedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  const body = `
    ${reasonBadge(data.reason || tpl.label)}
    <p style="margin:0 0 20px;color:${BRAND.muted};">${escapeHtml(tpl.admin.intro)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${fieldRow('Name', data.name)}
      ${fieldRow('Email', data.email)}
      ${fieldRow('Organization', data.organization || '—')}
      ${fieldRow('Inquiry type', data.reason || tpl.label)}
      ${fieldRow('Message', data.message)}
      ${fieldRow('Submitted (UTC)', submittedAt)}
    </table>
    <p style="margin:0;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:${BRAND.accent};color:${BRAND.bg};font-weight:600;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px;">Reply to ${escapeHtml(data.name)}</a>
    </p>`;

  return {
    subject: tpl.admin.subject(data),
    html: layout({
      title: tpl.admin.title,
      preheader: tpl.admin.preheader(data),
      body,
    }),
  };
}

export function userConfirmationEmail(data) {
  const tpl = getTemplate(data.reasonKey);
  const stepsHtml = tpl.user.nextSteps
    .map((step) => `<li style="margin-bottom:8px;">${interpolate(step, data)}</li>`)
    .join('');

  const body = `
    <p style="margin:0 0 16px;color:${BRAND.text};font-size:17px;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 20px;">${interpolate(tpl.user.intro, data)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,229,160,0.08);border:1px solid rgba(0,229,160,0.2);border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.accent};">Your ${escapeHtml(tpl.label)} inquiry</p>
          <p style="margin:0 0 8px;color:${BRAND.text};"><strong>Type:</strong> ${escapeHtml(data.reason || tpl.label)}</p>
          ${data.organization ? `<p style="margin:0 0 8px;color:${BRAND.text};"><strong>Organization:</strong> ${escapeHtml(data.organization)}</p>` : ''}
          <p style="margin:0;color:${BRAND.muted};font-size:14px;line-height:1.6;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;"><strong style="color:${BRAND.text};">What happens next?</strong></p>
    <ul style="margin:0 0 24px;padding-left:20px;color:${BRAND.muted};">
      ${stepsHtml}
    </ul>
    <p style="margin:0;color:${BRAND.muted};font-size:14px;">${interpolate(tpl.user.closing, data)}</p>`;

  return {
    subject: tpl.user.subject,
    html: layout({
      title: tpl.user.title,
      preheader: tpl.user.preheader,
      body,
    }),
  };
}
