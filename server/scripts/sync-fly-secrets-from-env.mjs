#!/usr/bin/env node
/**
 * Copies SMTP/Mail keys from server/.env into server/.fly-secrets.env
 * and sets production CORS. Run: pnpm secrets:sync
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.join(__dirname, '..');
const source = path.join(serverDir, '.env');
const target = path.join(serverDir, '.fly-secrets.env');

const KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_FROM',
  'CONTACT_TO',
];

const PRODUCTION_CORS =
  'https://velttora.com,https://www.velttora.com,http://localhost:5173';

function parseEnvFile(content) {
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    vars[key] = value;
  }
  return vars;
}

function quoteIfNeeded(value) {
  if (value.includes('#') || value.includes(' ')) {
    const unquoted = value.replace(/^["']|["']$/g, '');
    return `"${unquoted}"`;
  }
  return value;
}

if (!existsSync(source)) {
  console.error(`Missing ${source}`);
  process.exit(1);
}

const vars = parseEnvFile(readFileSync(source, 'utf8'));
const lines = [
  '# Fly.io production secrets (gitignored)',
  '# Apply with: pnpm secrets:api',
  '',
];

for (const key of KEYS) {
  if (vars[key]) lines.push(`${key}=${quoteIfNeeded(vars[key])}`);
}

lines.push('', `CORS_ORIGIN=${PRODUCTION_CORS}`, '');

writeFileSync(target, lines.join('\n'));
console.log(`Wrote ${target}`);
