import nodemailer from 'nodemailer';
import { adminNotificationEmail, userConfirmationEmail } from './templates.js';
import { logger } from './logger.js';

const DEFAULT_MAILBOX = 'contact@velttora.com';

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

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_SECURE } = process.env;

  if (!isSmtpConfigured()) {
    logger.warn('SMTP not configured', {
      host: SMTP_HOST || false,
      user: SMTP_USER || false,
      passwordSet: Boolean(readSmtpPassword()),
    });
    return null;
  }

  const user = normalizeEmail(SMTP_USER);
  const pass = readSmtpPassword();

  logger.debug('Creating SMTP transport', {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    user,
  });

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    auth: { user, pass },
    logger: process.env.LOG_LEVEL === 'debug',
    debug: process.env.LOG_LEVEL === 'debug',
  });
}

export async function sendContactEmails(payload) {
  const from = resolveFromAddress();
  const to = normalizeEmail(process.env.CONTACT_TO, DEFAULT_MAILBOX);

  logger.info('Preparing to send contact emails', {
    from,
    notifyTo: to,
    visitorEmail: payload.email,
    visitorName: payload.name,
    reason: payload.reason,
  });

  const transport = createTransport();
  if (!transport) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in server/.env.');
  }

  const adminMail = adminNotificationEmail(payload);
  const userMail = userConfirmationEmail(payload);

  try {
    logger.info('Sending admin notification email…', { to, subject: adminMail.subject });
    const adminResult = await transport.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: adminMail.subject,
      html: adminMail.html,
    });
    logger.info('Admin notification sent', {
      messageId: adminResult.messageId,
      accepted: adminResult.accepted,
      rejected: adminResult.rejected,
    });
  } catch (err) {
    logger.error('Failed to send admin notification', err);
    throw err;
  }

  try {
    logger.info('Sending visitor confirmation email…', {
      to: payload.email,
      subject: userMail.subject,
    });
    const userResult = await transport.sendMail({
      from,
      to: payload.email,
      subject: userMail.subject,
      html: userMail.html,
    });
    logger.info('Visitor confirmation sent', {
      messageId: userResult.messageId,
      accepted: userResult.accepted,
      rejected: userResult.rejected,
    });
  } catch (err) {
    logger.error('Failed to send visitor confirmation', err);
    throw err;
  }

  logger.info('All contact emails sent successfully');
}
