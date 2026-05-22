import { createContext, useContext, useEffect, useMemo } from 'react';
import { detectLocale } from './detectLocale';
import en from './locales/en.js';
import es from './locales/es.js';

const messages = { en, es };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const locale = useMemo(() => detectLocale(), []);
  const t = messages[locale] ?? messages.en;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.meta.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', t.meta.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', t.meta.description);
  }, [locale, t]);

  const value = useMemo(() => ({ locale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
