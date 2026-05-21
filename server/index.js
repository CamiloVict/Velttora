import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { dispatchContactEmails, isSmtpConfigured, getSmtpConfigSummary } from './mailer.js';
import { CONTACT_EMAIL, GENERIC_SEND_ERROR } from './constants.js';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.set('trust proxy', 1);

function logStartupConfig() {
  logger.info('Environment loaded', {
    envFile: path.join(__dirname, '.env'),
    nodeEnv: process.env.NODE_ENV || 'production',
    logLevel: process.env.LOG_LEVEL || 'info',
    port: PORT,
  });

  if (!isSmtpConfigured()) {
    logger.warn(
      'SMTP incomplete — check server/.env (SMTP_HOST, SMTP_USER, SMTP_PASS). Passwords with # must be quoted.',
    );
    return;
  }

  logger.info('SMTP configuration', getSmtpConfigSummary());
}

const REASONS = new Set([
  'partner',
  'investor',
  'government',
  'builder',
  'press',
  'other',
]);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || true,
  }),
);
app.use(express.json({ limit: '32kb' }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('HTTP request', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
    });
  });
  next();
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    smtp: isSmtpConfigured(),
    contactEmail: CONTACT_EMAIL,
    smtpUser: process.env.SMTP_USER || null,
  });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  logger.info('POST /api/contact — new submission received');

  try {
    const name = sanitizeString(req.body?.name, 120);
    const email = sanitizeString(req.body?.email, 254).toLowerCase();
    const organization = sanitizeString(req.body?.organization, 160);
    const reason = sanitizeString(req.body?.reason, 40);
    const message = sanitizeString(req.body?.message, 4000);

    logger.debug('Parsed form fields', {
      name,
      email,
      organization: organization || '(empty)',
      reason,
      messageLength: message.length,
    });

    if (!name || name.length < 2) {
      logger.warn('Validation failed: name too short', { name });
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    if (!isValidEmail(email)) {
      logger.warn('Validation failed: invalid email', { email });
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (!REASONS.has(reason)) {
      logger.warn('Validation failed: invalid reason', { reason });
      return res.status(400).json({ error: 'Please select a valid reason.' });
    }
    if (!message || message.length < 10) {
      logger.warn('Validation failed: message too short', { length: message.length });
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    const payload = {
      name,
      email,
      organization,
      reason: formatReason(reason),
      reasonKey: reason,
      message,
      submittedAt: new Date().toISOString(),
    };

    if (!isSmtpConfigured()) {
      logger.warn('Contact rejected — SMTP not configured');
      return res.status(503).json({
        error: 'Email service is not configured. Add server/.env with your SMTP credentials.',
      });
    }

    logger.info('Validation passed — queuing emails in background', { email, name });
    dispatchContactEmails(payload);

    res.status(202).json({
      ok: true,
      message: 'Thank you. We received your message and will contact you soon.',
    });
  } catch (err) {
    logger.error('Contact form failed', err);
    res.status(500).json({
      error: GENERIC_SEND_ERROR,
      ...(process.env.NODE_ENV === 'development' && err.message
        ? { detail: err.message }
        : {}),
    });
  }
});

function formatReason(key) {
  const labels = {
    partner: 'Partnership',
    investor: 'Investment',
    government: 'Government / institution',
    builder: 'Fellow builder',
    press: 'Press / media',
    other: 'Other',
  };
  return labels[key] ?? key;
}

app.listen(PORT, HOST, () => {
  logger.info(`Contact API listening on http://${HOST}:${PORT}`);
  logStartupConfig();
});
