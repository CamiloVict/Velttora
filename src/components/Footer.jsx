import { useI18n } from '../i18n/I18nProvider';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          Velttora<span>.</span>
        </div>
        <div className="footer-copy">{t.footer.rights}</div>
        <nav className="footer-links">
          <a href="#about">{t.footer.about}</a>
          <a href="#products">{t.footer.products}</a>
          <a href="#contact">{t.footer.contact}</a>
          {t.footer.industryLinks?.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
