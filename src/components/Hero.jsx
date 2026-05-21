import { useI18n } from '../i18n/I18nProvider';

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="container">
        <div className="hero-label">{h.label}</div>
        <h1 className="hero-title">
          {h.titleLine1}
          <br />
          {h.titleLine2}
          <br />
          <em>{h.titleLine3}</em>
          <span className="line-2">{h.titleAccent}</span>
        </h1>
        <p className="hero-desc">{h.desc}</p>
        <div className="hero-actions">
          <a href="#products" className="btn-primary">
            {h.ctaPrimary}
            <ArrowIcon />
          </a>
          <a href="#contact" className="btn-secondary">
            {h.ctaSecondary}
          </a>
        </div>
        <div className="hero-stats">
          {h.stats.map((stat) => (
            <div key={stat.label}>
              <div className="hero-stat-value">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
