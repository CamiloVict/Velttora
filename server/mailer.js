import nodemailer from 'nodemailer';
import { adminNotificationEmail, userConfirmationEmail } from './templates.js';
import { logger } from './logger.js';

const DEFAULT_MAILBOX = 'contact@velttora.com';

let cachedTransport = null;

function normalizeEmail(value, fallback = DEFAULT_MAILBOX) {
  const email = String(value ?? '').trim().toLowerCase();
  return email || fallback;
}

function readSmtpPassword() {
  let pass = String(process.env.SMTP_PASS ?? '').trim();
  if (
    (pass.startsWith('"') && pass.endsWith('"')) ||
    (pass.startsWith("'") && pass.endsWith("'"))
  ) {
    pass = pass.slice(1, -1);
  }
  return pass;
}

/** MAIL_FROM="Velttora <contact@velttora.com>" or contact@velttora.com */
function resolveFromAddress() {
  const raw = String(process.env.MAIL_FROM ?? '').trim();
  if (!raw) {
    const mailbox = normalizeEmail(process.env.SMTP_USER, DEFAULT_MAILBOX);
    return `"Velttora" <${mailbox}>`;
  }
  if (/<[^>]+@[^>]+>/.test(raw)) {
    return raw.replace(/^["']|["']$/g, '');
  }
  const email = normalizeEmail(raw, DEFAULT_MAILBOX);
  return `"Velttora" <${email}>`;
}

export function isSmtpConfigured() {
  const { SMTP_HOST, SMTP_USER } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && readSmtpPassword());
}

export function getSmtpConfigSummary() {
  return {
    host: process.env.SMTP_HOST || '(missing)',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '(missing)',
    passwordSet: Boolean(readSmtpPassword()),
    mailFrom: resolveFromAddress(),
    contactTo: normalizeEmail(process.env.CONTACT_TO, DEFAULT_MAILBOX),
  };
}

function getTransport() {
  if (!isSmtpConfigured()) {
    return null;
  }

  if (cachedTransport) {
    return cachedTransport;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_SECURE } = process.env;
  const user = normalizeEmail(SMTP_USER);
  const pass = readSmtpPassword();
  const isDebug = process.env.LOG_LEVEL === 'debug';

  logger.debug('Creating SMTP transport (pooled)', {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    user,
  });

  cachedTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
    socketTimeout: 15000,
    greetingTimeout: 10000,
    logger: isDebug,
    debug: isDebug,
  });

  return cachedTransport;
}

export async function sendContactEmails(payload) {
  const startedAt = Date.now();
  const from = resolveFromAddress();
  const to = normalizeEmail(process.env.CONTACT_TO, DEFAULT_MAILBOX);

  logger.info('Preparing to send contact emails', {
    from,
    notifyTo: to,
    visitorEmail: payload.email,
    visitorName: payload.name,
    reason: payload.reason,
  });

  const transport = getTransport();
  if (!transport) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in server/.env.');
  }

  const adminMail = adminNotificationEmail(payload);
  const userMail = userConfirmationEmail(payload);

  try {
    logger.info('Sending both emails in parallel…');
    const [adminResult, userResult] = await Promise.all([
      transport.sendMail({
        from,
        to,
        replyTo: payload.email,
        subject: adminMail.subject,
        html: adminMail.html,
      }),
      transport.sendMail({
        from,
        to: payload.email,
        subject: userMail.subject,
        html: userMail.html,
      }),
    ]);

    logger.info('Contact emails sent', {
      durationMs: Date.now() - startedAt,
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId,
    });
  } catch (err) {
    logger.error('Contact email send failed', {
      durationMs: Date.now() - startedAt,
      err,
    });
    throw err;
  }
}

/** Fire-and-forget: logs errors; does not throw to the HTTP handler. */
export function dispatchContactEmails(payload) {
  sendContactEmails(payload).catch((err) => {
    logger.error('Background email send failed', {
      email: payload.email,
      name: payload.name,
      err,
    });
  });
}
