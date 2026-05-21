const SUPPORTED = ['en', 'es'];

export function detectLocale() {
  if (typeof navigator === 'undefined') return 'en';

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const raw of languages) {
    const code = String(raw || '').toLowerCase().split('-')[0];
    if (SUPPORTED.includes(code)) return code;
  }

  return 'en';
}
