const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function currentLevel() {
  const level = String(process.env.LOG_LEVEL || 'info').toLowerCase();
  return LEVELS[level] ?? LEVELS.info;
}

function timestamp() {
  return new Date().toISOString();
}

function formatError(err) {
  if (!err) return '(no error)';
  const parts = [
    err.message,
    err.code && `code=${err.code}`,
    err.response && `smtp=${err.response}`,
    err.responseCode && `responseCode=${err.responseCode}`,
    err.command && `command=${err.command}`,
  ].filter(Boolean);
  return parts.join(' | ');
}

export function log(level, message, meta) {
  if ((LEVELS[level] ?? LEVELS.info) < currentLevel()) return;

  const prefix = `[${timestamp()}] [velttora-api] [${level.toUpperCase()}]`;
  if (meta !== undefined) {
    console[level === 'error' ? 'error' : 'log'](prefix, message, meta);
  } else {
    console[level === 'error' ? 'error' : 'log'](prefix, message);
  }
}

export const logger = {
  debug: (msg, meta) => log('debug', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, errOrMeta) => {
    if (errOrMeta instanceof Error) {
      log('error', msg, formatError(errOrMeta));
      if (process.env.LOG_LEVEL === 'debug' && errOrMeta.stack) {
        console.error(errOrMeta.stack);
      }
    } else {
      log('error', msg, errOrMeta);
    }
  },
};

export { formatError };
