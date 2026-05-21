import { useI18n } from '../i18n/I18nProvider';

export function Nav() {
  const { t } = useI18n();

  return (
    <nav className="nav" id="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          Velttora<span>.</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">{t.nav.about}</a>
          </li>
          <li>
            <a href="#products">{t.nav.products}</a>
          </li>
          <li>
            <a href="#capabilities">{t.nav.capabilities}</a>
          </li>
          <li>
            <a href="#team">{t.nav.team}</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              {t.nav.contact}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
