#!/usr/bin/env node
/**
 * Loads server/.fly-secrets.env and runs: fly secrets set ...
 * Run from repo root: pnpm secrets:api
 * Or from server/: node scripts/set-fly-secrets.mjs
 */
import { readFileSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.join(__dirname, '..');
const envFile = process.env.FLY_SECRETS_FILE || path.join(serverDir, '.fly-secrets.env');

function getFlyAppName() {
  if (process.env.FLY_APP) return process.env.FLY_APP;
  const flyToml = path.join(serverDir, 'fly.toml');
  if (existsSync(flyToml)) {
    const match = readFileSync(flyToml, 'utf8').match(/^app\s*=\s*['"]([^'"]+)['"]/m);
    if (match) return match[1];
  }
  return 'velttora-contact-api';
}

const FLY_SECRET_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_FROM',
  'CONTACT_TO',
  'CORS_ORIGIN',
];

function parseEnvFile(content) {
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

function main() {
  if (!existsSync(envFile)) {
    console.error(`Missing ${envFile}`);
    console.error('Copy server/.env to server/.fly-secrets.env and adjust CORS_ORIGIN for production.');
    process.exit(1);
  }

  const vars = parseEnvFile(readFileSync(envFile, 'utf8'));
  const pairs = [];

  for (const key of FLY_SECRET_KEYS) {
    const value = vars[key];
    if (!value) {
      console.warn(`[warn] Skipping unset key: ${key}`);
      continue;
    }
    pairs.push(`${key}=${value}`);
  }

  if (pairs.length === 0) {
    console.error('No secrets to set.');
    process.exit(1);
  }

  const app = getFlyAppName();
  console.log(`Setting ${pairs.length} secrets on Fly app "${app}" from ${path.basename(envFile)}…`);
  console.log('Keys:', FLY_SECRET_KEYS.filter((k) => vars[k]).join(', '));

  const result = spawnSync('fly', ['secrets', 'set', '-a', app, ...pairs], {
    cwd: serverDir,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(result.error.message);
    console.error('Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/');
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log('Deploying secrets to machines…');
  const deploy = spawnSync('fly', ['secrets', 'deploy', '-a', app], {
    cwd: serverDir,
    stdio: 'inherit',
  });

  process.exit(deploy.status ?? 0);
}

main();
